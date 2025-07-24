import {Api} from "@/utils/axios";
import {querryClient} from "@/utils/querryClient";
import {useMutation} from "@tanstack/react-query";
import {AxiosError} from "axios";
import toast from "react-hot-toast";

export const HomeVideoMutation = () => {
  return useMutation({
    mutationFn: async (data: {video: File}) => {
      const res = await Api.post(
        "/video/home/add",

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
        queryKey: ["Home-video"],
      });
    },
  });
};
