import React from "react";
import { Link } from "react-router-dom";
import { usePageMeta } from "../helpers/usePageMeta";
import { useJsonLd } from "../helpers/useJsonLd";
import { PageBreadcrumbs } from "../components/PageBreadcrumbs";
import { Button } from "../components/Button";
import { PageAuthorBlock } from "../components/PageAuthorBlock";
import styles from "./moving-to-concord.harrisburg.module.css";

const PAGE_TITLE = "Moving to Harrisburg NC | Living in Concord NC";
const PAGE_DESC =
  "Explore Harrisburg NC real estate — top-rated schools, family-friendly living, and homes from $350K–$550K near Concord NC. Tour with Franklin Bellamy.";
const PAGE_URL = "https://livinginconcordnc.com/moving-to-concord/harrisburg";

const BREADCRUMBS = [
  { label: "Home", href: "/" },
  { label: "Moving Guide", href: "/moving-to-concord" },
  { label: "Moving to Harrisburg" },
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
        name: "Moving to Harrisburg",
        item: PAGE_URL,
      },
    ],
  },
  {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: "Moving to Harrisburg NC: A Complete Guide to Concord's Neighbor",
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

export default function HarrisburgPage() {
  const meta = usePageMeta({
    title: PAGE_TITLE,
    description: PAGE_DESC,
    canonicalPath: "/moving-to-concord/harrisburg",
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
            Moving to Harrisburg NC: A Complete Guide to Concord's Neighbor
          </h1>
        </div>
      </section>

      <main className={styles.content}>
        <section className={styles.contentSection}>
          <h2>Town Overview</h2>
          <p>
            Just a few miles south of Concord sits Harrisburg, a vibrant and
            rapidly expanding town that has cemented itself as one of the most
            desirable suburbs in the Charlotte metropolitan area. Officially
            incorporated in 2009, Harrisburg is home to roughly 18,000 residents.
            It effortlessly blends small-town serenity with access to modern
            amenities, making it a premier destination for relocating families.
          </p>
        </section>

        <section className={styles.contentSection}>
          <h2>Real Estate & Housing</h2>
          <p>
            The real estate market in Harrisburg is predominantly characterized
            by beautiful, newer construction and expansive master-planned
            communities. Buyers can expect median home prices to fall within the
            $350K to $550K range. The housing stock largely features spacious
            lots, contemporary layouts, and highly amenitized neighborhoods.
            For a closer look at residential options, browse our{" "}
            <Link to="/neighborhoods">neighborhoods directory</Link>.
          </p>
        </section>

        <section className={styles.contentSection}>
          <h2>Lifestyle & Amenities</h2>
          <p>
            Harrisburg provides an exceptional quality of life. The town places
            a heavy emphasis on outdoor recreation, highlighted by Pharr Mill
            Park and the continually expanding Harrisburg Park, which offer
            miles of trails, modern playgrounds, and extensive sports facilities.
            Additionally, the Highway 49 corridor serves as the town's
            commercial spine, offering a growing array of grocery stores,
            boutiques, and dining options.
          </p>
        </section>

        <section className={styles.contentSection}>
          <h2>Excellent Schools</h2>
          <p>
            A driving factor for many moving to Harrisburg is the stellar public
            school system. Most students attend highly rated Cabarrus County
            Schools, including Harrisburg Elementary and Hickory Ridge High
            School. These institutions are well-regarded statewide for both
            academic excellence and competitive athletics.
          </p>
        </section>

        <section className={styles.contentSection}>
          <h2>The Commuter's Dream</h2>
          <p>
            Location is everything, and Harrisburg's geography is highly
            strategic. Situated with direct access to I-485 and I-85, residents
            enjoy a breezy 15-minute drive into Concord and a 25-minute commute
            to Uptown Charlotte. It is also remarkably close to the bustling
            University City employment hub and the UNC Charlotte campus.
          </p>
        </section>

        <section className={styles.contentSection}>
          <h2>Harrisburg vs. Concord</h2>
          <p>
            While Concord offers the scale of a small city—complete with a
            historic downtown core, major malls, and more extensive
            infrastructure—Harrisburg provides a quieter, predominantly suburban
            living experience. Buyers seeking newer homes and immediate highway
            access often gravitate toward Harrisburg, whereas those looking for
            historic charm might prefer Concord. You might also want to explore
            another thriving neighbor:{" "}
            <Link to="/moving-to-concord/kannapolis">Kannapolis</Link>.
          </p>
        </section>

        <section className={styles.contentSection}>
          <h2>Explore Nearby Areas</h2>
          <p>
            Explore nearby Concord neighborhoods: <Link to="/neighborhoods/winding-walk">Winding Walk</Link>, <Link to="/neighborhoods/highland-creek">Highland Creek</Link>, and <Link to="/neighborhoods/skybrook">Skybrook</Link>. Read the <Link to="/moving-to-concord/schools-guide">Concord NC schools guide</Link> for school zone details.
          </p>
          <p>
            <strong>Call or text Franklin Bellamy at (704) 904-5142 to start your Harrisburg or Concord home search.</strong>
          </p>
        </section>

        <PageAuthorBlock disclaimer="Home price ranges and community data on this page are sourced from Canopy MLS and the author's professional experience. All figures are estimates and subject to change. Verify current pricing with a licensed broker." />
      </main>

      <section className={styles.bottomCta}>
        <div className={styles.bottomCtaContainer}>
          <h2 className={styles.bottomCtaTitle}>Make Harrisburg Your Home</h2>
          <p className={styles.bottomCtaSubtitle}>
            Looking to buy in Harrisburg or Concord? Contact Franklin to start
            your tailored home search today.
          </p>
          <div className={styles.bottomCtaButtons}>
            <Button asChild size="lg" className={styles.bottomCtaBtn}>
              <Link to="/contact">Contact Franklin</Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className={styles.bottomCtaOutlineBtn}
            >
              <Link to="/moving-to-concord">Back to Moving Guide</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}