import {Api} from "@/utils/axios";
import {useQuery} from "@tanstack/react-query";

export const GetAnalytics = () => {
  return useQuery({
    queryKey: ["Analytics"],
    queryFn: async () => {
      const res = await Api.get("/analytics");
      return res.data;
    },

    refetchOnWindowFocus: false,
    staleTime: Infinity,
  });
};

export const GetChartAnalytics = () => {
  return useQuery({
    queryKey: ["Chart Analytics"],
    queryFn: async () => {
      const res = await Api.get("/analytics/chart");
      return res.data;
    },

    refetchOnWindowFocus: false,
    staleTime: Infinity,
  });
};
