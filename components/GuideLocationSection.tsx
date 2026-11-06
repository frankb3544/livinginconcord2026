import React from "react";
import { Plane, Route, Car, Wifi } from "lucide-react";
import styles from "./GuideLocationSection.module.css";

const LOCATIONS = [
  {
    id: "airport",
    title: "Charlotte Douglas International Airport",
    description:
      "28 miles, approximately 30 minutes. Direct flights to NYC, DC, LA, Chicago, Miami, and Atlanta.",
    icon: Plane,
  },
  {
    id: "i85",
    title: "I-85 Corridor",
    description:
      "Connects directly to Charlotte to the south and Greensboro and Raleigh to the north — easy access to the entire Southeast.",
    icon: Route,
  },
  {
    id: "commute",
    title: "Uptown Charlotte Commute",
    description:
      "25–30 minutes by car depending on neighborhood. No toll roads.",
    icon: Car,
  },
  {
    id: "remote",
    title: "Remote Work Ready",
    description:
      "Fiber internet throughout Concord, growing local coffee and co-working scene including Juniper and Cabarrus Brewing.",
    icon: Wifi,
  },
];

interface Props {
  className?: string;
}

export function GuideLocationSection({ className }: Props) {
  return (
    <section className={`${styles.section} ${className || ""}`}>
      <div className={styles.container}>
        <div className={styles.header}>
          <h2 className={styles.title}>
            Concord's Location Is One of Its Biggest Selling Points
          </h2>
        </div>

        <div className={styles.grid}>
          {LOCATIONS.map((location) => {
            const Icon = location.icon;
            return (
              <div key={location.id} className={styles.card}>
                <div className={styles.cardHeader}>
                  <div className={styles.iconWrapper}>
                    <Icon size={24} className={styles.icon} />
                  </div>
                </div>
                <h3 className={styles.cardTitle}>{location.title}</h3>
                <p className={styles.cardDescription}>{location.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}