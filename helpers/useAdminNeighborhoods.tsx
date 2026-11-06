import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getNeighborhoodsList } from "../endpoints/neighborhoods/list_GET.schema";
import { postUpdateNeighborhood } from "../endpoints/admin/neighborhoods/update_POST.schema";

export const useAdminNeighborhoods = () => {
  const queryClient = useQueryClient();

  const neighborhoodsQuery = useQuery({
    queryKey: ["admin", "neighborhoods"],
    queryFn: () => getNeighborhoodsList(),
    placeholderData: (prev) => prev,
  });

  const updateMutation = useMutation({
    mutationFn: postUpdateNeighborhood,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin", "neighborhoods"] });
      queryClient.invalidateQueries({ queryKey: ["neighborhoods"] });
    },
  });

  return {
    neighborhoodsQuery,
    updateMutation,
  };
};