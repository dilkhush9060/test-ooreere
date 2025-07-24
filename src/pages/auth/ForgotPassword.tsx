/* eslint-disable @typescript-eslint/no-explicit-any */
import {useState, ChangeEvent, FormEvent} from "react";
import {MoveLeft} from "lucide-react";
import {useMutation} from "@tanstack/react-query";
import {Api} from "../../utils/axios";
import toast from "react-hot-toast";
import {Link, useNavigate} from "react-router";

interface FormData {
  email: string;
}

interface FormErrors {
  email?: string;
}

export default function ForgotPassword(): JSX.Element {
  const [formData, setFormData] = useState<FormData>({
    email: "",
  });
  const navigate = useNavigate();
  const [errors, setErrors] = useState<FormErrors>({});

  const handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
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

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Please enter a valid email";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const {mutate, isPending} = useMutation({
    mutationKey: ["ForgotPassword"],
    mutationFn: async (data: FormData) => {
      return Api.post("/auth/password/forget", data).then((res) => res.data);
    },

    onError: (error: any) => {
      toast.error(error?.response?.data?.message);
    },
    onSuccess: (data: any) => {
      toast.success(data?.message);

      navigate("/reset-password");
    },
  });

  const handleSubmit = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    if (validateForm()) {
      mutate(formData);
    }
  };

  return (
    <div className="justify-between bg-gradient-to-r from-[#FFF7EB] to-white">
      <div className="mx-auto flex min-h-screen max-w-screen-xl flex-col px-6 py-14 md:grid md:grid-cols-2">
        <div className="flex h-full items-center justify-center">
          <img
            src="/pass-rest.png"
            className="w-full object-contain md:max-w-[500px]"
          />
        </div>

        <div className="flex flex-shrink-0 flex-col items-center justify-center">
          <h2 className="mt-14 text-center text-xl font-bold text-[#333333] md:text-start md:text-[1.5rem]">
            Forgot your password ?
          </h2>

          <p className="my-4 text-center text-xs leading-4 text-[#979DA3]">
            Enter your email so that we can send you password reset link
          </p>

          <form
            onSubmit={handleSubmit}
            className="mt-2 w-full space-y-6 px-4 md:max-w-[400px]"
          >
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

            <button
              type="submit"
              className={`mt-3 w-full rounded-full px-4 py-[14px] text-white ${isPending ? "bg-[#ff9100b2]" : "bg-primary"}`}
              disabled={isPending}
            >
              Send email
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
