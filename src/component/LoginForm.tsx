import { useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { setCookie } from "nookies"; // Assuming you're using Next.js
import Input from "./Input";
import { validateEmail, validatePassword } from "@/utils/utils";
import { api } from "@/utils/api";
import { ERoutes } from "@/utils/enum";
import Button from "./Button";
import Loader from "./Loader";

const LoginForm = () => {
  const router = useRouter();

  const initialState = {
    email: "",
    password: "",
  };

  const [user, setUser] = useState(initialState);
  const [error, setError] = useState<{
    email?: string;
    password?: string;
  }>(initialState);

  const [isVisible, setIsVisible] = useState<boolean>(false);

  const handlePasswordVisibilityChange = () =>
    setIsVisible((prev: boolean) => !prev);

  const { email, password } = user;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    const formDetails = {
      ...user,
      [name]: value,
    };
    setUser(formDetails);
  };

  const { mutate, isPending } = api.user.loginUser.useMutation({
    onSuccess: (data) => {
      const { token } = data;
      setCookie(null, "token", token, {
        maxAge: 3600,
        path: "/", // Cookie is accessible from all paths
      });

      router.push(ERoutes.home);
      setUser(initialState);
      setError(initialState);
    },
    onError: (error) => {
      const errMsg = error?.shape?.message;
      setError({
        ...error,
        password: errMsg ?? "",
      });
    },
  });

  const loginUser = () => {
    const newUser = mutate({
      email: email,
      password: password,
    });

    return newUser;
  };

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    loginUser();
  };

  if (isPending) {
    return <Loader />
  }

  return (
    <div className="flex w-1/3 flex-col justify-center rounded-2xl border border-[#C1C1C1] p-10">
      <h2 className="mb-8 text-center text-2xl font-semibold">Login</h2>
      <h3 className="mb-3 text-center text-lg font-medium">
        Welcome back to ECOMMERCE
      </h3>
      <p className="mb-5 text-center text-sm">
        The next gen business marketplace
      </p>
      <form onSubmit={handleLogin} method="post" className="max-w-[576px]">
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
          type={isVisible ? "text" : "password"}
          extraData={
            <span
              className="absolute bottom-0 right-0 block -translate-x-2/4 -translate-y-2/4 cursor-pointer underline"
              onClick={handlePasswordVisibilityChange}
            >
              {isVisible ? "Hide" : "Show"}
            </span>
          }
          name="password"
          value={password}
          handleChange={handleChange}
          placeholder="Enter"
          error={error.password}
        />

        <Button
          type="submit"
          disabled={!validateEmail(email) || !validatePassword(password)}
          name="login"
        />
      </form>
      <div className="text-center">
        <span>Don't have an Account? </span>
        <Link href={ERoutes.signUp} className="font-medium uppercase hover:underline hover:text-slate-700">
          Sign up
        </Link>
      </div>
    </div>
  );
};

export default LoginForm;
