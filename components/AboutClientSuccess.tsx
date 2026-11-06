import React from "react";
import { Star, Quote } from "lucide-react";
import styles from "./AboutClientSuccess.module.css";

const TESTIMONIALS = [
  {
    name: "Sarah M.",
    quote: "Franklin made our move from out of state seamless. His knowledge of Concord neighborhoods helped us find the perfect home for our family.",
  },
  {
    name: "David & Priya K.",
    quote: "Incredibly responsive and professional. He negotiated a great deal for us and walked us through every step of the buying process.",
  },
  {
    name: "Jason T.",
    quote: "If you're selling in Cabarrus County, Franklin is the guy. His marketing strategy got our house sold in under a week above asking price.",
  },
];

export function AboutClientSuccess({ className }: { className?: string }) {
  return (
    <section className={`${styles.section} ${className || ""}`}>
      <div className={styles.container}>
        <div className={styles.topHeader}>
          <div className={styles.statsContainer}>
            <div className={styles.statBox}>
              <div className={styles.statValue}>4.9</div>
              <div className={styles.stars}>
                <Star size={20} fill="currentColor" />
                <Star size={20} fill="currentColor" />
                <Star size={20} fill="currentColor" />
                <Star size={20} fill="currentColor" />
                <Star size={20} fill="currentColor" />
              </div>
              <div className={styles.statLabel}>Average Client Rating</div>
            </div>
            
            <div className={styles.divider} />
            
            <div className={styles.statBox}>
              <div className={styles.statValue}>100+</div>
              <div className={styles.statLabel}>Families Helped</div>
            </div>
          </div>
        </div>

        <h2 className={styles.heading}>Verified Client Success</h2>
        
        <div className={styles.grid}>
          {TESTIMONIALS.map((item, idx) => (
            <div key={idx} className={styles.card}>
              <Quote size={28} className={styles.quoteIcon} />
              <p className={styles.quoteText}>"{item.quote}"</p>
              <div className={styles.clientName}>— {item.name}</div>
            </div>
          ))}
        </div>
        
        <p className={styles.disclaimer}>
          * Ratings verified via client surveys and third-party review platforms.
        </p>
      </div>
    </section>
  );
}