import React from "react";
import { Link } from "react-router-dom";
import { usePageMeta } from "../helpers/usePageMeta";
import { useJsonLd } from "../helpers/useJsonLd";
import { PageBreadcrumbs } from "../components/PageBreadcrumbs";
import { Button } from "../components/Button";
import { PageAuthorBlock } from "../components/PageAuthorBlock";
import { DataDisclaimer } from "../components/DataDisclaimer";
import styles from "./moving-to-concord.cabarrus-county.module.css";

const PAGE_TITLE = "Cabarrus County Real Estate | Living in Concord NC";
const PAGE_DESC =
  "Explore Cabarrus County real estate — Concord, Harrisburg, Kannapolis, top schools, tax rates, and market trends. Your complete 2026 relocation guide.";
const PAGE_URL = "https://livinginconcordnc.com/moving-to-concord/cabarrus-county";

const BREADCRUMBS = [
  { label: "Home", href: "/" },
  { label: "Moving Guide", href: "/moving-to-concord" },
  { label: "Cabarrus County" },
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
        name: "Cabarrus County",
        item: PAGE_URL,
      },
    ],
  },
  {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: "Cabarrus County Real Estate: Your Complete Guide",
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

export default function CabarrusCountyPage() {
  const meta = usePageMeta({
    title: PAGE_TITLE,
    description: PAGE_DESC,
    canonicalPath: "/moving-to-concord/cabarrus-county",
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
            Cabarrus County Real Estate: Your Complete Guide to NC's Fastest-Growing County
          </h1>
          <p className={styles.heroSubtitle}>Updated June 2026 | By Franklin Bellamy</p>
        </div>
      </section>

      <main className={styles.content}>
        <section className={styles.contentSection}>
          <h2>Cabarrus County Overview</h2>
          <p>
            Located just northeast of Charlotte, Cabarrus County is a rapidly
            growing region with a population of approximately 230,000 residents.
            Formed in 1792, the county perfectly balances its rich history with
            modern suburban convenience. The county seat is Concord, a city
            renowned for its historic downtown and thriving economy.
          </p>
        </section>

        <section className={styles.contentSection}>
          <h2>Real Estate Market Overview</h2>
          <p>
            The Cabarrus County real estate market is incredibly diverse. From
            historic, tree-lined streets in downtown areas to master-planned new
            construction communities, there’s something for every buyer. As of May
            2026, the Cabarrus County median home price sits at $375,000, per Canopy
            MLS. Homes are averaging 45 days on market with 3.2 months of inventory
            supply — a market that's shifting toward buyers, while still offering
            substantial value compared to the core Charlotte market. For the latest
            data, check out our{" "}
            <Link to="/market-reports">Market Reports</Link>.
          </p>
        </section>

        <section className={styles.contentSection}>
          <h2>Cities in the County</h2>
          <ul>
            <li>
              <strong>Concord:</strong> The largest city and county seat,
              boasting a dynamic blend of retail, entertainment, and historic
              charm.
            </li>
            <li>
              <strong>
                <Link to="/moving-to-concord/harrisburg">Harrisburg:</Link>
              </strong>{" "}
              A family-friendly town celebrated for its newer housing
              developments and exceptional public schools.
            </li>
            <li>
              <strong>
                <Link to="/moving-to-concord/kannapolis">Kannapolis:</Link>
              </strong>{" "}
              A deeply revitalized city undergoing an incredible downtown
              renaissance.
            </li>
            <li>
              <strong>Mt. Pleasant & Midland:</strong> Charming smaller
              communities offering a peaceful, rural lifestyle.
            </li>
          </ul>
        </section>

        <section className={styles.contentSection}>
          <h2>Property Tax Information</h2>
          <p>
            A major draw for relocating families and professionals is the area's
            favorable tax environment. The Cabarrus County property tax rate
            sits at approximately $0.67 per $100 of assessed value. This often
            results in lower annual tax bills than neighboring Mecklenburg
            County, keeping your overall cost of living more affordable.
          </p>
        </section>

        <DataDisclaimer variant="mid" text="Property tax rates and school enrollment data referenced above are sourced from Cabarrus County government records and Cabarrus County Schools. Rates and figures are subject to annual updates." />

        <section className={styles.contentSection}>
          <h2>Schools Overview</h2>
          <p>
            The majority of the county is served by Cabarrus County Schools, a
            top-rated district that educates over 35,000 students. The district
            is highly regarded for its robust STEM programs, dedicated faculty,
            and excellent athletic programs. Learn more in our comprehensive{" "}
            <Link to="/moving-to-concord/schools-guide">
              Concord NC Schools Guide
            </Link>
            .
          </p>
        </section>

        <section className={styles.contentSection}>
          <h2>Things to Do</h2>
          <p>
            There is never a shortage of activities in Cabarrus County. Known as
            the heart of motorsports, the area features the legendary Charlotte
            Motor Speedway. If shopping is more your speed, Concord Mills offers
            one of the largest retail destinations in the state. Families also
            enjoy popular attractions like Great Wolf Lodge and SEA LIFE
            Charlotte-Concord.
          </p>
        </section>

        <section className={styles.contentSection}>
          <h2>Commute & Transportation</h2>
          <p>
            Situated along the I-85 corridor, Cabarrus County offers a highly
            manageable commute to the greater Charlotte area. Depending on your
            exact location, a drive to Uptown Charlotte or the Charlotte Douglas
            International Airport typically takes between 30 and 45 minutes,
            making it highly convenient for professionals.
          </p>
        </section>

        <section className={styles.contentSection}>
          <h2>Why Choose Cabarrus County?</h2>
          <p>
            Homebuyers consistently choose Cabarrus County for its tight-knit
            community atmosphere, excellent educational opportunities, diverse{" "}
            <Link to="/neighborhoods">neighborhood options</Link>, and more
            manageable cost of living while remaining incredibly close to
            everything Charlotte has to offer.
          </p>
        </section>

        <section className={styles.contentSection}>
          <h2>Recommended Neighborhoods & Next Steps</h2>
          <p>
            If you're exploring the broader Cabarrus County area, be sure to check out highly sought-after communities such as the <Link to="/neighborhoods/cox-mill">Cox Mill area</Link>, <Link to="/neighborhoods/highland-creek">Highland Creek</Link>, and <Link to="/neighborhoods/afton-village">Afton Village</Link>.
          </p>
          <p>
            <strong>Call or text Franklin Bellamy at (704) 904-5142 for expert guidance on Cabarrus County real estate.</strong>
          </p>
        </section>

        <PageAuthorBlock disclaimer="Data on this page is sourced from Canopy MLS, Cabarrus County government records, and the author's local expertise. Property tax rates, population figures, and market data are approximate and subject to change." />
      </main>

      <section className={styles.bottomCta}>
        <div className={styles.bottomCtaContainer}>
          <h2 className={styles.bottomCtaTitle}>Ready to Find Your Home?</h2>
          <p className={styles.bottomCtaSubtitle}>
            Connect with Franklin to explore available homes across Cabarrus
            County, or download the full relocation guide for more insights.
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
              <Link to="/moving-to-concord">Download Moving Guide</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}