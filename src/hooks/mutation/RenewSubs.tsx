/* eslint-disable @typescript-eslint/no-explicit-any */
import {Api} from "@/utils/axios";
import {useMutation} from "@tanstack/react-query";
import {AxiosError} from "axios";

import toast from "react-hot-toast";

export const RenewSubs = () => {
  return useMutation({
    mutationFn: async (id: string) => {
      const res = await Api.post(`/subscription/renewed/${id}`, {});
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
    onSuccess: (data: {data: any; message: string}) => {
      toast.success(data?.message);
    },
  });
};
