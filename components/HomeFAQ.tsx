import React from "react";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "./Accordion";
import styles from "./HomeFAQ.module.css";

export function HomeFAQ() {
  return (
    <section className={styles.faqSection}>
      <div className={styles.faqContainer}>
        <div className={styles.sectionHeaderCentered}>
          <h2 className={styles.sectionTitle}>
            Frequently Asked Questions About Living in Concord NC
          </h2>
        </div>
        <Accordion type="multiple" defaultValue={["q1"]}>
          <AccordionItem value="q1">
            <AccordionTrigger>What is it like to live in Concord NC?</AccordionTrigger>
            <AccordionContent>
              Concord NC offers small-town charm with big-city access — you're just 25–30 minutes to Uptown Charlotte via I-85. Residents enjoy affordable living, highly rated Cabarrus County schools, and a strong sense of community. From farmers markets downtown to family nights at Frank Liske Park, there's always something happening. I moved here in 2007 and never looked back.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="q2">
            <AccordionTrigger>What are the best neighborhoods in Concord NC for families?</AccordionTrigger>
            <AccordionContent>
              The most popular family neighborhoods include Christenbury, Highland Creek, Skybrook, and Winding Walk — all zoned for top-rated Cox Mill schools. Each offers community pools, playgrounds, and sidewalk-lined streets. For a more walkable lifestyle, Afton Village has boutique shops and dining built right into the neighborhood. I can match you with the right fit based on your priorities.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="q3">
            <AccordionTrigger>How far is Concord NC from Charlotte?</AccordionTrigger>
            <AccordionContent>
              Concord is about 20–25 miles northeast of Charlotte. Most commuters reach Uptown Charlotte in 25–30 minutes via I-85. Charlotte Douglas International Airport is roughly 30 minutes away. The location gives you full access to Charlotte's job market, dining, and entertainment while living in a quieter, more affordable community.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="q4">
            <AccordionTrigger>What is the average home price in Concord NC right now?</AccordionTrigger>
            <AccordionContent>
              As of May 2026, the median home price in Concord NC is approximately $360,000 (per Canopy MLS). Established areas like Laurel Park start lower, while newer communities like Skybrook and Kellswater Bridge sit at the higher end. Concord remains more affordable than most Charlotte neighborhoods. Call me at (704) 904-5142 for current pricing in specific areas.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="q5">
            <AccordionTrigger>What are the schools like in Concord NC?</AccordionTrigger>
            <AccordionContent>
              Cabarrus County Schools are a major draw for families moving here. Cox Mill Elementary, Cox Mill High School, and Northwest Cabarrus High School consistently earn strong ratings. The district also offers magnet programs and career academies. School assignments depend on your address, so choosing the right neighborhood matters. I help families align their home search with their school preferences.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="q6">
            <AccordionTrigger>Why should I use Franklin Bellamy as my Concord NC realtor?</AccordionTrigger>
            <AccordionContent>
              I've lived in Concord since 2007 and helped over 100 families buy and sell homes here. With a 4.9-star rating, I bring 15+ years of hyper-local market knowledge, honest guidance, and a relocation specialty that makes out-of-state moves seamless. I'm not a call center — I'm your neighbor. Call or text me directly at (704) 904-5142.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </section>
  );
}