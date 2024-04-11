import { api } from "@/utils/api";
import { ERoutes } from "@/utils/enum";
import { maskEmail } from "@/utils/utils";
import { useRouter } from "next/router";
import React, { useRef, useState } from "react";

const VerifyAccount = () => {
  const router = useRouter();
  const utils = api.useContext();

  const [codes, setCodes] = useState<string[]>(Array(8).fill(""));

  const inputsRefs = Array.from({ length: 8 }, () =>
    useRef<HTMLInputElement>(null),
  );

  const handleChange = (index: number, value: string) => {
    if (!isNaN(Number(value)) && value.length <= 1) {
      const newCodes = [...codes];
      newCodes[index] = value;
      setCodes(newCodes);

      if (value.length === 1 && index < 7) {
        inputsRefs[index + 1]?.current?.focus();
      }
    }
  };

  const handleKeyDown = (
    index: number,
    event: React.KeyboardEvent<HTMLInputElement>,
  ) => {
    if (event.key === "Backspace") {
      if (codes[index] !== "") {
        // Clear current digit if present
        const newCodes = [...codes];
        newCodes[index] = "";
        setCodes(newCodes);
      } else if (index > 0) {
        // Move focus to the previous input box
        inputsRefs[index - 1]?.current?.focus();
      }
    }
  };

  const isVerifyDisabled = codes.some((code) => code === "");

  const verifyUser = api.user.verifyEmail.useMutation({
    onSuccess: () => {
      router.push(ERoutes.home);
    },
    onError: (error) => {
      console.error(error?.shape?.message);
    },
  });

  const userVerification = () => {
    const newUser = verifyUser.mutate({
      verificationCode: +codes.join(""),
    });

    return newUser;
  };

  const handleVerify = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    userVerification()
  };

  return (
    <div className="h-screen">
      <h1>Verify your email</h1>
      <p>Enter the 8 digit code you have received on </p>
      <div>{maskEmail("99sdawkhar@gmail.com")}</div>
      <form className="" method="post" onSubmit={handleVerify}>
        <span>Code</span>
        <div className="flex space-x-4">
          {codes.map((code, index) => (
            <fieldset key={index}>
              <input
                ref={inputsRefs[index]}
                type="text"
                maxLength={1}
                value={code}
                onChange={(e) => handleChange(index, e.target.value)}
                onKeyDown={(e) => handleKeyDown(index, e)}
                className="h-10 w-10 rounded border border-gray-300 text-center focus:border-blue-500 focus:outline-none"
              />
            </fieldset>
          ))}
        </div>
        <button type="submit" disabled={isVerifyDisabled}>
          Verify
        </button>
      </form>
    </div>
  );
};

export default VerifyAccount;
