import React from "react";
import { z } from "zod";
import { toast } from "sonner";
import { Home } from "lucide-react";
import { Button } from "./Button";
import { Form, FormItem, FormControl, FormMessage, useForm } from "./Form";
import { Input } from "./Input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "./Dialog";
import { useSubmitValuation } from "../helpers/useSubmitValuation";
import styles from "./HomeValuationBlock.module.css";

const formSchema = z.object({
  fullName: z.string().min(1, "Name required"),
  email: z.string().email("Invalid email"),
  propertyAddress: z.string().min(5, "Address too short"),
});

interface HomeValuationBlockProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function HomeValuationBlock({ open, onOpenChange }: HomeValuationBlockProps) {
  const submitValuationMutation = useSubmitValuation();

  const form = useForm({
    schema: formSchema,
    defaultValues: { fullName: "", email: "", propertyAddress: "" },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    submitValuationMutation.mutate(
      {
        fullName: values.fullName,
        email: values.email,
        propertyAddress: values.propertyAddress,
      },
      {
        onSuccess: () => {
          toast.success(
            "We've received your request! Franklin will send your valuation within 24 hours.",
          );
          form.setValues({ fullName: "", email: "", propertyAddress: "" });
          onOpenChange(false);
        },
        onError: (error) => {
          toast.error(error.message || "Failed to submit request.");
        },
      },
    );
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <div className={styles.iconWrapper}>
            <Home size={24} />
          </div>
          <DialogTitle>Get Your Free Home Valuation</DialogTitle>
          <DialogDescription>
            Thinking about selling? Find out what your Concord home is worth — no obligation, no pressure.
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className={styles.form}>
            <FormItem name="fullName">
              <FormControl>
                <Input
                  placeholder="Your Name"
                  value={form.values.fullName}
                  onChange={(e) =>
                    form.setValues((p) => ({ ...p, fullName: e.target.value }))
                  }
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
                  onChange={(e) =>
                    form.setValues((p) => ({ ...p, email: e.target.value }))
                  }
                  onBlur={() => form.validateField("email")}
                />
              </FormControl>
              <FormMessage />
            </FormItem>

            <FormItem name="propertyAddress">
              <FormControl>
                <Input
                  placeholder="Property Address"
                  value={form.values.propertyAddress}
                  onChange={(e) =>
                    form.setValues((p) => ({ ...p, propertyAddress: e.target.value }))
                  }
                  onBlur={() => form.validateField("propertyAddress")}
                />
              </FormControl>
              <FormMessage />
            </FormItem>

            <Button
              type="submit"
              size="md"
              disabled={submitValuationMutation.isPending}
              className={styles.submitButton}
            >
              {submitValuationMutation.isPending ? "Sending..." : "Get My Valuation"}
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}