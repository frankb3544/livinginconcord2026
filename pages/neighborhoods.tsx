import React, { useState } from "react";
import { Search } from "lucide-react";
import { usePageMeta } from "../helpers/usePageMeta";
import { useJsonLd } from "../helpers/useJsonLd";
import { PageBreadcrumbs } from "../components/PageBreadcrumbs";
import { NeighborhoodCard } from "../components/NeighborhoodCard";
import { useNeighborhoods } from "../helpers/useNeighborhoods";
import { Skeleton } from "../components/Skeleton";
import { Input } from "../components/Input";
import { NeighborhoodsFAQ } from "../components/NeighborhoodsFAQ";
import { PageAuthorBlock } from "../components/PageAuthorBlock";
import { LIVING_IN_CONCORD_SCHEMA } from "../helpers/schemaConstants";
import styles from "./neighborhoods.module.css";

const NEIGHBORHOODS_FAQ_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "What are the most popular neighborhoods in Concord NC?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Concord has several highly sought-after neighborhoods. Some of the most popular include Highland Creek, a master-planned community with over 300 acres of nature preserves, trails, and amenities; Christenbury, a premier golf course community with custom homes; Cox Mill, known for its top-rated schools and family-friendly atmosphere; and Afton Village, a charming walkable neighborhood with a true village feel, complete with shops and restaurants within walking distance.",
      },
    },
    {
      "@type": "Question",
      "name": "What is the average home price in Concord NC neighborhoods?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Home prices in Concord NC vary widely by neighborhood, generally ranging from around $250,000 to $700,000 or more. Newer communities like Moss Creek offer more affordable entry-level options, while established luxury communities such as Skybrook feature premium homes at higher price points.",
      },
    },
    {
      "@type": "Question",
      "name": "Which Concord neighborhoods have the best schools?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "The Cox Mill area is consistently recognized for its excellent schools, including Cox Mill Elementary and Cox Mill High School, both highly rated within the Cabarrus County Schools district. Highland Creek also sits near several top-rated Cabarrus County schools, making it a popular choice for families with school-aged children.",
      },
    },
    {
      "@type": "Question",
      "name": "Are there new construction neighborhoods in Concord NC?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes! Concord has several active new construction communities. Winding Walk and Moss Creek are two neighborhoods that offer newer construction homes with modern floor plans and updated finishes. New builds often come with builder warranties and energy-efficient features.",
      },
    },
    {
      "@type": "Question",
      "name": "What is the average home price in Concord NC right now?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "As of May 2026, the median home price in Concord NC is approximately $360,000 according to Canopy MLS data."
      }
    },
    {
      "@type": "Question",
      "name": "How do I choose the right neighborhood in Concord NC?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Choosing the right neighborhood depends on several key factors: your budget, desired school district, daily commute (especially if you work in Charlotte), and lifestyle preferences such as walkability, community amenities, or green space. It helps to visit neighborhoods in person at different times of day and to research local schools and HOA requirements.",
      },
    },
  ],
};

const NEIGHBORHOODS_BREADCRUMBS_JSON_LD = {
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
      "name": "Neighborhoods",
      "item": "https://livinginconcordnc.com/neighborhoods"
    }
  ]
};

const NEIGHBORHOODS_BREADCRUMBS = [
  { label: "Home", href: "/" },
  { label: "Neighborhoods" },
];

export default function NeighborhoodsPage() {
  const meta = usePageMeta({
    title: "Concord NC Neighborhoods | Living in Concord NC",
    description:
      "Explore 11+ top neighborhoods in Concord NC. Compare Highland Creek, Christenbury, Cox Mill, Afton Village, and more with detailed community guides.",
    canonicalPath: "/neighborhoods",
    ogImage: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=1200&q=80",
  });
  const jsonLd = useJsonLd([NEIGHBORHOODS_FAQ_SCHEMA, NEIGHBORHOODS_BREADCRUMBS_JSON_LD, LIVING_IN_CONCORD_SCHEMA]);

  const { data: neighborhoods, isLoading } = useNeighborhoods();
  const [searchTerm, setSearchTerm] = useState("");

    const shuffledNeighborhoods = React.useMemo(() => {
    if (!neighborhoods) return [];
    const arr = [...neighborhoods];
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
  }, [neighborhoods]);

  const filteredNeighborhoods =
    shuffledNeighborhoods.filter((n) =>
      n.name.toLowerCase().includes(searchTerm.toLowerCase()),
    );

  return (
    <div className={styles.page}>
      {meta}
      {jsonLd}
      <PageBreadcrumbs items={NEIGHBORHOODS_BREADCRUMBS} />
      <section className={styles.hero}>
        <div className={styles.heroContainer}>
          <h1 className={styles.heroTitle}>Concord NC Neighborhoods</h1>
          <p className={styles.heroSubtitle}>
            Explore the diverse and welcoming communities that make Concord,
            North Carolina a fantastic place to call home. Find the perfect
            neighborhood that matches your lifestyle and budget.
          </p>
        </div>
      </section>

      <section className={styles.content}>
        <div className={styles.container}>
          <div className={styles.summaryCard}>
            <h2 className={styles.summaryTitle}>Concord NC Neighborhoods at a Glance</h2>
            <ul className={styles.summaryList}>
              <li className={styles.summaryItem}>Concord NC has 11+ distinct neighborhoods with home prices ranging from $250,000 to $1.6M.</li>
              <li className={styles.summaryItem}>The most popular family school zone is Cox Mill, serving communities like Christenbury, Winding Walk, and Highland Creek.</li>
              <li className={styles.summaryItem}>Franklin Bellamy has lived in Concord since 2007 and can help match you with the right neighborhood. Call (704) 904-5142.</li>
            </ul>
          </div>

          <div className={styles.filterSection}>
            <div className={styles.searchContainer}>
              <Search className={styles.searchIcon} size={20} />
              <Input
                type="search"
                placeholder="Search neighborhoods by name..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className={styles.searchInput}
              />
            </div>
            <div className={styles.resultsCount}>
              {isLoading ? (
                <Skeleton style={{ width: "150px" }} />
              ) : (
                <p>Showing {filteredNeighborhoods.length} neighborhoods</p>
              )}
            </div>
          </div>

          {isLoading ? (
            <div className={styles.grid}>
              {Array.from({ length: 8 }).map((_, i) => (
                <Skeleton key={i} className={styles.cardSkeleton} />
              ))}
            </div>
          ) : filteredNeighborhoods.length > 0 ? (
            <div className={styles.grid}>
              {filteredNeighborhoods.map((n) => (
                <NeighborhoodCard key={n.id} neighborhood={n} />
              ))}
            </div>
          ) : (
            <div className={styles.emptyState}>
              <h3 className={styles.emptyTitle}>No neighborhoods found</h3>
              <p className={styles.emptyDesc}>
                We couldn't find any neighborhoods matching "{searchTerm}". Try
                adjusting your search.
              </p>
            </div>
          )}
        </div>

        <NeighborhoodsFAQ />
        <div style={{ marginTop: "var(--spacing-12)" }}>
          <PageAuthorBlock disclaimer="Neighborhood information and price ranges on this page are sourced from Canopy MLS and the author's professional experience. All data is approximate and subject to change. Verify current pricing and availability with a licensed broker." />
        </div>
      </section>
    </div>
  );
}