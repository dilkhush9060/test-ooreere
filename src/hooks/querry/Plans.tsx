import {Api} from "@/utils/axios";
import {useQuery} from "@tanstack/react-query";

// export const GetPlans = () => {
//   return useQuery({
//     queryKey: ["plans"],
//     queryFn: async () => {
//       try {
//         const res = await Api.get("/profile/get");
//         return res.data;
//       } catch (err) {
//         console.log(err);
//         return undefined; // or handle the error appropriately
//       }
//     },
//     refetchOnWindowFocus: false,
//     staleTime: Infinity,
//   });
// };

export const GetPlansId = (id: string) => {
  return useQuery({
    queryKey: ["single-plan", id],
    queryFn: async () => {
      const res = await Api.get(`/plan/list/${id}`);
      return res.data;
    },
    staleTime: Infinity,
  });
};

export const GetAllPlans = () => {
  return useQuery({
    queryKey: ["plans"],
    queryFn: async () => {
      const res = await Api.get("/plan/list");
      return res.data;
    },
    staleTime: Infinity,
  });
};
