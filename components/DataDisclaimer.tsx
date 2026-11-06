import React from "react";
import { Info } from "lucide-react";
import styles from "./DataDisclaimer.module.css";

export interface DataDisclaimerProps {
  /**
   * The visual style of the disclaimer.
   * 'top' - More prominent, muted background block (ideal for top of a data section).
   * 'mid' - Subtle top/bottom borders with muted text (ideal for spacing between sections).
   */
  variant: "top" | "mid";
  /**
   * Topic-specific disclaimer text to be displayed.
   */
  text: string;
  /**
   * Optional additional class names.
   */
  className?: string;
}

export const DataDisclaimer: React.FC<DataDisclaimerProps> = ({
  variant,
  text,
  className,
}) => {
  return (
    <div className={`${styles.wrapper} ${className || ""}`}>
      <div className={`${styles.container} ${styles[variant]}`}>
        <Info className={styles.icon} aria-hidden="true" />
        <div className={styles.content}>
          <p className={styles.text}>{text}</p>
        </div>
      </div>
    </div>
  );
};