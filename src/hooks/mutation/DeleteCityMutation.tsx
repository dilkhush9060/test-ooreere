/* eslint-disable @typescript-eslint/no-explicit-any */
import {Api} from "@/utils/axios";
import {querryClient} from "@/utils/querryClient";
import {useMutation} from "@tanstack/react-query";
import {AxiosError} from "axios";
import toast from "react-hot-toast";

export const DeleteCityMutation = () => {
  return useMutation({
    mutationFn: async (id: string) => {
      const res = await Api.delete(`/city/delete/${id}`);
      return res.data;
    },

    onError: (error) => {
      if (error instanceof AxiosError) {
        toast.error(
          error?.response?.data?.message || "An unexpected error occurred"
        );
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
