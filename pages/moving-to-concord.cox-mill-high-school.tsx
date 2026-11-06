import React from "react";
import { Link } from "react-router-dom";
import { usePageMeta } from "../helpers/usePageMeta";
import { useJsonLd } from "../helpers/useJsonLd";
import { PageBreadcrumbs } from "../components/PageBreadcrumbs";
import { Button } from "../components/Button";
import { PageAuthorBlock } from "../components/PageAuthorBlock";
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "../components/Accordion";
import { DataDisclaimer } from "../components/DataDisclaimer";
import styles from "./moving-to-concord.cox-mill-high-school.module.css";

const PAGE_TITLE = "Cox Mill High School Guide | Living in Concord NC";
const PAGE_DESC =
  "Cox Mill High School in Concord NC — top academics, school zones, and nearby homes. Your essential guide for families relocating to Cabarrus County.";
const PAGE_URL = "https://livinginconcordnc.com/moving-to-concord/cox-mill-high-school";

const BREADCRUMBS = [
  { label: "Home", href: "/" },
  { label: "Moving Guide", href: "/moving-to-concord" },
  { label: "Schools Guide", href: "/moving-to-concord/schools-guide" },
  { label: "Cox Mill High School" },
];

const FAQ_ITEMS = [
  {
    q: "What is Cox Mill High School's academic reputation?",
    a: "Cox Mill High School is consistently ranked among the top high schools in Cabarrus County. It offers rigorous AP programs, honors tracks, and boasts a high graduation rate. Families often target the Northwest Concord area specifically for this school's strong academic environment. Call Franklin at (704) 904-5142 to explore homes in this zone."
  },
  {
    q: "What neighborhoods are zoned for Cox Mill High School?",
    a: "Top neighborhoods currently zoned for Cox Mill High include Winding Walk, Christenbury, Moss Creek, and Skybrook. Home prices in these communities range from $300,000 to over $1.6 million depending on size and amenities. Always verify current school assignments with Cabarrus County Schools before making an offer, as boundaries can change."
  },
  {
    q: "How do I enroll my child in Cox Mill High School?",
    a: "You must reside within the school's attendance boundaries. Enrollment is handled through the Cabarrus County Schools district. You will need a certified birth certificate, immunization records, proof of residency (like a lease or utility bill), and prior school transcripts. Contact Franklin at (704) 904-5142 to find an eligible home."
  },
  {
    q: "Does Cox Mill High School have strong AP programs?",
    a: "Yes, Cox Mill High School offers a wide range of Advanced Placement (AP) courses covering subjects like STEM, humanities, and fine arts. The school emphasizes college readiness, and many students graduate with college credits. It's an excellent choice for academically driven students in Cabarrus County."
  },
  {
    q: "What are the best neighborhoods to buy in the Cox Mill zone?",
    a: "Winding Walk and Christenbury are highly sought-after neighborhoods in the Cox Mill zone. Winding Walk offers fantastic amenities and newer homes, while Christenbury features luxury living with larger lots. Both provide a strong sense of community. Let Franklin match your family's needs to the right neighborhood."
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
        name: "Schools Guide",
        item: "https://livinginconcordnc.com/moving-to-concord/schools-guide",
      },
      {
        "@type": "ListItem",
        position: 4,
        name: "Cox Mill High School",
        item: PAGE_URL,
      },
    ],
  },
  {
    "@context": "https://schema.org",
    "@type": "EducationalOrganization",
    name: "Cox Mill High School",
    address: {
      "@type": "PostalAddress",
      streetAddress: "300 Cox Mill Road",
      addressLocality: "Concord",
      addressRegion: "NC",
      postalCode: "28027",
    },
    url: PAGE_URL,
    description: "Cox Mill High School serves NW Concord neighborhoods including Winding Walk and Kellswater Bridge as part of the Cabarrus County Schools district",
    parentOrganization: {
      "@type": "Organization",
      name: "Cabarrus County Schools"
    }
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

export default function CoxMillHighSchoolPage() {
  const meta = usePageMeta({
    title: PAGE_TITLE,
    description: PAGE_DESC,
    canonicalPath: "/moving-to-concord/cox-mill-high-school",
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
            Cox Mill High School Concord NC — Complete Guide for Relocating Families
          </h1>
          <p className={styles.heroSubtitle}>
            Updated June 2026 | By Franklin Bellamy, NC Licensed Broker | Relocation Specialist
          </p>
        </div>
      </section>

      <main className={styles.content}>
        <section className={styles.contentSection}>
          <h2>School Overview</h2>
          <p>
            Serving students in grades 9 through 12, Cox Mill High School is a cornerstone of the Cabarrus County Schools district. Located at 300 Cox Mill Road, Concord NC 28027, the school maintains strong enrollment figures and is widely recognized as one of the top-rated public high schools in Cabarrus County. 
          </p>
          <p>
            What makes Cox Mill distinctly appealing compared to other district high schools is its relatively newer facility, rigorous academic environment, and the profound community investment found in the thriving Northwest Concord corridor. Relocating families consistently target this school zone for its robust blend of academic excellence and modern suburban lifestyle.
          </p>
        </section>

        <section className={styles.contentSection}>
          <h2>Academic Programs</h2>
          <p>
            The academic foundation at Cox Mill High School is built on comprehensive Advanced Placement (AP) course offerings, dedicated honors tracks, and specialized Career and Technical Education (CTE) pathways. The school consistently maintains a strong graduation rate and emphasizes college readiness across its student body. 
          </p>
          <p>
            Cox Mill frequently earns state-level awards and recognitions for academic growth and achievement. (Note: Performance metrics vary yearly per Cabarrus County Schools / NC DPI 2025-26 reports; readers should verify current statistics and course catalogs directly with the school administration.)
          </p>
        </section>

        <section className={styles.contentSection}>
          <h2>Athletics & Extracurriculars</h2>
          <p>
            Beyond academics, Cox Mill High School is a powerhouse in regional athletics and extracurricular activities. The school boasts highly competitive varsity sports programs, creating an electric Friday night football culture that unites the surrounding neighborhoods with immense community pride. 
          </p>
          <p>
            Additionally, the performing arts department thrives, featuring an acclaimed marching band, theater productions, and chorus ensembles. Students can also participate in a wide variety of active clubs and student organizations, ensuring diverse opportunities for leadership and personal growth.
          </p>
        </section>

        <section className={styles.contentSection}>
          <h2>School Culture & Community</h2>
          <p>
            The success of Cox Mill High School is deeply intertwined with its surrounding community. There is an exceptionally strong level of parent involvement, supported by active booster organizations and a dedicated Parent Teacher Student Association (PTSA). 
          </p>
          <p>
            When I speak with families who specifically moved to Concord just for this school zone, they often tell me the same thing after living here for a year: the sense of community and the collective investment in student success exceed their initial expectations. It is a true neighborhood school where families build lasting relationships.
          </p>
        </section>

        <section className={styles.contentSection}>
          <h2>Zoned Neighborhoods</h2>
          <p>
            Because school zones heavily influence real estate values and lifestyle, identifying the right neighborhood is critical. Several premier communities in Northwest Concord feed directly into Cox Mill High School. Currently, home buyers can explore highly desirable neighborhoods such as:
          </p>
          <ul>
            <li>
              <strong>Winding Walk:</strong> Offering homes roughly in the $500K to $990K range, featuring exceptional amenities and newer construction. <Link to="/neighborhoods/winding-walk">Explore the Winding Walk neighborhood guide.</Link>
            </li>
            <li>
              <strong>Christenbury:</strong> Typically ranging from $650K to $1.6M, known for its established luxury feel, resort-style amenities, and spacious lots. <Link to="/neighborhoods/christenbury">Explore the Christenbury neighborhood guide.</Link>
            </li>
          </ul>
          <p>
            <em>Please note: Always verify current school zoning assignments directly with Cabarrus County Schools before purchasing a home, as boundary lines are subject to change due to area growth.</em>
          </p>
        </section>

        <DataDisclaimer variant="mid" text="Home price ranges and school zone boundaries referenced above are estimates based on Canopy MLS data and Cabarrus County Schools records. Always verify current assignments and pricing before making real estate decisions." />

        <section className={styles.contentSection}>
          <h2>The Feeder Pipeline</h2>
          <p>
            For families buying homes with younger children, understanding the entire K-12 feeder pattern is essential. The primary pipeline leading to the high school includes <strong>Cox Mill Elementary</strong> feeding into <strong>Harris Road Middle School</strong>, and finally <strong>Cox Mill High School</strong>. 
          </p>
          <p>
            This K-12 continuity matters immensely for relocating families. It provides educational consistency, allows children to grow alongside their peers from kindergarten through graduation, and helps parents avoid the stress of sudden school rezoning surprises as their children age.
          </p>
        </section>

        <section className={styles.contentSection}>
          <h2>How to Enroll</h2>
          <p>
            Enrolling your child at Cox Mill High School follows the standard Cabarrus County Schools enrollment process. If you have recently moved to the designated zone, you will need to provide specific documentation. This typically includes a certified birth certificate, up-to-date immunization records, proof of residency (such as a signed lease or current utility bill), and prior transcripts from your child's previous school.
          </p>
          <p>
            While the district does occasionally offer limited open enrollment options, securing a home within the established boundary remains the most reliable path. For official forms and up-to-date requirements, visit the district website at <a href="https://www.cabarrus.k12.nc.us" target="_blank" rel="noopener noreferrer">cabarrus.k12.nc.us</a>.
          </p>
        </section>

        <section className={styles.contentSection}>
          <h2>Nearby Neighborhoods in This Zone</h2>
          <p>
            <strong>Winding Walk:</strong> Families frequently choose Winding Walk for its master-planned design, newer home constructions, and impressive community amenities including pools and walking trails. With homes ranging from the $500s up to the $990s, it offers accessible entry points for various budgets within the Cox Mill zone.
          </p>
          <p>
            <strong>Christenbury:</strong> For buyers seeking a more upscale suburban experience, Christenbury offers established luxury with larger, meticulously landscaped lots. It boasts resort-caliber amenities and a prestigious atmosphere, making it a top choice for affluent relocators targeting Northwest Concord's premier school assignments.
          </p>
          <p className={styles.ctaSentence}>
            <strong>Need help finding a home zoned for Cox Mill High School? Call or text Franklin Bellamy at (704) 904-5142 — I'll match your budget to the right neighborhood.</strong>
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
              <Link to="/moving-to-concord/schools-guide">Concord NC schools guide</Link>
            </li>
            <li>
              <Link to="/contact">Schedule a school-zone home search with Franklin</Link>
            </li>
          </ul>
        </div>

                        <PageAuthorBlock disclaimer="School information on this page is based on publicly available data from Cabarrus County Schools and the North Carolina Department of Public Instruction (NC DPI) as of the 2025–26 school year. Enrollment figures, school zoning boundaries, academic programs, and performance data are subject to change. Always verify current information directly with Cabarrus County Schools (cabarrus.k12.nc.us) before making real estate or enrollment decisions." />
      </main>

      <section className={styles.bottomCta}>
        <div className={styles.bottomCtaContainer}>
          <h2 className={styles.bottomCtaTitle}>Ready to Find Your Home?</h2>
          <p className={styles.bottomCtaSubtitle}>
            Call or text Franklin Bellamy at (704) 904-5142 to explore available homes in the highly sought-after Cox Mill High School zone.
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
              <Link to="/neighborhoods">Explore Neighborhoods</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}