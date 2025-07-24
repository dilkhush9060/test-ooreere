import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Plus,
  Edit3,
  Users,
  Monitor,
  Zap,
  Settings,
  IndianRupee,
} from "lucide-react";
import {Input} from "../ui/input";
import {useEffect, useState} from "react";
import {Button} from "../ui/Button";
import {CreatePlans} from "@/hooks/mutation/CreatePlansMutation";
import toast from "react-hot-toast";
import {querryClient} from "@/utils/querryClient";
import {GetPlansId} from "@/hooks/querry/Plans";
import {UpdatePlan} from "@/hooks/mutation/UpdatePlansMutation";
import {AxiosError} from "axios";

interface PlanData {
  name?: string;
  price?: string;
  slot?: string;
  led: string;
  ads: string;
  crowd: string;
  update: string;
}

interface FormErrors {
  name?: string;
  price?: string;
  slot?: string;
  led?: string;
  ads?: string;
  crowd?: string;
  update?: string;
}

export default function AddAndEditPrice(data: {id?: string}) {
  const {data: plans} = GetPlansId(data?.id || "6778e8d17d123195fe65d45c");

  const [formData, setFormData] = useState<PlanData>({
    name: "",
    price: "",
    led: "",
    slot: "",
    ads: "",
    crowd: "",
    update: "Update free",
  });

  useEffect(() => {
    if (plans?.data) {
      setFormData({
        name: plans?.data?.name,
        price: plans?.data?.price,
        led: plans?.data?.features[1],
        slot: plans?.data?.slots,
        ads: plans?.data?.features[0],
        crowd: plans?.data?.features[2],
        update: plans?.data?.features[3] || "Update free",
      });
    }
  }, [plans?.data]);

  const [open, setOpen] = useState(false);
  const [errors, setErrors] = useState<FormErrors>({});

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.name?.trim()) {
      newErrors.name = "Plan name is required";
    }

    if (!formData.price?.trim()) {
      newErrors.price = "Price is required";
    }

    if (!formData.slot?.trim()) {
      newErrors.slot = "Slot information is required";
    }

    if (!formData.led?.trim()) {
      newErrors.led = "LED ads per day is required";
    }

    if (!formData.ads?.trim()) {
      newErrors.ads = "Daily ads count is required";
    }

    if (!formData.crowd?.trim()) {
      newErrors.crowd = "Crowd reach data is required";
    }

    if (!formData.update?.trim()) {
      newErrors.update = "Update option is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
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

  const {mutate, isPending} = CreatePlans({
    onError: (error: Error) => {
      if (error instanceof AxiosError) {
        toast.error(error?.response?.data?.message || "An error occurred");
      }
    },
    onSuccess: (data: {message: string}) => {
      toast.success(data?.message);
      querryClient.invalidateQueries({
        queryKey: ["plans"],
      });
      setOpen(false);
      // Reset form
      setFormData({
        name: "",
        price: "",
        led: "",
        slot: "",
        ads: "",
        crowd: "",
        update: "Update free",
      });
    },
  });

  const {mutate: updateMutate, isPending: updatePending} = UpdatePlan(
    data?.id,
    {
      onError: (error: Error) => {
        if (error instanceof AxiosError) {
          toast.error(error?.response?.data?.message || "An error occurred");
        }
      },
      onSuccess: (datas: {message: string}) => {
        toast.success(datas?.message);
        querryClient.invalidateQueries({
          queryKey: ["plans"],
        });
        setOpen(false);
      },
    }
  );

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (validateForm()) {
      try {
        const features = [];
        features.push(
          formData.ads,
          formData.led,
          formData.crowd,
          formData.update
        );

        if (data?.id) {
          await updateMutate({
            id: data?.id,
            name: formData.name,
            price: formData.price,
            slot: formData.slot,
            features,
          });
          return;
        }

        mutate({
          name: formData.name,
          price: formData.price,
          slot: formData.slot,
          features,
        });
      } catch (error) {
        if (error instanceof AxiosError) {
          toast.error(error.response?.data?.message || "An error occurred");
        }
      }
    }
  };

  return (
    <>
      <Dialog open={open} onOpenChange={setOpen}>
        <div
          className={
            data?.id
              ? "cursor-pointer overflow-hidden rounded-lg hover:text-gray-200"
              : "hover:border-blue-400 hover:from-blue-50 group relative flex h-[40rem] w-80 cursor-pointer items-center justify-center gap-3 rounded-2xl border-2 border-dashed shadow-lg transition-all duration-300 hover:shadow-xl"
          }
          onClick={() => setOpen(true)}
        >
          <div className="flex items-center justify-center gap-3">
            {data?.id ? (
              <>Update</>
            ) : (
              <>
                <div className="rounded-full bg-white p-3 shadow-md transition-shadow group-hover:shadow-lg">
                  <Plus size={32} className="text-blue-600" />
                </div>
                <div className="text-center">
                  <h1 className="group-hover:text-blue-600 text-2xl font-bold text-gray-700 transition-colors">
                    Add New Plan
                  </h1>
                  <p className="mt-1 text-sm text-gray-500">
                    Create a new pricing plan
                  </p>
                </div>
              </>
            )}
          </div>
        </div>

        <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-[500px]">
          <DialogHeader className="space-y-3">
            <DialogTitle className="flex items-center gap-2 text-2xl font-bold text-gray-800">
              {data?.id ? (
                <>
                  <Edit3 size={24} className="text-blue-600" />
                  Update Plan
                </>
              ) : (
                <>
                  <Plus size={24} className="text-blue-600" />
                  Add New Plan
                </>
              )}
            </DialogTitle>
            <DialogDescription className="text-gray-600">
              {data?.id
                ? "Modify your existing plan details and features"
                : "Create a new pricing plan with custom features and pricing"}
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={handleSubmit} className="mt-6 space-y-6">
            {/* Plan Name */}
            <div className="space-y-2">
              <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
                <Settings size={16} />
                Plan Name
              </label>
              <Input
                id="name"
                name="name"
                type="text"
                placeholder="Enter plan name (e.g., Basic Plan)"
                className="focus:border-blue-500 focus:ring-blue-100 h-12 rounded-xl border-2 border-gray-200 px-4 transition-all focus:ring-2"
                value={formData.name}
                onChange={handleChange}
              />
              {errors.name && (
                <span className="flex items-center gap-1 text-sm text-red-500">
                  <span className="h-1 w-1 rounded-full bg-red-500"></span>
                  {errors.name}
                </span>
              )}
            </div>

            {/* Price */}
            <div className="space-y-2">
              <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
                <IndianRupee size={16} />
                Price
              </label>
              <Input
                id="price"
                name="price"
                type="text"
                placeholder="Enter price in number (e.g., 1500)"
                className="focus:border-blue-500 focus:ring-blue-100 h-12 rounded-xl border-2 border-gray-200 px-4 transition-all focus:ring-2"
                value={formData.price}
                onChange={handleChange}
              />
              {errors.price && (
                <span className="flex items-center gap-1 text-sm text-red-500">
                  <span className="h-1 w-1 rounded-full bg-red-500"></span>
                  {errors.price}
                </span>
              )}
            </div>

            {/* Slot */}
            <div className="space-y-2">
              <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
                <Settings size={16} />
                Slot Information
              </label>
              <Input
                id="slot"
                name="slot"
                type="text"
                placeholder="Enter slot details"
                className="focus:border-blue-500 focus:ring-blue-100 h-12 rounded-xl border-2 border-gray-200 px-4 transition-all focus:ring-2"
                value={formData.slot}
                onChange={handleChange}
              />
              {errors.slot && (
                <span className="flex items-center gap-1 text-sm text-red-500">
                  <span className="h-1 w-1 rounded-full bg-red-500"></span>
                  {errors.slot}
                </span>
              )}
            </div>

            {/* LED Ads */}
            <div className="space-y-2">
              <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
                <Monitor size={16} />
                LED Ads per Day
              </label>
              <Input
                id="led"
                name="led"
                type="text"
                placeholder="e.g., 4 ads / day / LED"
                className="focus:border-blue-500 focus:ring-blue-100 h-12 rounded-xl border-2 border-gray-200 px-4 transition-all focus:ring-2"
                value={formData.led}
                onChange={handleChange}
              />
              {errors.led && (
                <span className="flex items-center gap-1 text-sm text-red-500">
                  <span className="h-1 w-1 rounded-full bg-red-500"></span>
                  {errors.led}
                </span>
              )}
            </div>

            {/* Daily Ads */}
            <div className="space-y-2">
              <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
                <Zap size={16} />
                Daily Ads Count
              </label>
              <Input
                id="ads"
                name="ads"
                type="text"
                placeholder="e.g., 40 ads / day"
                className="focus:border-blue-500 focus:ring-blue-100 h-12 rounded-xl border-2 border-gray-200 px-4 transition-all focus:ring-2"
                value={formData.ads}
                onChange={handleChange}
              />
              {errors.ads && (
                <span className="flex items-center gap-1 text-sm text-red-500">
                  <span className="h-1 w-1 rounded-full bg-red-500"></span>
                  {errors.ads}
                </span>
              )}
            </div>

            {/* Crowd Reach */}
            <div className="space-y-2">
              <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
                <Users size={16} />
                Crowd Reach
              </label>
              <Input
                id="crowd"
                name="crowd"
                type="text"
                placeholder="e.g., 30k crowd reach"
                className="focus:border-blue-500 focus:ring-blue-100 h-12 rounded-xl border-2 border-gray-200 px-4 transition-all focus:ring-2"
                value={formData.crowd}
                onChange={handleChange}
              />
              {errors.crowd && (
                <span className="flex items-center gap-1 text-sm text-red-500">
                  <span className="h-1 w-1 rounded-full bg-red-500"></span>
                  {errors.crowd}
                </span>
              )}
            </div>

            {/* Update Option */}
            <div className="space-y-2">
              <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
                <Settings size={16} />
                Update Options
              </label>
              <select
                id="update"
                name="update"
                className="focus:border-blue-500 focus:ring-blue-100 h-12 w-full rounded-xl border-2 border-gray-200 bg-white px-4 text-gray-900 transition-all focus:outline-none focus:ring-2"
                value={formData.update}
                onChange={handleChange}
              >
                <option value="" disabled>
                  Select update option
                </option>
                <option value="Update free">Update free</option>
                <option value="No updates">No updates</option>
              </select>
              {errors.update && (
                <span className="flex items-center gap-1 text-sm text-red-500">
                  <span className="h-1 w-1 rounded-full bg-red-500"></span>
                  {errors.update}
                </span>
              )}
            </div>

            <div className="flex gap-3 pt-4">
              <Button
                type="button"
                variant="destructive"
                onClick={() => setOpen(false)}
                className="h-12 flex-1 rounded-xl border-2"
              >
                Cancel
              </Button>

              {/* <button onClick={onClick} className={cn("", buttonClasssName)}>
                {buttonText}
              </button> */}
              <Button
                type="submit"
                disabled={data?.id ? updatePending : isPending}
                className="bg-blue-600 hover:bg-blue-700 h-12 w-full flex-1 rounded-xl bg-[#FFA734] px-3 text-center font-bold text-white transition-colors disabled:cursor-not-allowed disabled:opacity-50"
              >
                {(data?.id ? updatePending : isPending) ? (
                  <div className="flex items-center gap-2">
                    <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
                    {data?.id ? "Updating..." : "Creating..."}
                  </div>
                ) : data?.id ? (
                  "Update Plan"
                ) : (
                  "Create Plan"
                )}
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
}
