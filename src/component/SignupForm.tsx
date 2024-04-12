import { useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { setCookie } from "nookies"; // Assuming you're using Next.js

import Input from "./Input";
import { validateEmail, validateName, validatePassword } from "@/utils/utils";
import { api } from "@/utils/api";
import { ERoutes } from "@/utils/enum";
import Button from "./Button";
import toast from "react-hot-toast";
import Loader from "./Loader";

const SignupForm = () => {
  const router = useRouter();
  const utils = api.useContext();

  // get userName List
  const { data: exsitingEmailList } = api.user.getExistingEmails.useQuery();

  const initialState = {
    name: "",
    email: "",
    password: "",
  };

  const [signUpForm, setSignUpForm] = useState(initialState);
  const [error, setError] = useState(initialState);

  const { name, email, password } = signUpForm;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    const formDetails = {
      ...signUpForm,
      [name]: value,
    };
    setSignUpForm(formDetails);
  };

  const { mutate, isPending } = api.user.createUser.useMutation({
    onSuccess: (data) => {
      const { token } = data;
      setCookie(null, "token", token, {
        maxAge: 3600,
        path: "/",
      });
      
      router.push(ERoutes.verifyAccount);
      setSignUpForm(initialState);
      setError(initialState);
      utils.user.getExistingEmails.invalidate(); // revalidate once we have new registered user so that we can get udpated email list
    },
    onError: (error) => {
      toast.error(error.message, {
        id: 'error',
      });
    },
  });

  const registerUser = () => {
    const newUser = mutate({
      name: name,
      email: email,
      password: password,
    });

    return newUser;
  };

  const isFilledFormValid = () => {
    let emailError = "";

    const emailExists =
      Array.isArray(exsitingEmailList) &&
      exsitingEmailList.length > 0 &&
      exsitingEmailList.find((item) => item.toLocaleLowerCase() === email);
    if (emailExists) {
      emailError = "The email you entered is already exist.";
    }

    if (emailError) {
      setError({
        ...error,
        email: emailError,
      });
      return false;
    }
    return true;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isFilledFormValid()) {
      registerUser();
    }
  };

  if (isPending) {
    return <Loader />
  }

  return (
    <div className="flex w-[90%] lg:w-1/3 flex-col justify-center rounded-2xl border border-[#C1C1C1] p-10">
      <h2 className="mb-8 text-center text-2xl font-semibold">
        Create your account
      </h2>
      <form onSubmit={handleSubmit} method="post">
        <Input
          label="Name"
          type="text"
          name="name"
          value={name}
          handleChange={handleChange}
          placeholder="Enter"
          error={error.name}
        />
        <Input
          label="Email"
          type="email"
          name="email"
          value={email}
          handleChange={handleChange}
          placeholder="Enter"
          error={error.email}
        />
        <Input
          label="Password"
          type="password"
          name="password"
          value={password}
          handleChange={handleChange}
          placeholder="Enter"
          error={error.password}
        />
        <Button
          type="submit"
          disabled={
            !validateName(name) ||
            !validateEmail(email) ||
            !validatePassword(password)
          }
          name="create account"
        />
      </form>
      <div className="text-center">
        <span>Have an Account? </span>
        <Link href="/login" className="font-medium uppercase hover:underline hover:text-slate-700">
          Login
        </Link>
      </div>
    </div>
  );
};

export default SignupForm;
