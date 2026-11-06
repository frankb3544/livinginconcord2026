import { useMutation } from "@tanstack/react-query";
import { postGuideDownload, InputType } from "../endpoints/guide/download_POST.schema";

export const useGuideDownload = () => {
  return useMutation({
    mutationFn: (data: InputType) => postGuideDownload(data),
  });
};