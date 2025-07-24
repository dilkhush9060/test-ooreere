import {Api} from "@/utils/axios";
import {useQuery} from "@tanstack/react-query";

export const GetMyvideos = (id: string) => {
  return useQuery({
    queryKey: ["My single video", id],
    queryFn: async () => {
      const res = await Api.get(`/video/subs/${id}`);
      return res.data?.data;
    },

    refetchOnWindowFocus: false,
    staleTime: 1000 * 24 * 60 * 60, // 24 hours
    retry: false,
  });
};
