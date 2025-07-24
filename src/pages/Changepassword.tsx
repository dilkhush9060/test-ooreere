import {Eye, EyeOff, Check, X} from "lucide-react";
import {ChangeEvent, FormEvent, useState} from "react";
import {ChangePasswordMutation} from "@/hooks/mutation/ChangePasswordMutation";

interface FormData {
  newpassword: string;
  oldpassword: string;
}

interface FormErrors {
  newpassword?: string;
  oldpassword?: string;
}

interface PasswordRequirement {
  test: RegExp;
  text: string;
  met: boolean;
}

export default function ChangePassword() {
  const [formData, setFormData] = useState<FormData>({
    newpassword: "",
    oldpassword: "",
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [showNewPassword, setShowNewPassword] = useState<boolean>(false);
  const [showOldPassword, setShowOldPassword] = useState<boolean>(false);

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

  const updatePasswordRequirements = (password: string) => {
    setPasswordRequirements((prev) =>
      prev.map((req) => ({
        ...req,
        met: req.test.test(password),
      }))
    );
  };

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.newpassword) {
      newErrors.newpassword = "New password is required";
    } else if (!passwordRequirements.every((req) => req.met)) {
      newErrors.newpassword = "Password doesn't meet requirements";
    }

    if (!formData.oldpassword) {
      newErrors.oldpassword = "Old password is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const {mutate, isPending} = ChangePasswordMutation();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (validateForm()) {
      console.log("Form is valid, submitting:", formData);
      try {
        mutate(formData);
        setFormData({newpassword: "", oldpassword: ""});
      } catch (error) {
        console.error("Error changing password:", error);
      }
    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const {name, value} = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (name === "newpassword") {
      updatePasswordRequirements(value);
    }

    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-[#FFF7EB] to-white">
      <div className="relative mx-auto flex max-w-screen-xl flex-col px-6 py-14">
        <div className="mx-auto w-full max-w-md">
          <div className="pt-6">
            <h1 className="text-2xl font-bold text-[#333333]">
              Change Password
            </h1>
            <h2 className="mt-2 text-sm text-[#979DA3]">
              Your new password must be different from previously used passwords
            </h2>
            <form onSubmit={handleSubmit} className="w-full">
              {/* Old Password Field */}
              <div
                className={`relative mt-6 flex w-full items-center gap-[6px] rounded-full border bg-white px-4 py-3 ${
                  errors.oldpassword ? "border-red-500" : "border-gray-300"
                }`}
              >
                <div>
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M20 12C20 10.897 19.103 10 18 10H17V7C17 4.243 14.757 2 12 2C9.243 2 7 4.243 7 7V10H6C4.897 10 4 10.897 4 12V20C4 21.103 4.897 22 6 22H18C19.103 22 20 21.103 20 20V12ZM9 7C9 5.346 10.346 4 12 4C13.654 4 15 5.346 15 7V10H9V7Z"
                      fill="#A6A6A6"
                    />
                  </svg>
                </div>
                <input
                  type={showOldPassword ? "text" : "password"}
                  name="oldpassword"
                  placeholder="Old Password"
                  value={formData.oldpassword}
                  onChange={handleChange}
                  className="w-full focus:outline-none focus:ring-0"
                />
                <button
                  type="button"
                  onClick={() => setShowOldPassword(!showOldPassword)}
                  className="text-gray-500"
                >
                  {showOldPassword ? (
                    <EyeOff className="h-5 w-5" />
                  ) : (
                    <Eye className="h-5 w-5" />
                  )}
                </button>
                {errors.oldpassword && (
                  <p className="absolute bottom-full pb-1 text-xs text-red-500">
                    {errors.oldpassword}
                  </p>
                )}
              </div>

              {/* New Password Field */}
              <div
                className={`relative mt-6 flex w-full items-center gap-[6px] rounded-full border bg-white px-4 py-3 ${
                  errors.newpassword ? "border-red-500" : "border-gray-300"
                }`}
              >
                <div>
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M20 12C20 10.897 19.103 10 18 10H17V7C17 4.243 14.757 2 12 2C9.243 2 7 4.243 7 7V10H6C4.897 10 4 10.897 4 12V20C4 21.103 4.897 22 6 22H18C19.103 22 20 21.103 20 20V12ZM9 7C9 5.346 10.346 4 12 4C13.654 4 15 5.346 15 7V10H9V7Z"
                      fill="#A6A6A6"
                    />
                  </svg>
                </div>
                <input
                  type={showNewPassword ? "text" : "password"}
                  name="newpassword"
                  placeholder="New Password"
                  value={formData.newpassword}
                  onChange={handleChange}
                  className="w-full focus:outline-none focus:ring-0"
                />
                <button
                  type="button"
                  onClick={() => setShowNewPassword(!showNewPassword)}
                  className="text-gray-500"
                >
                  {showNewPassword ? (
                    <EyeOff className="h-5 w-5" />
                  ) : (
                    <Eye className="h-5 w-5" />
                  )}
                </button>
                {errors.newpassword && (
                  <p className="absolute bottom-full pb-1 text-xs text-red-500">
                    {errors.newpassword}
                  </p>
                )}
              </div>

              {/* Password Requirements */}
              {formData.newpassword && (
                <div className="space-y-1 px-4">
                  <p className="mt-3 text-sm text-gray-500">
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
                        className={`text-sm ${
                          req.met ? "text-green-500" : "text-red-500"
                        }`}
                      >
                        {req.text}
                      </span>
                    </div>
                  ))}
                </div>
              )}

              <button
                type="submit"
                disabled={isPending}
                className="mt-6 w-full rounded-full bg-primary px-4 py-[14px] text-white disabled:bg-primary/70"
              >
                {isPending ? "Changing Password..." : "Change Password"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
