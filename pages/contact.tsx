import { SITE_CONTACT_EMAIL, SITE_CONTACT_EMAIL_MAILTO } from "../helpers/siteContact";
import React from "react";
import { usePageMeta } from "../helpers/usePageMeta";
import { useJsonLd } from "../helpers/useJsonLd";
import { PageBreadcrumbs } from "../components/PageBreadcrumbs";
import { ContactFormBlock } from "../components/ContactFormBlock";
import styles from "./contact.module.css";

const CONTACT_BREADCRUMBS = [
  { label: "Home", href: "/" },
  { label: "Contact" },
];

const CONTACT_BREADCRUMBS_JSON_LD = {
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
      "name": "Contact",
      "item": "https://livinginconcordnc.com/contact"
    }
  ]
};

const CONTACT_JSON_LD = {
  "@context": "https://schema.org",
  "@type": "ContactPage",
  "name": "Contact Franklin Bellamy",
  "description": "Schedule a free consultation with Franklin Bellamy, your Concord NC real estate expert.",
  "url": "https://livinginconcordnc.com/contact",
  "mainEntity": {
    "@type": "RealEstateAgent",
    "name": "Franklin Bellamy | Living In Concord NC",
    "url": "https://livinginconcordnc.com/contact",
    "telephone": "(704) 904-5142",
    "email": SITE_CONTACT_EMAIL,
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Concord",
      "addressRegion": "NC",
      "postalCode": "28027",
      "addressCountry": "US"
    },
    "openingHoursSpecification": [
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        "opens": "08:00",
        "closes": "18:00"
      },
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": ["Saturday"],
        "opens": "09:00",
        "closes": "17:00"
      }
    ],
    "contactType": "Real Estate Broker",
    "areaServed": [
      "Concord NC",
      "Cabarrus County",
      "Charlotte Metro Area",
      "Harrisburg NC",
      "Kannapolis NC"
    ]
  }
};

export default function ContactPage() {
  const meta = usePageMeta({
    title: "Contact Franklin Bellamy | Living in Concord NC",
    description:
      "Schedule a free real estate consultation with Concord NC broker Franklin Bellamy. Get expert help buying, selling, or relocating to Cabarrus County.",
    canonicalPath: "/contact",
    ogImage: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=1200&q=80",
  });
  const jsonLd = useJsonLd([CONTACT_JSON_LD, CONTACT_BREADCRUMBS_JSON_LD]);

  return (
    <div className={styles.page}>
      {meta}
      {jsonLd}
      <PageBreadcrumbs items={CONTACT_BREADCRUMBS} />
      <section className={styles.hero}>
        <div className={styles.heroContainer}>
          <h1 className={styles.heroTitle}>Schedule a Consultation</h1>
          <p className={styles.heroSubtitle}>
            Whether you're buying, selling, or just exploring the Concord area,
            I'm here to provide expert guidance and answer all your questions.
          </p>
        </div>
      </section>

      <section className={styles.contentSection}>
        <div className={styles.container}>
          <div className={styles.agentSummaryCard}>
            <h2 className={styles.agentSummaryTitle}>About Your Agent</h2>
            <div className={styles.agentSummaryContent}>
              <p>Franklin Bellamy is an NC Licensed Real Estate Broker with Lifestyle International Realty, serving Concord NC and the Charlotte Metro Area.</p>
              <p>With 15+ years of local experience and a 4.9-star client rating, Franklin has helped 100+ families buy, sell, and relocate in Cabarrus County.</p>
              <p>Service areas include Concord, Harrisburg, Kannapolis, Charlotte, and surrounding communities.</p>
              <p>Call or text <a href="tel:7049045142">(704) 904-5142</a> or email <a href={SITE_CONTACT_EMAIL_MAILTO}>{SITE_CONTACT_EMAIL}</a>.</p>
            </div>
          </div>

          <ContactFormBlock />

          <div className={styles.bottomGrid}>
            <div className={styles.timelineBox}>
              <h2 className={styles.boxTitle}>What to Expect</h2>
              <div className={styles.timeline}>
                <div className={styles.timelineItem}>
                  <div className={styles.timelineNumber}>1</div>
                  <div className={styles.timelineContent}>
                    <h3>Submit Inquiry</h3>
                    <p>Send a message using the form above.</p>
                  </div>
                </div>
                <div className={styles.timelineItem}>
                  <div className={styles.timelineNumber}>2</div>
                  <div className={styles.timelineContent}>
                    <h3>Personal Response</h3>
                    <p>I will reach out personally within 4 hours.</p>
                  </div>
                </div>
                <div className={styles.timelineItem}>
                  <div className={styles.timelineNumber}>3</div>
                  <div className={styles.timelineContent}>
                    <h3>Customized Consultation</h3>
                    <p>We'll discuss your unique real estate goals.</p>
                  </div>
                </div>
                <div className={styles.timelineItem}>
                  <div className={styles.timelineNumber}>4</div>
                  <div className={styles.timelineContent}>
                    <h3>Start Your Journey</h3>
                    <p>Begin the seamless process of moving to Concord.</p>
                  </div>
                </div>
              </div>
            </div>

            <div className={styles.mapBox}>
              <div className={styles.mapPlaceholder}>
                <h3>Concord, NC</h3>
                <p>Located in the heart of Cabarrus County</p>
                <div className={styles.mapVisual}></div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}