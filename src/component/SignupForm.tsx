import Link from "next/link";
import { useState } from "react";
import Input from "./Input";
import { validateEmail, validateName, validatePassword } from "@/utils/utils";
import { api } from "@/utils/api";

const SignupForm = () => {
  const utils = api.useContext();

  // get userName List
  const { data: exsitingEmailList } = api.user.getExistingEmails.useQuery();

  const initialState = {
    name: "",
    email: "",
    password: "",
  }

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

  const creatUser = api.user.createUser.useMutation({
    onSuccess: (data) => {
      // router.push("/" + data.profile.username);
      setSignUpForm(initialState);
      setError(initialState);
      utils.user.getExistingEmails.invalidate(); // revalidate once we have new registered user so that we can get udpated email list
    },
    onError: (error) => {
      console.error({error});
    },
  });

  const registerUser = () => {
    const newUser = creatUser.mutate({
      name: name,
      email: email,
      password: password,
    });

    return newUser;
  };

  const isFilledFormValid = () => {
    let emailError = '';

    const emailExists = Array.isArray(exsitingEmailList) && exsitingEmailList.length > 0 && exsitingEmailList.find((item) => item.toLocaleLowerCase() === email);
    if (emailExists) {
      emailError = 'The email you entered is already exist.'
    }

    if (emailError) {
      setError({ 
        ...error,
        email: emailError
      });
       return false;
    }
    return true
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isFilledFormValid()) {
      registerUser()
    }
  };

  return (
    <div>
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
        <button type="submit" disabled={!validateName(name) || !validateEmail(email) || !validatePassword(password)}>
          create account
        </button>
      </form>
      <div>
        <span>Have an Account?</span>
        <Link href="/login">Login</Link>
      </div>
    </div>
  );
};

export default SignupForm;
