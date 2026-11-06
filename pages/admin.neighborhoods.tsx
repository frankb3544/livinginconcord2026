import React, { useState } from "react";
import { useAdminNeighborhoods } from "../helpers/useAdminNeighborhoods";
import { Button } from "../components/Button";
import { Input } from "../components/Input";
import { Textarea } from "../components/Textarea";
import { Badge } from "../components/Badge";
import { Skeleton } from "../components/Skeleton";
import { toast } from "sonner";
import { MapPin, Image as ImageIcon, Star, DollarSign, Tag, Edit2 } from "lucide-react";
import { Selectable } from "kysely";
import { Neighborhoods } from "../helpers/schema";
import styles from "./admin.neighborhoods.module.css";

const NeighborhoodCard = ({ neighborhood }: { neighborhood: Selectable<Neighborhoods> }) => {
  const [isEditing, setIsEditing] = useState(false);
  const { updateMutation } = useAdminNeighborhoods();
  
  const [formData, setFormData] = useState({
    name: neighborhood.name,
    slug: neighborhood.slug,
    description: neighborhood.description,
    highlights: neighborhood.highlights || "",
    imageUrl: neighborhood.imageUrl || "",
    youtubeVideoUrl: neighborhood.youtubeVideoUrl || "",
    priceRangeMin: neighborhood.priceRangeMin,
    priceRangeMax: neighborhood.priceRangeMax,
    rating: Number(neighborhood.rating),
    tags: neighborhood.tags.join(", "),
  });

  const handleSave = async () => {
    try {
      await updateMutation.mutateAsync({
        id: neighborhood.id,
        name: formData.name,
        slug: formData.slug,
        description: formData.description,
        highlights: formData.highlights || null,
        imageUrl: formData.imageUrl || null,
        youtubeVideoUrl: formData.youtubeVideoUrl || null,
        priceRangeMin: Number(formData.priceRangeMin),
        priceRangeMax: Number(formData.priceRangeMax),
        rating: Number(formData.rating),
        tags: formData.tags.split(",").map((t) => t.trim()).filter(Boolean),
      });
      toast.success(`${formData.name} updated successfully`);
      setIsEditing(false);
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Failed to update neighborhood");
    }
  };

  if (isEditing) {
    return (
      <div className={styles.card}>
        <div className={styles.cardHeader}>
          <h3 className={styles.cardTitle}>Edit {neighborhood.name}</h3>
        </div>
        <div className={styles.cardContent}>
          <div className={styles.formGrid}>
            <div className={styles.formGroup}>
              <label>Name</label>
              <Input 
                value={formData.name} 
                onChange={(e) => setFormData({ ...formData, name: e.target.value })} 
              />
            </div>
            <div className={styles.formGroup}>
              <label>Slug</label>
              <Input 
                value={formData.slug} 
                onChange={(e) => setFormData({ ...formData, slug: e.target.value })} 
              />
            </div>
            <div className={styles.formGroupFull}>
              <label>Description</label>
              <Textarea 
                value={formData.description} 
                onChange={(e) => setFormData({ ...formData, description: e.target.value })} 
                rows={4}
              />
            </div>
            <div className={styles.formGroupFull}>
              <label>Highlights</label>
              <Textarea 
                value={formData.highlights} 
                onChange={(e) => setFormData({ ...formData, highlights: e.target.value })} 
                rows={3}
              />
            </div>
            <div className={styles.formGroupFull}>
              <label>Image URL</label>
              <Input 
                value={formData.imageUrl} 
                onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })} 
                placeholder="https://..."
              />
            </div>
            <div className={styles.formGroupFull}>
              <label>YouTube Video URL</label>
              <Input 
                value={formData.youtubeVideoUrl} 
                onChange={(e) => setFormData({ ...formData, youtubeVideoUrl: e.target.value })} 
                placeholder="https://youtube.com/shorts/... or https://youtube.com/watch?v=..."
              />
            </div>
            <div className={styles.formGroup}>
              <label>Min Price</label>
              <Input 
                type="number" 
                value={formData.priceRangeMin} 
                onChange={(e) => setFormData({ ...formData, priceRangeMin: Number(e.target.value) })} 
              />
            </div>
            <div className={styles.formGroup}>
              <label>Max Price</label>
              <Input 
                type="number" 
                value={formData.priceRangeMax} 
                onChange={(e) => setFormData({ ...formData, priceRangeMax: Number(e.target.value) })} 
              />
            </div>
            <div className={styles.formGroup}>
              <label>Rating (1-5)</label>
              <Input 
                type="number" 
                min="1" max="5" step="0.1"
                value={formData.rating} 
                onChange={(e) => setFormData({ ...formData, rating: Number(e.target.value) })} 
              />
            </div>
            <div className={styles.formGroup}>
              <label>Tags (comma separated)</label>
              <Input 
                value={formData.tags} 
                onChange={(e) => setFormData({ ...formData, tags: e.target.value })} 
              />
            </div>
          </div>
        </div>
        <div className={styles.cardFooter}>
          <Button variant="outline" onClick={() => setIsEditing(false)} disabled={updateMutation.isPending}>
            Cancel
          </Button>
          <Button onClick={handleSave} disabled={updateMutation.isPending}>
            {updateMutation.isPending ? "Saving..." : "Save Changes"}
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.card}>
      {neighborhood.imageUrl ? (
        <div className={styles.imagePreview} style={{ backgroundImage: `url(${neighborhood.imageUrl})` }} />
      ) : (
        <div className={styles.imagePlaceholder}>
          <ImageIcon size={32} />
          <span>No image</span>
        </div>
      )}
      <div className={styles.cardHeader}>
        <div className={styles.titleRow}>
          <h3 className={styles.cardTitle}>{neighborhood.name}</h3>
          <Badge variant="outline">{neighborhood.slug}</Badge>
        </div>
      </div>
      <div className={styles.cardContent}>
        <p className={styles.descriptionLine}>{neighborhood.description}</p>
        
        <div className={styles.statsList}>
          <div className={styles.statItem}>
            <DollarSign size={16} />
            <span>${(neighborhood.priceRangeMin / 1000).toFixed(0)}k - ${(neighborhood.priceRangeMax / 1000).toFixed(0)}k</span>
          </div>
          <div className={styles.statItem}>
            <Star size={16} className={styles.starIcon} />
            <span>{Number(neighborhood.rating).toFixed(1)} / 5</span>
          </div>
          {neighborhood.youtubeVideoUrl && (
            <div className={styles.statItem}>
              <span>📹 Video</span>
            </div>
          )}
        </div>
        
        <div className={styles.tagsList}>
          <Tag size={16} className={styles.tagIcon} />
          {neighborhood.tags.map((tag) => (
            <Badge key={tag} variant="secondary" className={styles.tagBadge}>{tag}</Badge>
          ))}
        </div>
      </div>
      <div className={styles.cardFooter}>
        <Button variant="outline" className={styles.editBtn} onClick={() => setIsEditing(true)}>
          <Edit2 size={16} /> Edit Neighborhood
        </Button>
      </div>
    </div>
  );
};

export default function AdminNeighborhoods() {
  const { neighborhoodsQuery } = useAdminNeighborhoods();

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>Neighborhoods</h1>
        <p className={styles.subtitle}>Manage information for the 10 featured Concord neighborhoods.</p>
      </div>

      {neighborhoodsQuery.isLoading ? (
        <div className={styles.grid}>
          {[1, 2, 3, 4].map(i => (
            <div key={i} className={styles.card}>
              <Skeleton style={{ height: "160px", borderRadius: "0" }} />
              <div style={{ padding: "var(--spacing-4)" }}>
                <Skeleton style={{ height: "24px", width: "60%", marginBottom: "1rem" }} />
                <Skeleton style={{ height: "16px", marginBottom: "0.5rem" }} />
                <Skeleton style={{ height: "16px", width: "80%" }} />
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className={styles.grid}>
          {neighborhoodsQuery.data?.map((neighborhood) => (
            <NeighborhoodCard key={neighborhood.id} neighborhood={neighborhood} />
          ))}
        </div>
      )}
    </div>
  );
}