import { SITE_CONTACT_EMAIL, SITE_CONTACT_EMAIL_MAILTO } from "../helpers/siteContact";
import React from "react";
import { Link } from "react-router-dom";
import { usePageMeta } from "../helpers/usePageMeta";
import { useJsonLd } from "../helpers/useJsonLd";
import { PageBreadcrumbs } from "../components/PageBreadcrumbs";
import { Button } from "../components/Button";
import { PageAuthorBlock } from "../components/PageAuthorBlock";
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "../components/Accordion";
import styles from "./moving-to-concord.is-concord-nc-safe.module.css";

const PAGE_TITLE = "Is Concord NC Safe? | Living in Concord NC";
const PAGE_DESC =
  "Is Concord NC safe? An honest look at crime rates, safest neighborhoods, and how Concord compares to Charlotte — from local broker Franklin Bellamy.";
const PAGE_URL = "https://livinginconcordnc.com/moving-to-concord/is-concord-nc-safe";

const BREADCRUMBS = [
  { label: "Home", href: "/" },
  { label: "Moving Guide", href: "/moving-to-concord" },
  { label: "Is Concord NC Safe?" },
];

const FAQ_ITEMS = [
  {
    q: "Is Concord NC safe to live in?",
    a: "Yes, Concord is generally considered a very safe suburb, particularly when compared to national averages and the nearby Charlotte metro area. Like any growing city, safety varies by neighborhood, but overall, it is known as a highly family-friendly community with strong public safety resources."
  },
  {
    q: "What are the safest neighborhoods in Concord NC?",
    a: "The Northwest Concord corridor (zip code 28027) is widely regarded as the safest area in the city. Master-planned communities such as Winding Walk, Christenbury, Moss Creek, and Highland Creek consistently report very low property and violent crime rates."
  },
  {
    q: "How does Concord NC compare to Charlotte for crime?",
    a: "Concord maintains significantly lower violent and property crime rates compared to Charlotte. Many families choose to relocate from Charlotte to Concord specifically for the quieter, more secure suburban environment and the peace of mind it offers."
  },
  {
    q: "Is NW Concord safe for families?",
    a: "Absolutely. NW Concord was designed with families in mind, featuring well-lit streets, active neighborhood watches, and extensive community amenities. The excellent Cabarrus County school zoning further reinforces the secure, family-centric nature of this area."
  },
  {
    q: "What is downtown Concord like at night?",
    a: "Downtown Concord, particularly the Union Street corridor, has been beautifully revitalized and is generally very safe at night. It offers an active yet relaxed nightlife with family-friendly restaurants, breweries, and well-patrolled public spaces."
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
        name: "Moving Guide",
        item: "https://livinginconcordnc.com/moving-to-concord",
      },
      {
        "@type": "ListItem",
        position: 3,
        name: "Is Concord NC Safe?",
        item: PAGE_URL,
      },
    ],
  },
  {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: "Is Concord NC Safe? An Honest Look at Safety by Neighborhood in 2026",
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
];

export default function ConcordSafetyPage() {
  const meta = usePageMeta({
    title: PAGE_TITLE,
    description: PAGE_DESC,
    canonicalPath: "/moving-to-concord/is-concord-nc-safe",
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
            Is Concord NC Safe? An Honest Look at Safety by Neighborhood in 2026
          </h1>
          <p className={styles.heroSubtitle}>
            Updated June 2026 | By Franklin Bellamy, NC Licensed Broker | Relocation Specialist
          </p>
        </div>
      </section>

      <main className={styles.content}>
        <section className={styles.contentSection}>
          <p>
            When families call me about relocating to the Charlotte area, "Is Concord NC safe?" is without a doubt the number one question they ask. It is a completely valid concern. You are moving your life, your children, and your investments to a new city, and peace of mind is non-negotiable.
          </p>
          <p>
            As a local real estate broker, my job isn't to sell you a fantasy—it's to give you the direct, honest truth about what living here looks like. Concord is generally a very safe, family-friendly suburb, but like any rapidly growing city of over 100,000 residents, safety can vary significantly from one zip code to another.
          </p>
        </section>

        <section className={styles.contentSection}>
          <h2>Overall Safety Context</h2>
          <p>
            When viewing Concord through a wider lens, it consistently ranks as one of the safer municipalities in the Greater Charlotte region. The crime rate in Concord is notably lower than in Charlotte proper, which is a primary driver for the intense housing demand we see in Cabarrus County.
          </p>
          <p>
            Specifically, the Northwest corridor of Concord (the 28027 zip code) is among the safest stretches in the entire metro area. You don't have to take my word for it—I always encourage buyers to verify local incident reports independently via the <a href="https://concordnc.gov/Departments/Police" target="_blank" rel="noopener noreferrer">City of Concord public safety page</a> or aggregate data sites like NeighborhoodScout.com.
          </p>
        </section>

        <section className={styles.contentSection}>
          <h2>Safety by Area</h2>
          <p>
            Concord covers a large geographic footprint, and safety profiles change depending on where you are. Here is an honest breakdown of the different areas:
          </p>
          <ul>
            <li>
              <strong>NW Concord (28027):</strong> This is the premier suburban corridor. It consists of large, family-oriented master-planned communities like Winding Walk, Moss Creek, and Christenbury. Incident rates here are exceptionally low, mostly limited to minor property crimes (like unlocked car rummaging). It is highly secure and community-focused.
            </li>
            <li>
              <strong>Downtown Union Street Corridor:</strong> Historic downtown Concord has undergone a massive revitalization. It is very pedestrian-friendly, well-lit, and generally safe. It features an active nightlife with breweries and restaurants, heavily patrolled to maintain a welcoming, family-friendly atmosphere.
            </li>
            <li>
              <strong>Central / South Concord:</strong> This area features older, established neighborhoods. It is more mixed in terms of demographics and development. While many streets are quiet and charming, there are pockets with higher police activity. It varies heavily block-by-block.
            </li>
            <li>
              <strong>Hwy 29 / NE Concord:</strong> This is a heavy commercial and retail corridor. Naturally, with massive retail centers comes a higher concentration of traffic-related incidents and commercial property crimes. Residential safety here fluctuates depending on proximity to the main highway.
            </li>
          </ul>
        </section>

        <section className={styles.contentSection}>
          <h2>Concord Police Department & Public Safety</h2>
          <p>
            The City of Concord has invested heavily in public safety to keep pace with its rapid population growth. The Concord Police Department (CPD) maintains a strong, visible presence and utilizes community-policing models to build relationships with local neighborhoods. Response times are generally excellent, and the department works closely with Homeowners Associations in the master-planned communities to maintain high safety standards.
          </p>
        </section>

        <section className={styles.contentSection}>
          <h2>School Safety in Cabarrus County</h2>
          <p>
            For parents, safety doesn't stop at the property line—it extends to the classroom. Cabarrus County Schools, which serves Concord, maintains strict safety protocols. This includes secured, limited-access entryways during school hours, comprehensive visitor management systems, and dedicated School Resource Officers (SROs) assigned to campuses. The district's proactive approach to student safety is a major reason why families are so eager to secure homes in zones like Cox Mill.
          </p>
        </section>

        <section className={styles.contentSection}>
          <h2>Franklin's Honest Take</h2>
          <p>
            I live, work, and raise my own family in this area. My philosophy as a real estate broker is very straightforward: I absolutely will not sell you a house in a neighborhood where I wouldn't feel comfortable having my own family live.
          </p>
          <p>
            The truth is, if you are buying in Northwest Concord, you are buying into one of the most secure, community-minded suburban environments available in North Carolina. Yes, you should always lock your doors and practice common sense—no city is immune to crime. But the peace of mind you get walking your dog at night in these communities is a huge part of what you are paying for when you buy real estate here.
          </p>
          <p>
            If you have specific concerns about a neighborhood or a street, call me. I will give you an unfiltered assessment so you can make the right decision for your family.
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
              <Link to="/moving-to-concord/cost-of-living-concord-nc">Cost of living in Concord NC</Link>
            </li>
            <li>
              <Link to="/contact">Discuss neighborhoods with Franklin</Link>
            </li>
          </ul>
        </div>

        <PageAuthorBlock disclaimer="Safety information on this page is based on general community knowledge, publicly available resources, and the author's professional experience — not fabricated statistics. Crime rates vary by area and change over time. Verify current data at the City of Concord public safety page or NeighborhoodScout.com before making relocation decisions." />
      </main>

      <section className={styles.bottomCta}>
        <div className={styles.bottomCtaContainer}>
          <h2 className={styles.bottomCtaTitle}>Let's Find Your Safe Haven</h2>
          <p className={styles.bottomCtaSubtitle}>
            Call or text Franklin Bellamy at (704) 904-5142 for honest, direct advice on the best neighborhoods for your family in Concord, NC.
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
              <Link to="/neighborhoods">Explore Safe Neighborhoods</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}