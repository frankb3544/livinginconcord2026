import React, { useState, useEffect } from "react";
import { Button } from "./Button";
import { Input } from "./Input";
import { BlogCategoryArrayValues } from "../helpers/schema";
import { Image as ImageIcon } from "lucide-react";
import styles from "./AdminBlogEditor.module.css";

export interface AdminBlogEditorData {
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  category: typeof BlogCategoryArrayValues[number];
  imageUrl: string;
  author: string;
}

interface AdminBlogEditorProps {
  mode: "create" | "edit";
  initialData?: Partial<AdminBlogEditorData>;
  onSave: (data: AdminBlogEditorData) => void;
  onCancel: () => void;
  isSaving?: boolean;
}

const DEFAULT_DATA: AdminBlogEditorData = {
  title: "",
  slug: "",
  excerpt: "",
  content: "",
  category: "lifestyle",
  imageUrl: "",
  author: "Franklin Bellamy",
};

export const AdminBlogEditor: React.FC<AdminBlogEditorProps> = ({
  mode,
  initialData,
  onSave,
  onCancel,
  isSaving = false,
}) => {
  const [formData, setFormData] = useState<AdminBlogEditorData>({
    ...DEFAULT_DATA,
    ...initialData,
  });
  
  const [hasManuallyEditedSlug, setHasManuallyEditedSlug] = useState(mode === "edit");

  // Auto-generate slug from title in create mode
  useEffect(() => {
    if (mode === "create" && !hasManuallyEditedSlug) {
      const generatedSlug = formData.title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)+/g, "");
      
      setFormData((prev) => ({ ...prev, slug: generatedSlug }));
    }
  }, [formData.title, mode, hasManuallyEditedSlug]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    
    if (name === "slug") {
      setHasManuallyEditedSlug(true);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  const formatCategoryName = (category: string) => {
    return category
      .split("_")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };

  return (
    <form onSubmit={handleSubmit} className={styles.editorForm}>
      <div className={styles.header}>
        <h1 className={styles.title}>
          {mode === "create" ? "Create New Blog Post" : "Edit Blog Post"}
        </h1>
        <div className={styles.actions}>
          <Button 
            type="button" 
            variant="outline" 
            onClick={onCancel}
            disabled={isSaving}
          >
            Cancel
          </Button>
          <Button 
            type="submit" 
            disabled={isSaving || !formData.title || !formData.slug}
          >
            {isSaving ? "Saving..." : "Save Post"}
          </Button>
        </div>
      </div>

      <div className={styles.grid}>
        <div className={styles.mainColumn}>
          <div className={styles.formGroup}>
            <label htmlFor="title" className={styles.label}>Post Title</label>
            <Input
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="E.g., 5 Tips for Buying a Home in Concord"
              required
              className={styles.titleInput}
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="content" className={styles.label}>Content (HTML)</label>
            <textarea
              id="content"
              name="content"
              value={formData.content}
              onChange={handleChange}
              placeholder="<p>Write your post content here...</p>"
              required
              className={styles.textarea}
              rows={15}
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="excerpt" className={styles.label}>Excerpt</label>
            <textarea
              id="excerpt"
              name="excerpt"
              value={formData.excerpt}
              onChange={handleChange}
              placeholder="A brief summary of the post..."
              required
              className={styles.textareaSmall}
              rows={3}
            />
          </div>
        </div>

        <div className={styles.sideColumn}>
          <div className={styles.card}>
            <h3 className={styles.cardTitle}>Post Settings</h3>
            
            <div className={styles.formGroup}>
              <label htmlFor="slug" className={styles.label}>URL Slug</label>
              <Input
                id="slug"
                name="slug"
                value={formData.slug}
                onChange={handleChange}
                placeholder="my-post-url"
                required
              />
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="category" className={styles.label}>Category</label>
              <select
                id="category"
                name="category"
                value={formData.category}
                onChange={handleChange}
                className={styles.select}
                required
              >
                {BlogCategoryArrayValues.map((cat) => (
                  <option key={cat} value={cat}>
                    {formatCategoryName(cat)}
                  </option>
                ))}
              </select>
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="author" className={styles.label}>Author</label>
              <Input
                id="author"
                name="author"
                value={formData.author}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className={styles.card}>
            <h3 className={styles.cardTitle}>Featured Image</h3>
            
            <div className={styles.formGroup}>
              <label htmlFor="imageUrl" className={styles.label}>Image URL</label>
              <Input
                id="imageUrl"
                name="imageUrl"
                value={formData.imageUrl}
                onChange={handleChange}
                placeholder="https://example.com/image.jpg"
              />
            </div>

            <div className={styles.imagePreview}>
              {formData.imageUrl ? (
                <img 
                  src={formData.imageUrl} 
                  alt="Featured preview" 
                  className={styles.previewImg}
                  loading="lazy"
                  width={400}
                  height={225}
                  decoding="async"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 24 24" fill="none" stroke="%23cbd5e1" stroke-width="1" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><circle cx="8.5" cy="8.5" r="1.5"></circle><polyline points="21 15 16 10 5 21"></polyline></svg>';
                  }}
                />
              ) : (
                <div className={styles.previewPlaceholder}>
                  <ImageIcon size={32} className={styles.placeholderIcon} />
                  <span>No image provided</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </form>
  );
};