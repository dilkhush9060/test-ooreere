import {Api} from "@/utils/axios";
import {querryClient} from "@/utils/querryClient";
import {useMutation} from "@tanstack/react-query";
import {AxiosError} from "axios";
import toast from "react-hot-toast";

export const UploadVideoMution = (planId: string) => {
  return useMutation({
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    mutationFn: async (data:any) => {
      const res = await Api.post(
        "/video/add",

        data,

        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      return res.data;
    },

    onError: (error) => {
      if (error instanceof AxiosError) {
        toast.error(error?.message);
      } else {
        toast.error("An unexpected error occurred");
      }
    },
    onSuccess: (data: {message: string}) => {
      toast.success(data?.message);

      querryClient.invalidateQueries({
        queryKey: ["My single video", planId],
      });
    },
  });
};
