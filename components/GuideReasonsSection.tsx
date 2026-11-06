import React from "react";
import {
  Home,
  MapPin,
  TrendingUp,
  GraduationCap,
  Wifi,
} from "lucide-react";
import styles from "./GuideReasonsSection.module.css";

const REASONS = [
  {
    id: "01",
    title: "Half the Cost, Same Quality of Life",
    description:
      "$375K median home vs $850K+ in major metros. Same square footage, better schools, bigger yard.",
    icon: Home,
  },
  {
    id: "02",
    title: "Charlotte Access Without Charlotte Prices",
    description:
      "25 miles from Uptown Charlotte, same airport 30 min away, same sports teams and restaurants — without the price tag.",
    icon: MapPin,
  },
  {
    id: "03",
    title: "Fastest-Growing City in the Southeast",
    description:
      "Population grew 18% since 2020, bringing new employers and infrastructure. Get in before it gets expensive.",
    icon: TrendingUp,
  },
  {
    id: "04",
    title: "Top-Rated Schools",
    description:
      "Cabarrus County Schools: 91.7% graduation rate, multiple magnet programs, public and private options within 10 minutes.",
    icon: GraduationCap,
  },
  {
    id: "05",
    title: "Remote-Work Friendly",
    description:
      "Fiber internet throughout, growing co-working scene, downtown coffee shops and restaurants that make working from home feel like living well.",
    icon: Wifi,
  },
];

interface Props {
  className?: string;
}

export function GuideReasonsSection({ className }: Props) {
  return (
    <section className={`${styles.section} ${className || ""}`}>
      <div className={styles.container}>
        <div className={styles.header}>
          <h2 className={styles.title}>
            5 Reasons Concord NC Is the Smartest Move You'll Make
          </h2>
        </div>

        <div className={styles.grid}>
          {REASONS.map((reason) => {
            const Icon = reason.icon;
            return (
              <div key={reason.id} className={styles.card}>
                <div className={styles.cardHeader}>
                  <div className={styles.iconWrapper}>
                    <Icon size={24} className={styles.icon} />
                  </div>
                  <span className={styles.numberBadge}>{reason.id}</span>
                </div>
                <h3 className={styles.cardTitle}>{reason.title}</h3>
                <p className={styles.cardDescription}>{reason.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}