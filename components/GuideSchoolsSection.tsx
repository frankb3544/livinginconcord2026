import React from "react";
import { Link } from "react-router-dom";
import { GraduationCap, BookOpen, Sparkles } from "lucide-react";
import { Button } from "./Button";
import styles from "./GuideSchoolsSection.module.css";

const SCHOOLS = [
  {
    id: "cox-mill",
    name: "Cox Mill High School",
    tag: "8–9/10 GreatSchools",
    description:
      "One of the top-rated high schools in Cabarrus County, serving The Cox Mill Area and Skybrook communities.",
    icon: GraduationCap,
  },
  {
    id: "winkler",
    name: "Winkler Elementary",
    tag: "Christenbury Area",
    description:
      "Highly regarded elementary school serving the Christenbury neighborhood and surrounding communities.",
    icon: BookOpen,
  },
  {
    id: "boger",
    name: "Charles E. Boger Elementary",
    tag: "Afton Village Area",
    description:
      "Well-established elementary school serving the Afton Village area with strong community involvement.",
    icon: BookOpen,
  },
];

interface Props {
  className?: string;
}

export function GuideSchoolsSection({ className }: Props) {
  return (
    <section className={`${styles.section} ${className || ""}`}>
      <div className={styles.container}>
        <div className={styles.header}>
          <h2 className={styles.title}>
            Concord NC Schools — What Every Relocating Family Needs to Know
          </h2>
          <p className={styles.intro}>
            Cabarrus County Schools has a 91.7% graduation rate, 28 elementary
            schools, 8 middle schools, and 5 high schools — ranked among the top
            districts in the Charlotte metro region.
          </p>
        </div>

        <div className={styles.grid}>
          {SCHOOLS.map((school) => {
            const Icon = school.icon;
            return (
              <div key={school.id} className={styles.card}>
                <div className={styles.cardHeader}>
                  <div className={styles.iconWrapper}>
                    <Icon size={24} className={styles.icon} />
                  </div>
                </div>
                <div className={styles.tagWrapper}>
                  <span className={styles.tag}>{school.tag}</span>
                </div>
                <h3 className={styles.schoolName}>{school.name}</h3>
                <p className={styles.cardDescription}>{school.description}</p>
              </div>
            );
          })}
        </div>

        <div className={styles.callout}>
          <div className={styles.calloutIcon}>
            <Sparkles size={24} />
          </div>
          <div className={styles.calloutContent}>
            <p className={styles.calloutText}>
              Cabarrus County offers magnet programs in STEM, arts, and early
              college — applications open each fall.
            </p>
          </div>
        </div>

        <div className={styles.privateSchools}>
          <h3 className={styles.subheading}>Private School Options</h3>
          <p className={styles.privateText}>
            Cabarrus Academy, First Assembly Christian School, and several
            Charlotte-area private schools are within a 30-minute drive.
          </p>
        </div>

        <div className={styles.ctaBlock}>
          <p className={styles.ctaText}>
            Want to know which schools serve a specific neighborhood? Ask
            Franklin.
          </p>
          <Button asChild size="lg" className={styles.ctaButton}>
            <Link to="/contact">Ask Franklin About Schools</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}