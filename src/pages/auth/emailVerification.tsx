/* eslint-disable @typescript-eslint/no-explicit-any */
import {useState, useRef, KeyboardEvent, ClipboardEvent} from "react";
import {useMutation} from "@tanstack/react-query";
import {Api} from "../../utils/axios";
import toast from "react-hot-toast";
import {Link, useNavigate} from "react-router";

interface FormErrors {
  otp?: string;
}

export default function EmailVerification() {
  const [otp, setOtp] = useState<string[]>(Array(6).fill(""));
  const [errors, setErrors] = useState<FormErrors>({});
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
  const navigate = useNavigate();

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

  const handleKeyDown = (index: number, e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e: ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const pastedData = e.clipboardData
      .getData("text")
      .replace(/[^0-9]/g, "")
      .slice(0, 6);
    const newOtp = [...otp];

    for (let i = 0; i < pastedData.length; i++) {
      newOtp[i] = pastedData[i];
    }
    setOtp(newOtp);

    if (pastedData.length) {
      inputRefs.current[Math.min(pastedData.length - 1, 5)]?.focus();
    }
  };

  // api call
  const {mutate, isPending} = useMutation<void, any, {otp: string}>({
    mutationKey: ["emailVerification"],
    mutationFn: async (data) => {
      return Api.post("/auth/account/verify", data).then((res) => res.data);
    },

    onError: (error: any) => {
      toast.error(error?.response?.data?.message);
    },
    onSuccess: (data: any) => {
      toast.success(data?.message);
      navigate("/signin");
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const otpValue = otp.join("");
    if (otpValue.length !== 6) {
      setErrors({otp: "Please enter otp"});
      return;
    }
    mutate({otp: otpValue});
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-r from-[#FFF7EB] to-white p-6">
      <div className="mx-auto mt-8 w-full max-w-md">
        <h1 className="mb-2 text-3xl font-bold">Email Verify</h1>
        <p className="mb-8 text-gray-500">
          Enter the 6-digit code sent to your email
        </p>

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
            className={`mt-3 w-full rounded-full px-4 py-[14px] text-white ${isPending ? "bg-[#ff9100b2]" : "bg-primary"}`}
            disabled={isPending}
          >
            Verify Email
          </button>
        </form>

        <Link
          to="/resend-email-verification"
          className="text-blue-500 mt-4 block text-center text-sm hover:underline"
        >
          <button
            type="submit"
            className={`mt-3 w-full rounded-full px-4 py-[14px] text-white ${isPending ? "bg-[#ff9100b2]" : "bg-primary"}`}
            disabled={isPending}
          >
            Resend Email verification
          </button>
        </Link>
      </div>
    </div>
  );
}
