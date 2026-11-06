import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import styles from "./GuideExploreMore.module.css";

const guides = [
  {
    title: "Cabarrus County Real Estate Guide",
    description: "A complete overview of the county, housing trends, and what makes it special.",
    link: "/moving-to-concord/cabarrus-county"
  },
  {
    title: "Cost of Living in Concord NC",
    description: "What housing, taxes, utilities, and daily life actually cost — with real May 2026 numbers.",
    link: "/moving-to-concord/cost-of-living-concord-nc"
  },
  {
    title: "Cox Mill High School Guide",
    description: "Academic programs, zoned neighborhoods, and what relocating families need to know about Concord's top high school.",
    link: "/moving-to-concord/cox-mill-high-school"
  },
  {
    title: "Concord NC Schools Guide",
    description: "Detailed information about school districts, ratings, and educational options.",
    link: "/moving-to-concord/schools-guide"
  },
  {
    title: "Moving to Harrisburg NC",
    description: "Discover Concord's neighbor town, known for its excellent schools and community.",
    link: "/moving-to-concord/harrisburg"
  },
  {
    title: "Moving to Kannapolis NC",
    description: "Explore the revitalized downtown and affordable housing in this historic city.",
    link: "/moving-to-concord/kannapolis"
  },
  {
    title: "28027 Zip Code Guide",
    description: "Complete guide to the 28027 zip code — neighborhoods, prices, schools, and market data for NW Concord.",
    link: "/neighborhoods/28027-concord-nc"
  },
  {
    title: "Is Concord NC Safe?",
    description: "An honest look at safety by neighborhood — NW Concord, downtown, and how Concord compares to Charlotte.",
    link: "/moving-to-concord/is-concord-nc-safe"
  }
];

export const GuideExploreMore = () => {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <h2 className={styles.title}>Explore More Guides</h2>
        <div className={styles.grid}>
          {guides.map((guide) => (
            <Link key={guide.link} to={guide.link} className={styles.card}>
              <h3 className={styles.cardTitle}>{guide.title}</h3>
              <p className={styles.cardDescription}>{guide.description}</p>
              <span className={styles.cardLink}>
                Read Guide <ArrowRight size={16} />
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};