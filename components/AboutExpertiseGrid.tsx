import React from "react";
import { Home, DollarSign, Plane, Gem, Hammer, Heart } from "lucide-react";
import styles from "./AboutExpertiseGrid.module.css";

const EXPERTISE_ITEMS = [
  {
    icon: <Home size={24} />,
    title: "Buyer Representation",
    description:
      "After 15+ years in Concord NC, I know every street, school zone, and hidden gem. I guide buyers from first showing to closing day with honest advice and deep local knowledge.",
  },
  {
    icon: <DollarSign size={24} />,
    title: "Seller Representation",
    description:
      "I combine Concord-specific market data with professional marketing and skilled negotiation to get your home sold at the best possible price.",
  },
  {
    icon: <Plane size={24} />,
    title: "Relocation Specialist",
    description:
      "With 15+ years in Concord NC since 2007, I guide out-of-state families through every step of the relocation process — from neighborhood selection to closing day.",
  },
  {
    icon: <Gem size={24} />,
    title: "Luxury Homes",
    description:
      "From Christenbury estates to Skybrook golf homes, I specialize in Concord's premium communities and know how to position luxury properties for maximum impact.",
  },
  {
    icon: <Hammer size={24} />,
    title: "New Construction",
    description:
      "Concord's new construction market is booming with communities like Roberta Ridge and Kellswater Bridge. I help you navigate builder contracts, lot selection, and construction timelines.",
  },
  {
    icon: <Heart size={24} />,
    title: "First-Time Buyers",
    description:
      "Buying your first home in Concord NC should be exciting, not stressful. I walk you through every step with patience, clear answers, and no pressure.",
  },
] as const;

export function AboutExpertiseGrid({ className }: { className?: string }) {
  return (
    <section className={`${styles.section} ${className || ""}`}>
      <div className={styles.container}>
        <h2 className={styles.heading}>Areas of Expertise</h2>
        <div className={styles.grid}>
          {EXPERTISE_ITEMS.map((item) => (
            <div key={item.title} className={styles.card}>
              <div className={styles.iconCircle}>{item.icon}</div>
              <h3 className={styles.cardTitle}>{item.title}</h3>
              <p className={styles.cardDesc}>{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}