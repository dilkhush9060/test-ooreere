import {Api} from "@/utils/axios";
import {useMutation} from "@tanstack/react-query";
import {AxiosError} from "axios";
import toast from "react-hot-toast";

export const SendDeleteMutation = () => {
  return useMutation({
    mutationFn: async () => {
      const res = await Api.post("/profile/otp/delete", {});
      return res.data;
    },

    onError: (error) => {
      if (error instanceof AxiosError) {
        toast.error(
          error?.response?.data?.message || "An unexpected error occurred"
        );
      } else {
        toast.error("An unexpected error occurred");
      }
    },
    onSuccess: (data: {message: string}) => {
      toast.success(data?.message);
    },
  });
};
