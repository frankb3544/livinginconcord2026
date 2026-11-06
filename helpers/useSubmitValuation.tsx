import { useMutation } from "@tanstack/react-query";
import { postValuationSubmit, InputType } from "../endpoints/valuation/submit_POST.schema";

export const useSubmitValuation = () => {
  return useMutation({
    mutationFn: (data: InputType) => postValuationSubmit(data),
  });
};