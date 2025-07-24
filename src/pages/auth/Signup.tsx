/* eslint-disable @typescript-eslint/no-explicit-any */
import {useState, ChangeEvent, FormEvent} from "react";
import {Eye, EyeOff, Check, X, MoveLeft} from "lucide-react";
import {useMutation} from "@tanstack/react-query";
import {Api} from "../../utils/axios";
import toast from "react-hot-toast";
import {Link, useNavigate} from "react-router";
import {PAGE_LINKS} from "@/utils/constants";

interface FormData {
  name: string;
  email: string;
  phone: string;
  city: string;
  password: string;
  confirmPassword: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  phone?: string;
  city?: string;
  password?: string;
  confirmPassword?: string;
}

interface PasswordRequirement {
  test: RegExp;
  text: string;
  met: boolean;
}

export default function Signup(): JSX.Element {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    phone: "",
    city: "",
    password: "",
    confirmPassword: "",
  });
  const [acceptedTerms, setAcceptedTerms] = useState(false);

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

  const navigate = useNavigate();

  const updatePasswordRequirements = (password: string) => {
    setPasswordRequirements((prev) =>
      prev.map((req) => ({
        ...req,
        met: req.test.test(password),
      }))
    );
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const {name, value, type, checked} = e.target;
    let newValue = type === "checkbox" ? checked : value;

    // Restrict phone input to only digits and max 10 characters
    if (name === "phone") {
      const digitsOnly = value.replace(/\D/g, ""); // Remove non-digits
      newValue = digitsOnly.slice(0, 10); // Limit to 10 digits
    }

    setFormData((prev) => ({
      ...prev,
      [name]: newValue,
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

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.name) newErrors.name = "Full name is required";
    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Please enter a valid email";
    }

    if (!formData.phone) {
      newErrors.phone = "Mobile number is required";
    } else if (!/^\d{10}$/.test(formData.phone)) {
      newErrors.phone = "Mobile number must be exactly 10 digits";
    }

    if (!formData.city) newErrors.city = "City is required";
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

  const isFormValid = () => {
    return (
      formData.name &&
      formData.email &&
      formData.phone &&
      /^\d{10}$/.test(formData.phone) &&
      formData.city &&
      formData.password &&
      formData.confirmPassword &&
      passwordRequirements.every((req) => req.met) &&
      formData.password === formData.confirmPassword &&
      acceptedTerms
    );
  };

  const {mutate, isPending} = useMutation<void, unknown, FormData>({
    mutationKey: ["signup"],
    mutationFn: async (data) => {
      return Api.post("/auth/signup", data).then((res) => res.data);
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.message);
    },
    onSuccess: (data: any) => {
      toast.success(data?.message);
      navigate("/email-verify");
    },
  });

  const handleSubmit = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    if (validateForm()) {
      mutate(formData);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-[#FFF7EB] to-white">
      {/* Layout */}
      <div className="relative mx-auto flex max-w-screen-xl flex-col px-6 py-14 lg:flex-row">
        {/* Top section */}
        <div className="">
          <div className="mb-8">
            <div
              className="flex cursor-pointer items-center text-[#54585A] hover:text-gray-900"
              onClick={() => navigate(-1)}
            >
              <MoveLeft className="mr-2 h-5 w-5" />
              Back
            </div>
          </div>
          <h1 className="text-xl font-bold leading-8 md:text-[2.5rem] md:leading-[4rem]">
            Register to <br /> OOROOREE DIGITAL
          </h1>

          <p className="mt-8 max-w-[180px] text-xs font-medium leading-4 md:mt-[102px] md:max-w-[276px] md:text-xl md:leading-8">
            If you have an account you can{" "}
            <Link
              to={PAGE_LINKS.LOGIN}
              className="cursor-pointer font-semibold text-[#377CEE]"
            >
              Login here!
            </Link>
          </p>
        </div>

        {/* Bottom with Image section */}
        <div className="grid grid-cols-1 md:mt-20 md:grid-cols-2 lg:mt-0">
          <img
            src="/login_bg.png"
            alt="login-bg"
            className="mt-9 w-full px-6 md:max-w-[500px]"
          />

          <div className="mx-auto w-full flex-shrink-0 lg:max-w-[320px]">
            <h2 className="mt-14 text-center text-xl font-bold text-[#333333] md:text-start md:text-[1.5rem]">
              Register to get started
            </h2>
            <form onSubmit={handleSubmit} className="mt-8">
              <div
                className={`relative flex w-full items-center gap-[6px] rounded-full border bg-white px-4 py-3 ${
                  errors.name ? "mt-7 border-red-500" : "mt-3 border-gray-300"
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
                      d="M7.5 6.5C7.5 8.981 9.519 11 12 11C14.481 11 16.5 8.981 16.5 6.5C16.5 4.019 14.481 2 12 2C9.519 2 7.5 4.019 7.5 6.5ZM20 21H21V20C21 16.141 17.859 13 14 13H10C6.14 13 3 16.141 3 20V21H20Z"
                      fill="#A6A6A6"
                    />
                  </svg>
                </div>
                <input
                  type="text"
                  name="name"
                  placeholder="Full Name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full focus:outline-none focus:ring-0"
                />
                {errors.name && (
                  <p className="absolute bottom-full pb-1 text-xs text-red-500">
                    {errors.name}
                  </p>
                )}
              </div>

              <div
                className={`relative flex w-full items-center gap-[6px] rounded-full border bg-white px-4 py-3 ${
                  errors.email ? "mt-7 border-red-500" : "mt-3 border-gray-300"
                } `}
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
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M1.5 5.25L2.25 4.5H21.75L22.5 5.25V18.75L21.75 19.5H2.25L1.5 18.75V5.25ZM3 6.8025V18H21V6.804L12.465 13.35H11.55L3 6.8025ZM19.545 6H4.455L12 11.8035L19.545 6Z"
                      fill="#A6A6A6"
                    />
                  </svg>
                </div>
                <input
                  type="email"
                  name="email"
                  placeholder="Email Address"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full focus:outline-none focus:ring-0"
                />
                {errors.email && (
                  <p className="absolute bottom-full pb-1 text-xs text-red-500">
                    {errors.email}
                  </p>
                )}
              </div>

              <div
                className={`relative flex w-full items-center gap-[6px] rounded-full border bg-white px-4 py-3 ${
                  errors.phone ? "mt-7 border-red-500" : "mt-3 border-gray-300"
                } `}
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
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M5 4C5 3.46957 5.21071 2.96086 5.58579 2.58579C5.96086 2.21071 6.46957 2 7 2H17C17.5304 2 18.0391 2.21071 18.4142 2.58579C18.7893 2.96086 19 3.46957 19 4V20C19 20.5304 18.7893 21.0391 18.4142 21.4142C18.0391 21.7893 17.5304 22 17 22H7C6.46957 22 5.96086 21.7893 5.58579 21.4142C5.21071 21.0391 5 20.5304 5 20V4ZM17 16V5H7V16H17ZM12 17C11.7348 17 11.4804 17.1054 11.2929 17.2929C11.1054 17.4804 11 17.7348 11 18C11 18.2652 11.1054 18.5196 11.2929 18.7071C11.4804 18.8946 11.7348 19 12 19H12.01C12.2752 19 12.5296 18.8946 12.7171 18.7071C12.9046 18.5196 13.01 18.2652 13.01 18C13.01 17.7348 12.9046 17.4804 12.7171 17.2929C12.5296 17.1054 12.2752 17 12.01 17H12Z"
                      fill="#A6A6A6"
                    />
                  </svg>
                </div>
                <input
                  type="tel"
                  name="phone"
                  placeholder="Mobile Number"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full focus:outline-none focus:ring-0"
                  maxLength={10}
                />
                {errors.phone && (
                  <p className="absolute bottom-full pb-1 text-xs text-red-500">
                    {errors.phone}
                  </p>
                )}
                {!errors.phone &&
                  formData.phone &&
                  /^\d{10}$/.test(formData.phone) && (
                    <Check className="h-5 w-5 text-green-500" />
                  )}
              </div>

              <div
                className={`relative flex w-full items-center gap-[6px] rounded-full border bg-white px-4 py-3 ${
                  errors.city ? "mt-7 border-red-500" : "mt-3 border-gray-300"
                } `}
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
                      d="M12 11.5C11.337 11.5 10.7011 11.2366 10.2322 10.7678C9.76339 10.2989 9.5 9.66304 9.5 9C9.5 8.33696 9.76339 7.70107 10.2322 7.23223C10.7011 6.76339 11.337 6.5 12 6.5C12.663 6.5 13.2989 6.76339 13.7678 7.23223C14.2366 7.70107 14.5 8.33696 14.5 9C14.5 9.3283 14.4353 9.65339 14.3097 9.95671C14.1841 10.26 13.9999 10.5356 13.7678 10.7678C13.5356 10.9999 13.26 11.1841 12.9567 11.3097C12.6534 11.4353 12.3283 11.5 12 11.5ZM12 2C10.1435 2 8.36301 2.7375 7.05025 4.05025C5.7375 5.36301 5 7.14348 5 9C5 14.25 12 22 12 22C12 22 19 14.25 19 9C19 7.14348 18.2625 5.36301 16.9497 4.05025C15.637 2.7375 13.8565 2 12 2Z"
                      fill="#A6A6A6"
                    />
                  </svg>
                </div>
                <input
                  type={"text"}
                  name="city"
                  value={formData.city}
                  onChange={(e) =>
                    setFormData((prev) => ({...prev, city: e.target.value}))
                  }
                  className="w-full focus:outline-none focus:ring-0"
                  placeholder="Your City"
                />
              </div>

              <div
                className={`relative flex w-full items-center gap-[6px] rounded-full border bg-white px-4 py-3 ${
                  errors.password
                    ? "mt-7 border-red-500"
                    : "mt-3 border-gray-300"
                } `}
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
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="Password"
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
              </div>

              {formData.password && (
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
                        className={`text-sm ${req.met ? "text-green-500" : "text-red-500"}`}
                      >
                        {req.text}
                      </span>
                    </div>
                  ))}
                </div>
              )}

              <div
                className={`relative flex w-full items-center gap-[6px] rounded-full border bg-white px-4 py-3 ${
                  errors.confirmPassword
                    ? "mt-7 border-red-500"
                    : "mt-3 border-gray-300"
                } `}
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
                  type={showConfirmPassword ? "text" : "password"}
                  name="confirmPassword"
                  placeholder="Confirm Password"
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
              </div>

              <div className="mt-4 flex items-start gap-2">
                <input
                  type="checkbox"
                  checked={acceptedTerms}
                  onChange={(e) => setAcceptedTerms(e.target.checked)}
                  className="mt-1"
                />
                <span className="text-xs text-gray-600">
                  Checking box means you're okay with our Terms of Service,
                  Privacy Policy, and default Notification Settings
                </span>
              </div>

              <button
                type="submit"
                disabled={isPending}
                className={`mt-3 w-full rounded-full px-4 py-[14px] text-white ${
                  isFormValid()
                    ? "bg-primary"
                    : "cursor-not-allowed bg-[#BCBCBC]"
                } ${isPending ? "bg-[#ff910061]" : ""}`}
              >
                {isPending ? "Registring..." : "Register"}
              </button>
            </form>

            <div className="mt-4 text-xs text-[#333333] underline hover:text-[#377CEE]">
              <Link to={PAGE_LINKS.FORGOT_PASSWORD}>Forgot Password</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
