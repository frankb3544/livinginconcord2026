import React from "react";
import { Link } from "react-router-dom";
import { usePageMeta } from "../helpers/usePageMeta";
import { useJsonLd } from "../helpers/useJsonLd";
import { PageBreadcrumbs } from "./PageBreadcrumbs";
import { Button } from "./Button";
import { PageAuthorBlock } from "./PageAuthorBlock";
import { SITE_CONTACT_PHONE_DISPLAY } from "../helpers/siteContact";
import styles from "./MovingGuideArticle.module.css";

export interface InfoPageSection {
  heading: string;
  html: string;
}

export interface InfoPageData {
  slug: string;
  title: string;
  label: string;
  metaDescription: string;
  subtitle: string;
  introHtml: string;
  sections: InfoPageSection[];
  faqs: { q: string; a: string }[];
  disclaimer: string;
}

interface InfoPageProps {
  page: InfoPageData;
  /** Rendered between the intro and the content sections (forms, CTAs). */
  children?: React.ReactNode;
  ctaTitle?: string;
  ctaSubtitle?: string;
}

/**
 * Shared renderer for top-level content pages ported from LIC-1
 * (cash-offers, seller-resources, relocation-help, things-to-do,
 * downtown-concord). Mirrors MovingGuideArticle / the LIC-2 guide pages:
 * hero, breadcrumbs, sections, PageAuthorBlock with a topic-specific
 * disclaimer, bottom CTA. Page content lives in page-data/<slug>.json.
 */
export function InfoPage({ page, children, ctaTitle, ctaSubtitle }: InfoPageProps) {
  const canonicalPath = `/${page.slug}`;
  const pageUrl = `https://livinginconcordnc.com${canonicalPath}`;

  const meta = usePageMeta({
    title: `${page.title} | Living in Concord NC`,
    description: page.metaDescription,
    canonicalPath,
  });

  const jsonLd = useJsonLd([
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: "https://livinginconcordnc.com/" },
        { "@type": "ListItem", position: 2, name: page.label, item: pageUrl },
      ],
    },
    {
      "@context": "https://schema.org",
      "@type": "Article",
      headline: page.title,
      description: page.metaDescription,
      author: {
        "@type": "Person",
        name: "Franklin Bellamy",
        jobTitle: "NC Licensed Real Estate Broker",
      },
      publisher: { "@type": "Organization", name: "LivingInConcordNC.com" },
    },
  ]);

  const breadcrumbs = [{ label: "Home", href: "/" }, { label: page.label }];

  return (
    <div className={styles.page}>
      {meta}
      {jsonLd}
      <PageBreadcrumbs items={breadcrumbs} />
      <section className={styles.hero}>
        <div className={styles.heroContainer}>
          <h1 className={styles.heroTitle}>{page.title}</h1>
          {page.subtitle && <p className={styles.heroSubtitle}>{page.subtitle}</p>}
        </div>
      </section>

      <main className={styles.content}>
        {page.introHtml && (
          <section
            className={styles.contentSection}
            dangerouslySetInnerHTML={{ __html: page.introHtml }}
          />
        )}

        {children}

        {page.sections.map((section) => (
          <section key={section.heading} className={styles.contentSection}>
            <h2>{section.heading}</h2>
            <div dangerouslySetInnerHTML={{ __html: section.html }} />
          </section>
        ))}

        <PageAuthorBlock className={styles.authorBlock} disclaimer={page.disclaimer} />
      </main>

      <section className={styles.bottomCta}>
        <div className={styles.bottomCtaContainer}>
          <h2 className={styles.bottomCtaTitle}>{ctaTitle ?? "Talk It Through with Franklin"}</h2>
          <p className={styles.bottomCtaSubtitle}>
            {ctaSubtitle ??
              `Call or text Franklin Bellamy at ${SITE_CONTACT_PHONE_DISPLAY} — honest local guidance, no pressure.`}
          </p>
          <div className={styles.bottomCtaButtons}>
            <Button asChild size="lg" className={styles.bottomCtaBtn}>
              <Link to="/contact">Contact Franklin</Link>
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
