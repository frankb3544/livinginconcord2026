import React from "react";
import { Link } from "react-router-dom";
import { CheckCircle2 } from "lucide-react";
import { Button } from "./Button";
import styles from "./GuideRelocationSpecialist.module.css";

const BULLET_POINTS = [
  "Free 30-minute Neighborhood Match Call by video or phone.",
  "Virtual neighborhood walkthroughs via Zoom.",
  "Pre-arrival itinerary if you're flying in for a weekend visit.",
  "Full Relocation Resource Pack covering utilities, schools, local services, and moving companies.",
  "Ongoing support through closing and beyond.",
];

interface Props {
  className?: string;
}

export function GuideRelocationSpecialist({ className }: Props) {
  return (
    <section className={`${styles.section} ${className || ""}`}>
      <div className={styles.container}>
        <div className={styles.card}>
          <div className={styles.grid}>
            <div className={styles.imageColumn}>
              <img
                src="https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800&q=80"
                alt="Franklin Bellamy — Concord NC Relocation Specialist"
                className={styles.image}
                loading="lazy"
                width={280}
                height={280}
                decoding="async"
              />
            </div>
            
            <div className={styles.contentColumn}>
              <h2 className={styles.title}>
                Franklin Bellamy Specializes in Out-of-State Relocations.
              </h2>
              
              <blockquote className={styles.quote}>
                "Most of my clients have never set foot in Concord before they call me. That's exactly how I like it. I offer virtual neighborhood tours, pre-arrival consultation calls, and a full relocation resource pack so you can make a confident decision — whether you visit once or buy remotely."
              </blockquote>

              <ul className={styles.bulletList}>
                {BULLET_POINTS.map((point, index) => (
                  <li key={index} className={styles.bulletItem}>
                    <CheckCircle2 className={styles.icon} size={20} />
                    <span>{point}</span>
                  </li>
                ))}
              </ul>

              <div className={styles.actionArea}>
                <Button asChild size="lg" className={styles.ctaButton}>
                  <Link to="/contact">Schedule Your Free Relocation Call</Link>
                </Button>
                <a href="tel:7049045142" className={styles.phoneLink}>
                  (704) 904-5142
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}