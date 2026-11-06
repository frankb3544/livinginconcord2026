import React, { useEffect, useState } from "react";
import { z } from "zod";
import { toast } from "sonner";
import { FileText, X } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Form, FormItem, FormControl, FormMessage, useForm } from "./Form";
import { Input } from "./Input";
import { Button } from "./Button";
import { useGuideDownload } from "../helpers/useGuideDownload";
import styles from "./RelocationGuidePopup.module.css";

const formSchema = z.object({
  fullName: z.string().min(1, "Name is required"),
  email: z.string().email("Valid email is required"),
});

export function RelocationGuidePopup() {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const guideDownloadMutation = useGuideDownload();

  const form = useForm({
    schema: formSchema,
    defaultValues: { fullName: "", email: "" },
  });

  useEffect(() => {
    const isDismissed = localStorage.getItem("relocationGuidePopupDismissed");
    if (!isDismissed) {
      const timer = setTimeout(() => {
        setIsOpen(true);
      }, 30000); // Trigger after 30 seconds
      
      return () => clearTimeout(timer);
    }
  }, []);

  const handleOpenChange = (open: boolean) => {
    setIsOpen(open);
    if (!open) {
      // Don't show again if closed
      localStorage.setItem("relocationGuidePopupDismissed", "true");
    }
  };

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    guideDownloadMutation.mutate(values, {
      onSuccess: () => {
        localStorage.setItem("relocationGuidePopupDismissed", "true");
        setIsOpen(false);
        toast.success("Your guide is ready!");
        navigate("/resources-concord");
      },
      onError: (error) => {
        toast.error(error.message || "Failed to submit request.");
      },
    });
  };

  if (!isOpen) return null;

  return (
    <div className={styles.banner}>
      <button 
        className={styles.closeButton} 
        onClick={() => handleOpenChange(false)}
        aria-label="Close"
      >
        <X size={16} />
      </button>

      <div className={styles.header}>
        <div className={styles.titleRow}>
          <FileText className={styles.icon} />
          <h3 className={styles.title}>Free Relocation Guide</h3>
        </div>
        <p className={styles.description}>
          Get our 3,000+ word insider's guide on neighborhoods, schools, and cost of living.
        </p>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className={styles.form}>
          <FormItem name="fullName">
            <FormControl>
              <Input 
                placeholder="Full Name" 
                value={form.values.fullName} 
                onChange={(e) => form.setValues(prev => ({...prev, fullName: e.target.value}))} 
                onBlur={() => form.validateField("fullName")} 
              />
            </FormControl>
            <FormMessage />
          </FormItem>
          
          <FormItem name="email">
            <FormControl>
              <Input 
                type="email" 
                placeholder="Email Address" 
                value={form.values.email} 
                onChange={(e) => form.setValues(prev => ({...prev, email: e.target.value}))} 
                onBlur={() => form.validateField("email")} 
              />
            </FormControl>
            <FormMessage />
          </FormItem>
          
          <Button 
            type="submit" 
            disabled={guideDownloadMutation.isPending} 
            className={styles.submitButton}
          >
            {guideDownloadMutation.isPending ? "Sending..." : "Get the Guide"}
          </Button>
        </form>
      </Form>
    </div>
  );
}