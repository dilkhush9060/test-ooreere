import {Api} from "@/utils/axios";
import {MutationOptions, useMutation} from "@tanstack/react-query";
// import {AxiosError} from "axios";
// import toast from "react-hot-toast";

// export const DeleteMutation = () => {
//   return useMutation({
//     mutationFn: async (data: {otp: string}) => {
//       const res = await Api.post("/profile/delete", {otp: data.otp});
//       return res.data;
//     },

//     onError: (error) => {
//       if (error instanceof AxiosError) {
//         toast.error(error?.response?.data?.message);
//       } else {
//         toast.error("An unexpected error occurred");
//       }
//     },

//     onSuccess: (data: {message: string}) => {
//       toast.success(data?.message);

//       window.location.href = "/signin";
//     },
//   });
// };

export const DeleteMutation = <TData, TVariables extends {otp: string}>(
  options?: MutationOptions<TData, Error, TVariables>
) => {
  return useMutation({
    mutationFn: async (data: TVariables) => {
      const res = await Api.post("/profile/delete", {otp: data.otp});
      return res.data;
    },
    ...options,
  });
};
