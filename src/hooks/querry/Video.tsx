import {Api} from "@/utils/axios";
import {useQuery} from "@tanstack/react-query";

export const GetMypurchase = () => {
  return useQuery({
    queryKey: ["purchase"],
    queryFn: async () => {
      const res = await Api.get("/subscription/my");
      return res.data?.data;
    },

    refetchOnWindowFocus: false,
    staleTime: Infinity,
  });
};
