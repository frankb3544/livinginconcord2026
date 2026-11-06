import React from "react";
import { Lock } from "lucide-react";
import styles from "./GuideTableOfContents.module.css";

interface Chapter {
  number: number;
  title: string;
  description: string;
}

const CHAPTERS: Chapter[] = [
  { number: 1, title: "Welcome to Concord NC", description: "Why Concord is the #1 destination in the Charlotte metro area" },
  { number: 2, title: "Cost of Living", description: "Housing, utilities, groceries & how Concord compares to Charlotte" },
  { number: 3, title: "Best Neighborhoods", description: "In-depth profiles of Afton Village, Christenbury, Highland Creek & more" },
  { number: 4, title: "Schools & Education", description: "Cabarrus County Schools ratings, private options & higher education" },
  { number: 5, title: "Employment & Economy", description: "Major employers, job market trends & commuting to Charlotte" },
  { number: 6, title: "Things to Do", description: "Entertainment, dining, outdoor recreation & the motorsports scene" },
  { number: 7, title: "Healthcare", description: "Atrium Health Cabarrus, urgent care & specialist access" },
  { number: 8, title: "Transportation", description: "I-85 corridor, airports, local transit & commute times" },
  { number: 9, title: "Weather & Climate", description: "Four seasons, what to expect & how to prepare" },
  { number: 10, title: "Tips for Your Move", description: "Practical checklist, utilities setup & first-week essentials" },
];

interface Props {
  className?: string;
}

export function GuideTableOfContents({ className }: Props) {
  return (
    <section className={`${styles.section} ${className || ""}`}>
      <div className={styles.container}>
        <div className={styles.sectionHeader}>
          <h2 className={styles.sectionTitle}>What's Inside the Guide</h2>
          <p className={styles.sectionSubtitle}>
            10 comprehensive chapters covering every aspect of relocating to Concord NC.
          </p>
        </div>

        <div className={styles.tocWrapper}>
          <div className={styles.tocHeader}>
            <div className={styles.tocHeaderLabel}>
              <Lock size={14} />
              <span>PDF Guide — Free Download</span>
            </div>
          </div>
          <div className={styles.chaptersGrid}>
            {CHAPTERS.map((chapter) => (
              <div key={chapter.number} className={styles.chapterRow}>
                <div className={styles.chapterNumber}>{chapter.number}</div>
                <div className={styles.chapterContent}>
                  <div className={styles.chapterTitle}>{chapter.title}</div>
                  <div className={styles.chapterDescription}>{chapter.description}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}