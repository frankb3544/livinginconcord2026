import React from "react";
import { Link } from "react-router-dom";
import { ArrowDown } from "lucide-react";
import { usePageMeta } from "../helpers/usePageMeta";
import { useJsonLd } from "../helpers/useJsonLd";
import { PageBreadcrumbs } from "../components/PageBreadcrumbs";
import { Button } from "../components/Button";

import { GuideTableOfContents } from "../components/GuideTableOfContents";

import { GuideQuickComparison } from "../components/GuideQuickComparison";
import { GuideCityComparison } from "../components/GuideCityComparison";
import { GuideReasonsSection } from "../components/GuideReasonsSection";
import { GuideNeighborhoodMatch } from "../components/GuideNeighborhoodMatch";
import { GuideSchoolsSection } from "../components/GuideSchoolsSection";
import { GuideLocationSection } from "../components/GuideLocationSection";
import { GuideRelocationSpecialist } from "../components/GuideRelocationSpecialist";
import { GuideConcordFaq, CONCORD_FAQ_SCHEMA } from "../components/GuideConcordFaq";


import { GuideStarterPackCta } from "../components/GuideStarterPackCta";
import { GuideNeighborhoodsSection } from "../components/GuideNeighborhoodsSection";
import { GuideExploreMore } from "../components/GuideExploreMore";
import { PageAuthorBlock } from "../components/PageAuthorBlock";
import { DataDisclaimer } from "../components/DataDisclaimer";

import styles from "./moving-to-concord.module.css";

const MOVING_GUIDE_FAQ_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "Is the relocation guide really free?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes, 100% free. We believe that providing genuine value upfront is the best way to earn your trust. There are no hidden charges, upsells, or subscriptions — just a comprehensive guide to help you make an informed decision about your move to Concord.",
      },
    },
    {
      "@type": "Question",
      "name": "How long is the guide?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "The guide is over 3,000 words and covers 10 detailed chapters. It's designed to be thorough without being overwhelming — you can read the whole thing in about 15-20 minutes or jump to the chapters most relevant to your situation.",
      },
    },
    {
      "@type": "Question",
      "name": "Is the information up to date?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Absolutely. The guide is regularly updated to reflect the latest market data, school ratings, neighborhood developments, and local changes. The version you download will always have the most current information available.",
      },
    },
    {
      "@type": "Question",
      "name": "Will I be spammed after downloading?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "No. Your email is only used to send you the guide and occasional Concord market updates. You can unsubscribe at any time with one click. We respect your inbox.",
      },
    },
    {
      "@type": "Question",
      "name": "Who wrote this guide?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "The guide was written by Franklin Bellamy, a licensed Concord NC realtor with 15+ years of local experience. Franklin has personally helped 100+ families relocate to the area and brings firsthand knowledge to every chapter.",
      },
    },
    {
      "@type": "Question",
      "name": "Can I get personalized relocation help beyond the guide?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Of course! The guide is a great starting point, but every family's situation is unique. Franklin offers free, no-obligation consultation calls where you can discuss your specific needs, timeline, and budget. Just reach out through the contact page.",
      },
    },
  ],
};

const MOVING_GUIDE_HOWTO_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  "name": "How to Move to Concord NC — Complete Relocation Guide",
  "description": "Step by step guide to relocating to Concord NC including neighborhood selection, schools, cost of living and working with a local broker",
  "totalTime": "PT30M",
  "step": [
    {"@type": "HowToStep", "name": "Research Concord NC neighborhoods", "text": "Explore Concord NC's top communities including Winding Walk, Christenbury, Skybrook, and Highland Creek to find the right fit for your family and budget."},
    {"@type": "HowToStep", "name": "Understand the Cabarrus County school zones", "text": "Review school assignments for Cox Mill Elementary, Harris Road Middle, and Cox Mill High School. School zones directly impact home values and neighborhood selection."},
    {"@type": "HowToStep", "name": "Review current market conditions", "text": "Check the latest Concord NC housing market data including median prices, days on market, and inventory levels to time your purchase strategically."},
    {"@type": "HowToStep", "name": "Connect with a local Concord NC broker", "text": "Contact Franklin Bellamy at (704) 904-5142 for personalized relocation guidance, neighborhood tours, and honest market advice."},
    {"@type": "HowToStep", "name": "Begin your home search in Concord NC", "text": "Schedule private tours, make offers, and navigate the closing process with expert guidance from a local broker who knows every street."}
  ]
};

const MOVING_CONCORD_FAQ_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "Is Concord NC a good place to live?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes, Concord NC is consistently ranked as one of the best places to live in North Carolina. It offers affordable housing, top-rated Cabarrus County schools, a 20-minute commute to Charlotte, and a strong sense of community. Families particularly love the Cox Mill school zone and neighborhoods like Winding Walk and Christenbury.",
      },
    },
    {
      "@type": "Question",
      "name": "How far is Concord NC from Charlotte?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Concord is approximately 20-25 miles northeast of Charlotte. Most commuters reach Uptown Charlotte in 25-35 minutes via I-85. Charlotte Douglas International Airport is roughly 30 minutes away, making Concord ideal for professionals who work in the Charlotte Metro Area.",
      },
    },
    {
      "@type": "Question",
      "name": "What are the best neighborhoods in Concord NC for families?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "The most popular family neighborhoods include Christenbury, Highland Creek, Skybrook, and Winding Walk — all zoned for top-rated Cox Mill schools. Each offers community amenities like pools, playgrounds, and walking trails. Contact Franklin Bellamy at (704) 904-5142 for personalized neighborhood recommendations.",
      },
    },
  ],
};

const MOVING_GUIDE_BREADCRUMBS_JSON_LD = {
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
      "name": "Moving Guide",
      "item": "https://livinginconcordnc.com/moving-to-concord"
    }
  ]
};

const MOVING_GUIDE_BREADCRUMBS = [
  { label: "Home", href: "/" },
  { label: "Moving Guide" },
];

function scrollToDownloadForm() {
    const el = document.getElementById("starter-pack");
  if (el) {
    el.scrollIntoView({ behavior: "smooth" });
  }
}

export default function MovingToConcordPage() {
  const meta = usePageMeta({
    title: "Moving to Concord NC | Living in Concord NC",
    description:
      "Everything you need for moving to Concord NC — cost of living, schools, neighborhoods, and a free PDF guide. Get expert advice from Franklin Bellamy.",
    canonicalPath: "/moving-to-concord",
    ogImage: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=1200&q=80",
  });
  const jsonLd = useJsonLd([MOVING_GUIDE_FAQ_SCHEMA, MOVING_CONCORD_FAQ_SCHEMA, CONCORD_FAQ_SCHEMA, MOVING_GUIDE_BREADCRUMBS_JSON_LD, MOVING_GUIDE_HOWTO_SCHEMA]);

  return (
    <div className={styles.page}>
      {meta}
      {jsonLd}
      <PageBreadcrumbs items={MOVING_GUIDE_BREADCRUMBS} />
      {/* 1. Hero Section */}
      <section className={styles.hero}>
        <div className={styles.heroContainer}>
          <h1 className={styles.heroTitle}>
            You've Outpriced Yourself in <span className={styles.cityPlaceholder}>Charlotte</span>. Concord Gives You Everything Back.
          </h1>
          <p className={styles.heroSubtitle}>
            $360K median home price. Top-rated schools. 30 minutes from Charlotte Douglas Airport. This is why thousands are moving to Concord NC.
          </p>
          <div className={styles.heroButtons}>
            <Button size="lg" className={styles.heroCta} onClick={scrollToDownloadForm}>
              <ArrowDown size={20} />
              Download Your Free Relocation Guide
            </Button>
            <Button asChild size="lg" variant="outline" className={styles.heroOutlineCta}>
              <Link to="/contact">Schedule a Free Relocation Call with Franklin</Link>
            </Button>
          </div>
          <p className={styles.trustLine}>
            Franklin Bellamy | NC Licensed Real Estate Broker | Relocation Specialist | 15+ Years in Concord NC
          </p>
        </div>
      </section>

      {/* 1.5 Quick Comparison */}
      <GuideQuickComparison />

      {/* 2. City Comparison */}
<GuideCityComparison />

{/* 3. 5 Reasons */}
<GuideReasonsSection />

{/* 4. Neighborhood Match */}
<GuideNeighborhoodMatch />

{/* 5. Schools Section */}
<GuideSchoolsSection />

<DataDisclaimer variant="mid" text="School data and community information referenced above are sourced from Cabarrus County Schools, NC Department of Public Instruction, and publicly available records. Verify current details before making decisions." />

{/* 6. Location Section */}
<GuideLocationSection />

{/* 7. Relocation Specialist */}
<GuideRelocationSpecialist />

{/* 8. Concord FAQ */}
<GuideConcordFaq />


      
      {/* 5. What's Inside (Table of Contents Preview) */}
      <GuideTableOfContents />

      
      {/* 7. Explore Neighborhoods (data-driven) */}
      <GuideNeighborhoodsSection />

      {/* 8. Explore More Guides */}
      <GuideExploreMore />

      <section className={styles.authorBlockSection}>
        <PageAuthorBlock disclaimer="Relocation data on this page is sourced from Canopy MLS, Cabarrus County public records, and the author's professional experience. All figures are estimates and subject to change. Verify current data before making real estate decisions." />
      </section>
            
      {/* 10. Bottom CTA */}
      <section className={styles.bottomCta}>
        <div className={styles.bottomCtaContainer}>
          <h2 className={styles.bottomCtaTitle}>Ready to Start Your Concord Journey?</h2>
          <p className={styles.bottomCtaSubtitle}>
            Download the free guide, explore neighborhoods, and connect with a local expert who knows Concord inside and out.
          </p>
          <p className={styles.bottomCtaSubtitle}>
            Explore top neighborhoods like <Link to="/neighborhoods/winding-walk">Winding Walk</Link>, <Link to="/neighborhoods/christenbury">Christenbury</Link>, and <Link to="/neighborhoods/highland-creek">Highland Creek</Link>. Check out the <Link to="/moving-to-concord/schools-guide">Concord NC schools guide</Link> or view <Link to="/market-reports">market reports</Link>.
          </p>
          <div className={styles.bottomCtaButtons}>
            <Button asChild size="lg" className={styles.bottomCtaBtn}>
              <Link to="/contact">Talk to Franklin Today</Link>
            </Button>
            <Button asChild size="lg" variant="outline" className={styles.bottomCtaOutlineBtn}>
              <Link to="/neighborhoods">Explore Neighborhoods</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* 11. Starter Pack CTA */}
      <GuideStarterPackCta />
    </div>
  );
}