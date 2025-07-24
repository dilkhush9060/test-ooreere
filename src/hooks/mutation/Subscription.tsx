import {Api} from "@/utils/axios";
import {querryClient} from "@/utils/querryClient";
import {useMutation} from "@tanstack/react-query";

// Declare Razorpay on the window object
declare global {
  interface Window {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    Razorpay: any;
  }
}

interface FormData {
  plan: string;
  city: string;
  months: string;
}
export const useHandleSubscription = () => {
  return useMutation({
    mutationKey: ["purchase"],
    mutationFn: async (data: FormData) =>
      Api.post("/subscription/purchase", {
        plan: data.plan,
        city: data.city,
        months: data.months,
      }),

    onSuccess() {
      querryClient.invalidateQueries({
        queryKey: ["citys"],
      });
    },
  });
};
