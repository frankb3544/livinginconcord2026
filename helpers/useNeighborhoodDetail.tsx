import { useQuery } from "@tanstack/react-query";
import { getNeighborhoodDetail } from "../endpoints/neighborhoods/detail_GET.schema";

export const useNeighborhoodDetail = (slug: string) => {
  return useQuery({
    queryKey: ["neighborhoodDetail", slug],
    queryFn: () => getNeighborhoodDetail({ slug }),
    enabled: !!slug,
  });
};