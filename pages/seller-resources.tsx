import React, { useState } from "react";
import { InfoPage, InfoPageData } from "../components/InfoPage";
import { Button } from "../components/Button";
import { HomeValuationBlock } from "../components/HomeValuationBlock";
import pageData from "../page-data/seller-resources.json";
import styles from "./seller-resources.module.css";

function ValuationCta() {
  const [valuationOpen, setValuationOpen] = useState(false);
  return (
    <section className={styles.ctaBox}>
      <HomeValuationBlock open={valuationOpen} onOpenChange={setValuationOpen} />
      <h2 className={styles.ctaTitle}>Start with What Your Home Is Worth</h2>
      <p className={styles.ctaText}>
        Every good selling plan starts with an accurate number. Request a free home valuation
        and Franklin will prepare a comparative market analysis from recent Canopy MLS sales
        near your home — no obligation.
      </p>
      <Button size="lg" onClick={() => setValuationOpen(true)}>
        Get My Free Home Valuation
      </Button>
    </section>
  );
}

export default function SellerResourcesPage() {
  return (
    <InfoPage
      page={pageData as InfoPageData}
      ctaTitle="Ready to Sell in Concord?"
      ctaSubtitle="Call or text Franklin Bellamy at (704) 904-5142 for a pricing strategy built on current Canopy MLS data."
    >
      <ValuationCta />
    </InfoPage>
  );
}
