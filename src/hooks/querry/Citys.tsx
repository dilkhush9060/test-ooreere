import {Api} from "@/utils/axios";
import {useQuery} from "@tanstack/react-query";
import {AxiosError} from "axios";
import toast from "react-hot-toast";

export const GetAllCitys = () => {
  return useQuery({
    queryKey: ["citys"],
    queryFn: async () => {
      try {
        const res = await Api.get("/city/list");
        return res.data;
      } catch (err) {
        if (err instanceof AxiosError) {
          toast.error(err?.response?.data?.message || "An unexpected error ");
        } else {
          toast.error("An unexpected error");
        }
        return undefined; // or handle the error appropriately
      }
    },

    refetchOnWindowFocus: false,
    staleTime: Infinity,
  });
};
