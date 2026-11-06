import React from "react";
import { Star } from "lucide-react";
import { Link } from "react-router-dom";
import { Badge } from "./Badge";
import type { Selectable } from "kysely";
import type { Neighborhoods } from "../helpers/schema";
import styles from "./NeighborhoodCard.module.css";

export function NeighborhoodCard({
  neighborhood,
}: {
  neighborhood: Selectable<Neighborhoods>;
}) {
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      maximumFractionDigits: 0,
    }).format(price);
  };

  return (
    <Link to={`/neighborhoods/${neighborhood.slug}`} className={styles.card}>
      <div className={styles.imageContainer}>
        {neighborhood.imageUrl ? (
          <img
            src={neighborhood.imageUrl}
            alt={neighborhood.name}
            className={styles.image}
            loading="lazy"
            width={400}
            height={200}
            decoding="async"
          />
        ) : (
          <div className={styles.imagePlaceholder}>No Image</div>
        )}
      </div>
      <div className={styles.content}>
        <h3 className={styles.title}>{neighborhood.name}</h3>
        <div className={styles.ratingRow}>
          <div className={styles.stars}>
            {Array.from({ length: 5 }).map((_, i) => (
              <Star
                key={i}
                size={16}
                fill={
                  i < Math.floor(Number(neighborhood.rating))
                    ? "currentColor"
                    : "none"
                }
                className={
                  i < Math.floor(Number(neighborhood.rating))
                    ? styles.starFilled
                    : styles.starEmpty
                }
              />
            ))}
          </div>
          <span className={styles.ratingText}>
            {Number(neighborhood.rating).toFixed(1)}
          </span>
        </div>
        <div className={styles.priceRow}>
          <span className={styles.priceLabel}>Median Price:</span>
          <span className={styles.priceValue}>
            {formatPrice(neighborhood.priceRangeMin)} -{" "}
            {formatPrice(neighborhood.priceRangeMax)}
          </span>
        </div>
        <div className={styles.tagsRow}>
          {neighborhood.tags.map((tag) => (
            <Badge key={tag} variant="outline" className={styles.tag}>
              {tag}
            </Badge>
          ))}
        </div>
        <p className={styles.description}>{neighborhood.description}</p>
      </div>
    </Link>
  );
}