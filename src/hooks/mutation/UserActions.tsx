import {Api} from "@/utils/axios";
import {querryClient} from "@/utils/querryClient";
import {useMutation} from "@tanstack/react-query";
import {AxiosError} from "axios";
import toast from "react-hot-toast";

export const useSuspendUser = () => {
  return useMutation({
    mutationFn: async (userId: string) => {
      const res = await Api.patch(`/user/suspend/${userId}`);
      return res.data;
    },
    onError: (error) => {
      if (error instanceof AxiosError) {
        toast.error(
          error?.response?.data?.message || "Failed to update user status"
        );
      } else {
        toast.error("An unexpected error occurred");
      }
    },
    onSuccess: (data: {message: string}) => {
      toast.success(data?.message || "User status updated successfully");
      // Invalidate and refetch user data
      querryClient.invalidateQueries({
        queryKey: ["users"], // Adjust this to match your users query key
      });
    },
  });
};
