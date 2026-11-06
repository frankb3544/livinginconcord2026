import React from "react";
import styles from "./MovingFromNycTimeline.module.css";

export function MovingFromNycTimeline() {
  return (
    <div className={styles.timeline}>
      <div className={styles.timelineStep}>
        <div className={styles.timelineTitle}>3 Months Out</div>
        <p>
          Contact Franklin at (704) 904-5142 to start your home search remotely. Get pre-approved
          for a mortgage. Research school zones and decide which neighborhoods fit your priorities.
          Begin decluttering — moving cross-region is an opportunity to get lean. Request transfer
          of school and medical records. Get three quotes from NYC-to-Concord moving companies.
          Give notice to your landlord or list your NYC property.
        </p>
      </div>
      
      <div className={styles.timelineStep}>
        <div className={styles.timelineTitle}>1 Month Out</div>
        <p>
          Confirm your moving company and date in writing. Forward mail via USPS from your NY
          address. Transfer subscriptions, banking, and insurance to new address. Confirm utilities
          setup for your Concord home. Finalize remote work or employer address change documentation.
        </p>
      </div>
      
      <div className={styles.timelineStep}>
        <div className={styles.timelineTitle}>2 Weeks Out</div>
        <p>
          Confirm moving truck date and HOA access logistics. Confirm closing date and wire transfer
          timing with your attorney. Transfer prescriptions and identify a Concord-area pharmacy.
          Complete any final NYC obligations. Pack an open-first box with essentials for your first
          48 hours.
        </p>
      </div>
      
      <div className={styles.timelineStep}>
        <div className={styles.timelineTitle}>Moving Day</div>
        <p>
          Photograph your NYC property before you leave. Confirm all Concord utilities are active
          before you arrive. Keep closing documents accessible — not in the moving truck. Text
          Franklin when you land.
        </p>
      </div>
    </div>
  );
}