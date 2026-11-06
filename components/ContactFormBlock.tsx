import { SITE_CONTACT_EMAIL, SITE_CONTACT_EMAIL_MAILTO } from "../helpers/siteContact";
import React from "react";
import {
  Form,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
  useForm,
} from "./Form";
import { Input } from "./Input";
import { Textarea } from "./Textarea";
import { Button } from "./Button";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "./Select";
import { useSubmitContact } from "../helpers/useSubmitContact";
import { schema as contactSchema } from "../endpoints/contact/submit_POST.schema";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { Phone, Clock, MapPin, Mail } from "lucide-react";
import * as z from "zod";
import styles from "./ContactFormBlock.module.css";

export function ContactFormBlock() {
  const { mutate, isPending } = useSubmitContact();
  const navigate = useNavigate();

  const form = useForm({
    defaultValues: {
      fullName: "",
      email: "",
      phone: "",
      interestedIn: "",
      message: "",
    },
    schema: contactSchema,
  });

  const onSubmit = (values: z.infer<typeof contactSchema>) => {
    mutate(values, {
      onSuccess: () => {
        toast.success("Message sent successfully!", {
          description: "Franklin will get back to you within 4 hours.",
        });
        form.setValues({
          fullName: "",
          email: "",
          phone: "",
          interestedIn: "",
          message: "",
        });
        navigate("/resources-concord");
      },
      onError: () => {
        toast.error("Failed to send message", {
          description: "Please try again later or contact us directly.",
        });
      },
    });
  };

  return (
    <div className={styles.container}>
      <div className={styles.formSection}>
        <h2 className={styles.heading}>Ready to Start Living in Concord NC?</h2>
        <p className={styles.subheading}>
          Reach out today and Franklin will personally get back to you within 4
          hours.
        </p>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className={styles.formGrid}
          >
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
                    <SelectItem value="Buying a Home in Concord NC">Buying a Home in Concord NC</SelectItem>
                    <SelectItem value="Selling My Concord NC Home">Selling My Concord NC Home</SelectItem>
                    <SelectItem value="Relocating to Concord NC">Relocating to Concord NC</SelectItem>
                    <SelectItem value="Just Exploring — Not Ready Yet">Just Exploring — Not Ready Yet</SelectItem>
                    <SelectItem value="New Construction">New Construction</SelectItem>
                    <SelectItem value="Investment Property">Investment Property</SelectItem>
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage />
            </FormItem>

            <FormItem name="message" className={styles.fullWidth}>
              <FormLabel>Message</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Tell us about your move to Concord NC..."
                  rows={4}
                  value={form.values.message || ""}
                  onChange={(e) =>
                    form.setValues((prev) => ({
                      ...prev,
                      message: e.target.value,
                    }))
                  }
                />
              </FormControl>
              <FormMessage />
            </FormItem>

            <Button
              type="submit"
              className={styles.submitBtn}
              disabled={isPending}
            >
              {isPending ? "Sending..." : "Send Message"}
            </Button>
          </form>
        </Form>
      </div>

      <div className={styles.infoSection}>
        <div className={styles.infoCard}>
          <h3 className={styles.infoHeading}>Contact Information</h3>

          <div className={styles.infoList}>
            <div className={styles.infoItem}>
              <div className={styles.iconWrapper}>
                <Phone size={20} />
              </div>
              <div>
                <div className={styles.infoLabel}>Phone</div>
                <div className={styles.infoValue}>(704) 904-5142</div>
              </div>
            </div>

            <div className={styles.infoItem}>
              <div className={styles.iconWrapper}>
                <Clock size={20} />
              </div>
              <div>
                <div className={styles.infoLabel}>Email Response Time</div>
                <div className={styles.infoValue}>Within 4 hours</div>
              </div>
            </div>

            <div className={styles.infoItem}>
              <div className={styles.iconWrapper}>
                <MapPin size={20} />
              </div>
              <div>
                <div className={styles.infoLabel}>Office</div>
                <div className={styles.infoValue}>
                  Lifestyle International Realty / Unlocking Real Estate
                  <br />
                  Concord, NC 28027
                </div>
              </div>
            </div>

            <div className={styles.infoItem}>
              <div className={styles.iconWrapper}>
                <Mail size={20} />
              </div>
              <div>
                <div className={styles.infoLabel}>Email</div>
                <div className={styles.infoValue}>
                  {SITE_CONTACT_EMAIL}
                </div>
              </div>
            </div>
          </div>

          <div className={styles.servingBox}>
            <div className={styles.servingHeader}>
              <MapPin size={16} /> Serving All of Concord NC
            </div>
            <p className={styles.servingText}>
              Cabarrus County • Charlotte Metro Area • Concord NC 28025 & 28027 • Harrisburg NC • Kannapolis NC
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}