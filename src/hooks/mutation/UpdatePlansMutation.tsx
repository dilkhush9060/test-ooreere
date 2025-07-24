import {Api} from "@/utils/axios";
import {MutationOptions, useMutation} from "@tanstack/react-query";

export const UpdatePlan = <TData, TVariables>(
  id?: string,
  options?: MutationOptions<TData, Error, TVariables>
) => {
  return useMutation({
    mutationFn: async (data: TVariables) => {
      const res = await Api.patch(`/plan/update/${id}`, data);
      return res.data;
    },

    ...options,
  });
};
