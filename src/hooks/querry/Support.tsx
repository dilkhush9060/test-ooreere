import {Api} from "@/utils/axios";
import {useQuery} from "@tanstack/react-query";
import {AxiosError} from "axios";
// import toast from "react-hot-toast";

export const GetTicket = () => {
  return useQuery({
    queryKey: ["my tickets"],
    queryFn: async () => {
      try {
        const res = await Api.get("/ticket/my");
        console.log("Tickets data:", res.data);
        return res.data;
      } catch (err) {
        if (err instanceof AxiosError) {
          // toast.error(err.response?.data?.message || "Error fetching tickets");
          return null;
        }
        return undefined; // or handle the error appropriately
      }
    },
    refetchOnWindowFocus: false,
    staleTime: Infinity,
  });
};

export const GetAllTicket = () => {
  return useQuery({
    queryKey: ["all-tickets"],
    queryFn: async () => {
      try {
        const res = await Api.get("/ticket/all");
        console.log("All tickets data:", res.data);
        return res.data;
      } catch (err) {
        if (err instanceof AxiosError) {
          // toast.error(err.response?.data?.message || "Error fetching tickets");
          return null;
        }
        return undefined; // or handle the error appropriately
      }
    },
    refetchOnWindowFocus: false,
    staleTime: Infinity,
  });
};
