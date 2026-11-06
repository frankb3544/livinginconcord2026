import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { Button } from "./Button";
import styles from "./GuideNeighborhoodMatch.module.css";

const MATCHES = [
  {
    id: "afton-village",
    persona: "Coming from NYC / Want Walkability",
    neighborhood: "Afton Village",
    description: "Town center design, walkable main street",
    price: "$300K–$680K",
    link: "/neighborhoods/afton-village",
  },
  {
    id: "christenbury",
    persona: "Coming from DC / Want Top Schools",
    neighborhood: "Christenbury",
    description: "Award-winning schools, HOA community",
    price: "$650K–$1.6M",
    link: "/neighborhoods/christenbury",
  },
  {
    id: "skybrook",
    persona: "Coming from LA / Want Modern & Outdoorsy",
    neighborhood: "Skybrook",
    description: "New construction, golf and trails",
    price: "$400K–$1.3M",
    link: "/neighborhoods/skybrook",
  },
  {
    id: "cox-mill",
    persona: "First-Time Buyer / Want Value",
    neighborhood: "The Cox Mill Area",
    description: "Great schools, family neighborhood",
    price: "$375K–$800K",
    link: "/neighborhoods/cox-mill",
  },
  {
    id: "downtown",
    persona: "Investor / Want Upside",
    neighborhood: "Downtown Concord",
    description: "Historic district, fast appreciating",
    price: "$200K–$350K",
    link: "/neighborhoods/downtown-concord",
  },
];

interface Props {
  className?: string;
}

export function GuideNeighborhoodMatch({ className }: Props) {
  return (
    <section className={`${styles.section} ${className || ""}`}>
      <div className={styles.container}>
        <div className={styles.header}>
          <h2 className={styles.title}>
            Which Concord Neighborhood Fits Your Lifestyle?
          </h2>
        </div>

        <div className={styles.grid}>
          {MATCHES.map((match) => (
            <div key={match.id} className={styles.card}>
              <div className={styles.tagWrapper}>
                <span className={styles.tag}>{match.persona}</span>
              </div>
              <h3 className={styles.neighborhoodName}>{match.neighborhood}</h3>
              <p className={styles.description}>{match.description}</p>
              <div className={styles.price}>{match.price}</div>
              <Link to={match.link} className={styles.link}>
                View Neighborhood <ArrowRight size={16} />
              </Link>
            </div>
          ))}
        </div>

        <div className={styles.ctaBox}>
          <div className={styles.ctaContent}>
            <h3 className={styles.ctaTitle}>Not sure which neighborhood fits you?</h3>
            <p className={styles.ctaDescription}>
              Contact Franklin for a free Neighborhood Match Consultation.
            </p>
          </div>
          <Button asChild size="lg" className={styles.ctaButton}>
            <Link to="/contact">Get Your Free Neighborhood Match</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}