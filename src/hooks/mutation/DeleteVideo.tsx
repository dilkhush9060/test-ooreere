import {Api} from "@/utils/axios";
import {querryClient} from "@/utils/querryClient";
import {useMutation} from "@tanstack/react-query";
import {AxiosError} from "axios";
import toast from "react-hot-toast";

export const DeleteVideoMutation = (id: string) => {
  return useMutation({
    mutationFn: async (id) => {
      const res = await Api.delete(`/video/remove/${id}`);
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
        queryKey: ["My single video", id],
      });

      window.location.reload();
    },
  });
};
