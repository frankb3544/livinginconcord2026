import { useMutation } from "@tanstack/react-query";
import { postMarketUpdateSignup, InputType } from "../endpoints/market-update/signup_POST.schema";

export const useMarketUpdateSignup = () => {
  return useMutation({
    mutationFn: (data: InputType) => postMarketUpdateSignup(data),
  });
};