import React, { useState } from "react";
import { Link } from "react-router-dom";
import { MapPin, Target, Home, Users, CheckCircle } from "lucide-react";
import { usePageMeta } from "../helpers/usePageMeta";
import { useJsonLd } from "../helpers/useJsonLd";
import { Button } from "../components/Button";
import { Badge } from "../components/Badge";
import { NeighborhoodCard } from "../components/NeighborhoodCard";
import { ContactFormBlock } from "../components/ContactFormBlock";
import { HomeValuationBlock } from "../components/HomeValuationBlock";
import { useNeighborhoods } from "../helpers/useNeighborhoods";
import { useTestimonials } from "../helpers/useTestimonials";
import { useBlogPosts } from "../helpers/useBlogPosts";
import { Skeleton } from "../components/Skeleton";
import { BlogCategory } from "../helpers/schema";
import { Helmet } from "react-helmet";
import { HomeAbout } from "../components/HomeAbout";
import { HomeFAQ } from "../components/HomeFAQ";
import { LIVING_IN_CONCORD_SCHEMA, FRANKLIN_BELLAMY_PERSON_SCHEMA } from "../helpers/schemaConstants";
import styles from "./_index.module.css";

const CATEGORY_LABELS: Record<BlogCategory, string> = {
  buying_tips: "Buying Tips",
  lifestyle: "Lifestyle",
  market_updates: "Market Updates",
  neighborhood_guides: "Neighborhood Guides",
  relocation: "Relocation",
  selling_tips: "Selling Tips",
};

const CATEGORY_BADGE_VARIANT: Record<
  BlogCategory,
  "primary" | "secondary" | "success" | "warning" | "outline" | "destructive"
> = {
  buying_tips: "primary",
  lifestyle: "success",
  market_updates: "warning",
  neighborhood_guides: "secondary",
  relocation: "outline",
  selling_tips: "destructive",
};

function stripHtml(html: string): string {
  return html.replace(/<[^>]*>/g, "").trim();
}

function truncate(text: string, maxLen: number): string {
  const stripped = stripHtml(text);
  if (stripped.length <= maxLen) return stripped;
  return stripped.slice(0, maxLen).trimEnd() + "…";
}

const HOME_NEIGHBORHOOD_LIST_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  "name": "Concord NC Neighborhoods Guide",
  "description": "Complete guide to the best neighborhoods in Concord NC from Franklin Bellamy",
  "itemListElement": [
    { "@type": "ListItem", "position": 1, "name": "Afton Village", "url": "https://livinginconcordnc.com/neighborhoods/afton-village" },
    { "@type": "ListItem", "position": 2, "name": "Skybrook", "url": "https://livinginconcordnc.com/neighborhoods/skybrook" },
    { "@type": "ListItem", "position": 3, "name": "Winding Walk", "url": "https://livinginconcordnc.com/neighborhoods/winding-walk" },
    { "@type": "ListItem", "position": 4, "name": "Christenbury", "url": "https://livinginconcordnc.com/neighborhoods/christenbury" },
    { "@type": "ListItem", "position": 5, "name": "Brookwood", "url": "https://livinginconcordnc.com/neighborhoods/brookwood" },
    { "@type": "ListItem", "position": 6, "name": "Centergrove", "url": "https://livinginconcordnc.com/neighborhoods/centergrove" },
    { "@type": "ListItem", "position": 7, "name": "Cox Mill", "url": "https://livinginconcordnc.com/neighborhoods/cox-mill" },
    { "@type": "ListItem", "position": 8, "name": "Highland Creek", "url": "https://livinginconcordnc.com/neighborhoods/highland-creek" },
    { "@type": "ListItem", "position": 9, "name": "Moss Creek", "url": "https://livinginconcordnc.com/neighborhoods/moss-creek" },
    { "@type": "ListItem", "position": 10, "name": "Roberta Ridge", "url": "https://livinginconcordnc.com/neighborhoods/roberta-ridge" },
    { "@type": "ListItem", "position": 11, "name": "Kellswater Bridge", "url": "https://livinginconcordnc.com/neighborhoods/kellswater-bridge" }
  ]
};

const HOME_REVIEWS_SCHEMA = {
  ...LIVING_IN_CONCORD_SCHEMA,
  "review": [
    {
      "@type": "Review",
      "author": { "@type": "Person", "name": "Jennifer & Michael Thompson" },
      "reviewRating": { "@type": "Rating", "ratingValue": "5" },
      "reviewBody": "Franklin was incredible to work with. He helped us navigate a tough market and found us the perfect home in Highland Creek. His knowledge of the Concord area is unmatched, and he was always available to answer our questions. Highly recommend!"
    },
    {
      "@type": "Review",
      "author": { "@type": "Person", "name": "David Martinez" },
      "reviewRating": { "@type": "Rating", "ratingValue": "5" },
      "reviewBody": "As a first-time homebuyer, I was nervous about the process, but Franklin made it easy. He broke everything down step-by-step and really listened to what I wanted. I'm so happy with my new place in Laurel Park."
    },
    {
      "@type": "Review",
      "author": { "@type": "Person", "name": "Sarah Johnson" },
      "reviewRating": { "@type": "Rating", "ratingValue": "5" },
      "reviewBody": "We relocated from out of state and Franklin was a lifesaver. He did video tours for us, coordinated inspections, and gave us great advice on neighborhoods. We love our new home in Afton Village."
    },
    {
      "@type": "Review",
      "author": { "@type": "Person", "name": "Robert & Lisa Chen" },
      "reviewRating": { "@type": "Rating", "ratingValue": "5" },
      "reviewBody": "Selling a house can be stressful, but Franklin’s marketing strategy was top-notch. We had multiple offers within days and sold above asking price. His professionalism is exactly what you want in an agent in Christenbury."
    },
    {
      "@type": "Review",
      "author": { "@type": "Person", "name": "Amanda Williams" },
      "reviewRating": { "@type": "Rating", "ratingValue": "5" },
      "reviewBody": "Franklin is simply the best. He is patient, knowledgeable, and a great negotiator. He helped me find exactly what I was looking for in The Cox Mill Area and made the closing process smooth. Thank you, Franklin!"
    }
  ]
};

const HOME_FAQ_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "What is it like to live in Concord NC?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Concord NC offers small-town charm with big-city access — you're just 25–30 minutes to Uptown Charlotte via I-85. Residents enjoy affordable living, highly rated Cabarrus County schools, and a strong sense of community. From farmers markets downtown to family nights at Frank Liske Park, there's always something happening. I moved here in 2007 and never looked back.",
      },
    },
    {
      "@type": "Question",
      "name": "What are the best neighborhoods in Concord NC for families?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "The most popular family neighborhoods include Christenbury, Highland Creek, Skybrook, and Winding Walk — all zoned for top-rated Cox Mill schools. Each offers community pools, playgrounds, and sidewalk-lined streets. For a more walkable lifestyle, Afton Village has boutique shops and dining built right into the neighborhood. I can match you with the right fit based on your priorities.",
      },
    },
    {
      "@type": "Question",
      "name": "How far is Concord NC from Charlotte?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Concord is about 20–25 miles northeast of Charlotte. Most commuters reach Uptown Charlotte in 25–30 minutes via I-85. Charlotte Douglas International Airport is roughly 30 minutes away. The location gives you full access to Charlotte's job market, dining, and entertainment while living in a quieter, more affordable community.",
      },
    },
    {
      "@type": "Question",
      "name": "What is the average home price in Concord NC right now?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "As of May 2026, the median home price in Concord NC is approximately $360,000 (per Canopy MLS). Established areas like Laurel Park and Moss Creek start lower, while newer communities like Skybrook and Kellswater Bridge sit at the higher end. Concord remains more affordable than most Charlotte neighborhoods. Call me at (704) 904-5142 for current pricing in specific areas.",
      },
    },
    {
      "@type": "Question",
      "name": "What are the schools like in Concord NC?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Cabarrus County Schools are a major draw for families moving here. Cox Mill Elementary, Cox Mill High School, and Northwest Cabarrus High School consistently earn strong ratings. The district also offers magnet programs and career academies. School assignments depend on your address, so choosing the right neighborhood matters. I help families align their home search with their school preferences.",
      },
    },
    {
      "@type": "Question",
      "name": "Why should I use Franklin Bellamy as my Concord NC realtor?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "I've lived in Concord since 2007 and helped over 100 families buy and sell homes here. With a 4.9-star rating, I bring 15+ years of hyper-local market knowledge, honest guidance, and a relocation specialty that makes out-of-state moves seamless. I'm not a call center — I'm your neighbor. Call or text me directly at (704) 904-5142.",
      },
    }
  ],
};

export default function HomePage() {
  const meta = usePageMeta({
    title: "Living in Concord NC | Local Real Estate & Relocation Guide",
    description:
      "Explore Concord NC neighborhoods, market reports, and relocation resources. Get expert guidance from local broker Franklin Bellamy. Call (704) 904-5142.",
    canonicalPath: "/",
    ogImage: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=1200&q=80",
  });
  const jsonLd = useJsonLd([
    FRANKLIN_BELLAMY_PERSON_SCHEMA,
    HOME_NEIGHBORHOOD_LIST_SCHEMA,
    HOME_REVIEWS_SCHEMA,
    HOME_FAQ_SCHEMA,
  ]);

  const { data: neighborhoods, isLoading: isLoadingNeighborhoods } =
    useNeighborhoods();
  const { data: testimonials, isLoading: isLoadingTestimonials } =
    useTestimonials();
  const { data: blogPosts, isFetching: isFetchingBlogPosts } = useBlogPosts();

  const featuredNeighborhoods = neighborhoods?.slice(0, 4) || [];
  const [valuationOpen, setValuationOpen] = useState(false);

  return (
    <div className={styles.page}>
      <Helmet>
        <link rel="preload" as="image" href="https://res.cloudinary.com/builder06/image/upload/f_jpg,q_auto,w_480/v1775921398/living_in_concord_gif_file_ikbgt3.gif" media="(max-width: 768px)" fetchPriority="high" />
        <link rel="preload" as="image" href="https://res.cloudinary.com/builder06/image/upload/f_jpg,q_auto,w_1920/v1775921398/living_in_concord_gif_file_ikbgt3.gif" media="(min-width: 769px)" fetchPriority="high" />
      </Helmet>
      {meta}
      {jsonLd}
      {/* Home Valuation Dialog */}
      <HomeValuationBlock open={valuationOpen} onOpenChange={setValuationOpen} />

      {/* Hero Section */}
      <section className={styles.hero}>
        <div className={styles.heroContainer}>
          <h1 className={styles.heroTitle}>
            Living in Concord NC — Your Complete 2026 Relocation Guide
          </h1>
          <p className={styles.heroSubtitle}>Are you moving to Concord NC?  Discover everything about living in Concord—from the perfect neighborhoods to local amenities. Make your move to Concord seamless with expert guidance on living in Concord NC.</p>

          <div className={styles.heroStats}>
            <div className={styles.heroStatItem}>
              <span className={styles.statValue}>100+</span>
              <span className={styles.statLabel}>Happy Families</span>
            </div>
            <div className={styles.heroStatItem}>
              <span className={styles.statValue}>11+</span>
              <span className={styles.statLabel}>Neighborhoods</span>
            </div>
            <div className={styles.heroStatItem}>
              <span className={styles.statValue}>15+</span>
              <span className={styles.statLabel}>Years Experience</span>
            </div>
          </div>

          <div className={styles.heroActions}>
            <Button asChild size="lg">
              <Link to="/neighborhoods">Explore Concord NC Neighborhoods</Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
            >
              <Link to="/contact">Schedule a Consultation</Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              onClick={() => setValuationOpen(true)}
            >
              Get Your Free Home Valuation
            </Button>
          </div>
        </div>
      </section>

      {/* Concord NC at a Glance Section */}
      <section className={styles.tldrSection}>
        <div className={styles.container}>
          <div className={styles.tldrCard}>
            <h2 className={styles.tldrTitle}>Concord NC at a Glance</h2>
            <ul className={styles.tldrList}>
              <li>The median home price in Concord NC is $360,000 as of May 2026.</li>
              <li>Concord currently has 3.1 months of housing inventory, placing the market in shifting toward buyers territory.</li>
              <li>The average home in Concord spends 43 days on the market before going under contract.</li>
              <li>Franklin Bellamy has helped 100+ families buy and sell homes in Concord/Charlotte Metro Area. Call (704) 904-5142.</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Expertise Section */}
      <section className={styles.expertiseSection}>
        <div className={styles.container}>
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>
              About Our Living in Concord NC Expertise
            </h2>
            <p className={styles.sectionDesc}>We brings over 15 years of dedicated experience helping families relocate to and within Concord, NC. From first showings to final closing, every step is guided by deep local knowledge and a commitment to your goals.</p>
          </div>

          <div className={styles.featuresGrid}>
            <div className={styles.featureCard}>
              <div className={styles.featureIcon}>
                <MapPin size={24} />
              </div>
              <div>
                <h3 className={styles.featureTitle}>Deep Concord NC Knowledge</h3>
                <p className={styles.featureDesc}>
                  15+ years of hands-on experience in every Concord neighborhood
                </p>
              </div>
            </div>
            <div className={styles.featureCard}>
              <div className={styles.featureIcon}>
                <Target size={24} />
              </div>
              <div>
                <h3 className={styles.featureTitle}>Market Insights</h3>
                <p className={styles.featureDesc}>
                  Data-driven analysis to help you make informed real estate
                  decisions
                </p>
              </div>
            </div>
            <div className={styles.featureCard}>
              <div className={styles.featureIcon}>
                <Home size={24} />
              </div>
              <div>
                <h3 className={styles.featureTitle}>
                  Moving to Concord NC Specialists
                </h3>
                <p className={styles.featureDesc}>
                  Specialized relocation services for individuals and families
                </p>
              </div>
            </div>
            <div className={styles.featureCard}>
              <div className={styles.featureIcon}>
                <Users size={24} />
              </div>
              <div>
                <h3 className={styles.featureTitle}>Full-Service Support</h3>
                <p className={styles.featureDesc}>
                  From home search to closing, we guide you every step
                </p>
              </div>
            </div>
          </div>

          <p className={styles.marketLinkContainer}>
            Stay ahead of the market — explore the latest <Link to="/market-reports" className={styles.marketLink}>Concord NC housing market data and trends</Link>.
          </p>

          <div className={styles.credentialsBar}>
            <strong>Credentials:</strong> NC Licensed Real Estate Broker | Relocation Specialist | MLS Member | NAR Member
          </div>
        </div>
      </section>

      {/* Neighborhoods Section */}
      <section className={styles.neighborhoodsSection}>
        <div className={styles.container}>
          <div className={styles.sectionHeaderCentered}>
            <h2 className={styles.sectionTitle}>
              Living in Concord NC: Discover the Best Neighborhoods
            </h2>
          </div>

          {isLoadingNeighborhoods ? (
            <div className={styles.neighborhoodsGrid}>
              {Array.from({ length: 4 }).map((_, i) => (
                <Skeleton key={i} className={styles.cardSkeleton} />
              ))}
            </div>
          ) : (
            <div className={styles.neighborhoodsGrid}>
              {featuredNeighborhoods.map((n) => (
                <NeighborhoodCard key={n.id} neighborhood={n} />
              ))}
            </div>
          )}

          <div className={styles.viewAllAction}>
            <Button asChild size="lg">
              <Link to="/neighborhoods">View All Neighborhoods</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* About Franklin Section */}
      <HomeAbout />

      {/* Testimonials Section */}
      <section className={styles.testimonialsSection}>
        <div className={styles.container}>
          <h2 className={styles.sectionTitleCentered}>Client Success Stories</h2>

          {isLoadingTestimonials ? (
            <div className={styles.testimonialsGrid}>
              {Array.from({ length: 3 }).map((_, i) => (
                <Skeleton key={i} className={styles.testimonialSkeleton} />
              ))}
            </div>
          ) : (
            <div className={styles.testimonialsGrid}>
              {testimonials?.slice(0, 3).map((t) => (
                <div key={t.id} className={styles.testimonialCard}>
                  <div className={styles.testimonialStars}>★★★★★</div>
                  <p className={styles.testimonialQuote}>"{t.content}"</p>
                  <div className={styles.testimonialAuthor}>
                    <strong>{t.clientName}</strong>
                    <span>{t.location}</span>
                  </div>
                </div>
              ))}
            </div>
          )}

          <div className={styles.testimonialStatsBar}>
            <span>100+ Families Helped</span>
            <span>4.9★ Average Rating</span>
            <span>99% Satisfaction</span>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <HomeFAQ />

      {/* Blog Section */}
      <section className={styles.blogSection}>
        <div className={styles.container}>
          <div className={styles.sectionHeaderCentered}>
            <h2 className={styles.sectionTitle}>Latest from the Blog</h2>
            <p className={styles.blogSectionSubtitle}>
              Expert insights on Concord NC real estate, neighborhoods, and
              lifestyle
            </p>
          </div>

          {isFetchingBlogPosts ? (
            <div className={styles.blogGrid}>
              {Array.from({ length: 3 }).map((_, i) => (
                <Skeleton key={i} className={styles.blogCardSkeleton} />
              ))}
            </div>
          ) : (
            <div className={styles.blogGrid}>
              {blogPosts?.slice(0, 3).map((post) => (
                <div key={post.id} className={styles.blogCard}>
                  <div className={styles.blogCardBadge}>
                    <Badge variant={CATEGORY_BADGE_VARIANT[post.category]}>
                      {CATEGORY_LABELS[post.category]}
                    </Badge>
                  </div>
                  <Link
                    to={`/blog/${post.slug}`}
                    className={styles.blogCardTitle}
                  >
                    {post.title}
                  </Link>
                  <p className={styles.blogCardExcerpt}>
                    {truncate(post.content, 120)}
                  </p>
                  <Link
                    to={`/blog/${post.slug}`}
                    className={styles.blogReadMore}
                  >
                    Read More →
                  </Link>
                </div>
              ))}
            </div>
          )}

          <div className={styles.viewAllAction}>
            <Button asChild size="lg" variant="outline">
              <Link to="/blog">View All Posts →</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className={styles.contactSection}>
        <div className={styles.container}>
          <ContactFormBlock />
        </div>
      </section>
    </div>
  );
}