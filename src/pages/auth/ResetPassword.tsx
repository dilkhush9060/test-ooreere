import {useState, ChangeEvent, FormEvent, useRef} from "react";
import {Eye, EyeOff, Check, X, MoveLeft} from "lucide-react";
import {Link, useNavigate} from "react-router";
import React from "react";
import {useMutation} from "@tanstack/react-query";
import {Api} from "@/utils/axios";
import toast from "react-hot-toast";

interface FormData {
  password: string;
  confirmPassword: string;
}

interface FormErrors {
  password?: string;
  confirmPassword?: string;
  otp?: string;
}

interface PasswordRequirement {
  test: RegExp;
  text: string;
  met: boolean;
}

export default function ResetPassword(): JSX.Element {
  const [formData, setFormData] = useState<FormData>({
    password: "",
    confirmPassword: "",
  });
  const [otp, setOtp] = useState<string[]>(Array(6).fill(""));

  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
  const navigate = useNavigate();

  const [errors, setErrors] = useState<FormErrors>({});
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showConfirmPassword, setShowConfirmPassword] =
    useState<boolean>(false);

  const [passwordRequirements, setPasswordRequirements] = useState<
    PasswordRequirement[]
  >([
    {test: /^.{8,20}$/, text: "Between 8 and 20 characters", met: false},
    {test: /[A-Z]/, text: "1 upper case letter", met: false},
    {test: /\d/, text: "1 or more numbers", met: false},
    {
      test: /[!@#$%^&*(),.?":{}|<>]/,
      text: "1 or more special characters",
      met: false,
    },
  ]);

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

  const updatePasswordRequirements = (password: string) => {
    setPasswordRequirements((prev) =>
      prev.map((req) => ({
        ...req,
        met: req.test.test(password),
      }))
    );
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const {name, value} = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (name === "password") {
      updatePasswordRequirements(value);
    }

    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const handleOtpChange = (index: number, value: string): void => {
    if (isNaN(Number(value))) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }

    setErrors({});
  };

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (!passwordRequirements.every((req) => req.met)) {
      newErrors.password = "Password doesn't meet requirements";
    }

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords don't match";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // api call

  const {mutate, isPending} = useMutation<
    void,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    any,
    {otp: string; password: string; confirmPassword: string}
  >({
    mutationKey: ["emailVerification"],
    mutationFn: async (data) => {
      return Api.post("/auth/password/reset", data).then((res) => res.data);
    },

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onError: (error: any) => {
      toast.error(error?.response?.data?.message);
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onSuccess: (data: any) => {
      toast.success(data?.message);
      navigate("/signin");
    },
  });

  const handleSubmit = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    if (validateForm()) {
      const otpValue = otp.join("");
      if (otpValue.length !== 6) {
        setErrors({otp: "Please enter otp"});
        return;
      }
      mutate({otp: otp.join(""), ...formData});
    }
  };

  return (
    <div className="justify-between bg-gradient-to-r from-[#FFF7EB] to-white">
      <div className="mx-auto flex min-h-screen max-w-screen-xl flex-col px-6 py-14 md:grid md:grid-cols-2">
        <div className="flex h-full items-center justify-center">
          <img
            src="/pass-rest.png"
            className="w-full object-contain md:max-w-[500px]"
            alt="Reset Password"
          />
        </div>

        <div className="flex flex-shrink-0 flex-col items-center justify-center">
          <h2 className="mt-14 text-center text-xl font-bold text-[#333333] md:text-start md:text-[1.5rem]">
            Reset your password
          </h2>

          <p className="my-4 text-center text-xs leading-4 text-[#979DA3]">
            Create a new password for your account
          </p>

          <form
            onSubmit={handleSubmit}
            className="mt-2 w-full space-y-6 px-4 md:max-w-[400px]"
          >
            <div>
              <div className="flex items-center justify-around gap-1">
                {Array(6)
                  .fill(null)
                  .map((_, index) => (
                    <input
                      key={index}
                      type="text"
                      maxLength={1}
                      value={otp[index]}
                      ref={(el) => (inputRefs.current[index] = el)}
                      onChange={(e) => handleOtpChange(index, e.target.value)}
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

            <div className="relative">
              <div
                className={`relative flex w-full items-center gap-[6px] rounded-full border bg-white px-4 py-3 ${
                  errors.password ? "border-red-500" : "border-gray-300"
                }`}
              >
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="New Password"
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full focus:outline-none focus:ring-0"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="text-gray-500"
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5" />
                  ) : (
                    <Eye className="h-5 w-5" />
                  )}
                </button>
                {!errors.password &&
                  formData.password &&
                  passwordRequirements.every((req) => req.met) && (
                    <Check className="h-5 w-5 text-green-500" />
                  )}
              </div>
              {errors.password && (
                <p className="absolute bottom-full pb-1 text-xs text-red-500">
                  {errors.password}
                </p>
              )}
            </div>

            <div className="relative">
              <div
                className={`relative flex w-full items-center gap-[6px] rounded-full border bg-white px-4 py-3 ${
                  errors.confirmPassword ? "border-red-500" : "border-gray-300"
                }`}
              >
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  name="confirmPassword"
                  placeholder="Confirm New Password"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className="w-full focus:outline-none focus:ring-0"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="text-gray-500"
                >
                  {showConfirmPassword ? (
                    <EyeOff className="h-5 w-5" />
                  ) : (
                    <Eye className="h-5 w-5" />
                  )}
                </button>
                {formData.confirmPassword &&
                formData.password === formData.confirmPassword ? (
                  <Check className="h-5 w-5 text-green-500" />
                ) : (
                  formData.confirmPassword && (
                    <X className="h-5 w-5 text-red-500" />
                  )
                )}
              </div>
              {errors.confirmPassword && (
                <p className="absolute bottom-full pb-1 text-xs text-red-500">
                  {errors.confirmPassword}
                </p>
              )}
            </div>

            {formData.password && (
              <div className="space-y-1 rounded-lg bg-white p-4">
                <p className="text-sm text-gray-500">
                  YOUR PASSWORD MUST CONTAIN
                </p>
                {passwordRequirements.map((req, index) => (
                  <div key={index} className="flex items-center gap-2">
                    {req.met ? (
                      <Check className="h-4 w-4 text-green-500" />
                    ) : (
                      <X className="h-4 w-4 text-red-500" />
                    )}
                    <span
                      className={`text-sm ${req.met ? "text-green-500" : "text-red-500"}`}
                    >
                      {req.text}
                    </span>
                  </div>
                ))}
              </div>
            )}

            <button
              type="submit"
              className={`mt-3 w-full rounded-full px-4 py-[14px] text-white ${isPending ? "bg-[#ff9100b2]" : "bg-primary"}`}
            >
              Reset password
            </button>

            <div className="mt-4 flex justify-center">
              <Link
                to="/signin"
                className="flex items-center text-xs font-medium text-[#54585A]"
              >
                <MoveLeft className="mr-2 h-4 w-4" />
                Back to login
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
