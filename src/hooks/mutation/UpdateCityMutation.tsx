import {Api} from "@/utils/axios";
import {querryClient} from "@/utils/querryClient";
import {useMutation} from "@tanstack/react-query";
import {AxiosError} from "axios";
import toast from "react-hot-toast";

export const UpdateCityMutation = (id: string) => {
  return useMutation({
    mutationFn: async (data: {name: string}) => {
      const res = await Api.patch(`city/update/${id}`, data);
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
      querryClient.invalidateQueries({
        queryKey: ["citys"],
      });
    },
  });
};
