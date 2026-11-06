import React from "react";
import styles from "./AboutTheData.module.css";

export function AboutTheData({ className }: { className?: string }) {
  return (
    <section className={`${styles.section} ${className ?? ""}`}>
      <div className={styles.container}>
        <h2 className={styles.heading}>About This Data</h2>
        <p className={styles.body}>
          All market data presented on this page is compiled from the Cabarrus County Association of
          Realtors MLS (Multiple Listing Service) and Cabarrus County public records. Data is
          updated monthly and reflects closed residential transactions within the Concord NC market
          area. Statistics include single-family homes, townhomes, and condominiums. This
          information is deemed reliable but not guaranteed. For the most current and personalized
          market analysis, contact Franklin Bellamy directly.
        </p>
      </div>
    </section>
  );
}