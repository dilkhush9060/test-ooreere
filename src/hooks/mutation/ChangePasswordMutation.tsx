import {Api} from "@/utils/axios";
import {useMutation} from "@tanstack/react-query";
import {AxiosError} from "axios";
import toast from "react-hot-toast";

// export const ChangePasswordMutation = () => {
//   return useMutation<
//     SuccessResponse,
//     ErrorResponse,
//     {oldpassword: string; newpassword: string}
//   >({
//     mutationFn: async (data: {oldpassword: string; newpassword: string}) => {
//       const res = await Api.patch("/auth/password/change", data);
//       return res.data;
//     },

//     onError: (error: ErrorResponse) => {
//       toast.error(error?.response?.data?.message || "something went wrong");
//     },
//     onSuccess: (data: SuccessResponse) => {
//       toast.success(data?.message);
//     },
//   });
// };

export const ChangePasswordMutation = () => {
  return useMutation({
    mutationFn: async (data: {oldpassword: string; newpassword: string}) => {
      const res = await Api.patch(`/auth/password/change`, data);
      return res.data;
    },

    onError: (error) => {
      if (error instanceof AxiosError) {
        toast.error(error?.response?.data?.message);
      }
    },
    onSuccess: (data: {message: string}) => {
      toast.success(data?.message);
    },
  });
};
