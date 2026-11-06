import React from "react";
import { InfoPage, InfoPageData } from "../components/InfoPage";
import { Button } from "../components/Button";
import { BOOKING_URL, SITE_CONTACT_PHONE_DISPLAY } from "../helpers/siteContact";
import pageData from "../page-data/relocation-help.json";
import styles from "./relocation-help.module.css";

function BookingCta() {
  return (
    <section className={styles.ctaBox}>
      <h2 className={styles.ctaTitle}>Book Your Free Relocation Consultation</h2>
      <p className={styles.ctaText}>
        Start with a free call: your timeline, budget, neighborhoods that fit, and the exact
        steps between now and moving day. Prefer to talk now? Call or text Franklin at{" "}
        {SITE_CONTACT_PHONE_DISPLAY}.
      </p>
      <Button asChild size="lg">
        <a href={BOOKING_URL} target="_blank" rel="noopener noreferrer">
          Book a Free Consultation
        </a>
      </Button>
    </section>
  );
}

export default function RelocationHelpPage() {
  return (
    <InfoPage
      page={pageData as InfoPageData}
      ctaTitle="Let's Plan Your Move to Concord"
      ctaSubtitle="Book a free relocation consultation or call Franklin Bellamy at (704) 904-5142."
    >
      <BookingCta />
    </InfoPage>
  );
}
