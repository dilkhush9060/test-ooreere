import {useState, ChangeEvent, FormEvent} from "react";
import {Eye, EyeOff, MoveLeft} from "lucide-react";
import {useMutation} from "@tanstack/react-query";
import {Api} from "../../utils/axios";
import toast from "react-hot-toast";
import {AuthStore} from "../../store/auth";
import {Link, useNavigate} from "react-router";
import {PAGE_LINKS} from "@/utils/constants";

interface FormData {
  email: string;
  password: string;
}

interface FormErrors {
  email?: string;
  password?: string;
}

export default function Login() {
  const [formData, setFormData] = useState<FormData>({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const login = AuthStore((state) => state.login);

  const navigate = useNavigate();

  // api call
  const {mutate, isPending} = useMutation<void, unknown, FormData>({
    mutationKey: ["signin"],
    mutationFn: async (data) => {
      return Api.post("/auth/signin", data).then((res) => res.data);
    },

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onError: (error: any) => {
      toast.error(error?.response?.data?.message);
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onSuccess: (data: any) => {
      toast.success(data?.message);
      login(data?.data?.user);
      navigate("/");
    },
  });

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    // Email validation
    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Please enter a valid email";
    }

    // Password validation
    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (validateForm()) {
      mutate(formData);
    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const {name, value} = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-[#FFF7EB] to-white p-6">
      <div className="relative mx-auto my-8 flex max-w-screen-xl flex-col md:px-[50px] md:py-[100px] lg:flex-row">
        <div className="">
          <div className="mb-8">
            <Link
              to={PAGE_LINKS.HOME}
              className="flex items-center text-[#54585A] hover:text-gray-900"
              // onClick={() => navigate(-1)}
            >
              <MoveLeft className="mr-2 h-5 w-5" />
              Back
            </Link>
          </div>
          <h1 className="text-xl font-bold leading-8 md:text-[2.5rem] md:leading-[4rem]">
            Sign in to <br /> OOROOREE DIGITAL
          </h1>

          <p className="mt-8 max-w-[180px] text-xs font-medium leading-4 md:mt-[102px] md:max-w-[276px] md:text-xl md:leading-8">
            If you don’t have an account you can{" "}
            <Link
              to={PAGE_LINKS.SIGNUP}
              className="cursor-pointer font-semibold text-[#377CEE]"
            >
              Register here!
            </Link>
          </p>
        </div>

        <div className="grid grid-cols-1 md:mt-20 md:grid-cols-2 lg:mt-0">
          <img
            src="/login_bg.png"
            alt="login-bg"
            className="mt-9 w-full px-6 md:max-w-[500px]"
          />

          <div className="mx-auto w-full flex-shrink-0 lg:max-w-[320px]">
            <h2 className="mt-14 text-center text-xl font-bold text-[#333333] md:text-start md:text-[1.5rem]">
              Welcome back !
            </h2>
            <form onSubmit={handleSubmit} className="mt-8">
              <div
                className={`relative flex w-full items-center gap-[6px] rounded-full border bg-white px-4 py-3 ${
                  errors.email ? "border-red-500" : "border-gray-300"
                } `}
              >
                <svg
                  width="21"
                  height="20"
                  viewBox="0 0 21 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g opacity="0.3">
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M1.67383 4.30754L2.28886 3.6925H18.2798L18.8948 4.30754V15.3782L18.2798 15.9932H2.28886L1.67383 15.3782V4.30754ZM2.9039 5.58066V14.7631H17.6647V5.58189L10.6656 10.9499H9.91529L2.9039 5.58066ZM16.4716 4.92257H4.09706L10.2843 9.68171L16.4716 4.92257Z"
                      fill="#333333"
                    />
                  </g>
                </svg>

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
                  errors.email ? "border-red-500" : "border-gray-300"
                } ${errors.password ? "mt-7" : "mt-3"} `}
              >
                <svg
                  width="21"
                  height="20"
                  viewBox="0 0 21 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g opacity="0.3">
                    <path
                      d="M16.8444 10.1653C16.8444 9.26079 16.1088 8.52521 15.2043 8.52521H14.3842V6.06507C14.3842 3.80421 12.5449 1.96484 10.284 1.96484C8.02313 1.96484 6.18377 3.80421 6.18377 6.06507V8.52521H5.36372C4.45921 8.52521 3.72363 9.26079 3.72363 10.1653V16.7257C3.72363 17.6302 4.45921 18.3658 5.36372 18.3658H15.2043C16.1088 18.3658 16.8444 17.6302 16.8444 16.7257V10.1653ZM7.82386 6.06507C7.82386 4.70872 8.92765 3.60494 10.284 3.60494C11.6404 3.60494 12.7441 4.70872 12.7441 6.06507V8.52521H7.82386V6.06507Z"
                      fill="#333333"
                    />
                  </g>
                </svg>

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
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5" />
                  ) : (
                    <Eye className="h-5 w-5" />
                  )}
                </button>
                {errors.password && (
                  <p className="absolute bottom-full pb-1 text-xs text-red-500">
                    {errors.password}
                  </p>
                )}
              </div>

              <button
                type="submit"
                className={`mt-3 w-full rounded-full px-4 py-[14px] text-white ${isPending ? "bg-[#ff9100b2]" : "bg-primary"}`}
                disabled={isPending}
              >
                Login
              </button>
            </form>

            <div className="flex items-center justify-around text-xs text-[#333333]">
              <div className="mt-4 text-xs text-[#333333] underline hover:text-[#377CEE]">
                <Link to={PAGE_LINKS.FORGOT_PASSWORD}>Forgot Password</Link>
              </div>

              <div className="mt-4 text-xs text-[#333333] underline hover:text-[#377CEE]">
                <Link to={PAGE_LINKS.EMAIL_VERIFICATION}>Email Verify</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
