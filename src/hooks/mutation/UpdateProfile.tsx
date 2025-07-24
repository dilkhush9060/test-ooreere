// import {AuthStore} from "@/store/auth";
import {Api} from "@/utils/axios";
// import {querryClient} from "@/utils/querryClient";
import {MutationOptions, useMutation} from "@tanstack/react-query";
// import toast from "react-hot-toast";

// export const ProfileImageUpdate = () => {
//   const updateUserPicture = AuthStore((state) => state.updateUserPicture);

//   return useMutation({
//     mutationFn: async (data: {image: File}) => {
//       const res = await Api.patch("/profile/picture/update", data, {
//         headers: {"Content-Type": "multipart/form-data"},
//       });
//       return res.data;
//     },

//     onError: (error) => {
//       if (error instanceof Error) {
//         toast.error(error?.message || "An unexpected error occurred");
//       } else {
//         toast.error("An unexpected error occurred");
//       }
//     },
//     onSuccess: (data: {
//       message: string;
//       data?: {
//         picture?: string;
//       };
//       picture?: string;
//       user?: {
//         picture?: string;
//       };
//     }) => {
//       toast.success(data?.message);

//       const pictureUrl =
//         data?.data?.picture || data?.picture || data?.user?.picture;

//       if (pictureUrl) {
//         updateUserPicture(pictureUrl);
//       } else {
//         console.warn("No picture URL found in response");
//       }

//       querryClient.invalidateQueries({
//         queryKey: ["profile"],
//       });
//     },
//   });
// };

export const ProfileImageUpdate = <TData, TVariables>(
  options?: MutationOptions<TData, Error, TVariables>
) => {
  return useMutation({
    mutationFn: async (data: TVariables) => {
      const res = await Api.patch("/profile/picture/update", data, {
        headers: {"Content-Type": "multipart/form-data"},
      });
      return res.data;
    },
    ...options,
  });
};
