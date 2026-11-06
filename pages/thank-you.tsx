import { SITE_CONTACT_EMAIL, SITE_CONTACT_EMAIL_MAILTO } from "../helpers/siteContact";
import React from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";
import { PageAuthorBlock } from "../components/PageAuthorBlock";
import styles from "./thank-you.module.css";

export default function ThankYouPage() {
  return (
    <div className={styles.page}>
      <Helmet>
        <title>Thank You | Living In Concord NC</title>
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>

      <section className={styles.hero}>
        <div className={styles.heroContainer}>
          <h1 className={styles.heroTitle}>
            Thank You — Franklin Will Be in Touch Within 1-2 Hours During Working Hours.
          </h1>
        </div>
      </section>

      <section className={styles.bodySection}>
        <p className={styles.bodyText}>
          Your message has been received. Franklin personally responds to every inquiry — you will hear from him directly at (704) 904-5142 or {SITE_CONTACT_EMAIL} within 1-2 hours.
        </p>
      </section>

      <section className={styles.exploreSection}>
        <div className={styles.exploreContainer}>
          <h2 className={styles.exploreTitle}>While You Wait — Explore Concord NC</h2>
          <div className={styles.cardsGrid}>
            <Link to="/neighborhoods" className={styles.card}>
              Explore Concord NC Neighborhoods &rarr;
            </Link>
            <Link to="/market-reports" className={styles.card}>
              View the June 2026 Market Report &rarr;
            </Link>
            <Link to="/moving-to-concord/cost-of-living-concord-nc" className={styles.card}>
              Read the Cost of Living Guide &rarr;
            </Link>
          </div>
        </div>
      </section>

      <section className={styles.authorBlockWrapper}>
        <PageAuthorBlock
          disclaimer={`Written by Franklin Bellamy. NC Licensed Real Estate Broker | Relocation Specialist. Lifestyle International Realty / Unlocking Real Estate. Serving Concord NC, Cabarrus County, and the Charlotte Metro Area. 📞 (704) 904-5142 | ✉️ ${SITE_CONTACT_EMAIL}`}
        />
      </section>
    </div>
  );
}