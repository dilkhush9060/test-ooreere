import {Api} from "@/utils/axios";
import {useQuery} from "@tanstack/react-query";
import {AxiosError} from "axios";
import toast from "react-hot-toast";

export const GetProfile = () => {
  return useQuery({
    queryKey: ["profile"],
    queryFn: async () => {
      try {
        const res = await Api.get("/profile/get");
        return res.data;
      } catch (err) {
        if (err instanceof AxiosError) {
          toast.error(err.response?.data?.message || "Error fetching profile");
        } else {
          toast.error("An unexpected error ");
        }
        return undefined; // or handle the error appropriately
      }
    },
    refetchOnWindowFocus: false,
    staleTime: Infinity,
  });
};
