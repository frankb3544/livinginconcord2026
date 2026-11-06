import React from "react";
import { Globe, ExternalLink, Building2, Award } from "lucide-react";
import { Button } from "./Button";
import styles from "./AboutUnlockingRE.module.css";

export function AboutUnlockingRE({ className }: { className?: string }) {
  const handleBrowseListings = () => {
    window.open("https://unlockingre.com", "_blank", "noopener,noreferrer");
  };

  return (
    <section className={`${styles.section} ${className || ""}`}>
      <div className={styles.container}>
        <div className={styles.twoCol}>
          <div className={styles.textCol}>
            <h2 className={styles.heading}>Lifestyle International Realty / Unlocking Real Estate</h2>
            <p className={styles.body}>
              Franklin operates under Lifestyle International Realty / Unlocking Real Estate, a modern brokerage
              built on the belief that every family deserves expert guidance
              without the corporate red tape. At Lifestyle International Realty / Unlocking Real Estate, the
              focus is simple: deep local knowledge, transparent communication,
              and relentless advocacy for our clients' best interests.
            </p>
            <p className={styles.body}>
              Looking for active MLS listings in Concord and the greater
              Charlotte area? Browse our complete, up-to-date inventory of homes
              for sale.
            </p>
            <Button
              size="lg"
              className={styles.browseBtn}
              onClick={handleBrowseListings}
            >
              <ExternalLink size={18} />
              Browse Listings at UnlockingRE.com
            </Button>
          </div>

          <div className={styles.cardCol}>
            <div className={styles.brokerageCard}>
              <div className={styles.cardHeader}>
                <Building2 size={32} className={styles.cardHeaderIcon} />
                <div className={styles.cardBrandName}>Lifestyle International Realty / Unlocking Real Estate</div>
              </div>

              <div className={styles.cardDivider} />

              <div className={styles.cardDetails}>
                <div className={styles.cardDetailRow}>
                  <span className={styles.detailLabel}>Location</span>
                  <span className={styles.detailValue}>Concord, NC</span>
                </div>
                <div className={styles.cardDetailRow}>
                  <span className={styles.detailLabel}>Broker / Realtor</span>
                  <span className={styles.detailValue}>Franklin Bellamy</span>
                </div>
                <div className={styles.cardDetailRow}>
                  <span className={styles.detailLabel}>Credentials</span>
                  <span className={styles.detailValue}>
                    NC Licensed • MLS Member • NAR Member
                  </span>
                </div>
              </div>

              <div className={styles.cardDivider} />

              <div className={styles.cardLink}>
                <Globe size={16} className={styles.globeIcon} />
                <span>unlockingre.com</span>
                <Award size={14} className={styles.awardIcon} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}