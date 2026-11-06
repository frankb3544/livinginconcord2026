import React, { useState } from "react";
import { Link } from "react-router-dom";
import { usePageMeta } from "../helpers/usePageMeta";
import { useJsonLd } from "../helpers/useJsonLd";
import { PageBreadcrumbs } from "../components/PageBreadcrumbs";
import { useBlogPosts } from "../helpers/useBlogPosts";
import { BlogCategoryArrayValues, type BlogCategory } from "../helpers/schema";
import { Skeleton } from "../components/Skeleton";
import { Badge } from "../components/Badge";
import { LIVING_IN_CONCORD_SCHEMA, FRANKLIN_BELLAMY_PERSON_SCHEMA } from "../helpers/schemaConstants";
import styles from "./blog.module.css";

const formatCategory = (cat: string) => {
  return cat.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
};

const BLOG_BREADCRUMBS = [
  { label: "Home", href: "/" },
  { label: "Blog" },
];

const BLOG_BREADCRUMBS_JSON_LD = {
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
      "name": "Blog",
      "item": "https://livinginconcordnc.com/blog"
    }
  ]
};

const BLOG_JSON_LD = {
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  "name": "Concord NC Real Estate Blog",
  "description": "Read expert articles about Concord NC real estate, neighborhoods, market trends, and relocation tips from local realtor Franklin Bellamy.",
  "url": "https://livinginconcordnc.com/blog"
};

const SPRING_2026_REPORT_JSON_LD = {
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": "Concord NC Housing Market Report — June 2026",
  "author": {
    "@id": "https://livinginconcordnc.com/#founder"
  },
  "datePublished": "2026-03-01",
  "publisher": {
    "@id": "https://livinginconcordnc.com/#organization"
  }
};

export default function BlogPage() {
  const meta = usePageMeta({
    title: "Concord NC Real Estate Blog | Living in Concord NC",
    description:
      "Read expert articles on Concord NC real estate — market updates, neighborhood guides, buying tips, and relocation advice from broker Franklin Bellamy.",
    canonicalPath: "/",
    ogImage: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=1200&q=80",
  });
  const jsonLd = useJsonLd([
    BLOG_JSON_LD, 
    BLOG_BREADCRUMBS_JSON_LD, 
    LIVING_IN_CONCORD_SCHEMA, 
    FRANKLIN_BELLAMY_PERSON_SCHEMA,
    SPRING_2026_REPORT_JSON_LD
  ]);

  const [activeCategory, setActiveCategory] = useState<BlogCategory | "all">("all");
  
  const queryCategory = activeCategory === "all" ? undefined : activeCategory;
  const { data: posts, isLoading } = useBlogPosts(queryCategory);

  const formatDate = (dateInput: Date | string) => {
    const date = new Date(dateInput);
    return new Intl.DateTimeFormat('en-US', { month: 'long', day: 'numeric', year: 'numeric' }).format(date);
  };

  return (
    <div className={styles.page}>
      {meta}
      {jsonLd}
      <PageBreadcrumbs items={BLOG_BREADCRUMBS} />
      <section className={styles.hero}>
        <div className={styles.heroContainer}>
          <h1 className={styles.heroTitle}>Concord NC Real Estate Blog</h1>
          <p className={styles.heroSubtitle}>
            Expert insights, local market updates, and comprehensive guides to living in Concord.
          </p>
        </div>
      </section>

      <section className={styles.content}>
        <div className={styles.container}>
          <div className={styles.summaryCard}>
            <p className={styles.summaryText}>Read expert real estate insights from Franklin Bellamy, NC Licensed Broker with 15+ years in Concord NC. Topics include market updates, neighborhood guides, buying and selling tips, and relocation advice for families moving to the Concord &  Charlotte Metro Area.</p>
          </div>

          <div className={styles.filterSection}>
            <button 
              className={`${styles.filterPill} ${activeCategory === "all" ? styles.activePill : ""}`}
              onClick={() => setActiveCategory("all")}
            >
              All Posts
            </button>
            {BlogCategoryArrayValues.map(cat => (
              <button 
                key={cat}
                className={`${styles.filterPill} ${activeCategory === cat ? styles.activePill : ""}`}
                onClick={() => setActiveCategory(cat)}
              >
                {formatCategory(cat)}
              </button>
            ))}
          </div>

          {isLoading ? (
            <div className={styles.grid}>
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className={styles.postCard}>
                  <Skeleton className={styles.imageSkeleton} />
                  <div className={styles.cardContent}>
                    <Skeleton style={{ width: '80px', height: '24px', marginBottom: '16px' }} />
                    <Skeleton style={{ width: '100%', height: '28px', marginBottom: '12px' }} />
                    <Skeleton style={{ width: '100%', height: '60px', marginBottom: '16px' }} />
                  </div>
                </div>
              ))}
            </div>
          ) : posts && posts.length > 0 ? (
            <div className={styles.grid}>
              {posts.map(post => (
                <Link to={`/blog/${post.slug}`} key={post.id} className={styles.postCard}>
                  <div className={styles.imageContainer}>
                    {post.imageUrl ? (
                      <img src={post.imageUrl} alt={post.title} className={styles.postImage} loading="lazy" width={400} height={225} decoding="async" />
                    ) : (
                      <div className={styles.imagePlaceholder}>Living In Concord</div>
                    )}
                  </div>
                  <div className={styles.cardContent}>
                    <Badge className={styles.categoryBadge}>{formatCategory(post.category)}</Badge>
                    <h2 className={styles.postTitle}>{post.title}</h2>
                    <p className={styles.postExcerpt}>{post.excerpt}</p>
                    <div className={styles.postMeta}>
                      <span className={styles.author}>{post.author}</span>
                      <span className={styles.date}>{formatDate(post.publishedAt)}</span>
                    </div>
                    <span className={styles.readMore}>Read Article &rarr;</span>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className={styles.emptyState}>
              <h3>No posts found</h3>
              <p>We couldn't find any articles in this category.</p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}