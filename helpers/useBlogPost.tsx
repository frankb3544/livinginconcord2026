import { useQuery } from "@tanstack/react-query";
import { getBlogDetail } from "../endpoints/blog/detail_GET.schema";

export const useBlogPost = (slug: string) => {
  return useQuery({
    queryKey: ["blogPost", slug],
    queryFn: () => getBlogDetail({ slug }),
    enabled: !!slug,
  });
};