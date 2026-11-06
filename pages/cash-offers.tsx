import React from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import * as z from "zod";
import { InfoPage, InfoPageData } from "../components/InfoPage";
import { Form, FormItem, FormLabel, FormControl, FormMessage, useForm } from "../components/Form";
import { Input } from "../components/Input";
import { Textarea } from "../components/Textarea";
import { Button } from "../components/Button";
import { useSubmitContact } from "../helpers/useSubmitContact";
import pageData from "../page-data/cash-offers.json";
import styles from "./cash-offers.module.css";

const formSchema = z.object({
  fullName: z.string().min(1, "Name is required"),
  email: z.string().email("A valid email is required"),
  phone: z.string().optional(),
  propertyAddress: z.string().min(5, "Property address is required"),
  message: z.string().optional(),
});

function CashOfferForm() {
  const { mutate, isPending } = useSubmitContact();
  const navigate = useNavigate();

  const form = useForm({
    defaultValues: { fullName: "", email: "", phone: "", propertyAddress: "", message: "" },
    schema: formSchema,
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    mutate(
      {
        fullName: values.fullName,
        email: values.email,
        phone: values.phone || null,
        interestedIn: "Cash Offer",
        message: `Property address: ${values.propertyAddress}${values.message ? `\n\n${values.message}` : ""}`,
      },
      {
        onSuccess: () => {
          toast.success("Request received!", {
            description: "Franklin will review your property and follow up shortly.",
          });
          navigate("/thank-you");
        },
        onError: () => {
          toast.error("Something went wrong", {
            description: "Please try again, or call Franklin at (704) 904-5142.",
          });
        },
      }
    );
  };

  const set = (field: keyof z.infer<typeof formSchema>) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    form.setValues((prev) => ({ ...prev, [field]: e.target.value }));

  return (
    <section className={styles.formSection}>
      <h2 className={styles.formTitle}>Request Your Cash Offer</h2>
      <p className={styles.formIntro}>
        Tell Franklin about the property. You'll get a written cash offer from a vetted local
        buyer plus a traditional-listing comparison — no obligation, no pressure.
      </p>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className={styles.formGrid}>
          <FormItem name="fullName">
            <FormLabel>Full Name *</FormLabel>
            <FormControl>
              <Input placeholder="Jane Smith" value={form.values.fullName} onChange={set("fullName")} />
            </FormControl>
            <FormMessage />
          </FormItem>
          <FormItem name="email">
            <FormLabel>Email Address *</FormLabel>
            <FormControl>
              <Input type="email" placeholder="jane@example.com" value={form.values.email} onChange={set("email")} />
            </FormControl>
            <FormMessage />
          </FormItem>
          <FormItem name="phone">
            <FormLabel>Phone Number</FormLabel>
            <FormControl>
              <Input type="tel" placeholder="(704) 555-0100" value={form.values.phone || ""} onChange={set("phone")} />
            </FormControl>
            <FormMessage />
          </FormItem>
          <FormItem name="propertyAddress">
            <FormLabel>Property Address *</FormLabel>
            <FormControl>
              <Input placeholder="123 Main St, Concord, NC 28025" value={form.values.propertyAddress} onChange={set("propertyAddress")} />
            </FormControl>
            <FormMessage />
          </FormItem>
          <FormItem name="message" className={styles.fullWidth}>
            <FormLabel>Anything Franklin should know?</FormLabel>
            <FormControl>
              <Textarea
                placeholder="Timeline, condition, situation — anything that helps."
                rows={4}
                value={form.values.message || ""}
                onChange={set("message")}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
          <Button type="submit" size="lg" disabled={isPending} className={styles.submitBtn}>
            {isPending ? "Sending..." : "Request My Cash Offer"}
          </Button>
        </form>
      </Form>
    </section>
  );
}

export default function CashOffersPage() {
  return (
    <InfoPage
      page={pageData as InfoPageData}
      ctaTitle="Prefer to Talk First?"
      ctaSubtitle="Call or text Franklin Bellamy at (704) 904-5142 to walk through whether a cash offer or a traditional listing nets you more."
    >
      <CashOfferForm />
    </InfoPage>
  );
}
