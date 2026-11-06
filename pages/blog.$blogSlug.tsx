import React, { useMemo } from "react";
import { useParams, Link } from "react-router-dom";
import { ArrowLeft, User, Calendar } from "lucide-react";
import { useBlogPost } from "../helpers/useBlogPost";
import { useBlogPosts } from "../helpers/useBlogPosts";
import { useBlogInternalLinks } from "../helpers/useBlogInternalLinks";
import { useNeighborhoods } from "../helpers/useNeighborhoods";
import { autoLinkBlogContent } from "../helpers/autoLinkBlogContent";
import { usePageMeta } from "../helpers/usePageMeta";
import { useJsonLd } from "../helpers/useJsonLd";
import { PageBreadcrumbs } from "../components/PageBreadcrumbs";
import { Badge } from "../components/Badge";
import { Button } from "../components/Button";
import { Skeleton } from "../components/Skeleton";
import { BlogRelatedPosts } from "../components/BlogRelatedPosts";
import { BlogNeighborhoodLinks } from "../components/BlogNeighborhoodLinks";
import { BlogMarketDataCta } from "../components/BlogMarketDataCta";
import { PageAuthorBlock } from "../components/PageAuthorBlock";
import styles from "./blog.$blogSlug.module.css";

const BLOG_CONTEXTUAL_LINKS: Record<string, { href: string; label: string }[]> = {
  "concord-nc-vs-harrisburg-nc-comparison": [
    { href: "/neighborhoods/highland-creek", label: "Highland Creek neighborhood guide" },
    { href: "/moving-to-concord/harrisburg", label: "complete guide to moving to Harrisburg NC" },
    { href: "/contact", label: "schedule a consultation with Franklin" },
  ],
  "concord-nc-housing-market-spring-2026": [
    { href: "/neighborhoods/cox-mill", label: "Cox Mill area homes and schools" },
    { href: "/market-reports", label: "full Concord NC market reports dashboard" },
    { href: "/contact", label: "get a personalized market analysis from Franklin" },
  ],
  "best-things-to-do-concord-nc": [
    { href: "/neighborhoods/afton-village", label: "Afton Village walkable neighborhood" },
    { href: "/moving-to-concord", label: "complete guide to moving to Concord NC" },
    { href: "/contact", label: "plan your Concord visit with Franklin" },
  ],
  "top-10-reasons-move-concord-nc-2026": [
    { href: "/neighborhoods/winding-walk", label: "Winding Walk family neighborhood guide" },
    { href: "/moving-to-concord", label: "free Concord NC relocation guide" },
    { href: "/contact", label: "start your Concord move with Franklin" },
  ],
  "selling-concord-nc-home-maximize-price": [
    { href: "/neighborhoods/christenbury", label: "Christenbury home values and trends" },
    { href: "/market-reports", label: "latest Concord NC market data" },
    { href: "/contact", label: "get your free home valuation from Franklin" },
  ],
  "first-time-home-buyer-guide-concord": [
    { href: "/neighborhoods/moss-creek", label: "Moss Creek affordable starter homes" },
    { href: "/moving-to-concord", label: "moving to Concord NC relocation guide" },
    { href: "/contact", label: "connect with Franklin for first-time buyer guidance" },
  ],
  "exploring-highland-creek-concord": [
    { href: "/neighborhoods/skybrook", label: "Skybrook luxury golf community" },
    { href: "/market-reports", label: "Concord NC housing market data" },
    { href: "/contact", label: "tour Highland Creek homes with Franklin" },
  ],
};

const formatCategory = (cat: string) => {
  return cat.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
};

export default function BlogPostPage() {
  const { blogSlug } = useParams<{ blogSlug: string }>();
  const { data: post, isFetching, isError } = useBlogPost(blogSlug || "");
  const { data: neighborhoods } = useNeighborhoods();
  const { data: blogPosts } = useBlogPosts();
  const handleContentClick = useBlogInternalLinks();

  const processedContent = useMemo(
    () =>
      post
        ? autoLinkBlogContent(
            post.content,
            post.slug,
            neighborhoods || [],
            blogPosts?.map((p) => ({ slug: p.slug, title: p.title })) || []
          )
        : "",
    [post?.content, post?.slug, neighborhoods, blogPosts]
  );

  const isLoading = isFetching && !post;

  const metaTitle = post ? `${post.title} | Living in Concord NC` : "Blog Post | Living in Concord NC";
  let metaDescription = "Read this article on the Living in Concord NC blog by Franklin Bellamy, your Concord NC real estate expert.";
  if (post) {
    let desc = post.excerpt;
    if (desc.length < 145) {
      const padded = `${desc} Read more on LivingInConcord.com.`;
      if (padded.length <= 155) {
        desc = padded;
      }
    }
    if (desc.length > 155) {
      desc = desc.slice(0, 152) + "...";
    }
    metaDescription = desc;
  }
  const metaCanonical = post ? `/blog/${post.slug}` : `/blog/${blogSlug || ""}`;
  const metaOgImage = post?.imageUrl ?? undefined;

  const meta = usePageMeta({
    title: metaTitle,
    description: metaDescription,
    canonicalPath: metaCanonical,
    ogType: "article",
    ogImage: metaOgImage,
    articlePublishedTime: post ? new Date(post.publishedAt).toISOString() : undefined,
    articleAuthor: post?.author,
  });

  const jsonLd = useJsonLd(
    post
      ? [
          {
            "@context": "https://schema.org",
            "@type": "Article",
            headline: post.title,
            description: post.excerpt,
            ...(post.imageUrl ? { image: post.imageUrl } : {}),
            datePublished: new Date(post.publishedAt).toISOString(),
            dateModified: "2026-04-11",
            articleSection: formatCategory(post.category),
            author: {
              "@type": "Person",
              name: "Franklin Bellamy",
              jobTitle: "NC Licensed Real Estate Broker",
              url: "https://livinginconcordnc.com/about",
            },
            publisher: {
              "@type": "Organization",
              name: "LivingInConcordNC.com",
              url: "https://livinginconcordnc.com",
            },
            mainEntityOfPage: `https://livinginconcordnc.com/blog/${post.slug}`,
          },
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
                name: "Blog",
                item: "https://livinginconcordnc.com/blog",
              },
              {
                "@type": "ListItem",
                position: 3,
                name: post.title,
                item: `https://livinginconcordnc.com/blog/${post.slug}`,
              },
            ],
          },
          {
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: [
              {
                "@type": "Question",
                name: "Who wrote this article?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "This article was written by Franklin Bellamy, an NC Licensed Real Estate Broker with 15+ years of experience in Concord NC and the Charlotte Metro Area.",
                },
              },
              {
                "@type": "Question",
                name: "Is this information up to date?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Yes, this article is regularly reviewed and updated. Last updated June 2026. For the most current market data, contact Franklin Bellamy at (704) 904-5142.",
                },
              },
              {
                "@type": "Question",
                name: "How can I get personalized real estate advice?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Contact Franklin Bellamy directly at (704) 904-5142 or visit livinginconcordnc.com/contact for a free, no-obligation consultation about Concord NC real estate.",
                },
              },
            ],
          },
        ]
      : null
  );

  const formatDate = (dateInput: Date | string) => {
    const date = new Date(dateInput);
    return new Intl.DateTimeFormat('en-US', { month: 'long', day: 'numeric', year: 'numeric' }).format(date);
  };

  const contextualLinks = post?.slug && BLOG_CONTEXTUAL_LINKS[post.slug]
    ? BLOG_CONTEXTUAL_LINKS[post.slug]
    : [
        { href: "/", label: "living in Concord NC — homepage" },
        { href: "/neighborhoods", label: "Explore Concord NC Neighborhoods" },
        { href: "/market-reports", label: "Latest Concord NC Market Reports" },
        { href: "/contact", label: "Contact Franklin Bellamy" },
      ];

  const breadcrumbItems = post
    ? [
        { label: "Home", href: "/" },
        { label: "Blog", href: "/blog" },
        { label: post.title },
      ]
    : [
        { label: "Home", href: "/" },
        { label: "Blog", href: "/blog" },
      ];

  if (isLoading) {
    return (
      <div className={styles.page}>
        <div className={styles.container}>
          <div className={styles.layout}>
            <div className={styles.mainContent}>
              <Skeleton style={{ height: '400px', borderRadius: 'var(--radius-xl)' }} />
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (isError || !post) {
    return (
      <div className={styles.page}>
        <div className={styles.container}>
          <div className={styles.notFound}>
            <h2>Article Not Found</h2>
            <p>The blog post you're looking for doesn't exist or has been moved.</p>
            <Button asChild>
              <Link to="/blog">Back to Blog</Link>
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.page}>
      {meta}
      {jsonLd}
      <PageBreadcrumbs items={breadcrumbItems} />
      <section className={styles.hero}>
        <div className={styles.heroContainer}>
          <Badge className={styles.heroBadge}>{formatCategory(post.category)}</Badge>
          <h1 className={styles.heroTitle}>{post.title}</h1>
          <div className={styles.heroMeta}>
            <span className={styles.metaItem}><User size={16} /> {post.author}</span>
            <span className={styles.metaItem}><Calendar size={16} /> {formatDate(post.publishedAt)}</span>
          </div>
        </div>
      </section>

      <section className={styles.contentSection}>
        <div className={styles.container}>
          <div className={styles.layout}>
            <article className={styles.mainContent}>
              <div className={styles.takeawayBox}>
                <h2 className={styles.takeawayTitle}>Key Takeaway</h2>
                <p className={styles.takeawayText}>{post.excerpt}</p>
              </div>

              {post.imageUrl && (
                <div className={styles.featuredImageContainer}>
                  <img src={post.imageUrl} alt={post.title} className={styles.featuredImage} fetchPriority="high" width={800} height={450} decoding="async" />
                </div>
              )}

              {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions */}
              <div
                className={styles.prose}
                dangerouslySetInnerHTML={{ __html: processedContent }}
                onClick={handleContentClick}
              />

              <p className={styles.homepageLink}>
                Looking for more? Visit our <Link to="/">living in Concord NC</Link> homepage for neighborhood guides, market reports, and relocation resources.
              </p>

              <div className={styles.contextualLinksBox}>
                <h3 className={styles.contextualLinksTitle}>Continue Your Research</h3>
                <ul className={styles.contextualLinksList}>
                  {contextualLinks.map((link, idx) => (
                    <li key={idx}>
                      <Link to={link.href}>{link.label}</Link>
                    </li>
                  ))}
                </ul>
              </div>

              <p className={styles.ctaSentence}>
                Have questions about Concord NC real estate? Call or text Franklin Bellamy at <strong>(704) 904-5142</strong> — honest answers, local expertise, zero pressure.
              </p>

              <PageAuthorBlock className={styles.authorBlock} disclaimer="Content on this page is for informational and educational purposes only. Market data, pricing, and community information may change. Contact Franklin Bellamy at (704) 904-5142 for current, verified information." />

              <div className={styles.bottomActions}>
                <Button asChild variant="outline">
                  <Link to="/blog"><ArrowLeft size={16} /> Back to Blog</Link>
                </Button>
              </div>
            </article>

            <aside className={styles.sidebar}>
              {/* 1. About Author */}
              <div className={styles.authorCard}>
                <div className={styles.authorHeader}>
                  <div className={styles.authorAvatar}>
                    <img src="https://assets.floot.app/017b3652-9495-4591-835a-c77af11e3c4b/f8be1fd2-e1d3-4a44-b1b4-180567e62b3a.png" alt="Franklin Bellamy, NC Licensed Real Estate Broker and Relocation Specialist serving Concord NC and Cabarrus County" loading="lazy" width={64} height={64} decoding="async" />
                  </div>
                  <div>
                    <Link to="/about" className={styles.authorNameLink}>
                      <h3>Franklin Bellamy</h3>
                    </Link>
                    <span>Broker/Realtor</span>
                  </div>
                </div>
                <p>Franklin is an NC Licensed Real Estate Broker and relocation specialist with over 15 years of experience helping families find their perfect home in Concord, NC.</p>
                <div className={styles.authorActions}>
                  <Button asChild variant="outline" className={styles.authorAboutBtn}>
                    <Link to="/about">About Franklin</Link>
                  </Button>
                  <Button asChild className={styles.authorBtn}>
                    <Link to="/contact">Contact Franklin</Link>
                  </Button>
                </div>
              </div>

              {/* 2. Related Posts */}
              <BlogRelatedPosts currentSlug={post.slug} currentCategory={post.category} />

              {/* 3. Explore Neighborhoods */}
              <BlogNeighborhoodLinks />

              {/* 4. Market Data CTA */}
              <BlogMarketDataCta />

              {/* 5. Relocation Guide CTA */}
              <div className={styles.ctaCard}>
                <h3>Moving to Concord?</h3>
                <p>Get our free 3000+ word relocation guide packed with neighborhood insights, school info, and more.</p>
                <Button asChild variant="outline" className={styles.ctaBtn}>
                  <Link to="/moving-to-concord">Get the Guide</Link>
                </Button>
              </div>
            </aside>
          </div>
        </div>
      </section>
    </div>
  );
}