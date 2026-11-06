import { useQuery } from "@tanstack/react-query";
import { getTestimonialsList } from "../endpoints/testimonials/list_GET.schema";

export const useTestimonials = () => {
  return useQuery({
    queryKey: ["testimonials"],
    queryFn: () => getTestimonialsList(),
  });
};