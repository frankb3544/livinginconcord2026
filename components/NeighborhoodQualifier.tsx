import React, { useState, useCallback, useEffect } from "react";
import { Link } from "react-router-dom";
import { z } from "zod";
import { ArrowLeft, CheckCircle2 } from "lucide-react";
import { useSubmitContact } from "../helpers/useSubmitContact";
import { Button } from "./Button";
import { Input } from "./Input";
import {
  Form,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
  useForm,
} from "./Form";
import styles from "./NeighborhoodQualifier.module.css";

const MOTIVATION_OPTIONS = [
  "Relocating from out of state",
  "Moving within the Charlotte area",
  "Upgrading or downsizing locally",
  "Just exploring for now",
];

const MOTIVATION_OPTIONS_B = [
  { label: "Relocating from out of state", icon: "✈️" },
  { label: "Moving within the Charlotte area", icon: "🚗" },
  { label: "Upgrading or downsizing locally", icon: "🏠" },
  { label: "Just exploring for now", icon: "🔍" },
];

const TIMELINE_OPTIONS = [
  "Within the next 90 days",
  "3 to 6 months from now",
  "6 to 12 months out",
  "Still in early research mode",
];

const TIMELINE_OPTIONS_B = [
  { label: "Within the next 90 days", icon: "🏃" },
  { label: "3 to 6 months from now", icon: "📅" },
  { label: "6 to 12 months out", icon: "⏳" },
  { label: "Still in early research mode", icon: "🧐" },
];

const BUDGET_OPTIONS = [
  "Under $400,000",
  "$400,000 to $600,000",
  "$600,000 to $800,000",
  "$800,000 and above",
];

const BUDGET_OPTIONS_B = [
  { label: "Under $400,000", icon: "💵" },
  { label: "$400,000 to $600,000", icon: "💰" },
  { label: "$600,000 to $800,000", icon: "💎" },
  { label: "$800,000 and above", icon: "👑" },
];

const CALL_TIME_OPTIONS_B = [
  { label: "Morning (8am–12pm)", icon: "🌅" },
  { label: "Afternoon (12pm–5pm)", icon: "☀️" },
  { label: "Evening (5pm–8pm)", icon: "🌙" },
];

const contactSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  phone: z.string().min(10, "Please enter a valid phone number"),
  email: z
    .string()
    .email("Please enter a valid email")
    .optional()
    .or(z.literal("")),
});

type ContactFormValues = z.infer<typeof contactSchema>;

interface NeighborhoodQualifierProps {
  neighborhoodName: string;
  className?: string;
}

export function NeighborhoodQualifier({
  neighborhoodName,
  className,
}: NeighborhoodQualifierProps) {
  const [variant, setVariant] = useState<"A" | "B" | null>(null);
  
  useEffect(() => {
    const stored = localStorage.getItem("qualifierVariant") as "A" | "B" | null;
    if (stored === "A" || stored === "B") {
      setVariant(stored);
    } else {
      const newVariant = Math.random() < 0.5 ? "A" : "B";
      localStorage.setItem("qualifierVariant", newVariant);
      setVariant(newVariant);
    }
  }, []);

  const [step, setStep] = useState<number>(1);
  const [motivation, setMotivation] = useState<string>("");
  const [timeline, setTimeline] = useState<string>("");
  const [budget, setBudget] = useState<string>("");
  const [preferredCallTime, setPreferredCallTime] = useState<string>("");
  const [customTime, setCustomTime] = useState<string>("");
  const [submittedName, setSubmittedName] = useState<string>("");

  const submitMutation = useSubmitContact();

  const form = useForm<typeof contactSchema>({
    schema: contactSchema,
    defaultValues: {
      firstName: "",
      phone: "",
      email: "",
    },
  });

  const handleOptionSelect = useCallback(
    (
      value: string,
      setter: React.Dispatch<React.SetStateAction<string>>,
      nextStep: number
    ) => {
      setter(value);
      // Brief delay to show the selected highlight state before advancing
      setTimeout(() => {
        setStep(nextStep);
      }, 350);
    },
    []
  );

  const handleCustomTimeSubmit = useCallback(() => {
    if (customTime.trim()) {
      setPreferredCallTime(customTime);
      setStep(5);
    }
  }, [customTime]);

  const goBack = useCallback(() => {
    setStep((prev) => Math.max(1, prev - 1));
  }, []);

  const onSubmit = useCallback(
    (values: ContactFormValues) => {
      const finalEmail = values.email?.trim()
        ? values.email.trim()
        : "not_provided@placeholder.com";

      const finalCallTime =
        preferredCallTime === "custom" ? customTime : preferredCallTime;

      submitMutation.mutate(
        {
          fullName: values.firstName,
          phone: values.phone,
          email: finalEmail,
          interestedIn: neighborhoodName,
          message: "Neighborhood Qualifier Submission",
          motivation,
          timeline,
          budget,
          sourceNeighborhood: neighborhoodName,
          qualifierVariant: variant,
          preferredCallTime: variant === "B" ? finalCallTime : null,
        },
        {
          onSuccess: () => {
            setSubmittedName(values.firstName);
            setStep(variant === "B" ? 6 : 5);
          },
          onError: (error) => {
            console.error("Failed to submit neighborhood qualifier:", error);
            form.setFieldError(
              "firstName",
              "Something went wrong. Please try again."
            );
          },
        }
      );
    },
    [
      neighborhoodName,
      motivation,
      timeline,
      budget,
      preferredCallTime,
      customTime,
      variant,
      submitMutation,
      form,
    ]
  );

  if (!variant) {
    return null; // Or a skeleton, but hiding until mounted is fine
  }

  const isB = variant === "B";
  const maxSteps = isB ? 5 : 4;
  const contactStep = isB ? 5 : 4;
  const successStep = isB ? 6 : 5;

  const progressPercentage = Math.min(100, (step / maxSteps) * 100);

  return (
    <div
      className={`${styles.container} ${isB ? styles.containerB : ""} ${
        isB ? "" : "dark"
      } ${className || ""}`}
    >
      {step < successStep && (
        <div className={styles.progressContainer}>
          <div
            className={`${styles.progressBar} ${
              isB ? styles.progressBarB : ""
            }`}
            style={{ width: `${progressPercentage}%` }}
          />
        </div>
      )}

      <div className={styles.content}>
        <div className={styles.badgeContainer}>
          <span className={`${styles.badge} ${isB ? styles.badgeB : ""}`}>
            Free • No Obligation
          </span>
        </div>

        {step < successStep && step > 1 && (
          <button
            type="button"
            onClick={goBack}
            className={styles.backButton}
            aria-label="Go back to previous step"
          >
            <ArrowLeft size={16} />
            <span>Back</span>
          </button>
        )}

        <div className={styles.stepWrapper} key={step}>
          {step === 1 && (
            <div className={styles.stepAnimation}>
              <h3 className={`${styles.title} ${isB ? styles.titleB : ""}`}>
                {isB
                  ? `Get Your Free Personalized ${neighborhoodName} Report`
                  : `Find Out If ${neighborhoodName} Is the Right Fit for You`}
              </h3>
              {isB && (
                <p className={`${styles.socialProof} ${styles.socialProofB}`}>
                  Join 50+ families Franklin has helped relocate to Concord
                </p>
              )}
              <p className={`${styles.question} ${isB ? styles.questionB : ""}`}>What brings you to Concord NC?</p>
              <div className={styles.optionsList}>
                {isB
                  ? MOTIVATION_OPTIONS_B.map((opt) => (
                      <button
                        key={opt.label}
                        onClick={() =>
                          handleOptionSelect(opt.label, setMotivation, 2)
                        }
                        className={`${styles.optionBtn} ${
                          styles.optionBtnB
                        } ${
                          motivation === opt.label ? styles.selected : ""
                        }`}
                      >
                        <span className={styles.optionIcon}>{opt.icon}</span>
                        {opt.label}
                      </button>
                    ))
                  : MOTIVATION_OPTIONS.map((opt) => (
                      <button
                        key={opt}
                        onClick={() => handleOptionSelect(opt, setMotivation, 2)}
                        className={`${styles.optionBtn} ${
                          motivation === opt ? styles.selected : ""
                        }`}
                      >
                        {opt}
                      </button>
                    ))}
              </div>
            </div>
          )}

          {step === 2 && (
            <div className={styles.stepAnimation}>
              <h3 className={`${styles.title} ${isB ? styles.titleB : ""}`}>
                {isB
                  ? `Get Your Free Personalized ${neighborhoodName} Report`
                  : `Find Out If ${neighborhoodName} Is the Right Fit for You`}
              </h3>
              {isB && (
                <p className={`${styles.socialProof} ${styles.socialProofB}`}>
                  Join 50+ families Franklin has helped relocate to Concord
                </p>
              )}
              <p className={`${styles.question} ${isB ? styles.questionB : ""}`}>
                When are you looking to make a move?
              </p>
              <div className={styles.optionsList}>
                {isB
                  ? TIMELINE_OPTIONS_B.map((opt) => (
                      <button
                        key={opt.label}
                        onClick={() =>
                          handleOptionSelect(opt.label, setTimeline, 3)
                        }
                        className={`${styles.optionBtn} ${
                          styles.optionBtnB
                        } ${timeline === opt.label ? styles.selected : ""}`}
                      >
                        <span className={styles.optionIcon}>{opt.icon}</span>
                        {opt.label}
                      </button>
                    ))
                  : TIMELINE_OPTIONS.map((opt) => (
                      <button
                        key={opt}
                        onClick={() => handleOptionSelect(opt, setTimeline, 3)}
                        className={`${styles.optionBtn} ${
                          timeline === opt ? styles.selected : ""
                        }`}
                      >
                        {opt}
                      </button>
                    ))}
              </div>
            </div>
          )}

          {step === 3 && (
            <div className={styles.stepAnimation}>
              <h3 className={`${styles.title} ${isB ? styles.titleB : ""}`}>
                {isB
                  ? `Get Your Free Personalized ${neighborhoodName} Report`
                  : `Find Out If ${neighborhoodName} Is the Right Fit for You`}
              </h3>
              {isB && (
                <p className={`${styles.socialProof} ${styles.socialProofB}`}>
                  Join 50+ families Franklin has helped relocate to Concord
                </p>
              )}
              <p className={`${styles.question} ${isB ? styles.questionB : ""}`}>
                What is your target home budget?
              </p>
              <div className={styles.optionsList}>
                {isB
                  ? BUDGET_OPTIONS_B.map((opt) => (
                      <button
                        key={opt.label}
                        onClick={() =>
                          handleOptionSelect(opt.label, setBudget, 4)
                        }
                        className={`${styles.optionBtn} ${
                          styles.optionBtnB
                        } ${budget === opt.label ? styles.selected : ""}`}
                      >
                        <span className={styles.optionIcon}>{opt.icon}</span>
                        {opt.label}
                      </button>
                    ))
                  : BUDGET_OPTIONS.map((opt) => (
                      <button
                        key={opt}
                        onClick={() => handleOptionSelect(opt, setBudget, 4)}
                        className={`${styles.optionBtn} ${
                          budget === opt ? styles.selected : ""
                        }`}
                      >
                        {opt}
                      </button>
                    ))}
              </div>
            </div>
          )}

          {isB && step === 4 && (
            <div className={styles.stepAnimation}>
              <h3 className={`${styles.title} ${styles.titleB}`}>
                Get Your Free Personalized {neighborhoodName} Report
              </h3>
              <p className={`${styles.socialProof} ${styles.socialProofB}`}>
                Join 50+ families Franklin has helped relocate to Concord
              </p>
              <p className={`${styles.question} ${styles.questionB}`}>
                When is the best time for Franklin to reach out?
              </p>
              <div className={styles.optionsList}>
                {CALL_TIME_OPTIONS_B.map((opt) => (
                  <button
                    key={opt.label}
                    onClick={() =>
                      handleOptionSelect(opt.label, setPreferredCallTime, 5)
                    }
                    className={`${styles.optionBtn} ${styles.optionBtnB} ${
                      preferredCallTime === opt.label ? styles.selected : ""
                    }`}
                  >
                    <span className={styles.optionIcon}>{opt.icon}</span>
                    {opt.label}
                  </button>
                ))}
                <div className={styles.customTimeWrapper}>
                  <button
                    onClick={() => setPreferredCallTime("custom")}
                    className={`${styles.optionBtn} ${styles.optionBtnB} ${
                      preferredCallTime === "custom" ? styles.selected : ""
                    }`}
                  >
                    <span className={styles.optionIcon}>✍️</span>
                    Specific Time...
                  </button>
                  {preferredCallTime === "custom" && (
                    <div className={styles.customTimeInputContainer}>
                      <Input
                        placeholder="e.g. Tomorrow at 10:30am"
                        value={customTime}
                        onChange={(e) => setCustomTime(e.target.value)}
                        className={styles.customTimeInput}
                      />
                      <Button
                        onClick={handleCustomTimeSubmit}
                        disabled={!customTime.trim()}
                        className={styles.customTimeSubmitBtn}
                      >
                        Next
                      </Button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {step === contactStep && (
            <div className={styles.stepAnimation}>
              <h3 className={`${styles.title} ${isB ? styles.titleB : ""}`}>
                Last step — where should Franklin send your personalized{" "}
                {neighborhoodName} breakdown?
              </h3>
              <p className={`${styles.subtext} ${isB ? styles.subtextB : ""}`}>
                Franklin responds personally within 4 hours. No spam. No
                pressure. Just answers.
              </p>

              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className={styles.contactForm}
                >
                  <FormItem name="firstName">
                    <FormLabel>First Name</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Jane"
                        value={form.values.firstName}
                        onChange={(e) =>
                          form.setValues((prev) => ({
                            ...prev,
                            firstName: e.target.value,
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
                        placeholder="(704) 555-0123"
                        value={form.values.phone}
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

                  <FormItem name="email">
                    <FormLabel>Email (Optional)</FormLabel>
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

                  <Button
                    type="submit"
                    size="lg"
                    className={`${styles.submitBtn} ${
                      isB ? styles.submitBtnB : ""
                    }`}
                    disabled={submitMutation.isPending}
                  >
                    {submitMutation.isPending
                      ? "Sending..."
                      : "Get My Personalized Breakdown →"}
                  </Button>
                </form>
              </Form>
            </div>
          )}

          {step === successStep && (
            <div className={`${styles.stepAnimation} ${styles.successState}`}>
              <CheckCircle2
                className={styles.successIcon}
                size={48}
                aria-hidden="true"
              />
              <h3 className={styles.successTitle}>
                You're all set, {submittedName || "there"}.
              </h3>
              <p className={styles.successMessage}>
                Franklin will reach out within 1–2 hours with your personalized{" "}
                <strong>{neighborhoodName}</strong> guide and current pricing.
                In the meantime — explore more Concord NC neighborhoods.
              </p>
              <Button asChild size="lg" className={styles.exploreMoreBtn}>
                <Link to="/neighborhoods">Explore Neighborhoods</Link>
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}