import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight, MapPin } from "lucide-react";
import { Button } from "./Button";
import { useNeighborhoods } from "../helpers/useNeighborhoods";
import styles from "./GuideNeighborhoodsSection.module.css";

interface Props {
  className?: string;
}

export function GuideNeighborhoodsSection({ className }: Props) {
  const { data: neighborhoods, isFetching } = useNeighborhoods();

  return (
    <section className={`${styles.section} ${className || ""}`}>
      <div className={styles.container}>
        <div className={styles.sectionHeader}>
          <h2 className={styles.sectionTitle}>Explore Concord's Top Neighborhoods</h2>
          <p className={styles.sectionSubtitle}>
            The guide covers all 10 of Concord's most popular communities. Start exploring now.
          </p>
        </div>

        {isFetching ? (
          <div className={styles.grid}>
            {Array.from({ length: 10 }).map((_, i) => (
              <div key={i} className={styles.skeletonCard} />
            ))}
          </div>
        ) : (
          <div className={styles.grid}>
            {(neighborhoods ?? []).map((neighborhood) => (
              <Link
                key={neighborhood.id}
                to={`/neighborhoods/${neighborhood.slug}`}
                className={styles.card}
              >
                <span className={styles.cardIcon}>
                  <MapPin size={18} />
                </span>
                <span className={styles.cardName}>{neighborhood.name}</span>
                <ArrowRight size={16} className={styles.cardArrow} />
              </Link>
            ))}
          </div>
        )}

        <div className={styles.footer}>
          <Button asChild variant="outline" size="lg">
            <Link to="/neighborhoods">
              Explore All Neighborhoods <ArrowRight size={18} />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}