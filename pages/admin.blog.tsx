import React from "react";
import { Link } from "react-router-dom";
import { Edit, Trash2, Plus } from "lucide-react";
import { toast } from "sonner";
import { useAdminBlog } from "../helpers/useAdminBlog";
import { Button } from "../components/Button";
import { Badge } from "../components/Badge";
import { Skeleton } from "../components/Skeleton";
import styles from "./admin.blog.module.css";

export default function AdminBlogPage() {
  const { blogPostsQuery, deleteMutation } = useAdminBlog();
  const { data: posts, isLoading } = blogPostsQuery;

  const handleDelete = async (id: number, title: string) => {
    if (window.confirm(`Are you sure you want to delete "${title}"?`)) {
      try {
        await deleteMutation.mutateAsync({ id });
        toast.success("Blog post deleted successfully.");
      } catch (err) {
        toast.error("Failed to delete blog post.");
      }
    }
  };

  const formatCategoryName = (category: string) => {
    return category
      .split("_")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <div>
          <h1 className={styles.title}>Blog Posts</h1>
          <p className={styles.subtitle}>Manage your SEO content</p>
        </div>
        <Button asChild>
          <Link to="/admin/blog/new">
            <Plus size={16} />
            New Post
          </Link>
        </Button>
      </header>

      <div className={styles.tableContainer}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Title</th>
              <th>Category</th>
              <th>Published</th>
              <th className={styles.actionsCell}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {isLoading ? (
              Array.from({ length: 5 }).map((_, i) => (
                <tr key={i}>
                  <td><Skeleton className={styles.skeletonTitle} /></td>
                  <td><Skeleton className={styles.skeletonBadge} /></td>
                  <td><Skeleton className={styles.skeletonDate} /></td>
                  <td><Skeleton className={styles.skeletonActions} /></td>
                </tr>
              ))
            ) : posts?.length === 0 ? (
              <tr>
                <td colSpan={4} className={styles.emptyState}>
                  No blog posts found. Create your first one!
                </td>
              </tr>
            ) : (
              posts?.map((post) => (
                <tr key={post.id}>
                  <td className={styles.titleCell}>
                    <span className={styles.postTitle}>{post.title}</span>
                    <span className={styles.postSlug}>/{post.slug}</span>
                  </td>
                  <td>
                    <Badge variant="secondary">
                      {formatCategoryName(post.category)}
                    </Badge>
                  </td>
                  <td className={styles.dateCell}>
                    {new Date(post.publishedAt).toLocaleDateString(undefined, {
                      year: 'numeric',
                      month: 'short',
                      day: 'numeric'
                    })}
                  </td>
                  <td className={styles.actionsCell}>
                    <Button asChild variant="ghost" size="icon-sm">
                      <Link to={`/admin/blog/${post.id}/edit`} aria-label="Edit post">
                        <Edit size={16} />
                      </Link>
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon-sm"
                      className={styles.deleteButton}
                      onClick={() => handleDelete(post.id, post.title)}
                      aria-label="Delete post"
                      disabled={deleteMutation.isPending}
                    >
                      <Trash2 size={16} />
                    </Button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}