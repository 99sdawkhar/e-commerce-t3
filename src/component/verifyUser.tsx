import Button from "@/component/Button";
import { api } from "@/utils/api";
import { ERoutes } from "@/utils/enum";
import { maskEmail } from "@/utils/utils";
import { useRouter } from "next/router";
import React, { useRef, useState } from "react";
import toast from "react-hot-toast";
import Loader from "./Loader";

const VerifyUser = () => {
  const router = useRouter();
  const { data: user, isLoading } = api.user.getUserByToken.useQuery({});

  const [codes, setCodes] = useState<string[]>(Array(8).fill(""));
  const [error, setError] = useState<string>("");

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

  const { mutate, isPending }  = api.user.verifyEmail.useMutation({
    onSuccess: (data) => {
      console.log({data})
      const msg = data?.message ?? ""
      toast.success(msg, {
        id: 'success',
      });
      router.push(ERoutes.home);
    },
    onError: (error) => {
      setError(error?.shape?.message ?? "");
    },
  });

  const userVerification = () => {
    const newUser = mutate({
      verificationCode: +codes.join(""),
    });

    return newUser;
  };

  const handleVerify = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    userVerification();
  };

  if (isPending || isLoading) {
    return <Loader />
  }

  return (
    <div className="mb-4 flex justify-center">
      <div className="flex w-1/3 flex-col justify-center rounded-2xl border border-[#C1C1C1] p-10">
        <h2 className="mb-8 text-center text-2xl font-semibold">
          Verify your email
        </h2>
        <p className="text-center ">
          Enter the 8 digit code you have received on{" "}
        </p>
        <div className="text-center font-medium">
          {maskEmail(user?.email ?? "")}
        </div>
        <form className="max-w-[576px]" method="post" onSubmit={handleVerify}>
          <span>Code</span>
          <div className="flex space-x-4 mb-6">
            {codes.map((code, index) => (
              <fieldset
                key={index}
                className="relative flex max-w-[450px] flex-col"
              >
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
          {error && (
            <span className="mb-6 inline-block text-red-600">{error}</span>
          )}

          <Button type="submit" disabled={isVerifyDisabled} name="Verify" />
        </form>
      </div>
    </div>
  );
};

export default VerifyUser;
