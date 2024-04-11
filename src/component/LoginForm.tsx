import { useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { setCookie } from 'nookies'; // Assuming you're using Next.js

import Input from "./Input";
import { validateEmail, validateName, validatePassword } from "@/utils/utils";
import { api } from "@/utils/api";
import { ERoutes } from "@/utils/enum";

const LoginForm = () => {
  const router = useRouter();
  // const utils = api.useContext();

  // get userName List
  // const { data: exsitingEmailList } = api.user.getExistingEmails.useQuery();

  const initialState = {
    email: "",
    password: "",
  };

  const [user, setUser] = useState(initialState);
  const [error, setError] = useState<{
    email?: string;
    password?: string;
  }>(initialState);

  const { email, password } = user;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    const formDetails = {
      ...user,
      [name]: value,
    };
    setUser(formDetails);
  };

  const login = api.user.loginUser.useMutation({
    onSuccess: (data) => {
      const { token } = data;
      setCookie(null, 'token', token, {
        maxAge: 3600,
        path: '/', // Cookie is accessible from all paths
      });

      router.push(ERoutes.home);
      setUser(initialState);
      setError(initialState);
    },
    onError: (error) => {
      const errMsg = error?.shape?.message
      setError({
        ...error,
        password: errMsg ?? ""
      })
      console.error(error?.shape?.message);
    },
  });

  const loginUser = () => {
    const newUser = login.mutate({
      email: email,
      password: password,
    });

    return newUser;
  };

  const isFilledFormValid = () => {
    // let emailError = "";

    // const emailExists =
    //   Array.isArray(exsitingEmailList) &&
    //   exsitingEmailList.length > 0 &&
    //   exsitingEmailList.find((item) => item.toLocaleLowerCase() === email);
    // if (emailExists) {
    //   emailError = "The email you entered is already exist.";
    // }

    // if (emailError) {
      // setError({
      //   ...error,
      //   email: emailError,
      // });
      return false;
    // }
    return true;
  };

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // if (isFilledFormValid()) {
      loginUser();
    // }
  };

  return (
    <div>
      <form onSubmit={handleLogin} method="post">
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
        <button
          type="submit"
          disabled={
            !validateEmail(email) ||
            !validatePassword(password)
          }
        >
          Login
        </button>
      </form>
      <div>
        <span>Don't have an Account?</span>
        <Link href={ERoutes.signUp}>Sign up</Link>
      </div>
    </div>
  );
};

export default LoginForm;
