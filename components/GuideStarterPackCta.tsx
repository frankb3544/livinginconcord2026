import React from "react";
import { z } from "zod";
import { Send } from "lucide-react";
import { toast } from "sonner";
import { Button } from "./Button";
import { Input } from "./Input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./Select";
import {
  Form,
  FormItem,
  FormControl,
  FormLabel,
  FormMessage,
  useForm,
} from "./Form";
import { useNavigate } from "react-router-dom";
import { useGuideDownload } from "../helpers/useGuideDownload";
import styles from "./GuideStarterPackCta.module.css";

const formSchema = z.object({
  fullName: z.string().min(2, "First name is required"),
  email: z.string().email("Valid email is required"),
  movingFrom: z.string().min(1, "Please select a location"),
});

interface Props {
  className?: string;
}

export function GuideStarterPackCta({ className }: Props) {
  const navigate = useNavigate();
  const { mutate: downloadGuide, isPending } = useGuideDownload();

  const form = useForm({
    schema: formSchema,
    defaultValues: {
      fullName: "",
      email: "",
      movingFrom: "",
    },
  });

  const onSubmit = (data: z.infer<typeof formSchema>) => {
    downloadGuide(data, {
      onSuccess: () => {
        form.setValues({ fullName: "", email: "", movingFrom: "" });
        toast.success("Your guide is ready!");
        navigate("/resources-concord");
      },
      onError: (err) => {
        const message =
          err instanceof Error
            ? err.message
            : "Something went wrong. Please try again.";
        toast.error(message);
      },
    });
  };

  return (
        <section id="starter-pack" className={`${styles.section} ${className || ""}`}>
      <div className={styles.glow} />
      
      <div className={styles.container}>
        <div className={styles.header}>
          <h2 className={styles.title}>
            Get Your Free Concord NC Relocation Starter Pack
          </h2>
          <p className={styles.subtitle}>
            Neighborhood guide, school ratings, cost breakdown, utility providers,
            and Franklin's personal recommendations — free, no obligation.
          </p>
        </div>

        {/* Adding 'dark' class here forces the Input and Select components to use their native dark mode styles */}
        <div className={`${styles.card} dark`}>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className={styles.form}>
              <div className={styles.fieldsGrid}>
                <FormItem name="fullName" className={styles.fieldItem}>
                  <FormLabel className={styles.label}>First Name</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Jane"
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

                <FormItem name="email" className={styles.fieldItem}>
                  <FormLabel className={styles.label}>Email Address</FormLabel>
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

                <FormItem name="movingFrom" className={styles.fieldItem}>
                  <FormLabel className={styles.label}>Where are you moving from?</FormLabel>
                  <FormControl>
                    <Select
                      value={form.values.movingFrom}
                      onValueChange={(val) =>
                        form.setValues((prev) => ({
                          ...prev,
                          movingFrom: val,
                        }))
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select location..." />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          <SelectItem value="New York City">New York City</SelectItem>
                          <SelectItem value="Washington DC">Washington DC</SelectItem>
                          <SelectItem value="Los Angeles">Los Angeles</SelectItem>
                          <SelectItem value="Chicago">Chicago</SelectItem>
                          <SelectItem value="Other">Other</SelectItem>
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              </div>

              <div className={styles.actionArea}>
                <Button
                  type="submit"
                  disabled={isPending}
                  size="lg"
                  className={styles.submitBtn}
                >
                  <Send size={18} />
                  {isPending ? "Processing..." : "Give Me the Free Guide"}
                </Button>
                <p className={styles.footerNote}>
                  Franklin personally reviews every request and responds within 4 hours.
                </p>
              </div>
            </form>
          </Form>
        </div>
      </div>
    </section>
  );
}