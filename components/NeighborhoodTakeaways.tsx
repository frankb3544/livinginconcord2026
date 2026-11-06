import React from "react";
import { DollarSign, Clock, GraduationCap } from "lucide-react";
import styles from "./NeighborhoodTakeaways.module.css";

export const KEY_TAKEAWAYS_DATA: Record<string, { medianPrice: string; commute: string; schoolZone: string; openingLine: string }> = {
  "highland-creek": { medianPrice: "$465,000", commute: "25–30 min to Uptown Charlotte", schoolZone: "Mecklenburg and Cabarrus Schools — Top-Rated District", openingLine: "Highland Creek is a premier master-planned community in Concord, NC." },
  "skybrook": { medianPrice: "$725,000", commute: "25–30 min to Uptown Charlotte", schoolZone: "Mecklenburg and Cabarrus Schools — Top-Rated District", openingLine: "Skybrook is a premier master-planned community in Concord, NC." },
  "winding-walk": { medianPrice: "$650,000", commute: "25–30 min to Uptown Charlotte", schoolZone: "Cabarrus Schools — Top-Rated District", openingLine: "Winding Walk is a premier master-planned community in Concord, NC." },
  "afton-village": { medianPrice: "$475,000", commute: "25–30 min to Uptown Charlotte", schoolZone: "Cabarrus Schools — Top-Rated District", openingLine: "Afton Village is a charming, walkable community in Concord, NC." },
  "christenbury": { medianPrice: "$950,000", commute: "25–30 min to Uptown Charlotte", schoolZone: "Cabarrus Schools — Top-Rated District", openingLine: "Christenbury is an upscale, master-planned community in Concord, NC." },
  "kellswater-bridge": { medianPrice: "$510,000", commute: "25–30 min to Uptown Charlotte", schoolZone: "Cabarrus Schools — Top-Rated District", openingLine: "Kellswater Bridge is a vibrant neighborhood in Concord, NC." },
  "laurel-park": { medianPrice: "$575,000", commute: "25–30 min to Uptown Charlotte", schoolZone: "Cabarrus Schools — Top-Rated District", openingLine: "Laurel Park is an established community in Concord, NC." },
  "moss-creek": { medianPrice: "$485,000", commute: "25–30 min to Uptown Charlotte", schoolZone: "Cabarrus Schools — Top-Rated District", openingLine: "Moss Creek is a peaceful community in Concord, NC." },
  "roberta-ridge": { medianPrice: "$445,000", commute: "25–30 min to Uptown Charlotte", schoolZone: "Cabarrus Schools — Top-Rated District", openingLine: "Roberta Ridge is a welcoming neighborhood in Concord, NC." },
  "cox-mill": { medianPrice: "$500,000", commute: "25–30 min to Uptown Charlotte", schoolZone: "Cabarrus Schools — Top-Rated District", openingLine: "The Cox Mill area features top-rated schools and wonderful communities in Concord, NC." },
  "mills-at-rocky-river": { medianPrice: "$340,000", commute: "25–30 min to Uptown Charlotte", schoolZone: "Cabarrus Schools — Top-Rated District", openingLine: "The Mills at Rocky River is a growing community in Concord, NC." },
};

interface NeighborhoodTakeawaysProps {
  slug: string;
}

export function NeighborhoodTakeaways({ slug }: NeighborhoodTakeawaysProps) {
  const data = KEY_TAKEAWAYS_DATA[slug];
  if (!data) return null;

  return (
    <section className={styles.takeawaysSection}>
      <div className={styles.takeawaysContainer}>
        <div className={styles.takeawaysCard}>
          <h2 className={styles.takeawaysTitle}>Key Takeaways</h2>
          <ul className={styles.takeawaysList}>
            <li className={styles.takeawaysItem}>
              <div className={styles.takeawayIconWrapper}><DollarSign size={20} /></div>
              <span><strong>2026 Median Home Price:</strong> {data.medianPrice}</span>
            </li>
            <li className={styles.takeawaysItem}>
              <div className={styles.takeawayIconWrapper}><Clock size={20} /></div>
              <span><strong>Commute to Uptown Charlotte:</strong> {data.commute}</span>
            </li>
            <li className={styles.takeawaysItem}>
              <div className={styles.takeawayIconWrapper}><GraduationCap size={20} /></div>
              <span><strong>Top-Rated School Zone:</strong> {data.schoolZone}</span>
            </li>
          </ul>
          <p className={styles.takeawaysOpeningLine}>
            {data.openingLine}
          </p>
        </div>
      </div>
    </section>
  );
}