import React from "react";
import { Link } from "react-router-dom";
import { useBlogPosts } from "../helpers/useBlogPosts";
import { Badge } from "./Badge";
import { Skeleton } from "./Skeleton";
import { BlogCategory } from "../helpers/schema";
import styles from "./BlogRelatedPosts.module.css";

const formatCategory = (cat: string) =>
  cat.split("_").map((w) => w.charAt(0).toUpperCase() + w.slice(1)).join(" ");

interface Props {
  currentSlug: string;
  currentCategory: BlogCategory;
  className?: string;
}

export function BlogRelatedPosts({ currentSlug, currentCategory, className }: Props) {
  const { data: categoryPosts, isFetching: isFetchingCategory } = useBlogPosts(currentCategory);
  // Fetch all posts as fallback to backfill when same-category posts are sparse
  const { data: allPosts, isFetching: isFetchingAll } = useBlogPosts();

  const isFetching = isFetchingCategory || isFetchingAll;

  const relatedPosts = React.useMemo(() => {
    if (!categoryPosts || !allPosts) return [];

    const sameCategoryFiltered = categoryPosts.filter((p) => p.slug !== currentSlug);
    const result = sameCategoryFiltered.slice(0, 3);

    if (result.length < 3) {
      const resultSlugs = new Set(result.map((p) => p.slug));
      resultSlugs.add(currentSlug);
      const others = allPosts.filter((p) => !resultSlugs.has(p.slug));
      const needed = 3 - result.length;
      result.push(...others.slice(0, needed));
    }

    return result;
  }, [categoryPosts, allPosts, currentSlug]);

  return (
    <div className={`${styles.container} ${className ?? ""}`}>
      <h3 className={styles.heading}>Related Articles</h3>
      {isFetching && relatedPosts.length === 0 ? (
        <div className={styles.list}>
          {[0, 1, 2].map((i) => (
            <div key={i} className={styles.skeletonItem}>
              <Skeleton style={{ height: "0.9rem", width: "100%", marginBottom: "0.375rem" }} />
              <Skeleton style={{ height: "0.75rem", width: "60%" }} />
            </div>
          ))}
        </div>
      ) : relatedPosts.length === 0 ? (
        <p className={styles.empty}>No related articles found.</p>
      ) : (
        <ul className={styles.list}>
          {relatedPosts.map((post) => (
            <li key={post.slug} className={styles.item}>
              <Link to={`/blog/${post.slug}`} className={styles.itemLink}>
                <span className={styles.itemTitle}>{post.title}</span>
                <Badge variant="outline" className={styles.itemBadge}>
                  {formatCategory(post.category)}
                </Badge>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}