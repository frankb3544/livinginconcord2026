import { useQuery } from "@tanstack/react-query";
import { getNeighborhoodsList } from "../endpoints/neighborhoods/list_GET.schema";

export const useNeighborhoods = () => {
  return useQuery({
    queryKey: ["neighborhoods"],
    queryFn: () => getNeighborhoodsList(),
  });
};