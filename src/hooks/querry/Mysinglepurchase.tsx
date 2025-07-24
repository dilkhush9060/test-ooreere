import {Api} from "@/utils/axios";
import {useQuery} from "@tanstack/react-query";

export const GetSingleplan = (id: string) => {
  return useQuery({
    queryKey: ["single purchase", id],
    queryFn: async () => {
      const res = await Api.get(`/subscription/get/${id}`);
      return res.data?.data;
    },

    refetchOnWindowFocus: false,
    staleTime: Infinity,
  });
};
