import {DeleteMutation} from "@/hooks/mutation/DeleteMUtion";
import {AuthStore} from "@/store/auth";
import {AxiosError} from "axios";
import React, {useRef, useState} from "react";
import toast from "react-hot-toast";

interface FormErrors {
  otp?: string;
}

export default function Deleteotp() {
  const [otp, setOtp] = useState<string[]>(Array(6).fill(""));
  const [errors, setErrors] = useState<FormErrors>({});
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
  const logout = AuthStore((state) => state.logout);

  const handleChange = (index: number, value: string) => {
    if (isNaN(Number(value))) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }

    setErrors({});
  };

  const handleKeyDown = (
    index: number,
    e: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const pastedData =
      e.clipboardData
        ?.getData("text")
        .replace(/[^0-9]/g, "")
        .slice(0, 6) || "";
    const newOtp = [...otp];

    for (let i = 0; i < pastedData.length; i++) {
      newOtp[i] = pastedData[i];
    }
    setOtp(newOtp);

    if (pastedData.length) {
      inputRefs.current[Math.min(pastedData.length - 1, 5)]?.focus();
    }
  };

  const {mutate, isPending} = DeleteMutation({
    onError: (error) => {
      if (error instanceof AxiosError) {
        toast.error(error?.response?.data?.message);
      } else {
        toast.error("Error on deleting account");
      }
    },
    onSuccess: (data: {message: string}) => {
      toast.success(data?.message);
      logout();
      window.location.href = "/signin";
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const otpValue = otp.join("");
    // console.log(otpValue);
    mutate({otp: otpValue});
    if (otpValue.length !== 6) {
      setErrors({otp: "Please enter otp"});
      return;
    }
  };

  return (
    <div>
      <div className="mx-auto my-10 flex min-h-[100vh] max-w-2xl flex-col items-start justify-center gap-6">
        <div className="flex flex-col gap-4">
          <h1 className="text-3xl">Delete Account</h1>
          <p>
            All your plans will be deleted{" "}
            <span className="text-red-500">no refund</span> will be provided to
            you
          </p>
        </div>

        <div>
          <h1 className="pb-2">OTP has been sent to your email</h1>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <div className="flex items-center justify-around gap-1">
                {Array(6)
                  .fill(null)
                  .map((_, index) => (
                    <input
                      key={index}
                      type="number"
                      maxLength={1}
                      value={otp[index]}
                      ref={(el) => (inputRefs.current[index] = el)}
                      onChange={(e) => handleChange(index, e.target.value)}
                      onKeyDown={(e) => handleKeyDown(index, e)}
                      onPaste={handlePaste}
                      className={`h-10 w-10 rounded-lg border text-center text-xl md:h-12 md:w-12 ${errors.otp ? "border-red-500" : "border-gray-300"} focus:border-orange-500 focus:outline-none focus:ring-2 focus:ring-orange-500`}
                    />
                  ))}
              </div>
              {errors.otp && (
                <p className="mt-1 text-sm text-red-500">{errors.otp}</p>
              )}
            </div>

            <button
              type="submit"
              className="w-full rounded-lg bg-orange-500 py-3 font-semibold text-white transition duration-200 hover:bg-orange-600"
              disabled={isPending}
            >
              Delete Account
            </button>
          </form>
          <p className="mt-4">
            After clicking on "Delete Account" button, an OTP will be sent to
            your email
          </p>
        </div>
      </div>
    </div>
  );
}
