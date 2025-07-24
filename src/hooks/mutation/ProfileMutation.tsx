import {Api} from "@/utils/axios";
import {querryClient} from "@/utils/querryClient";
import {useMutation} from "@tanstack/react-query";
import { AxiosError } from "axios";
import toast from "react-hot-toast";

export const useUpdateProfile = () => {
  return useMutation({
    mutationFn: async (data: {
      name?: string;
      email?: string;
      phone?: string;
      companyname?: string;
      gstnumber?: string;
    }) => {
      const res = await Api.patch("/profile/update", data);
      return res.data;
    },

    onError: (error) => {
          if(error instanceof AxiosError) {
        toast.error(error?.message);
      }
      else {
        toast.error("An unexpected error occurred");
      }  
    },
    onSuccess: (data: {
      message: string;
    }) => {
      toast.success(data?.message);
      querryClient.invalidateQueries({
        queryKey: ["profile"],
      });
    },
  });
};
