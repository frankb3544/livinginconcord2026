import React, { useMemo } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";
import { useAdminBlog } from "../helpers/useAdminBlog";
import { AdminBlogEditor, AdminBlogEditorData } from "../components/AdminBlogEditor";
import { Skeleton } from "../components/Skeleton";
import styles from "./admin.blog.$postId.edit.module.css";

export default function AdminBlogEditPage() {
  const { postId } = useParams<{ postId: string }>();
  const navigate = useNavigate();
  const { blogPostsQuery, updateMutation } = useAdminBlog();
  const { data: posts, isLoading } = blogPostsQuery;

  // We find the post locally from the query cache instead of fetching an individual endpoint
  const postToEdit = useMemo(() => {
    if (!posts || !postId) return null;
    return posts.find((p) => p.id === Number(postId)) || null;
  }, [posts, postId]);

  const handleSave = async (data: AdminBlogEditorData) => {
    if (!postId) return;
    try {
      await updateMutation.mutateAsync({
        id: Number(postId),
        title: data.title,
        slug: data.slug,
        excerpt: data.excerpt,
        content: data.content,
        category: data.category,
        imageUrl: data.imageUrl || null,
        author: data.author,
      });
      toast.success("Blog post updated successfully.");
      navigate("/admin/blog");
    } catch (err) {
      const msg = err instanceof Error ? err.message : "An error occurred";
      toast.error(`Failed to update post: ${msg}`);
    }
  };

  const handleCancel = () => {
    navigate("/admin/blog");
  };

  if (isLoading) {
    return (
      <div className={styles.loadingContainer}>
        <Skeleton className={styles.skeletonHeader} />
        <div className={styles.skeletonGrid}>
          <div className={styles.skeletonMain}>
            <Skeleton className={styles.skeletonInput} />
            <Skeleton className={styles.skeletonContent} />
          </div>
          <div className={styles.skeletonSide}>
            <Skeleton className={styles.skeletonCard} />
            <Skeleton className={styles.skeletonCard} />
          </div>
        </div>
      </div>
    );
  }

  if (!postToEdit && !isLoading) {
    return (
      <div className={styles.notFoundContainer}>
        <h2>Post not found</h2>
        <p>The post you are trying to edit does not exist.</p>
        <button onClick={handleCancel} className={styles.backLink}>
          Back to Blog Posts
        </button>
      </div>
    );
  }

  const initialData: Partial<AdminBlogEditorData> = postToEdit ? {
    title: postToEdit.title,
    slug: postToEdit.slug,
    excerpt: postToEdit.excerpt,
    content: postToEdit.content,
    category: postToEdit.category,
    imageUrl: postToEdit.imageUrl || "",
    author: postToEdit.author,
  } : {};

  return (
    <div className={styles.container}>
      <AdminBlogEditor
        mode="edit"
        initialData={initialData}
        onSave={handleSave}
        onCancel={handleCancel}
        isSaving={updateMutation.isPending}
      />
    </div>
  );
}