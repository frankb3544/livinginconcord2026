import React from "react";
import { useSubmitContact } from "../helpers/useSubmitContact";
import { schema as contactSchema } from "../endpoints/contact/submit_POST.schema";
import { Form, FormItem, FormLabel, FormControl, FormMessage, useForm } from "./Form";
import { Input } from "./Input";
import { Button } from "./Button";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "./Select";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import * as z from "zod";
import styles from "./MarketReportLeadCapture.module.css";

export function MarketReportLeadCapture({ className }: { className?: string }) {
  const { mutate, isPending } = useSubmitContact();
  const navigate = useNavigate();

  const form = useForm({
    defaultValues: {
      fullName: "",
      email: "",
      phone: "",
      interestedIn: "Market Report Request",
      message: "",
      motivation: "",
      timeline: "",
      budget: "",
      sourceNeighborhood: "",
      qualifierVariant: "",
      preferredCallTime: "",
    },
    schema: contactSchema,
  });

  const onSubmit = (values: z.infer<typeof contactSchema>) => {
    mutate(values, {
      onSuccess: () => {
        toast.success("Request sent successfully!", {
          description: "Franklin will reach out shortly with your market snapshot.",
        });
        navigate("/resources-concord");
      },
      onError: () => {
        toast.error("Failed to send request", {
          description: "Please try again later or contact us directly.",
        });
      },
    });
  };

  return (
    <div className={`${styles.container} ${className ?? ""}`}>
      <div className={styles.inner}>
        <div className={styles.textColumn}>
          <h2 className={styles.title}>Get your free Concord NC market snapshot</h2>
          <p className={styles.subtitle}>
            Enter your details below to receive a customized market analysis from Franklin Bellamy. Find out exactly what's happening in your specific neighborhood.
          </p>
        </div>
        <div className={styles.formColumn}>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className={styles.formGrid}>
              <FormItem name="fullName">
                <FormLabel>Full Name *</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Jane Smith"
                    value={form.values.fullName}
                    onChange={(e) =>
                      form.setValues((prev) => ({
                        ...prev,
                        fullName: e.target.value,
                      }))
                    }
                  />
                </FormControl>
                <FormMessage />
              </FormItem>

              <FormItem name="email">
                <FormLabel>Email Address *</FormLabel>
                <FormControl>
                  <Input
                    type="email"
                    placeholder="jane@example.com"
                    value={form.values.email}
                    onChange={(e) =>
                      form.setValues((prev) => ({
                        ...prev,
                        email: e.target.value,
                      }))
                    }
                  />
                </FormControl>
                <FormMessage />
              </FormItem>

              <FormItem name="phone">
                <FormLabel>Phone Number</FormLabel>
                <FormControl>
                  <Input
                    type="tel"
                    placeholder="(704) 555-0100"
                    value={form.values.phone || ""}
                    onChange={(e) =>
                      form.setValues((prev) => ({
                        ...prev,
                        phone: e.target.value,
                      }))
                    }
                  />
                </FormControl>
                <FormMessage />
              </FormItem>

              <FormItem name="interestedIn">
                <FormLabel>I'm Interested In</FormLabel>
                <FormControl>
                  <Select
                    value={form.values.interestedIn || ""}
                    onValueChange={(val) =>
                      form.setValues((prev) => ({ ...prev, interestedIn: val }))
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select an option..." />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Market Report Request">Market Report Request</SelectItem>
                      <SelectItem value="Buying a Home">Buying a Home</SelectItem>
                      <SelectItem value="Selling My Home">Selling My Home</SelectItem>
                      <SelectItem value="Investment Property">Investment Property</SelectItem>
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>

              <Button type="submit" className={styles.submitBtn} disabled={isPending}>
                {isPending ? "Sending..." : "Request Snapshot"}
              </Button>
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
}