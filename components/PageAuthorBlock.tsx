import { SITE_CONTACT_EMAIL, SITE_CONTACT_EMAIL_MAILTO } from "../helpers/siteContact";
import React from "react";
import { Link } from "react-router-dom";
import styles from "./PageAuthorBlock.module.css";

interface PageAuthorBlockProps {
  className?: string;
  showMarketDisclaimer?: boolean;
  disclaimer?: string;
}

export const PageAuthorBlock: React.FC<PageAuthorBlockProps> = ({
  className,
  showMarketDisclaimer = false,
  disclaimer,
}) => {
  return (
    <div className={`${styles.container} ${className || ""}`}>
      <div className={styles.authorContent}>
        <p className={styles.writtenBy}>
          Written by <Link to="/about" className={styles.nameLink}>Franklin Bellamy</Link>
        </p>
        <p className={styles.title}>NC Licensed Real Estate Broker | Relocation Specialist</p>
        <p className={styles.brokerage}>Lifestyle International Realty / Unlocking Real Estate</p>
        <p className={styles.serviceArea}>Serving Concord NC, Cabarrus County, and the Charlotte Metro Area</p>
        
        <div className={styles.contact}>
          <span>📞 <a href="tel:704-904-5142">(704) 904-5142</a></span>
          <span className={styles.contactDivider}>|</span>
          <span>✉️ <a href={SITE_CONTACT_EMAIL_MAILTO}>{SITE_CONTACT_EMAIL}</a></span>
        </div>
        
        <p className={styles.updated}>Updated June 2026</p>
      </div>

      {(disclaimer || showMarketDisclaimer) && (
        <div className={styles.disclaimerContainer}>
          <p className={styles.disclaimerText}>
            {disclaimer ||
              "Market data per Canopy MLS, Inc. / Canopy Realtor® Association, Local Market Update — Concord NC, current as of April 5, 2026. Consult a licensed professional before making real estate decisions."}
          </p>
        </div>
      )}
    </div>
  );
};