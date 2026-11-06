import React from "react";
import { Link } from "react-router-dom";
import { usePageMeta } from "../helpers/usePageMeta";
import { useJsonLd } from "../helpers/useJsonLd";
import { PageBreadcrumbs } from "../components/PageBreadcrumbs";
import { Button } from "../components/Button";
import { PageAuthorBlock } from "../components/PageAuthorBlock";
import styles from "./moving-to-concord.kannapolis.module.css";

const PAGE_TITLE = "Moving to Kannapolis NC | Living in Concord NC";
const PAGE_DESC =
  "Discover Kannapolis NC — affordable homes from $280K–$400K, a booming downtown renaissance, and easy access to Concord. Tour with Franklin Bellamy.";
const PAGE_URL = "https://livinginconcordnc.com/moving-to-concord/kannapolis";

const BREADCRUMBS = [
  { label: "Home", href: "/" },
  { label: "Moving Guide", href: "/moving-to-concord" },
  { label: "Moving to Kannapolis" },
];

const JSON_LD = [
  {
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
        name: "Moving Guide",
        item: "https://livinginconcordnc.com/moving-to-concord",
      },
      {
        "@type": "ListItem",
        position: 3,
        name: "Moving to Kannapolis",
        item: PAGE_URL,
      },
    ],
  },
  {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: "Moving to Kannapolis NC: Revitalized City With Small-Town Charm",
    description: PAGE_DESC,
    author: {
      "@type": "Person",
      name: "Franklin Bellamy",
      jobTitle: "NC Licensed Real Estate Broker",
      url: "https://livinginconcordnc.com/about"
    },
    publisher: {
      "@type": "Organization",
      name: "LivingInConcordNC.com"
    },
  },
];

export default function KannapolisPage() {
  const meta = usePageMeta({
    title: PAGE_TITLE,
    description: PAGE_DESC,
    canonicalPath: "/moving-to-concord/kannapolis",
  });
  const jsonLd = useJsonLd(JSON_LD);

  return (
    <div className={styles.page}>
      {meta}
      {jsonLd}
      <PageBreadcrumbs items={BREADCRUMBS} />

      <section className={styles.hero}>
        <div className={styles.heroContainer}>
          <h1 className={styles.heroTitle}>
            Moving to Kannapolis NC: Revitalized City With Small-Town Charm
          </h1>
        </div>
      </section>

      <main className={styles.content}>
        <section className={styles.contentSection}>
          <h2>City Overview</h2>
          <p>
            Bordering Concord to the north, Kannapolis is a city of roughly
            53,000 residents experiencing a true renaissance. Once famous globally
            as a booming textile manufacturing hub, Kannapolis has brilliantly
            transformed itself. Today, it stands as an energetic center for
            health, scientific research, and entertainment, while thoughtfully
            preserving its historic, small-town charm.
          </p>
        </section>

        <section className={styles.contentSection}>
          <h2>Real Estate & Affordability</h2>
          <p>
            For those <Link to="/moving-to-concord">relocating to the area</Link>
            , Kannapolis offers some of the most attractive real estate values in
            Cabarrus County. Median home prices generally hover between $280K and
            $400K. The housing stock is incredibly varied—ranging from historic,
            renovated mill houses near downtown to entirely new suburban
            subdivisions, making it ideal for first-time buyers and investors
            alike.
          </p>
        </section>

        <section className={styles.contentSection}>
          <h2>The Downtown Renaissance</h2>
          <p>
            The beating heart of Kannapolis's appeal is its meticulously
            revitalized downtown core. The city has invested millions into
            creating a highly walkable, vibrant streetscape. Residents enjoy the
            VIDA craft beer district, independent boutique shopping, and diverse
            dining options. Anchoring the downtown is Atrium Health Ballpark—an
            award-winning stadium that is home to the Kannapolis Cannon Ballers.
            Additionally, racing fans flock to the city to visit tribute sites
            dedicated to hometown hero, Dale Earnhardt.
          </p>
        </section>

        <section className={styles.contentSection}>
          <h2>Education & Schools</h2>
          <p>
            Education within the city is largely managed by Kannapolis City
            Schools, anchored by the beloved A.L. Brown High School. It is worth
            noting that due to municipal borders, some residential areas of
            Kannapolis are zoned for the Cabarrus County Schools system. Check
            out our detailed <Link to="/moving-to-concord/schools-guide">Schools Guide</Link>{" "}
            for more information.
          </p>
        </section>

        <section className={styles.contentSection}>
          <h2>Commuting & Connectivity</h2>
          <p>
            Kannapolis offers phenomenal connectivity. The drive down Highway 29
            to Concord takes merely 10 minutes, while I-85 gets commuters into
            Charlotte in roughly 30 minutes. Uniquely, Kannapolis is also served
            by an Amtrak passenger rail station located right downtown, providing
            effortless travel to Charlotte, Raleigh, and Washington D.C.
          </p>
        </section>

        <section className={styles.contentSection}>
          <h2>Kannapolis vs. Concord</h2>
          <p>
            When comparing the two, Kannapolis is often more affordable and
            delivers a highly concentrated, newly revitalized downtown
            experience. While Concord is larger and boasts heavier commercial
            development (like the Concord Mills area), Kannapolis feels more like
            an up-and-coming destination. If you're exploring the broader area,
            you should also read our guide to{" "}
            <Link to="/moving-to-concord/harrisburg">Harrisburg</Link> and our
            curated list of <Link to="/neighborhoods">neighborhoods</Link>.
          </p>
        </section>

        <section className={styles.contentSection}>
          <h2>Explore Concord Neighborhoods</h2>
          <p>
            Explore Concord neighborhoods: <Link to="/neighborhoods/afton-village">Afton Village</Link>, the <Link to="/neighborhoods/cox-mill">Cox Mill area</Link>, and <Link to="/neighborhoods/brookwood">Brookwood</Link>. See the <Link to="/moving-to-concord/schools-guide">Concord NC schools guide</Link> to learn more about the school zones.
          </p>
          <p>
            <strong>Call or text Franklin Bellamy at (704) 904-5142 to explore homes in Kannapolis and Concord NC.</strong>
          </p>
        </section>

        <PageAuthorBlock disclaimer="Home price ranges and community data on this page are sourced from Canopy MLS and the author's professional experience. All figures are estimates and subject to change. Verify current pricing with a licensed broker." />
      </main>

      <section className={styles.bottomCta}>
        <div className={styles.bottomCtaContainer}>
          <h2 className={styles.bottomCtaTitle}>Discover Kannapolis</h2>
          <p className={styles.bottomCtaSubtitle}>
            Intrigued by the Kannapolis renaissance? Connect with Franklin to
            find the perfect home in this booming city.
          </p>
          <div className={styles.bottomCtaButtons}>
            <Button asChild size="lg" className={styles.bottomCtaBtn}>
              <Link to="/contact">Talk to Franklin</Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className={styles.bottomCtaOutlineBtn}
            >
              <Link to="/moving-to-concord">Return to Moving Guide</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}