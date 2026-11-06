import { useMutation } from "@tanstack/react-query";
import { postContactSubmit, InputType } from "../endpoints/contact/submit_POST.schema";

export const useSubmitContact = () => {
  return useMutation({
    mutationFn: (data: InputType) => postContactSubmit(data),
  });
};