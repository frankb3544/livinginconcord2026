import React from "react";
import { ShieldCheck, CheckCircle2 } from "lucide-react";
import styles from "./AboutCredentials.module.css";

const CREDENTIALS = [
  { label: "Role", value: "NC Licensed Real Estate Broker" },
  { label: "License State", value: "North Carolina" },
  { label: "Brokerage", value: "Lifestyle International Realty" },
  { label: "Specializations", value: "Buyer Representation, Seller Representation, Relocation" },
  { label: "MLS Member", value: "Canopy MLS (formerly CMLS)" },
  { label: "Association", value: "National Association of Realtors (NAR)" },
  { label: "Service Area", value: "Concord NC, Cabarrus County, Charlotte Metro, Harrisburg, Huntersville, Monroe, Kannapolis, Matthews, Mooresville, Rock Hill, Gastonia, Statesville" },
];

export function AboutCredentials({ className }: { className?: string }) {
  return (
    <section className={`${styles.section} ${className || ""}`}>
      <div className={styles.container}>
        <div className={styles.card}>
          <div className={styles.header}>
            <div className={styles.iconCircle}>
              <ShieldCheck size={32} />
            </div>
            <h2 className={styles.heading}>Professional Credentials</h2>
            <p className={styles.subheading}>
              Official licensure and association memberships verified in the state of North Carolina.
            </p>
          </div>
          
          <div className={styles.list}>
            {CREDENTIALS.map((cred) => (
              <div key={cred.label} className={styles.listItem}>
                <div className={styles.itemIcon}>
                  <CheckCircle2 size={18} />
                </div>
                <div className={styles.itemContent}>
                  <span className={styles.itemLabel}>{cred.label}</span>
                  <span className={styles.itemValue}>{cred.value}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}