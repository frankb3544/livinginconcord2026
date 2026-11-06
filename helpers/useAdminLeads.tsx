import { useQuery } from "@tanstack/react-query";
import { getLeadsList } from "../endpoints/admin/leads/list_GET.schema";

export const useAdminLeads = () => {
  const leadsQuery = useQuery({
    queryKey: ["admin", "leads"],
    queryFn: () => getLeadsList(),
    placeholderData: (prev) => prev,
  });

  return {
    leadsQuery,
  };
};