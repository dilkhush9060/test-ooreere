import {Api} from "@/utils/axios";
import {querryClient} from "@/utils/querryClient";
import {MutationOptions, useMutation} from "@tanstack/react-query";
import {AxiosError} from "axios";
import toast from "react-hot-toast";

// export const CreateTicket = () => {
//   return useMutation({
//     mutationFn: async (data: {topic: string}) => {
//       const res = await Api.post(`/ticket`, data);
//       return res.data;
//     },

//     onError: (error) => {
//       if (error instanceof AxiosError) {
//         toast.error(
//           error?.response?.data?.message || "An unexpected error occurred"
//         );
//       } else {
//         toast.error("An unexpected error occurred");
//       }
//     },
//     onSuccess: (data: {message: string}) => {
//       toast.success(data?.message);
//       querryClient.invalidateQueries({
//         queryKey: ["tickets"],
//       });
//     },
//   });
// };

export const CreateTicket = <TData, TVariables>(
  options?: MutationOptions<TData, Error, TVariables>
) => {
  return useMutation({
    mutationFn: async (data: TVariables) => {
      const res = await Api.post(`/ticket`, data);
      return res.data;
    },

    ...options,
  });
};

export const DeleteTicket = () => {
  return useMutation({
    mutationFn: async (ticketId: string) => {
      const res = await Api.delete(`/ticket/${ticketId}`);
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
        queryKey: ["all-tickets"],
      });
    },
  });
};

export const MediaUpload = <TData, TVariables>(
  id: string,
  options?: MutationOptions<TData, Error, TVariables>
) => {
  console.log("MediaUpload called with ID:", id);
  return useMutation({
    mutationFn: async (data: TVariables) => {
      const res = await Api.post(`/ticket/media/${id}`, data, {
        headers: {"Content-Type": "multipart/form-data"},
      });
      return res.data;
    },
    ...options,
  });
};
