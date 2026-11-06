import React from "react";
import { Link } from "react-router-dom";
import { useAgentProfile } from "../helpers/useAgentProfile";
import styles from "./NeighborhoodAuthorCard.module.css";

interface Props {
  className?: string;
}

export const NeighborhoodAuthorCard = ({ className }: Props) => {
  const { agentProfileQuery } = useAgentProfile();
  const { data } = agentProfileQuery;

  const name = data?.name || "Franklin Bellamy";
  const title = data?.title || "Broker / Realtor";
  const bio = data?.description || "Local Concord NC expert with 15+ years of experience.";
  const avatarUrl = data?.imageUrl || "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=80&h=80&fit=crop&crop=face";

  return (
    <div className={`${styles.card} ${className || ""}`}>
      <h3 className={styles.heading}>About Your Agent</h3>
      <div className={styles.body}>
        <img
          src={avatarUrl}
          alt={name}
          className={styles.avatar}
          loading="lazy"
          width={48}
          height={48}
          decoding="async"
        />
        <div className={styles.info}>
          <Link to="/about" className={styles.name}>
            {name}
          </Link>
          <span className={styles.title}>{title}</span>
          <span className={styles.bio}>
            {bio}
          </span>
          <Link to="/about" className={styles.learnMore}>
            Learn More →
          </Link>
        </div>
      </div>
    </div>
  );
};