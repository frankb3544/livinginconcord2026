import React, { useState } from "react";
import { useAdminTestimonials } from "../helpers/useAdminTestimonials";
import { Button } from "../components/Button";
import { Input } from "../components/Input";
import { Textarea } from "../components/Textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../components/Select";
import { Skeleton } from "../components/Skeleton";
import { toast } from "sonner";
import { Star, MapPin, Quote, Plus, Edit2, Trash2 } from "lucide-react";
import { Selectable } from "kysely";
import { Testimonials } from "../helpers/schema";
import styles from "./admin.testimonials.module.css";

const TestimonialForm = ({ 
  initialData, 
  onSave, 
  onCancel, 
  isPending 
}: { 
  initialData?: Selectable<Testimonials>, 
  onSave: (data: any) => void, 
  onCancel: () => void,
  isPending: boolean
}) => {
  const [formData, setFormData] = useState({
    clientName: initialData?.clientName || "",
    location: initialData?.location || "",
    content: initialData?.content || "",
    rating: initialData?.rating || 5,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.clientName || !formData.content || !formData.location) {
      toast.error("Please fill in all required fields");
      return;
    }
    onSave(formData);
  };

  return (
    <form className={styles.formCard} onSubmit={handleSubmit}>
      <div className={styles.formHeader}>
        <h3>{initialData ? "Edit Testimonial" : "Add New Testimonial"}</h3>
      </div>
      <div className={styles.formContent}>
        <div className={styles.formRow}>
          <div className={styles.formGroup}>
            <label>Client Name</label>
            <Input 
              value={formData.clientName} 
              onChange={e => setFormData({...formData, clientName: e.target.value})} 
              placeholder="John Doe"
            />
          </div>
          <div className={styles.formGroup}>
            <label>Location</label>
            <Input 
              value={formData.location} 
              onChange={e => setFormData({...formData, location: e.target.value})} 
              placeholder="Concord, NC"
            />
          </div>
          <div className={styles.formGroup}>
            <label>Rating</label>
            <Select 
              value={formData.rating.toString()} 
              onValueChange={v => setFormData({...formData, rating: parseInt(v)})}
            >
              <SelectTrigger><SelectValue /></SelectTrigger>
              <SelectContent>
                {[5, 4, 3, 2, 1].map(r => (
                  <SelectItem key={r} value={r.toString()}>{r} Stars</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
        <div className={styles.formGroupFull}>
          <label>Testimonial Content</label>
          <Textarea 
            value={formData.content} 
            onChange={e => setFormData({...formData, content: e.target.value})} 
            rows={4}
            placeholder="Franklin was amazing to work with..."
          />
        </div>
      </div>
      <div className={styles.formFooter}>
        <Button variant="outline" type="button" onClick={onCancel} disabled={isPending}>Cancel</Button>
        <Button type="submit" disabled={isPending}>
          {isPending ? "Saving..." : "Save Testimonial"}
        </Button>
      </div>
    </form>
  );
};

export default function AdminTestimonials() {
  const { testimonialsQuery, createMutation, updateMutation, deleteMutation } = useAdminTestimonials();
  const [isAdding, setIsAdding] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);

  const handleCreate = async (data: any) => {
    try {
      await createMutation.mutateAsync(data);
      toast.success("Testimonial added successfully");
      setIsAdding(false);
    } catch (e) {
      toast.error("Failed to add testimonial");
    }
  };

  const handleUpdate = async (id: number, data: any) => {
    try {
      await updateMutation.mutateAsync({ id, ...data });
      toast.success("Testimonial updated successfully");
      setEditingId(null);
    } catch (e) {
      toast.error("Failed to update testimonial");
    }
  };

  const handleDelete = async (id: number) => {
    if (window.confirm("Delete this testimonial?")) {
      try {
        await deleteMutation.mutateAsync({ id });
        toast.success("Testimonial deleted");
      } catch (e) {
        toast.error("Failed to delete testimonial");
      }
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.headerText}>
          <h1 className={styles.title}>Testimonials</h1>
          <p className={styles.subtitle}>Manage client reviews and testimonials shown on the site.</p>
        </div>
        {!isAdding && (
          <Button onClick={() => { setIsAdding(true); setEditingId(null); }}>
            <Plus size={16} /> Add Testimonial
          </Button>
        )}
      </div>

      {isAdding && (
        <TestimonialForm 
          onSave={handleCreate} 
          onCancel={() => setIsAdding(false)} 
          isPending={createMutation.isPending} 
        />
      )}

      {testimonialsQuery.isLoading ? (
        <div className={styles.grid}>
          {[1, 2, 3].map(i => <Skeleton key={i} style={{ height: "200px" }} />)}
        </div>
      ) : (
        <div className={styles.grid}>
          {testimonialsQuery.data?.map(testimonial => (
            editingId === testimonial.id ? (
              <TestimonialForm 
                key={testimonial.id}
                initialData={testimonial}
                onSave={(data) => handleUpdate(testimonial.id, data)}
                onCancel={() => setEditingId(null)}
                isPending={updateMutation.isPending}
              />
            ) : (
              <div key={testimonial.id} className={styles.card}>
                <Quote className={styles.quoteIcon} size={24} />
                <div className={styles.cardContent}>
                  <div className={styles.stars}>
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star key={i} size={16} fill={i < testimonial.rating ? "var(--warning)" : "transparent"} color={i < testimonial.rating ? "var(--warning)" : "var(--muted-foreground)"} />
                    ))}
                  </div>
                  <p className={styles.textContent}>"{testimonial.content}"</p>
                  <div className={styles.clientInfo}>
                    <p className={styles.clientName}>{testimonial.clientName}</p>
                    <p className={styles.location}><MapPin size={14} /> {testimonial.location}</p>
                  </div>
                </div>
                <div className={styles.cardActions}>
                  <Button variant="ghost" size="sm" onClick={() => { setEditingId(testimonial.id); setIsAdding(false); }}>
                    <Edit2 size={14} /> Edit
                  </Button>
                  <Button variant="ghost" size="sm" className={styles.deleteBtn} onClick={() => handleDelete(testimonial.id)}>
                    <Trash2 size={14} /> Delete
                  </Button>
                </div>
              </div>
            )
          ))}
        </div>
      )}
    </div>
  );
}