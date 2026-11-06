import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getMarketReportsList } from "../endpoints/market-reports/list_GET.schema";
import { postCreateMarketData } from "../endpoints/admin/market-data/create_POST.schema";
import { postUpdateMarketData } from "../endpoints/admin/market-data/update_POST.schema";
import { postDeleteMarketData } from "../endpoints/admin/market-data/delete_POST.schema";

export const useAdminMarketData = () => {
  const queryClient = useQueryClient();

  const marketDataQuery = useQuery({
    queryKey: ["admin", "marketData"],
    queryFn: () => getMarketReportsList(),
    placeholderData: (prev) => prev,
  });

  const createMutation = useMutation({
    mutationFn: postCreateMarketData,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin", "marketData"] });
      queryClient.invalidateQueries({ queryKey: ["marketData"] });
    },
  });

  const updateMutation = useMutation({
    mutationFn: postUpdateMarketData,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin", "marketData"] });
      queryClient.invalidateQueries({ queryKey: ["marketData"] });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: postDeleteMarketData,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin", "marketData"] });
      queryClient.invalidateQueries({ queryKey: ["marketData"] });
    },
  });

  return {
    marketDataQuery,
    createMutation,
    updateMutation,
    deleteMutation,
  };
};