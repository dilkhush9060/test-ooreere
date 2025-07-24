import {Api} from "@/utils/axios";
import {useQuery} from "@tanstack/react-query";

export const GetHomeVideo = () => {
  return useQuery({
    queryKey: ["Home-video"],
    queryFn: async () => {
      const res = await Api.get("/video/home/get");
      return res.data?.data;
    },
    retry: false,
    refetchOnWindowFocus: false,
  });
};
