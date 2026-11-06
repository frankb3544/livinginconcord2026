import React from "react";
import { TrendingUp, Users } from "lucide-react";
import styles from "./MarketSummaryTrends.module.css";

const TRENDS = [
  {
    icon: <TrendingUp size={22} />,
    title: "Price Stabilization",
    badge: "Stable",
    badgeVariant: "stable" as const,
    description:
      "After months of rapid appreciation, Concord's median home prices are showing signs of stabilization. Year-over-year growth has moderated to sustainable levels, signaling a healthier market for both buyers and sellers.",
  },
  {
    icon: <Users size={22} />,
    title: "Buyer Leverage Increasing",
    badge: null,
    badgeVariant: "buyer" as const,
    description:
      "Buyers are gaining more negotiating power as inventory slowly improves. Properties are spending more days on market, giving purchasers time for due diligence and price negotiations that weren't possible 12 months ago.",
  },
  {
    icon: <TrendingUp size={22} />,
    title: "1-Bedroom Surge +20.7% YoY",
    badge: "Hot",
    badgeVariant: "hot" as const,
    description:
      "One-bedroom homes and condos are seeing the strongest year-over-year price gains at +20.7%, driven by first-time buyers, investors, and downsizers capitalizing on Concord's growing urban amenities.",
  },
] as const;

export function MarketSummaryTrends({ className }: { className?: string }) {
  return (
    <section className={`${styles.section} ${className ?? ""}`}>
      <div className={styles.container}>
        <h2 className={styles.heading}>Market Summary Trends</h2>
        <div className={styles.grid}>
          {TRENDS.map((trend) => (
            <div
              key={trend.title}
              className={`${styles.card} ${styles[`card_${trend.badgeVariant}`]}`}
            >
              <div className={styles.cardTop}>
                <div className={`${styles.iconWrap} ${styles[`icon_${trend.badgeVariant}`]}`}>
                  {trend.icon}
                </div>
                {trend.badge && (
                  <span className={`${styles.badge} ${styles[`badge_${trend.badgeVariant}`]}`}>
                    {trend.badge}
                  </span>
                )}
              </div>
              <h3 className={styles.cardTitle}>{trend.title}</h3>
              <p className={styles.cardDesc}>{trend.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}