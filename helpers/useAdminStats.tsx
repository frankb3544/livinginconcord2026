import { useQuery } from "@tanstack/react-query";
import { getAdminStats } from "../endpoints/admin/stats_GET.schema";

export const useAdminStats = () => {
  const statsQuery = useQuery({
    queryKey: ["admin", "stats"],
    queryFn: () => getAdminStats(),
    placeholderData: (prev) => prev,
  });

  return {
    statsQuery,
  };
};