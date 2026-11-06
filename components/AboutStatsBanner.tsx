import React from "react";
import styles from "./AboutStatsBanner.module.css";

const STATS = [
  { value: "100+", label: "Families Helped" },
  { value: "15+", label: "Years in Concord NC" },
  { value: "11+", label: "Neighborhoods Covered" },
] as const;

export function AboutStatsBanner({ className }: { className?: string }) {
  return (
    <section className={`${styles.section} ${className || ""}`}>
      <div className={styles.inner}>
        <h2 className={styles.heading}>By the Numbers</h2>
        <div className={styles.statsRow}>
          {STATS.map((stat, i) => (
            <div key={i} className={styles.statBlock}>
              <div className={styles.statValue}>{stat.value}</div>
              <div className={styles.statLabel}>{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}