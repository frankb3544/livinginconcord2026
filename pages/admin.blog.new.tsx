import React from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { useAdminBlog } from "../helpers/useAdminBlog";
import { AdminBlogEditor, AdminBlogEditorData } from "../components/AdminBlogEditor";
import styles from "./admin.blog.new.module.css";

export default function AdminBlogNewPage() {
  const navigate = useNavigate();
  const { createMutation } = useAdminBlog();

  const handleSave = async (data: AdminBlogEditorData) => {
    try {
      await createMutation.mutateAsync({
        title: data.title,
        slug: data.slug,
        excerpt: data.excerpt,
        content: data.content,
        category: data.category,
        imageUrl: data.imageUrl || null,
        author: data.author,
      });
      toast.success("Blog post created successfully.");
      navigate("/admin/blog");
    } catch (err) {
      const msg = err instanceof Error ? err.message : "An error occurred";
      toast.error(`Failed to create post: ${msg}`);
    }
  };

  const handleCancel = () => {
    navigate("/admin/blog");
  };

  return (
    <div className={styles.container}>
      <AdminBlogEditor
        mode="create"
        onSave={handleSave}
        onCancel={handleCancel}
        isSaving={createMutation.isPending}
      />
    </div>
  );
}