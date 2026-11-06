import React from "react";
import { useParams, Link } from "react-router-dom";
import { Star, MapPin, DollarSign, Tag, Check, Clock, GraduationCap } from "lucide-react";
import { useNeighborhoodDetail } from "../helpers/useNeighborhoodDetail";
import { useNeighborhoods } from "../helpers/useNeighborhoods";
import { usePageMeta } from "../helpers/usePageMeta";
import { useJsonLd } from "../helpers/useJsonLd";
import { PageBreadcrumbs } from "../components/PageBreadcrumbs";
import { NeighborhoodCard } from "../components/NeighborhoodCard";
import { Button } from "../components/Button";
import { Badge } from "../components/Badge";
import { Skeleton } from "../components/Skeleton";

import { NeighborhoodCrossLinks } from "../components/NeighborhoodCrossLinks";
import { NeighborhoodBlogPosts } from "../components/NeighborhoodBlogPosts";
import { NeighborhoodAuthorCard } from "../components/NeighborhoodAuthorCard";
import { PageAuthorBlock } from "../components/PageAuthorBlock";
import { NeighborhoodQualifier } from "../components/NeighborhoodQualifier";
import { linkifyNeighborhoods } from "../helpers/linkifyNeighborhoods";
import { NeighborhoodTakeaways, KEY_TAKEAWAYS_DATA } from "../components/NeighborhoodTakeaways";
import { LIVING_IN_CONCORD_SCHEMA } from "../helpers/schemaConstants";
import styles from "./neighborhoods.$neighborhoodSlug.module.css";

const COX_MILL_SUBDIVISIONS = [
  { name: "Moss Creek", link: "/neighborhoods/moss-creek", desc: "Large master-planned community with various home styles, parks, and amenities." },
  { name: "Winding Walk", link: "/neighborhoods/winding-walk", desc: "Shea Homes master-planned community featuring parks, pool, clubhouse, and tennis courts." },
  { name: "Annsborough Park", desc: "M/I Homes community with quality single-family homes." },
  { name: "Cannon Run", desc: "Pulte Homes development offering modern floor plans." },
  { name: "Carriage Downs", desc: "Upscale single-family homes on generous lots." },
  { name: "Edenton at Cox Mill", desc: "Family-oriented subdivision near top-rated schools." },
  { name: "Christenbury Wood / Christenbury Hall / Christenbury Corners", desc: "Series of established communities near Christenbury Village." },
  { name: "Laurel Park", desc: "Charming neighborhood with mature landscaping." },
  { name: "Piper Landing", desc: "Well-maintained single-family home community." },
  { name: "The Enclave", desc: "Intimate neighborhood with quality construction." },
  { name: "Rocky River Crossing", desc: "Popular subdivision with easy access to Cox Mill schools." },
  { name: "Allen Mills", desc: "Growing community with newer construction homes." },
  { name: "The Courtyards on Poplar Tent", desc: "Low-maintenance courtyard-style homes." },
  { name: "Vanderburg Estates", desc: "Spacious estate-style homes on large lots." },
  { name: "The Mills at Rocky River Townhomes", desc: "Modern townhome community ideal for first-time buyers." },
  { name: "The Wayford at Concord Townhomes", desc: "Contemporary townhomes with low-maintenance living." },
];

const CUSTOM_NEIGHBORHOOD_META: Record<string, { title: string; description: string }> = {
  "afton-village": {
    title: "Afton Village - Homes for Sale & Guide | Concord, NC",
    description: "Explore Afton Village in Concord NC — walkable streets, boutique shops, homes $300K–$680K. See why families love it. Tour with Franklin Bellamy.",
  },
  "skybrook": {
    title: "Skybrook - Homes for Sale & Guide | Concord, NC",
    description: "Discover Skybrook in Concord NC — premier golf course living, luxury homes from $400K–$1.3M, and resort-style amenities. Tour with Franklin Bellamy.",
  },
  "winding-walk": {
    title: "Winding Walk - Homes for Sale & Guide | Concord, NC",
    description: "Explore Winding Walk in Concord NC — modern homes $500K–$990K, top-rated Cox Mill schools, pool, and trails. Tour with Franklin Bellamy to learn more.",
  },
  "christenbury": {
    title: "Christenbury - Homes for Sale & Guide | Concord, NC",
    description: "Discover Christenbury in Concord NC — resort amenities, homes $650K–$1.6M, and top Cox Mill school zone. Tour with Franklin Bellamy to learn more.",
  },
  "cox-mill": {
    title: "Cox Mill Area - Homes for Sale & Guide | Concord, NC",
    description: "Explore the Cox Mill area in Concord NC — top-rated schools, 15+ subdivisions, and homes from $300K–$560K. Tour with Franklin Bellamy to learn more.",
  },
  "highland-creek": {
    title: "Highland Creek - Homes for Sale & Guide | Concord, NC",
    description: "Highland Creek in Concord NC — 300+ acres of nature, golf course, resort amenities, and homes $300K–$835K. Tour with Franklin Bellamy to learn more.",
  },
  "moss-creek": {
    title: "Moss Creek - Homes for Sale & Guide | Concord, NC",
    description: "Explore Moss Creek in Concord NC — mature landscaping, generous lots, homes from $325K–$700K. A peaceful community. Tour with Franklin Bellamy today.",
  },
  "roberta-ridge": {
    title: "Roberta Ridge - Homes for Sale & Guide | Concord, NC",
    description: "Discover Roberta Ridge in Concord NC — D.R. Horton single-family homes $390K–$505K near downtown Concord. Tour with Franklin Bellamy to learn more.",
  },
  "kellswater-bridge": {
    title: "Kellswater Bridge - Homes for Sale & Guide | Concord, NC",
    description: "Kellswater Bridge in Concord NC — master-planned lakeside living with resort amenities. Explore homes and community features with Franklin Bellamy.",
  },
  "bedford-farms": {
    title: "Bedford Farms - Homes for Sale & Guide | Concord, NC",
    description: "Explore Bedford Farms in Concord NC — established family neighborhood with generous lots and easy access to schools. Tour with Franklin Bellamy today.",
  },
  "laurel-park": {
    title: "Laurel Park - Homes for Sale & Guide | Concord, NC",
    description: "Laurel Park in Concord NC — spacious homes $400K–$897K with clubhouse, pool, tennis. A well-established community. Tour with Franklin Bellamy today.",
  },
  "carriage-downs": {
    title: "Carriage Downs - Homes for Sale & Guide | Concord, NC",
    description: "Explore Carriage Downs in Concord NC — upscale single-family homes on generous lots in the sought-after Cox Mill school zone. Tour with Franklin.",
  },
};

const COX_MILL_BROADER_AREAS = [
  { name: "Highland Creek", link: "/neighborhoods/highland-creek", desc: "One of the largest master-planned communities in the state, spanning Concord and Charlotte." }
];

const getYouTubeEmbedUrl = (url: string | null): string | null => {
  if (!url) return null;
  try {
    const urlObj = new URL(url);
    let videoId = null;
    if (urlObj.hostname.includes("youtube.com")) {
      if (urlObj.pathname.startsWith("/shorts/")) {
        videoId = urlObj.pathname.split("/")[2];
      } else if (urlObj.pathname === "/watch") {
        videoId = urlObj.searchParams.get("v");
      }
    } else if (urlObj.hostname.includes("youtu.be")) {
      videoId = urlObj.pathname.slice(1);
    }
    return videoId ? `https://www.youtube.com/embed/${videoId}` : null;
  } catch (e) {
    return null;
  }
};

export default function NeighborhoodDetailPage() {
  const { neighborhoodSlug } = useParams<{ neighborhoodSlug: string }>();
  const slug = neighborhoodSlug || "";
  const { data: neighborhood, isLoading, isError } = useNeighborhoodDetail(slug);
  const { data: allNeighborhoods } = useNeighborhoods();

  const customMeta = CUSTOM_NEIGHBORHOOD_META[slug];

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      maximumFractionDigits: 0,
    }).format(price);
  };

  const metaTitle = customMeta
    ? customMeta.title
    : neighborhood
    ? `${neighborhood.name} - Homes for Sale & Guide | Concord, NC`
    : "Neighborhood | Concord NC Neighborhood Guide";

  let metaDescription = "Explore this Concord NC neighborhood guide.";
  if (customMeta) {
    metaDescription = customMeta.description;
  } else if (neighborhood) {
    metaDescription = `Explore ${neighborhood.name} in Concord NC — home prices from ${formatPrice(neighborhood.priceRangeMin)} to ${formatPrice(neighborhood.priceRangeMax)}, schools, and amenities. Tour with Franklin Bellamy.`;
    if (metaDescription.length > 155) {
      metaDescription = metaDescription.slice(0, 152) + "...";
    }
  }

  const meta = usePageMeta({
    title: metaTitle,
    description: metaDescription,
    canonicalPath: `/neighborhoods/${slug}`,
    ogImage: neighborhood?.imageUrl || "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=1200&q=80",
  });

  const faqItems: any[] = neighborhood ? [
    {
      "@type": "Question",
      name: `What are homes in ${neighborhood.name} Concord NC priced at?`,
      acceptedAnswer: {
        "@type": "Answer",
        text: `Homes in ${neighborhood.name} currently range from ${formatPrice(neighborhood.priceRangeMin)} to ${formatPrice(neighborhood.priceRangeMax)}. Contact Franklin Bellamy at (704) 904-5142 for current listings and pricing details.`
      }
    },
    {
      "@type": "Question",
      name: `What school zone is ${neighborhood.name} in?`,
      acceptedAnswer: {
        "@type": "Answer",
        text: `${neighborhood.name} is located in Concord NC within the Cabarrus County Schools district. School assignments depend on your address within the neighborhood. Contact Franklin for specific school zone details.`
      }
    },
    {
      "@type": "Question",
      name: `How far is ${neighborhood.name} from Charlotte?`,
      acceptedAnswer: {
        "@type": "Answer",
        text: `${neighborhood.name} in Concord NC is approximately 20-25 miles northeast of Charlotte, about 25-35 minutes via I-85. Contact Franklin Bellamy at (704) 904-5142 for more details.`
      }
    }
  ] : [];

  if (neighborhood && KEY_TAKEAWAYS_DATA[slug]) {
    faqItems.push(
      {
        "@type": "Question",
        name: `What is the median home price in ${neighborhood.name}?`,
        acceptedAnswer: {
          "@type": "Answer",
          text: `The 2026 median home price in ${neighborhood.name} is ${KEY_TAKEAWAYS_DATA[slug].medianPrice}.`
        }
      },
      {
        "@type": "Question",
        name: `What is the commute to Uptown Charlotte from ${neighborhood.name}?`,
        acceptedAnswer: {
          "@type": "Answer",
          text: `The commute to Uptown Charlotte is approximately ${KEY_TAKEAWAYS_DATA[slug].commute}.`
        }
      },
      {
        "@type": "Question",
        name: `What are the schools for ${neighborhood.name}?`,
        acceptedAnswer: {
          "@type": "Answer",
          text: `The school zone is ${KEY_TAKEAWAYS_DATA[slug].schoolZone}.`
        }
      }
    );
  }

  const jsonLd = useJsonLd(
    neighborhood
      ? [
          {
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
          itemListElement: [
            {
              "@type": "ListItem",
              position: 1,
              name: "Home",
              item: "https://livinginconcordnc.com",
            },
            {
              "@type": "ListItem",
              position: 2,
              name: "Neighborhoods",
              item: "https://livinginconcordnc.com/neighborhoods",
            },
            {
              "@type": "ListItem",
              position: 3,
              name: neighborhood.name,
              item: `https://livinginconcordnc.com/neighborhoods/${slug}`,
            },
          ],
          },
          {
            "@context": "https://schema.org",
            "@type": "Article",
            headline: `${neighborhood.name} Concord NC — Neighborhood Guide 2026`,
            description: metaDescription,
            author: {
              "@type": "Person",
              name: "Franklin Bellamy",
              jobTitle: "NC Licensed Real Estate Broker",
              url: "https://livinginconcordnc.com/about"
            },
            publisher: {
              "@type": "Organization",
              name: "Living In Concord NC",
              url: "https://livinginconcordnc.com"
            },
            datePublished: "2026-01-01",
            dateModified: "2026-04-11",
            url: `https://livinginconcordnc.com/neighborhoods/${slug}`,
            about: `${neighborhood.name} neighborhood in Concord NC`,
            mainEntityOfPage: `https://livinginconcordnc.com/neighborhoods/${slug}`
          },
          {
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: faqItems
          },
          LIVING_IN_CONCORD_SCHEMA
        ]
      : null
  );

  const otherNeighborhoods = React.useMemo(() => {
    if (!allNeighborhoods || !neighborhood) return [];
    
    const currentTags = new Set(neighborhood.tags);
    
    return allNeighborhoods
      .filter((n) => n.slug !== neighborhoodSlug)
      .map((n) => {
        const overlapCount = n.tags.filter((t) => currentTags.has(t)).length;
        return { n, overlapCount };
      })
      .sort((a, b) => {
        if (a.overlapCount !== b.overlapCount) {
          return b.overlapCount - a.overlapCount;
        }
        return a.n.name.localeCompare(b.n.name);
      })
      .map((x) => x.n)
      .slice(0, 4);
  }, [allNeighborhoods, neighborhood, neighborhoodSlug]);

  if (isLoading) {
    return (
      <div className={styles.page}>
        <Skeleton className={styles.heroSkeleton} />
        <div className={styles.container}>
          <div className={styles.contentGrid}>
            <Skeleton style={{ height: '400px' }} />
            <Skeleton style={{ height: '400px' }} />
          </div>
        </div>
      </div>
    );
  }

  if (isError || !neighborhood) {
    return (
      <div className={styles.page}>
        <div className={styles.container}>
          <div className={styles.notFound}>
            <h2>Neighborhood Not Found</h2>
            <p>We couldn't find details for this neighborhood.</p>
            <Button asChild>
              <Link to="/neighborhoods">View All Neighborhoods</Link>
            </Button>
          </div>
        </div>
      </div>
    );
  }

  const highlightsList = neighborhood.highlights ? neighborhood.highlights.split(',').map(h => h.trim()) : [];

  const breadcrumbItems = [
    { label: "Home", href: "/" },
    { label: "Neighborhoods", href: "/neighborhoods" },
    { label: neighborhood.name },
  ];

  const embedUrl = getYouTubeEmbedUrl(neighborhood.youtubeVideoUrl);

  return (
    <div className={styles.page} style={{ paddingBottom: "80px" }}>
      {meta}
      {jsonLd}
      <PageBreadcrumbs items={breadcrumbItems} />
      <section className={styles.hero} style={neighborhood.imageUrl ? { backgroundImage: `url(${neighborhood.imageUrl})` } : undefined}>
        <div className={styles.heroOverlay}></div>
        <div className={styles.heroContainer}>
          <div className={styles.heroContent}>
            <Badge className={styles.heroBadge}>Concord NC</Badge>
            <h1 className={styles.heroTitle}>{neighborhood.name}</h1>
            <div className={styles.heroMeta}>
              <div className={styles.ratingBox}>
                <Star className={styles.starIcon} fill="currentColor" />
                <span>{Number(neighborhood.rating).toFixed(1)} / 5.0</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <NeighborhoodTakeaways slug={slug} />

      <section className={styles.contentSection}>
        <div className={styles.container}>
          <div className={styles.contentGrid}>
            <div className={styles.mainContent}>
              <div className={styles.overviewBox}>
                <h2>About {neighborhood.name}</h2>
                {embedUrl && (
                  <div className={styles.overviewVideo}>
                    <iframe
                      src={embedUrl}
                      title={`About ${neighborhood.name} video`}
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    ></iframe>
                  </div>
                )}
                {neighborhood.description.split('\n\n').map((paragraph, index) => (
                  <p key={index}>
                    {linkifyNeighborhoods(
                      paragraph,
                      allNeighborhoods?.filter((n) => n.slug !== neighborhoodSlug) || [],
                      styles.inlineLink
                    )}
                  </p>
                ))}
              </div>

              {highlightsList.length > 0 && (
                <div className={styles.highlightsBox}>
                  <h2>Neighborhood Highlights</h2>
                  <div className={styles.highlightsGrid}>
                    {highlightsList.map((highlight, idx) => (
                      <div key={idx} className={styles.highlightItem}>
                        <div className={styles.highlightIcon}><Check size={20} /></div>
                        <span>{highlight}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {slug === "cox-mill" && (
                <div className={styles.subdivisionsBox}>
                  <h2>Key Subdivisions in The Cox Mill Area</h2>
                  <div className={styles.subdivisionsGrid}>
                    {COX_MILL_SUBDIVISIONS.map((sub, idx) => (
                      <div key={idx} className={styles.subdivisionCard}>
                        <h3 className={styles.subdivisionCardTitle}>
                          {sub.link ? (
                            <Link to={sub.link} className={styles.subdivisionCardLink}>
                              {sub.name}
                            </Link>
                          ) : (
                            sub.name
                          )}
                        </h3>
                        <p className={styles.subdivisionCardDesc}>{sub.desc}</p>
                      </div>
                    ))}
                  </div>

                  <h3 className={styles.broaderAreaTitle}>Broader Neighborhood Areas Near Cox Mill</h3>
                  <div className={styles.subdivisionsGrid}>
                    {COX_MILL_BROADER_AREAS.map((area, idx) => (
                      <div key={idx} className={`${styles.subdivisionCard} ${styles.broaderAreaCard}`}>
                        <h3 className={styles.subdivisionCardTitle}>
                          {area.link ? (
                            <Link to={area.link} className={styles.subdivisionCardLink}>
                              {area.name}
                            </Link>
                          ) : (
                            area.name
                          )}
                        </h3>
                        <p className={styles.subdivisionCardDesc}>{area.desc}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <NeighborhoodCrossLinks className={styles.crossLinksBox} />
              <NeighborhoodBlogPosts className={styles.blogPostsBox} neighborhoodName={neighborhood.name} />

              <div className={styles.readMoreBox}>
                <h3>Read More About Concord</h3>
                <p>
                  Planning a move or just want to learn more about the area? Check out our{" "}
                  <Link to="/moving-to-concord" className={styles.inlineLink}>relocation guide</Link> or visit our{" "}
                  <Link to="/blog" className={styles.inlineLink}>blog</Link> for the latest local insights.{" "}
                  For up-to-date pricing and inventory, see our{" "}
                  <Link to="/market-reports" className={styles.inlineLink}>Concord NC market reports</Link>.
                </p>
              </div>

              <div className={styles.inlineCtaBox}>
                <p>
                  Ready to explore {neighborhood.name}? Call or text Franklin Bellamy at (704) 904-5142 for a private neighborhood tour and honest market advice — no pressure, just answers.
                </p>
              </div>

              <div style={{ marginTop: "var(--spacing-8)" }}>
                <PageAuthorBlock disclaimer="Neighborhood data, home price ranges, and community information on this page are sourced from Canopy MLS and the author's professional experience. All figures are estimates and subject to change." />
              </div>
            </div>

            <aside className={styles.sidebar}>
              <NeighborhoodQualifier neighborhoodName={neighborhood.name} />

              <Button asChild size="lg" style={{ width: "100%", marginBottom: "var(--spacing-6)" }}>
                <Link to="/home-search">View Homes for Sale in {neighborhood.name}</Link>
              </Button>

              <div className={styles.factsCard}>
                <h3>Key Facts</h3>
                
                <div className={styles.factRow}>
                  <div className={styles.factIcon}><DollarSign size={20} /></div>
                  <div className={styles.factContent}>
                    <span className={styles.factLabel}>Price Range</span>
                    <span className={styles.factValue}>
                      {formatPrice(neighborhood.priceRangeMin)} - {formatPrice(neighborhood.priceRangeMax)}
                    </span>
                  </div>
                </div>

                <div className={styles.factRow}>
                  <div className={styles.factIcon}><MapPin size={20} /></div>
                  <div className={styles.factContent}>
                    <span className={styles.factLabel}>Location</span>
                    <span className={styles.factValue}>Concord, NC</span>
                  </div>
                </div>

                <div className={styles.factRow}>
                  <div className={styles.factIcon}><Tag size={20} /></div>
                  <div className={styles.factContent}>
                    <span className={styles.factLabel}>Tags</span>
                    <div className={styles.tagsWrapper}>
                      {neighborhood.tags.map(tag => (
                        <Badge key={tag} variant="secondary" className={styles.factTag}>{tag}</Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              <NeighborhoodAuthorCard />
            </aside>
          </div>
        </div>
      </section>

      {otherNeighborhoods.length > 0 && (
        <section className={styles.otherSection}>
          <div className={styles.container}>
            <h2 className={styles.otherTitle}>Explore Other Neighborhoods</h2>
            <div className={styles.otherGrid}>
              {otherNeighborhoods.map(n => (
                <NeighborhoodCard key={n.id} neighborhood={n} />
              ))}
            </div>
            <div className={styles.viewAllAction}>
              <Button asChild variant="outline">
                <Link to="/neighborhoods">View All Neighborhoods</Link>
              </Button>
            </div>
          </div>
        </section>
      )}

      
    </div>
  );
}