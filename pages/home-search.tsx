import React from "react";
import { Link } from "react-router-dom";
import { usePageMeta } from "../helpers/usePageMeta";
import { useJsonLd } from "../helpers/useJsonLd";
import { PageBreadcrumbs } from "../components/PageBreadcrumbs";
import { Button } from "../components/Button";
import { PageAuthorBlock } from "../components/PageAuthorBlock";
import { SITE_CONTACT_PHONE_DISPLAY } from "../helpers/siteContact";
import styles from "./home-search.module.css";

const IDX_URL = "https://matrix.canopymls.com/Matrix/public/IDX.aspx?idx=015e3611";
const UNLOCKINGRE_URL = "https://unlockingre.com/";

const BREADCRUMBS = [{ label: "Home", href: "/" }, { label: "Home Search" }];

export default function HomeSearchPage() {
  const meta = usePageMeta({
    title: "Search Homes for Sale in Concord NC | Living in Concord NC",
    description:
      "Search live Canopy MLS listings for homes for sale in Concord NC and Cabarrus County — updated from the MLS, with local guidance from Franklin Bellamy.",
    canonicalPath: "/home-search",
  });
  const jsonLd = useJsonLd([
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: "https://livinginconcordnc.com/" },
        { "@type": "ListItem", position: 2, name: "Home Search", item: "https://livinginconcordnc.com/home-search" },
      ],
    },
  ]);

  return (
    <div className={styles.page}>
      {meta}
      {jsonLd}
      <PageBreadcrumbs items={BREADCRUMBS} />
      <section className={styles.hero}>
        <div className={styles.heroContainer}>
          <h1 className={styles.heroTitle}>Search Homes for Sale in Concord NC</h1>
          <p className={styles.heroSubtitle}>
            Live Canopy MLS listings for Concord and Cabarrus County. Find a home you like?
            Call Franklin at {SITE_CONTACT_PHONE_DISPLAY} for pricing context, off-market
            intel, and a private tour.
          </p>
        </div>
      </section>

      <main className={styles.content}>
        <section className={styles.searchSection}>
          <iframe
            className={styles.idxFrame}
            src={IDX_URL}
            title="Canopy MLS home search — Concord NC and Cabarrus County listings"
            loading="lazy"
          />
          <p className={styles.idxNote}>
            Listing data is provided by Canopy MLS for consumers' personal, non-commercial
            use and may not be used for any purpose other than to identify prospective
            properties for purchase. Data is deemed reliable but not guaranteed.
          </p>
        </section>

        <section className={styles.contentSection}>
          <h2>More Ways to Search</h2>
          <p>
            Prefer a map-based search with saved favorites and new-listing alerts? Franklin's
            brokerage search at Unlocking Real Estate covers the same MLS feed:
          </p>
          <ul>
            <li>
              <a href={UNLOCKINGRE_URL} target="_blank" rel="noopener noreferrer">
                Search all homes at UnlockingRealEstate.com
              </a>{" "}
              — start there and filter to Concord for city listings.
            </li>
            <li>
              <a href={UNLOCKINGRE_URL} target="_blank" rel="noopener noreferrer">
                Cabarrus County home search
              </a>{" "}
              — widen the filter to Cabarrus County to include Harrisburg, Kannapolis, and
              Midland.
            </li>
          </ul>
          <p>
            Researching areas before you search? Browse the{" "}
            <Link to="/neighborhoods">Concord neighborhood guides</Link> for price ranges,
            amenities, and local insight on all 11 communities, or check the{" "}
            <Link to="/market-reports">latest market reports</Link> before you write an offer.
          </p>
        </section>

        <PageAuthorBlock
          className={styles.authorBlock}
          disclaimer="Listing information is provided by Canopy MLS (IDX) and is updated periodically; status, price, and availability can change without notice and should be verified before scheduling a tour or making an offer. Contact Franklin Bellamy at (704) 904-5142 to verify any listing."
        />
      </main>

      <section className={styles.bottomCta}>
        <div className={styles.bottomCtaContainer}>
          <h2 className={styles.bottomCtaTitle}>Want New Listings Sent to You?</h2>
          <p className={styles.bottomCtaSubtitle}>
            Tell Franklin your price range and must-haves and he'll set up a custom MLS
            search — new Concord listings in your inbox the day they hit the market.
          </p>
          <div className={styles.bottomCtaButtons}>
            <Button asChild size="lg" className={styles.bottomCtaBtn}>
              <Link to="/contact">Set Up My Search</Link>
            </Button>
            <Button asChild size="lg" variant="outline" className={styles.bottomCtaOutlineBtn}>
              <Link to="/neighborhoods">Explore Neighborhoods</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
