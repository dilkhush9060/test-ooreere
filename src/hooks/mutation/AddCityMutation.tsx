import {Api} from "@/utils/axios";
import {MutationOptions, useMutation} from "@tanstack/react-query";

export const AddCityMutation = <TData, TVariables>(options?: MutationOptions<TData, Error, TVariables>) => {
    
  return useMutation({
    mutationFn: async (data: TVariables) => {
      const res = await Api.post("/city/add", data);
      return res.data;
    },

    ...options
  });

}
