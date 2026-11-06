import React from "react";
import { Link } from "react-router-dom";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "./Accordion";
import styles from "./GuideConcordFaq.module.css";

// Raw data for the FAQ schema to ensure clean text without React nodes
const FAQ_DATA = [
  {
    question: "Is Concord NC a good place to live?",
    answer:
      "Concord consistently ranks as one of the best mid-sized cities in the Southeast. With a cost of living index of 94, top-rated schools, low crime in established neighborhoods, and easy Charlotte access, it offers exceptional quality of life. The city has grown 18% since 2020, bringing new restaurants and employers while keeping its community feel.",
  },
  {
    question: "What is the cost of living in Concord NC?",
    answer:
      "Concord's cost of living index is 94, about 6% below the national average. The median home price is $375,000 — roughly half what you'd pay in NYC, DC, or LA for comparable space. Property taxes are 0.78% and North Carolina's state income tax is 4.5%, both significantly lower than most major metro states.",
  },
  {
    question: "How far is Concord NC from Charlotte?",
    answer:
      "Concord is 25 miles northeast of Uptown Charlotte, a 25–30 minute drive. Charlotte Douglas International Airport is 28 miles away, about 30 minutes. You get full access to a major city without the major city price tag.",
  },
  {
    question: "What are the best neighborhoods in Concord NC for families?",
    answer:
      "Christenbury is the top choice for families — feeding into the highest-rated schools in Cabarrus County with a strong HOA community. Afton Village is excellent for walkability. The Cox Mill Area and Cambridge offer great schools at a lower price point. Highland Creek and Winding Walk are great for newer construction with family amenities.",
  },
  {
    question: "What are the schools like in Concord NC?",
    answer:
      "Cabarrus County Schools has a 91.7% graduation rate and ranks among the top districts in the Charlotte region. There are 28 elementary schools, 8 middle schools, and 5 high schools, plus magnet programs in STEM, arts, and early college. Cox Mill High School is particularly well-regarded with GreatSchools ratings of 8 to 9 out of 10.",
  },
  {
    question: "Is Concord NC safe?",
    answer:
      "Established neighborhoods like Christenbury, Afton Village, The Cox Mill Area, Highland Creek, and Winding Walk have very low crime rates comparable to the safest suburbs in the country. Like any city, safety varies by area. Franklin can walk you through specific neighborhood safety data for any area you are considering.",
  },
  {
    question: "What is the job market like in Concord NC?",
    answer:
      "Concord sits in the Charlotte metro, one of the fastest-growing job markets in the US. Major employers include Atrium Health, Cabarrus County Schools, Amazon, and NASCAR which is headquartered nearby. Charlotte's financial sector with Bank of America, Wells Fargo, and Truist is 30 minutes away. Remote workers increasingly choose Concord for its low cost and airport access.",
  },
  {
    question: "How much do homes cost in Concord NC?",
    answer:
      "The median home price is $375,000 as of 2026. Entry-level homes start around $250,000 in Downtown Concord and Cambridge. Mid-range family homes in The Cox Mill Area and Afton Village run $400,000 to $650,000. Luxury homes in Christenbury range from $600,000 to over $1.2 million.",
  },
  {
    question: "Is Concord NC growing?",
    answer:
      "Yes — Concord is one of the fastest-growing cities in North Carolina with 18% population growth since 2020, driven by relocators from high-cost metros and Charlotte's expansion northward. New retail, restaurants, and employers continue to open, making it a strong market for home appreciation.",
  },
  {
    question: "What is the weather like in Concord NC?",
    answer:
      "Concord has four distinct seasons without extreme weather. Summers are warm with highs in the upper 80s, winters are mild with average January highs of 52°F and rare snow, and spring and fall are beautiful. About 43 inches of rain per year, no harsh winters, no wildfires, and no extreme weather compared to coastal cities.",
  },
];

// Generate JSON-LD schema for SEO
export const CONCORD_FAQ_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: FAQ_DATA.map((faq) => ({
    "@type": "Question",
    name: faq.question,
    acceptedAnswer: {
      "@type": "Answer",
      text: faq.answer,
    },
  })),
};

// Formatted content for the UI, including internal links
interface FaqItem {
  id: string;
  question: string;
  answer: React.ReactNode;
}

const FAQ_ITEMS: FaqItem[] = [
  {
    id: "good-place",
    question: FAQ_DATA[0].question,
    answer: FAQ_DATA[0].answer,
  },
  {
    id: "cost-of-living",
    question: FAQ_DATA[1].question,
    answer: FAQ_DATA[1].answer,
  },
  {
    id: "distance-charlotte",
    question: FAQ_DATA[2].question,
    answer: FAQ_DATA[2].answer,
  },
  {
    id: "best-neighborhoods",
    question: FAQ_DATA[3].question,
    answer: (
      <>
        <Link to="/neighborhoods/christenbury" className={styles.inlineLink}>Christenbury</Link> is the top choice for families — feeding into the highest-rated schools in Cabarrus County with a strong HOA community. <Link to="/neighborhoods/afton-village" className={styles.inlineLink}>Afton Village</Link> is excellent for walkability. <Link to="/neighborhoods/cox-mill" className={styles.inlineLink}>The Cox Mill Area</Link> and <Link to="/neighborhoods/cambridge" className={styles.inlineLink}>Cambridge</Link> offer great schools at a lower price point. <Link to="/neighborhoods/highland-creek" className={styles.inlineLink}>Highland Creek</Link> and <Link to="/neighborhoods/winding-walk" className={styles.inlineLink}>Winding Walk</Link> are great for newer construction with family amenities.
      </>
    ),
  },
  {
    id: "schools",
    question: FAQ_DATA[4].question,
    answer: (
      <>
        Cabarrus County Schools has a 91.7% graduation rate and ranks among the top districts in the Charlotte region. There are 28 elementary schools, 8 middle schools, and 5 high schools, plus magnet programs in STEM, arts, and early college. <Link to="/neighborhoods/cox-mill" className={styles.inlineLink}>Cox Mill</Link> High School is particularly well-regarded with GreatSchools ratings of 8 to 9 out of 10.
      </>
    ),
  },
  {
    id: "safety",
    question: FAQ_DATA[5].question,
    answer: (
      <>
        Established neighborhoods like <Link to="/neighborhoods/christenbury" className={styles.inlineLink}>Christenbury</Link>, <Link to="/neighborhoods/afton-village" className={styles.inlineLink}>Afton Village</Link>, <Link to="/neighborhoods/cox-mill" className={styles.inlineLink}>The Cox Mill Area</Link>, <Link to="/neighborhoods/highland-creek" className={styles.inlineLink}>Highland Creek</Link>, and <Link to="/neighborhoods/winding-walk" className={styles.inlineLink}>Winding Walk</Link> have very low crime rates comparable to the safest suburbs in the country. Like any city, safety varies by area. <Link to="/contact" className={styles.inlineLink}>Franklin</Link> can walk you through specific neighborhood safety data for any area you are considering.
      </>
    ),
  },
  {
    id: "job-market",
    question: FAQ_DATA[6].question,
    answer: FAQ_DATA[6].answer,
  },
  {
    id: "home-cost",
    question: FAQ_DATA[7].question,
    answer: (
      <>
        The median home price is $375,000 as of 2026. Entry-level homes start around $250,000 in <Link to="/neighborhoods/downtown-concord" className={styles.inlineLink}>Downtown Concord</Link> and <Link to="/neighborhoods/cambridge" className={styles.inlineLink}>Cambridge</Link>. Mid-range family homes in <Link to="/neighborhoods/cox-mill" className={styles.inlineLink}>The Cox Mill Area</Link> and <Link to="/neighborhoods/afton-village" className={styles.inlineLink}>Afton Village</Link> run $400,000 to $650,000. Luxury homes in <Link to="/neighborhoods/christenbury" className={styles.inlineLink}>Christenbury</Link> range from $600,000 to over $1.2 million. Find more data in our <Link to="/market-reports" className={styles.inlineLink}>Market Reports</Link>.
      </>
    ),
  },
  {
    id: "growing",
    question: FAQ_DATA[8].question,
    answer: FAQ_DATA[8].answer,
  },
  {
    id: "weather",
    question: FAQ_DATA[9].question,
    answer: FAQ_DATA[9].answer,
  },
];

interface Props {
  className?: string;
}

export function GuideConcordFaq({ className }: Props) {
  return (
    <section className={`${styles.section} ${className || ""}`}>
      <div className={styles.container}>
        <div className={styles.sectionHeader}>
          <h2 className={styles.sectionTitle}>Frequently Asked Questions About Moving to Concord NC</h2>
        </div>
        <div className={styles.accordionWrapper}>
          <Accordion type="single" collapsible>
            {FAQ_ITEMS.map((item) => (
              <AccordionItem key={item.id} value={item.id}>
                <AccordionTrigger>{item.question}</AccordionTrigger>
                <AccordionContent>{item.answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
}