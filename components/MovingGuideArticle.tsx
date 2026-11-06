import React from "react";
import { Link } from "react-router-dom";
import { usePageMeta } from "../helpers/usePageMeta";
import { useJsonLd } from "../helpers/useJsonLd";
import { PageBreadcrumbs } from "./PageBreadcrumbs";
import { Button } from "./Button";
import { PageAuthorBlock } from "./PageAuthorBlock";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "./Accordion";
import { SITE_CONTACT_PHONE_DISPLAY } from "../helpers/siteContact";
import styles from "./MovingGuideArticle.module.css";

export interface MovingGuideSection {
  heading: string;
  html: string;
}

export interface MovingGuideFaq {
  q: string;
  a: string;
}

export interface MovingGuideData {
  slug: string;
  title: string;
  label: string;
  metaDescription: string;
  subtitle: string;
  introHtml: string;
  sections: MovingGuideSection[];
  faqs: MovingGuideFaq[];
  disclaimer: string;
}

/**
 * Shared renderer for the /moving-to-concord/* guide library. Mirrors the
 * structure of the original Floot guide pages (hero, breadcrumbs, content
 * sections, FAQ accordion, PageAuthorBlock with a topic-specific
 * disclaimer, bottom CTA) so ported LIC-1 guides match LIC-2's design.
 * Guide content lives in guide-data/<slug>.json.
 */
export function MovingGuideArticle({ guide }: { guide: MovingGuideData }) {
  const canonicalPath = `/moving-to-concord/${guide.slug}`;
  const pageUrl = `https://livinginconcordnc.com${canonicalPath}`;

  const meta = usePageMeta({
    title: `${guide.title} | Living in Concord NC`,
    description: guide.metaDescription,
    canonicalPath,
  });

  const jsonLdObjects: Record<string, unknown>[] = [
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: "https://livinginconcordnc.com/" },
        { "@type": "ListItem", position: 2, name: "Moving Guide", item: "https://livinginconcordnc.com/moving-to-concord" },
        { "@type": "ListItem", position: 3, name: guide.label, item: pageUrl },
      ],
    },
    {
      "@context": "https://schema.org",
      "@type": "Article",
      headline: guide.title,
      description: guide.metaDescription,
      author: {
        "@type": "Person",
        name: "Franklin Bellamy",
        jobTitle: "NC Licensed Real Estate Broker",
      },
      publisher: { "@type": "Organization", name: "LivingInConcordNC.com" },
    },
  ];
  if (guide.faqs.length > 0) {
    jsonLdObjects.push({
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: guide.faqs.map((f) => ({
        "@type": "Question",
        name: f.q,
        acceptedAnswer: { "@type": "Answer", text: f.a },
      })),
    });
  }
  const jsonLd = useJsonLd(jsonLdObjects);

  const breadcrumbs = [
    { label: "Home", href: "/" },
    { label: "Moving Guide", href: "/moving-to-concord" },
    { label: guide.label },
  ];

  return (
    <div className={styles.page}>
      {meta}
      {jsonLd}
      <PageBreadcrumbs items={breadcrumbs} />
      <section className={styles.hero}>
        <div className={styles.heroContainer}>
          <h1 className={styles.heroTitle}>{guide.title}</h1>
          {guide.subtitle && <p className={styles.heroSubtitle}>{guide.subtitle}</p>}
        </div>
      </section>

      <main className={styles.content}>
        {guide.introHtml && (
          <section
            className={styles.contentSection}
            dangerouslySetInnerHTML={{ __html: guide.introHtml }}
          />
        )}

        {guide.sections.map((section) => (
          <section key={section.heading} className={styles.contentSection}>
            <h2>{section.heading}</h2>
            <div dangerouslySetInnerHTML={{ __html: section.html }} />
          </section>
        ))}

        {guide.faqs.length > 0 && (
          <section className={styles.contentSection}>
            <h2>Frequently Asked Questions</h2>
            <Accordion type="multiple">
              {guide.faqs.map((item, index) => (
                <AccordionItem key={index} value={`faq-${index}`}>
                  <AccordionTrigger>{item.q}</AccordionTrigger>
                  <AccordionContent>{item.a}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </section>
        )}

        <div className={styles.researchBox}>
          <h3>Continue Your Research</h3>
          <ul>
            <li>
              <Link to="/moving-to-concord">The complete Concord NC relocation guide</Link>
            </li>
            <li>
              <Link to="/moving-to-concord/cost-of-living-concord-nc">Cost of living in Concord NC</Link>
            </li>
            <li>
              <Link to="/neighborhoods">Explore Concord NC neighborhoods</Link>
            </li>
            <li>
              <Link to="/market-reports">Concord NC market reports</Link>
            </li>
          </ul>
        </div>

        <PageAuthorBlock className={styles.authorBlock} disclaimer={guide.disclaimer} />
      </main>

      <section className={styles.bottomCta}>
        <div className={styles.bottomCtaContainer}>
          <h2 className={styles.bottomCtaTitle}>Planning Your Move to Concord?</h2>
          <p className={styles.bottomCtaSubtitle}>
            Call or text Franklin Bellamy at {SITE_CONTACT_PHONE_DISPLAY} for honest,
            local guidance on neighborhoods, timing, and your budget — no pressure.
          </p>
          <div className={styles.bottomCtaButtons}>
            <Button asChild size="lg" className={styles.bottomCtaBtn}>
              <Link to="/contact">Contact Franklin</Link>
            </Button>
            <Button asChild size="lg" variant="outline" className={styles.bottomCtaOutlineBtn}>
              <Link to="/moving-to-concord">Back to the Moving Guide</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
