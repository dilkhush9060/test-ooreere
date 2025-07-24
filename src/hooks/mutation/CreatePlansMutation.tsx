import {Api} from "@/utils/axios";
import {MutationOptions, useMutation} from "@tanstack/react-query";

export const CreatePlans = <TData, TVariables>(
  options?: MutationOptions<TData, Error, TVariables>
) => {
  return useMutation({
    mutationFn: async (data: TVariables) => {
      console.log("Creating plan with data:", data);
      const res = await Api.post("/plan/add", data);
      return res.data;
    },

    ...options,
  });
};
