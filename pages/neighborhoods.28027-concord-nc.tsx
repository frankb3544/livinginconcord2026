import { SITE_CONTACT_EMAIL, SITE_CONTACT_EMAIL_MAILTO } from "../helpers/siteContact";
import React from "react";
import { Link } from "react-router-dom";
import { usePageMeta } from "../helpers/usePageMeta";
import { useJsonLd } from "../helpers/useJsonLd";
import { PageBreadcrumbs } from "../components/PageBreadcrumbs";
import { Button } from "../components/Button";
import { PageAuthorBlock } from "../components/PageAuthorBlock";
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "../components/Accordion";
import { DataDisclaimer } from "../components/DataDisclaimer";
import styles from "./neighborhoods.28027-concord-nc.module.css";

const PAGE_TITLE = "28027 Concord NC Guide | Living in Concord NC";
const PAGE_DESC =
  "Explore Concord NC 28027 zip code — neighborhood prices, top schools, market stats, and lifestyle. Your complete 2026 guide from broker Franklin Bellamy.";
const PAGE_URL = "https://livinginconcordnc.com/neighborhoods/28027-concord-nc";

const BREADCRUMBS = [
  { label: "Home", href: "/" },
  { label: "Neighborhoods", href: "/neighborhoods" },
  { label: "28027 Concord NC" },
];

const FAQ_ITEMS = [
  {
    q: "What is the average home price in 28027 Concord NC?",
    a: "As of May 2026, the median home price in the 28027 zip code is approximately $360,000, with the average sale price around $439,299. Prices vary significantly depending on the neighborhood, ranging from $300,000 to over $1.6 million for luxury properties."
  },
  {
    q: "What neighborhoods are in the 28027 zip code?",
    a: "The 28027 zip code encompasses highly desirable Northwest Concord neighborhoods including Winding Walk, Afton Village, Christenbury, Moss Creek, and portions of Highland Creek, offering a mix of master-planned communities and established subdivisions."
  },
  {
    q: "What schools are in the 28027 zip code?",
    a: "The 28027 area is primarily served by Cabarrus County Schools, featuring highly rated schools like Cox Mill Elementary, Harris Road Middle School, and Cox Mill High School. It is known as one of the most sought-after school zones in the region."
  },
  {
    q: "Is 28027 a good zip code to buy a home?",
    a: "Yes, 28027 is considered one of the premier zip codes in the Greater Charlotte area. It offers strong property value appreciation, excellent schools, low crime rates, and master-planned communities, making it an ideal choice for families and professionals."
  },
  {
    q: "How far is 28027 from Charlotte NC?",
    a: "The 28027 zip code is located about 20 to 25 miles northeast of Uptown Charlotte. For commuters, this typically translates to a 30 to 35-minute drive via the nearby I-85 corridor or I-485, depending on traffic conditions."
  }
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
        name: "Neighborhoods",
        item: "https://livinginconcordnc.com/neighborhoods",
      },
      {
        "@type": "ListItem",
        position: 3,
        name: "28027 Concord NC",
        item: PAGE_URL,
      },
    ],
  },
  {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: "Living in Concord NC 28027 — Neighborhoods, Prices & Market Guide 2026",
    description: PAGE_DESC,
    author: {
      "@type": "Person",
      name: "Franklin Bellamy",
      jobTitle: "NC Licensed Real Estate Broker",
    },
    publisher: {
      "@type": "Organization",
      name: "LivingInConcordNC.com",
    },
  },
  {
    "@context": "https://schema.org",
    "@type": "RealEstateAgent",
    name: "Franklin Bellamy",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Concord",
      addressRegion: "NC",
      postalCode: "28027",
    },
    telephone: "(704) 904-5142",
    email: SITE_CONTACT_EMAIL,
    url: "https://livinginconcordnc.com"
  },
  {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: FAQ_ITEMS.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.a,
      },
    })),
  },
  {
    "@context": "https://schema.org",
    "@type": "Dataset",
    name: "Concord NC 28027 May 2026 Real Estate Market Data",
    description: "May 2026 market statistics for the 28027 zip code in Concord, North Carolina including median price, days on market, and inventory.",
    variableMeasured: ["Median Price", "Average Price", "Days on Market", "List-to-Sale Ratio", "Inventory", "YOY Appreciation"]
  }
];

export default function Concord28027Page() {
  const meta = usePageMeta({
    title: PAGE_TITLE,
    description: PAGE_DESC,
    canonicalPath: "/neighborhoods/28027-concord-nc",
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
            Living in Concord NC 28027 — Neighborhoods, Prices & Market Guide 2026
          </h1>
          <p className={styles.heroSubtitle}>
            Updated May 2026 | By Franklin Bellamy, NC Licensed Broker | Relocation Specialist
          </p>
        </div>
      </section>

      <main className={styles.content}>
        <section className={styles.contentSection}>
          <h2>What 28027 Covers</h2>
          <p>
            When buyers say they want to move to Concord, what they often mean is they want to live in the <strong>28027 zip code</strong>. Covering the Northwest corridor of Concord, NC, this zip code is the most desirable area in the city, known for its master-planned communities, top-rated schools, and seamless commute to Charlotte.
          </p>
          <p>
            Bordering Huntersville to the west and Harrisburg to the south, 28027 offers a premium suburban lifestyle without sacrificing connectivity. Whether you are looking for a starter home or a luxury estate, this area holds the highest concentration of sought-after real estate in Cabarrus County.
          </p>
        </section>

        <section className={styles.contentSection}>
          <h2>May 2026 Market Snapshot</h2>
          <p>
            The housing market in 28027 remains highly competitive. Low inventory and high buyer demand continue to drive prices upward, making it essential to understand the current landscape before you start your home search. Here is a snapshot of the May 2026 market data:
          </p>
          <div className={styles.tableContainer}>
            <table className={styles.dataTable}>
              <caption className="sr-only">May 2026 Market Data for Concord NC 28027</caption>
              <thead>
                <tr>
                  <th>Metric</th>
                  <th>Value</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Median Home Price</td>
                  <td>$360,000</td>
                </tr>
                <tr>
                  <td>Average Home Price</td>
                  <td>$439,299</td>
                </tr>
                <tr>
                  <td>Average Days on Market</td>
                  <td>60 Days</td>
                </tr>
                <tr>
                  <td>List-to-Sale Ratio</td>
                  <td>96.1%</td>
                </tr>
                <tr>
                  <td>Current Inventory</td>
                  <td>3.1 Months</td>
                </tr>
                <tr>
                  <td>YOY Appreciation</td>
                  <td>+1.4% YTD</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        <DataDisclaimer variant="mid" text="Market snapshot data above reflects May 2026 estimates from Canopy MLS. Actual prices, inventory levels, and days on market fluctuate. Consult a licensed broker for the most current figures." />

        <section className={styles.contentSection}>
          <h2>Neighborhoods in 28027</h2>
          <p>
            The 28027 area code is defined by its robust selection of master-planned communities, each offering distinct amenities and lifestyles. Here are some of the most prominent neighborhoods:
          </p>
          <ul>
            <li>
              <strong><Link to="/neighborhoods/winding-walk">Winding Walk</Link></strong> ($500K - $990K): A premier master-planned community with extensive walking trails, multiple pools, and an active neighborhood association.
            </li>
            <li>
              <strong><Link to="/neighborhoods/afton-village">Afton Village</Link></strong> ($300K - $680K): A unique, highly walkable community featuring a mix of residential homes and commercial spaces, centered around a charming park.
            </li>
            <li>
              <strong><Link to="/neighborhoods/christenbury">Christenbury</Link></strong> ($650K - $1.6M): An upscale neighborhood known for its luxury homes, larger lots, and an incredible resort-style clubhouse.
            </li>
            <li>
              <strong><Link to="/neighborhoods/highland-creek">Highland Creek</Link></strong>: A massive, amenity-rich community spanning both Cabarrus and Mecklenburg counties, famous for its golf course and family-friendly atmosphere.
            </li>
            <li>
              <strong>The Cox Mill Area</strong>: Incorporating subdivisions like Moss Creek, Annsborough Park, and Cannon Run, these established neighborhoods are anchored by the highly rated schools nearby.
            </li>
          </ul>
        </section>

        <section className={styles.contentSection}>
          <h2>Who Lives Here</h2>
          <p>
            The demographic profile of 28027 is dynamic and growth-oriented. The area is highly attractive to young families drawn by the strong school system and safe, amenity-filled neighborhoods. It is equally popular with working professionals who commute to the Charlotte metro area but prefer a quieter, suburban retreat at the end of the day. Additionally, the availability of low-maintenance townhomes and active adult sections within larger communities has made it a favorite among retirees relocating to North Carolina.
          </p>
        </section>

        <section className={styles.contentSection}>
          <h2>Schools in 28027</h2>
          <p>
            For many buyers, the Cabarrus County Schools zoning is the primary reason for targeting 28027. The premier educational pipeline in this zip code consists of <strong>Cox Mill Elementary</strong> feeding into <strong>Harris Road Middle School</strong>, and culminating at <strong>Cox Mill High School</strong>.
          </p>
          <p>
            This specific school pipeline consistently ranks among the highest in the district for academic achievement, college readiness, and athletic programs, making homes in this zone incredibly resilient investments.
          </p>
        </section>

        <section className={styles.contentSection}>
          <h2>Lifestyle & Amenities</h2>
          <p>
            Life in 28027 is incredibly convenient. The I-85 Exit 52 (Poplar Tent Road) and Exit 54 (George W. Liles Parkway) corridors provide immediate access to everyday necessities. You'll find extensive shopping and dining options at Afton Ridge and Concord Mills, alongside multiple grocery stores including Publix, Harris Teeter, and Target.
          </p>
          <p>
            For recreation, Frank Liske Park offers 238 acres of green space, fishing, and sports fields. The community is also heavily saturated with medical facilities, including immediate access to Atrium Health locations.
          </p>
        </section>

        <section className={styles.contentSection}>
          <h2>Commute Times</h2>
          <p>
            The strategic location of 28027 makes commuting highly manageable. Being positioned right off the I-85 corridor means you have direct highway access.
          </p>
          <ul>
            <li><strong>Uptown Charlotte:</strong> 30 to 35 minutes via I-85 South.</li>
            <li><strong>Charlotte Douglas International Airport (CLT):</strong> Approximately 35 to 40 minutes via I-85 and I-485.</li>
            <li><strong>University City / UNC Charlotte:</strong> 25–30 minutes.</li>
          </ul>
        </section>

        <section className={styles.contentSection}>
          <h2>Current Market Conditions</h2>
          <p>
            As of May 2026, 28027 represents a moderately active seller's market. With inventory sitting at 3.1 months and an average of 43 days on market, buyers have a bit more time to make decisions compared to previous years. However, well-priced homes still command attention, with sellers receiving an average of 96.1% of their list price.
          </p>
        </section>

        <section className={styles.contentSection}>
          <h2>Franklin's Take</h2>
          <p>
            When out-of-state buyers call me and ask for "the best part of Concord," 28027 is exactly where I point them. The reason is simple: it offers the highest quality of life per dollar in the entire Charlotte metro periphery. You are getting master-planned communities that feel modern and cohesive, zoned for top-tier schools, all while maintaining a relatively low Cabarrus County property tax rate.
          </p>
          <p>
            Because of the low inventory right now, buying in 28027 requires strategy. You need to be pre-approved, ready to view homes the day they hit the market, and prepared to write clean, competitive offers. But once you secure a property here, the lifestyle and the long-term equity growth consistently prove to be worth the effort.
          </p>
        </section>

        <section className={styles.contentSection}>
          <h2>Frequently Asked Questions</h2>
          <Accordion type="multiple" defaultValue={FAQ_ITEMS.map((_, i) => `faq-${i}`)}>
            {FAQ_ITEMS.map((item, index) => (
              <AccordionItem key={index} value={`faq-${index}`}>
                <AccordionTrigger>{item.q}</AccordionTrigger>
                <AccordionContent>{item.a}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </section>

        <div className={styles.researchBox}>
          <h3>Continue Your Research</h3>
          <ul>
            <li>
              <Link to="/neighborhoods/winding-walk">Winding Walk neighborhood guide</Link>
            </li>
            <li>
              <Link to="/market-reports">View latest Concord NC market reports</Link>
            </li>
            <li>
              <Link to="/contact">Schedule a neighborhood tour with Franklin</Link>
            </li>
          </ul>
        </div>

        <PageAuthorBlock disclaimer="Market data and home price ranges cited on this page reflect estimates for the 28027 zip code as of May 2026 and are subject to change. Per Canopy MLS, Inc. / Canopy Realtor® Association, Local Market Update — Concord NC, current as of April 5, 2026. Always verify current pricing, school zoning, and neighborhood boundaries with a licensed real estate professional before making purchasing decisions." />
      </main>

      <section className={styles.bottomCta}>
        <div className={styles.bottomCtaContainer}>
          <h2 className={styles.bottomCtaTitle}>Ready to Move to 28027?</h2>
          <p className={styles.bottomCtaSubtitle}>
            Call or text Franklin Bellamy at (704) 904-5142 to start your home search in Northwest Concord.
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
              <Link to="/neighborhoods">Explore All Neighborhoods</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}