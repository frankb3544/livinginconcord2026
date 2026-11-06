import { useQuery } from "@tanstack/react-query";
import { getMarketReportsList } from "../endpoints/market-reports/list_GET.schema";

export const useMarketData = () => {
  return useQuery({
    queryKey: ["marketData"],
    queryFn: () => getMarketReportsList(),
  });
};