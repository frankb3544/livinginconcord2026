import React from "react";
import { usePageMeta } from "../helpers/usePageMeta";
import { useJsonLd } from "../helpers/useJsonLd";
import { PageBreadcrumbs } from "../components/PageBreadcrumbs";
import { MarketStatsGrid } from "../components/MarketStatsGrid";
import { PageAuthorBlock } from "../components/PageAuthorBlock";
import { MarketReportLeadCapture } from "../components/MarketReportLeadCapture";
import { MarketUpdateSignupSection } from "../components/MarketUpdateSignupSection";
import { LOCAL_TRENDS_FAQS } from "../helpers/localTrendsFaqs";
import styles from "./market-reports.local-trends.module.css";

const LOCAL_TRENDS_BREADCRUMBS = [
  { label: "Home", href: "/" },
  { label: "Market Reports", href: "/market-reports" },
  { label: "Local Trends & Stats" },
];

const LOCAL_TRENDS_BREADCRUMBS_JSON_LD = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    {
      "@type": "ListItem",
      position: 1,
      name: "Home",
      item: "https://livinginconcordnc.com/",
    },
    {
      "@type": "ListItem",
      position: 2,
      name: "Market Reports",
      item: "https://livinginconcordnc.com/market-reports",
    },
    {
      "@type": "ListItem",
      position: 3,
      name: "Local Trends & Stats",
      item: "https://livinginconcordnc.com/market-reports/local-trends",
    },
  ],
};

const LOCAL_TRENDS_WEBPAGE_JSON_LD = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  name: "Concord NC Local Trends & Stats",
  description:
    "Concord NC real estate charts, neighborhood price ranges, market conditions, and buyer/seller insights — updated monthly.",
  url: "https://livinginconcordnc.com/market-reports/local-trends",
};

const LOCAL_TRENDS_FAQ_JSON_LD = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: LOCAL_TRENDS_FAQS.map((faq) => ({
    "@type": "Question",
    name: faq.question,
    acceptedAnswer: {
      "@type": "Answer",
      text: faq.answer,
    },
  })),
};

export default function LocalTrendsPage() {
  const meta = usePageMeta({
    title: "Local Trends & Stats | Concord NC Real Estate Market",
    description:
      "Explore Concord NC real estate charts, neighborhood price ranges, market conditions, and buyer/seller insights — updated monthly by Franklin Bellamy.",
    canonicalPath: "/market-reports/local-trends",
  });

  const jsonLd = useJsonLd([
    LOCAL_TRENDS_WEBPAGE_JSON_LD,
    LOCAL_TRENDS_BREADCRUMBS_JSON_LD,
    LOCAL_TRENDS_FAQ_JSON_LD,
  ]);

  return (
    <div className={styles.page}>
      {meta}
      {jsonLd}

      <PageBreadcrumbs items={LOCAL_TRENDS_BREADCRUMBS} />

      {/* 1. HERO */}
      <section className={styles.hero}>
        <div className={styles.heroContainer}>
          <h1 className={styles.heroTitle}>Local Trends & Stats</h1>
          <p className={styles.heroSubtitle}>
            Concord NC real estate charts, neighborhood price ranges, market conditions, and buyer/seller insights — updated monthly.
          </p>
          <div className={styles.lastUpdatedBadge}>
            Last updated: June 2026
          </div>
        </div>
      </section>

      {/* 2. MARKET SUMMARY */}
      <section className={styles.marketSummarySection}>
        <div className={styles.container}>
          <div className={styles.summaryBox}>
            <h2 className={styles.summaryTitle}>Concord NC Market Summary — May 2026</h2>
            <div className={styles.summaryContent}>
              <p>
                The Concord, NC real estate market has officially been shifting toward buyers as of May 2026. 
                After years of historically low inventory and skyrocketing prices, the market is stabilizing. The median 
                sale price currently sits at $360,000, which represents a 0.0% change compared to March 2025. This leveling 
                off provides a much-needed breather for prospective buyers while allowing sellers to retain the significant 
                equity gains made over the past few years.
              </p>
              <p>
                Inventory levels have seen a welcome increase, with active listings up 10.8% year-over-year. This brings the 
                months of supply to 3.1 months. While a balanced market is typically considered to be between 4 and 6 months 
                of supply, this bump in inventory means buyers have more options to choose from when touring neighborhoods like 
                Christenbury, Skybrook, or Highland Creek.
              </p>
              <p>
                Despite the increase in inventory, homes are still moving at a reasonable pace. The average days on market is 
                43 days, and sellers are receiving an average of 96.1% of their original list price. This indicates that 
                well-priced, move-in ready homes in desirable school zones are still highly sought after. However, properties 
                that require significant repairs or are overly ambitiously priced are sitting longer, emphasizing the critical 
                importance of accurate initial pricing strategies.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. MAIN CONTENT */}
      <section className={styles.content}>
        <div className={styles.container}>
          <MarketStatsGrid />
          <MarketReportLeadCapture />
        </div>
      </section>

      <MarketUpdateSignupSection className={styles.signupSection} />

      {/* 4. AUTHOR BLOCK */}
      <div className={styles.authorSection}>
        <PageAuthorBlock showMarketDisclaimer={true} />
      </div>
    </div>
  );
}