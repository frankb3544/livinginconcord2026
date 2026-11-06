import React from "react";
import { usePageMeta } from "../helpers/usePageMeta";
import { useJsonLd } from "../helpers/useJsonLd";
import { PageBreadcrumbs } from "../components/PageBreadcrumbs";
import { AboutHero } from "../components/AboutHero";
import { AboutStorySection } from "../components/AboutStorySection";
import { AboutCredentials } from "../components/AboutCredentials";
import { AboutExpertiseGrid } from "../components/AboutExpertiseGrid";
import { AboutStatsBanner } from "../components/AboutStatsBanner";
import { AboutClientSuccess } from "../components/AboutClientSuccess";
import { AboutUnlockingRE } from "../components/AboutUnlockingRE";
import { ContactFormBlock } from "../components/ContactFormBlock";
import { DataDisclaimer } from "../components/DataDisclaimer";
import { LIVING_IN_CONCORD_SCHEMA, FRANKLIN_BELLAMY_PERSON_SCHEMA } from "../helpers/schemaConstants";
import styles from "./about.module.css";

const ABOUT_ORGANIZATION_SCHEMA = {
  ...LIVING_IN_CONCORD_SCHEMA,
  "review": [
    {
      "@type": "Review",
      "author": { "@type": "Person", "name": "Sarah M." },
      "reviewRating": { "@type": "Rating", "ratingValue": "5" },
      "reviewBody": "Franklin made our move from out of state seamless. His knowledge of Concord neighborhoods helped us find the perfect home for our family."
    },
    {
      "@type": "Review",
      "author": { "@type": "Person", "name": "David & Priya K." },
      "reviewRating": { "@type": "Rating", "ratingValue": "5" },
      "reviewBody": "Incredibly responsive and professional. He negotiated a great deal for us and walked us through every step of the buying process."
    },
    {
      "@type": "Review",
      "author": { "@type": "Person", "name": "Jason T." },
      "reviewRating": { "@type": "Rating", "ratingValue": "5" },
      "reviewBody": "If you're selling in Cabarrus County, Franklin is the guy. His marketing strategy got our house sold in under a week above asking price."
    }
  ]
};

const ABOUT_BREADCRUMBS_JSON_LD = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    {
      "@type": "ListItem",
      "position": 1,
      "name": "Home",
      "item": "https://livinginconcordnc.com/"
    },
    {
      "@type": "ListItem",
      "position": 2,
      "name": "About Franklin",
      "item": "https://livinginconcordnc.com/about"
    }
  ]
};

const ABOUT_BREADCRUMBS = [
  { label: "Home", href: "/" },
  { label: "About Franklin" },
];

export default function AboutPage() {
  const meta = usePageMeta({
    title: "About Franklin Bellamy | Living in Concord NC",
    description:
      "Meet Franklin Bellamy, NC Licensed Broker with 15+ years helping 100+ families buy and sell homes in Concord NC. Schedule a free consultation today.",
    canonicalPath: "/about",
    ogImage: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=1200&q=80",
  });
  const jsonLd = useJsonLd([
    FRANKLIN_BELLAMY_PERSON_SCHEMA, 
    ABOUT_BREADCRUMBS_JSON_LD, 
    ABOUT_ORGANIZATION_SCHEMA
  ]);

  return (
    <div className={styles.page}>
      {meta}
      {jsonLd}
      <PageBreadcrumbs items={ABOUT_BREADCRUMBS} />
      <AboutHero />
      <AboutStorySection />
      <AboutCredentials />
      <AboutExpertiseGrid />
      <AboutStatsBanner />
      
      <DataDisclaimer variant="mid" text="Career statistics and client figures are approximate and based on the author's professional track record." />
      
      <AboutClientSuccess />
      <AboutUnlockingRE />

      <section className={styles.ctaSection}>
        <div className={styles.ctaHeader}>
          <h2 className={styles.ctaHeading}>Ready to Work with Franklin?</h2>
          <p className={styles.ctaSubheading}>
            Book a free, no-obligation consultation. Whether you're buying,
            selling, or just exploring Concord — Franklin is here to help.
          </p>
        </div>
        <div className={styles.ctaFormContainer}>
          <ContactFormBlock />
        </div>
      </section>
    </div>
  );
}