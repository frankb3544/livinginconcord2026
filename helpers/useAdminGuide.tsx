import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getGuideInfo } from "../endpoints/admin/guide/get_GET.schema";
import { postUploadGuide } from "../endpoints/admin/guide/upload_POST.schema";

export const ADMIN_GUIDE_QUERY_KEY = ["admin", "guide"] as const;

export const useAdminGuide = () => {
  const queryClient = useQueryClient();

  const guideInfoQuery = useQuery({
    queryKey: ADMIN_GUIDE_QUERY_KEY,
    queryFn: () => getGuideInfo(),
    placeholderData: (prev) => prev,
  });

  // The mutation sends a single chunk. The page is responsible for:
  // 1. Calling this for each chunk sequentially
  // 2. Invalidating the guide query after all chunks are uploaded
  const uploadMutation = useMutation({
    mutationFn: postUploadGuide,
  });

  const invalidateGuide = () => {
    queryClient.invalidateQueries({ queryKey: ADMIN_GUIDE_QUERY_KEY });
  };

  return {
    guideInfoQuery,
    uploadMutation,
    invalidateGuide,
  };
};