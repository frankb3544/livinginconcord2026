import React, { useState } from "react";
import { toast } from "sonner";
import { Mail } from "lucide-react";
import { useMarketUpdateSignup } from "../helpers/useMarketUpdateSignup";
import { Input } from "./Input";
import { Button } from "./Button";
import styles from "./MarketUpdateSignupSection.module.css";

export function MarketUpdateSignupSection({ className }: { className?: string }) {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");

  const { mutate, isPending } = useMarketUpdateSignup();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    mutate(
      { fullName, email },
      {
        onSuccess: () => {
          toast.success("You're subscribed!", {
            description: "Look for Franklin's next market update in your inbox.",
          });
          setFullName("");
          setEmail("");
        },
        onError: (error) => {
          toast.error("Signup failed", {
            description: error instanceof Error ? error.message : "Please try again.",
          });
        },
      }
    );
  };

  return (
    <section className={`${styles.section} ${className ?? ""}`}>
      <div className={styles.container}>
        <div className={styles.inner}>
          <div className={styles.textBlock}>
            <div className={styles.iconRow}>
              <Mail size={28} className={styles.mailIcon} />
            </div>
            <h2 className={styles.heading}>Get Franklin's Monthly Market Update</h2>
            <p className={styles.subheading}>
              Stay ahead of the market. Get exclusive pricing data, inventory trends, and neighborhood insights delivered to your inbox every month.
            </p>
          </div>
          <form className={styles.form} onSubmit={handleSubmit}>
            <div className={styles.fields}>
              <Input
                type="text"
                placeholder="Full Name"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                required
                className={styles.input}
                disabled={isPending}
              />
              <Input
                type="email"
                placeholder="Email Address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className={styles.input}
                disabled={isPending}
              />
              <Button
                type="submit"
                size="lg"
                disabled={isPending}
                className={styles.submitButton}
              >
                {isPending ? "Subscribing…" : "Subscribe"}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}