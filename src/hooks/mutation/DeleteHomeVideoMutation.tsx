/* eslint-disable @typescript-eslint/no-explicit-any */
import {ErrorResponse, SuccessResponse} from "@/types/IResponse";
import {Api} from "@/utils/axios";
import {useMutation, useQueryClient} from "@tanstack/react-query";
import toast from "react-hot-toast";

export const DeleteHomeVideoMutation = () => {
  const querryClient = useQueryClient();
  return useMutation<SuccessResponse, ErrorResponse, string>({
    mutationFn: async () => {
      const res = await Api.delete(`/video/home/remove`);
      return res.data;
    },

    onError: (error: ErrorResponse) => {
      toast.error(error?.response?.data?.message);
    },
    onSuccess: (data: SuccessResponse) => {
      toast.success(data?.message);
      window.location.reload();

      querryClient.invalidateQueries({
        queryKey: ["Home-video"],
      });
    },
  });
};
