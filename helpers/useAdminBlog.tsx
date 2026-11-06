import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getBlogList } from "../endpoints/blog/list_GET.schema";
import { postCreateBlogPost } from "../endpoints/admin/blog/create_POST.schema";
import { postUpdateBlogPost } from "../endpoints/admin/blog/update_POST.schema";
import { postDeleteBlogPost } from "../endpoints/admin/blog/delete_POST.schema";

export const useAdminBlog = () => {
  const queryClient = useQueryClient();

  const blogPostsQuery = useQuery({
    queryKey: ["admin", "blog"],
    queryFn: () => getBlogList({}),
    placeholderData: (prev) => prev,
  });

  const createMutation = useMutation({
    mutationFn: postCreateBlogPost,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin", "blog"] });
      queryClient.invalidateQueries({ queryKey: ["blogPosts"] });
    },
  });

  const updateMutation = useMutation({
    mutationFn: postUpdateBlogPost,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin", "blog"] });
      queryClient.invalidateQueries({ queryKey: ["blogPosts"] });
      queryClient.invalidateQueries({ queryKey: ["blogPost"] });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: postDeleteBlogPost,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin", "blog"] });
      queryClient.invalidateQueries({ queryKey: ["blogPosts"] });
    },
  });

  return {
    blogPostsQuery,
    createMutation,
    updateMutation,
    deleteMutation,
  };
};