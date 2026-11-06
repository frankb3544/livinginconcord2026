import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getTestimonialsList } from "../endpoints/testimonials/list_GET.schema";
import { postCreateTestimonial } from "../endpoints/admin/testimonials/create_POST.schema";
import { postUpdateTestimonial } from "../endpoints/admin/testimonials/update_POST.schema";
import { postDeleteTestimonial } from "../endpoints/admin/testimonials/delete_POST.schema";

export const useAdminTestimonials = () => {
  const queryClient = useQueryClient();

  const testimonialsQuery = useQuery({
    queryKey: ["admin", "testimonials"],
    queryFn: () => getTestimonialsList(),
    placeholderData: (prev) => prev,
  });

  const createMutation = useMutation({
    mutationFn: postCreateTestimonial,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin", "testimonials"] });
      queryClient.invalidateQueries({ queryKey: ["testimonials"] });
    },
  });

  const updateMutation = useMutation({
    mutationFn: postUpdateTestimonial,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin", "testimonials"] });
      queryClient.invalidateQueries({ queryKey: ["testimonials"] });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: postDeleteTestimonial,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin", "testimonials"] });
      queryClient.invalidateQueries({ queryKey: ["testimonials"] });
    },
  });

  return {
    testimonialsQuery,
    createMutation,
    updateMutation,
    deleteMutation,
  };
};