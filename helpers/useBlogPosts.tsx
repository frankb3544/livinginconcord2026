import { useQuery } from "@tanstack/react-query";
import { getBlogList } from "../endpoints/blog/list_GET.schema";
import { BlogCategory } from "./schema";

export const useBlogPosts = (category?: BlogCategory) => {
  return useQuery({
    queryKey: ["blogPosts", category],
    queryFn: () => getBlogList({ category }),
  });
};