import React from "react";
import { Link } from "react-router-dom";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "./Accordion";
import styles from "./NeighborhoodsFAQ.module.css";

interface Props {
  className?: string;
}

export function NeighborhoodsFAQ({ className }: Props) {
  return (
    <section className={`${styles.section} ${className || ""}`}>
      <div className={styles.container}>
        <h2 className={styles.title}>
          Frequently Asked Questions About Concord NC Neighborhoods
        </h2>

        <Accordion type="single" collapsible>
          <AccordionItem value="popular-neighborhoods">
            <AccordionTrigger>
              What are the most popular neighborhoods in Concord NC?
            </AccordionTrigger>
            <AccordionContent>
              Concord has several highly sought-after neighborhoods. Some of
              the most popular include{" "}
              <Link className={styles.link} to="/neighborhoods/highland-creek">
                Highland Creek
              </Link>
              , a master-planned community with over 300 acres of nature
              preserves, trails, and amenities;{" "}
              <Link className={styles.link} to="/neighborhoods/christenbury">
                Christenbury
              </Link>
              , a premier golf course community with custom homes;{" "}
              <Link className={styles.link} to="/neighborhoods/cox-mill">
                The Cox Mill Area
              </Link>
              , known for its top-rated schools and family-friendly
              atmosphere; and{" "}
              <Link className={styles.link} to="/neighborhoods/afton-village">
                Afton Village
              </Link>
              , a charming walkable neighborhood with a true village feel,
              complete with shops and restaurants within walking distance.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="home-prices">
            <AccordionTrigger>
              What is the average home price in Concord NC neighborhoods?
            </AccordionTrigger>
            <AccordionContent>
              Home prices in Concord NC vary widely by neighborhood, generally
              ranging from around $250,000 to $700,000 or more. Newer
              communities like Moss Creek offer more affordable entry-level
              options, while established luxury communities such as Skybrook
              feature premium homes at higher price points. For the most
              current pricing data and market trends, visit our{" "}
              <Link className={styles.link} to="/market-reports">
                Market Reports
              </Link>{" "}
              page.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="best-schools">
            <AccordionTrigger>
              Which Concord neighborhoods have the best schools?
            </AccordionTrigger>
            <AccordionContent>
              The Cox Mill Area is consistently recognized for its excellent
              schools, including Cox Mill Elementary and Cox Mill High School,
              both highly rated within the Cabarrus County Schools district.
              Highland Creek also sits near several top-rated Cabarrus County
              schools, making it a popular choice for families with
              school-aged children. For a comprehensive overview of schools
              and other family resources, check out our{" "}
              <Link className={styles.link} to="/moving-to-concord">
                Moving to Concord guide
              </Link>
              .
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="new-construction">
            <AccordionTrigger>
              Are there new construction neighborhoods in Concord NC?
            </AccordionTrigger>
            <AccordionContent>
              Yes! Concord has several active new construction communities.
              Winding Walk and Moss Creek are two neighborhoods that offer
              newer construction homes with modern floor plans and updated
              finishes. New builds often come with builder warranties and
              energy-efficient features. If you're interested in finding the
              right new construction community for your needs,{" "}
              <Link className={styles.link} to="/contact">
                contact Franklin
              </Link>{" "}
              for personalized guidance on available new builds in the area.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="choose-neighborhood">
            <AccordionTrigger>
              How do I choose the right neighborhood in Concord NC?
            </AccordionTrigger>
            <AccordionContent>
              Choosing the right neighborhood depends on several key factors:
              your budget, desired school district, daily commute (especially
              if you work in Charlotte), and lifestyle preferences such as
              walkability, community amenities, or green space. It helps to
              visit neighborhoods in person at different times of day and to
              research local schools and HOA requirements. Franklin Bellamy
              is a local real estate expert who provides personalized
              neighborhood recommendations tailored to your goals.{" "}
              <Link className={styles.link} to="/about">
                Learn more about Franklin
              </Link>{" "}
              or{" "}
              <Link className={styles.link} to="/contact">
                get in touch
              </Link>{" "}
              to start your neighborhood search today.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </section>
  );
}