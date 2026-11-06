import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getSocialSettings } from "../endpoints/settings/social_GET.schema";
import { postUpdateSocialSettings } from "../endpoints/admin/settings/social/update_POST.schema";

export const useSocialLinks = () => {
  const queryClient = useQueryClient();

  const socialLinksQuery = useQuery({
    queryKey: ["socialLinks"],
    queryFn: () => getSocialSettings(),
    placeholderData: (prev) => prev,
  });

  const updateSocialLinksMutation = useMutation({
    mutationFn: postUpdateSocialSettings,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["socialLinks"] });
    },
  });

  return {
    socialLinksQuery,
    updateSocialLinksMutation,
  };
};