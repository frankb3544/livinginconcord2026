import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { useBlogPosts } from "../helpers/useBlogPosts";
import { Badge } from "./Badge";
import { Skeleton } from "./Skeleton";
import styles from "./NeighborhoodBlogPosts.module.css";

const CATEGORY_LABELS: Record<string, string> = {
  buying_tips: "Buying Tips",
  lifestyle: "Lifestyle",
  market_updates: "Market Updates",
  neighborhood_guides: "Neighborhood Guides",
  relocation: "Relocation",
  selling_tips: "Selling Tips",
};

interface Props {
  className?: string;
  neighborhoodName?: string;
}

export const NeighborhoodBlogPosts = ({ className, neighborhoodName }: Props) => {
  const { data: posts, isFetching } = useBlogPosts();

  const displayPosts = React.useMemo(() => {
    if (!posts) return [];
    if (!neighborhoodName) return posts.slice(0, 4);

    const lowerName = neighborhoodName.toLowerCase();
    const matched = [];
    const unmatched = [];

    for (const post of posts) {
      if (
        post.title.toLowerCase().includes(lowerName) ||
        post.content.toLowerCase().includes(lowerName)
      ) {
        matched.push(post);
      } else {
        unmatched.push(post);
      }
    }

    return [...matched, ...unmatched].slice(0, 4);
  }, [posts, neighborhoodName]);

  return (
    <div className={`${styles.container} ${className || ""}`}>
      <h2 className={styles.heading}>
        {neighborhoodName ? `Articles About ${neighborhoodName}` : "From the Blog"}
      </h2>

      {isFetching ? (
        <div className={styles.skeletonList}>
          <Skeleton className={styles.skeletonItem} />
          <Skeleton className={styles.skeletonItem} />
          <Skeleton className={styles.skeletonItem} />
          <Skeleton className={styles.skeletonItem} />
        </div>
      ) : displayPosts.length === 0 ? (
        <p className={styles.empty}>No posts available right now.</p>
      ) : (
        <div className={styles.list}>
          {displayPosts.map((post) => (
            <Link
              key={post.id}
              to={`/blog/${post.slug}`}
              className={styles.card}
            >
              <div className={styles.cardContent}>
                <Badge variant="outline" className={styles.categoryBadge}>
                  {CATEGORY_LABELS[post.category] ?? post.category}
                </Badge>
                <span className={styles.title}>{post.title}</span>
              </div>
              <ArrowRight size={16} className={styles.arrow} />
            </Link>
          ))}
        </div>
      )}

      <div className={styles.footer}>
        <Link to="/blog" className={styles.viewAll}>
          View all articles →
        </Link>
      </div>
    </div>
  );
};