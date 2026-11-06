import React from "react";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "./Accordion";

export function MovingFromNycFaq() {
  return (
    <Accordion type="single" collapsible>
      <AccordionItem value="faq-1">
        <AccordionTrigger>Is Concord NC a good place to move from New York City?</AccordionTrigger>
        <AccordionContent>
          Yes, and particularly for families. Concord NC offers a median home price of approximately $360,000 per
          Canopy MLS, May 2026 — compared to $750,000 and above in most New York metro
          markets. North Carolina's flat 4.5% income tax rate is a significant improvement over New
          York City's combined state and city burden. The public schools in NW Concord, particularly
          the Cox Mill corridor, are genuinely competitive. Most NYC families I've relocated here
          report a meaningful improvement in quality of life within the first year.
        </AccordionContent>
      </AccordionItem>
      
      <AccordionItem value="faq-2">
        <AccordionTrigger>How far is Concord NC from Charlotte?</AccordionTrigger>
        <AccordionContent>
          From NW Concord — which includes Winding Walk, Christenbury, and Afton Village — you are
          30 to 35 minutes from Uptown Charlotte via I-85 under normal conditions. During peak hours
          add 10 to 15 minutes. Charlotte Douglas Airport is 35 to 40 minutes. If you are working
          remotely you will rarely need to make the commute at all. That drive time is faster than
          most New York metro commutes and significantly more predictable.
        </AccordionContent>
      </AccordionItem>
      
      <AccordionItem value="faq-3">
        <AccordionTrigger>What does $500,000 buy in Concord NC vs New York?</AccordionTrigger>
        <AccordionContent>
          In New York City, $500,000 buys limited options — a one-bedroom condo in most boroughs or
          a small two-bedroom in an outer borough. In Concord NC that same budget sits well above the
          May 2026 median and typically buys a 2,500 to 3,000 square foot home with a two-car
          garage, a backyard, and community amenities in an established neighborhood. In Winding Walk,
          $500,000 to $600,000 gets you newer construction in the Cox Mill school zone. The value
          difference is substantial.
        </AccordionContent>
      </AccordionItem>
      
      <AccordionItem value="faq-4">
        <AccordionTrigger>How are Concord NC public schools compared to New York?</AccordionTrigger>
        <AccordionContent>
          Cabarrus County Schools consistently outperforms state averages, and the NW Concord schools
          — particularly Cox Mill High — are among the strongest in the Charlotte metro. Cox Mill has
          robust AP programming, competitive athletics, and strong graduation rates. For families from
          high-performing suburban New York districts the adjustment is usually minimal. For families
          from NYC public schools where quality varied widely, the Cox Mill corridor is often a
          significant upgrade.
        </AccordionContent>
      </AccordionItem>
      
      <AccordionItem value="faq-5">
        <AccordionTrigger>Do I need a car in Concord NC?</AccordionTrigger>
        <AccordionContent>
          Yes. Concord is not walkable the way New York City is and there is no meaningful public
          transit for daily commuting. Most households need two vehicles. North Carolina auto insurance
          is meaningfully less expensive than New York, there is no city parking cost, and gas is
          cheaper. The practical monthly transportation cost for most Concord families is lower than
          what NYC families pay even with the addition of a second car.
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}