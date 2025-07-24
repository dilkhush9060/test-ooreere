import ProfileImage from "@/components/modal/ProfileImage";
import {Button} from "@/components/ui/Button";
import {Input} from "@/components/ui/input";
import {Label} from "@/components/ui/label";
import Loader from "@/components/ui/Loader";
import {useUpdateProfile} from "@/hooks/mutation/ProfileMutation";
import {GetProfile} from "@/hooks/querry/Profile";
import {useState, useEffect} from "react";
import Avatar from "react-avatar";

interface ProfileData {
  name: string;
  email: string;
  gstnumber: string;
  companyname: string;
}

interface ProfileResponse {
  profile?: {
    name?: string;
    email?: string;
    gstnumber?: string;
    companyname?: string;
    picture?: string;
  };
}

interface FormErrors {
  name?: string;
  email?: string;
  gstnumber?: string;
  companyname?: string;
}

export default function Profile() {
  const {data, isLoading} = GetProfile() as {
    data: ProfileResponse | undefined;
    isLoading: boolean;
  };

  const [formData, setFormData] = useState<ProfileData>({
    name: "",
    email: "",
    gstnumber: "",
    companyname: "",
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // console.log(data?.profile);

  useEffect(() => {
    if (data?.profile) {
      setFormData({
        name: data.profile.name || "",
        email: data.profile.email || "",
        gstnumber: data.profile.gstnumber || "",
        companyname: data.profile.companyname || "",
      });
    }
  }, [data]);

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Invalid email format";
    }

    if (!formData.gstnumber.trim()) {
      newErrors.gstnumber = "GST number is required";
    }

    if (!formData.companyname.trim()) {
      newErrors.companyname = "Company name is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {name, value} = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    // Clear error when user starts typing
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const {mutate, isPending} = useUpdateProfile();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    if (validateForm()) {
      try {
        // Here you would typically make an API call to update the profile

        mutate(formData);

        // Reset form state after successful submission
      } catch (error) {
        console.error("Error submitting form:", error);
      }
    }

    setIsSubmitting(false);
  };

  const handleCancel = () => {
    // Reset form to original data
    if (data?.profile) {
      setFormData({
        name: data.profile.name || "",
        email: data.profile.email || "",
        gstnumber: data.profile.gstnumber || "",
        companyname: data.profile.companyname || "",
      });
    }
    setErrors({});
  };

  if (isLoading)
    return (
      <div className="flex min-h-screen items-center justify-center">
        <Loader />
      </div>
    );

  return (
    <section className="mx-auto min-h-screen max-w-7xl p-4">
      <form onSubmit={handleSubmit} className="flex flex-col gap-4 space-y-4">
        <div className="group relative flex w-max items-center justify-center rounded-full md:justify-start">
          <Avatar
            src={data?.profile?.picture}
            name={data?.profile?.name || ""}
            size="100"
            round={true}
            className="rounded-full object-cover"
          />
          <div className="absolute inset-0 z-10 hidden cursor-pointer items-center justify-center rounded-full bg-black/50 text-white group-hover:flex">
            <ProfileImage />
          </div>
        </div>
        <div className="mt-4 grid grid-cols-1 gap-6 md:grid-cols-2">
          <div>
            <Label htmlFor="name">Full Name</Label>
            <Input
              id="name"
              name="name"
              type="text"
              placeholder="Name"
              className="rounded-full p-6"
              value={formData.name}
              onChange={handleChange}
            />
            {errors.name && (
              <span className="mt-1 text-sm text-red-500">{errors.name}</span>
            )}
          </div>

          <div>
            <Label htmlFor="email">E-mail</Label>
            <Input
              id="email"
              name="email"
              type="email"
              placeholder="xxxx@gmail.com"
              className="rounded-full p-6"
              value={formData.email}
              onChange={handleChange}
            />
            {errors.email && (
              <span className="mt-1 text-sm text-red-500">{errors.email}</span>
            )}
          </div>

          <div>
            <Label htmlFor="gstnumber">GST Number</Label>
            <Input
              id="gstnumber"
              name="gstnumber"
              type="text"
              placeholder="240xxxxx"
              className="rounded-full p-6"
              value={formData.gstnumber}
              onChange={handleChange}
            />
            {errors.gstnumber && (
              <span className="mt-1 text-sm text-red-500">{errors.gstnumber}</span>
            )}
          </div>

          <div>
            <Label htmlFor="companyname">Company Name</Label>
            <Input
              id="companyname"
              name="companyname"
              type="text"
              placeholder="XYZ"
              className="rounded-full p-6"
              value={formData.companyname}
              onChange={handleChange}
            />
            {errors.companyname && (
              <span className="mt-1 text-sm text-red-500">
                {errors.companyname}
              </span>
            )}
          </div>

          <div className="flex justify-around gap-4 md:justify-start">
            <Button
              type="button"
              className="rounded-full bg-white text-black"
              onClick={handleCancel}
              disabled={isSubmitting}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="rounded-full p-4"
              disabled={isPending}
            >
              {isPending ? "Saving..." : "Save"}
            </Button>
          </div>
        </div>
      </form>
    </section>
  );
}
