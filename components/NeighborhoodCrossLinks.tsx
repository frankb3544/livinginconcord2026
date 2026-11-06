import React from "react";
import { Link } from "react-router-dom";
import { BarChart3, BookOpen, User } from "lucide-react";
import styles from "./NeighborhoodCrossLinks.module.css";

interface Props {
  className?: string;
}

const links = [
  {
    to: "/market-reports",
    icon: BarChart3,
    label: "View Concord Market Reports →",
    description: "Stay up to date with the latest local housing trends.",
  },
  {
    to: "/moving-to-concord",
    icon: BookOpen,
    label: "Download Free Relocation Guide →",
    description: "Everything you need to know about moving to Concord, NC.",
  },
  {
    to: "/about",
    icon: User,
    label: "About Your Local Expert, Franklin Bellamy →",
    description: "Meet the broker who knows Concord neighborhoods inside and out.",
  },
];

export const NeighborhoodCrossLinks = ({ className }: Props) => {
  return (
    <div className={`${styles.container} ${className || ""}`}>
      <h2 className={styles.heading}>Helpful Resources</h2>
      <div className={styles.list}>
        {links.map(({ to, icon: Icon, label, description }) => (
          <Link key={to} to={to} className={styles.card}>
            <div className={styles.iconWrap}>
              <Icon size={20} />
            </div>
            <div className={styles.textWrap}>
              <span className={styles.label}>{label}</span>
              <span className={styles.description}>{description}</span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};