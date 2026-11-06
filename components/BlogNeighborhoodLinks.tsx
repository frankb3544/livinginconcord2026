import React from "react";
import { Link } from "react-router-dom";
import { MapPin } from "lucide-react";
import { useNeighborhoods } from "../helpers/useNeighborhoods";
import { Skeleton } from "./Skeleton";
import styles from "./BlogNeighborhoodLinks.module.css";

interface Props {
  className?: string;
}

export function BlogNeighborhoodLinks({ className }: Props) {
  const { data: neighborhoods, isFetching } = useNeighborhoods();

  const displayed = neighborhoods?.slice(0, 10) ?? [];

  return (
    <div className={`${styles.container} ${className ?? ""}`}>
      <h3 className={styles.heading}>Explore Neighborhoods</h3>
      {isFetching && displayed.length === 0 ? (
        <div className={styles.list}>
          {Array.from({ length: 10 }, (_, i) => (
            <Skeleton key={i} style={{ height: "2.25rem", borderRadius: "var(--radius)" }} />
          ))}
        </div>
      ) : (
        <ul className={styles.list}>
          {displayed.map((n) => (
            <li key={n.slug}>
              <Link to={`/neighborhoods/${n.slug}`} className={styles.neighborhoodLink}>
                <MapPin size={14} className={styles.icon} />
                <span>{n.name}</span>
              </Link>
            </li>
          ))}
        </ul>
      )}
      <Link to="/neighborhoods" className={styles.viewAll}>
        View all neighborhoods →
      </Link>
    </div>
  );
}