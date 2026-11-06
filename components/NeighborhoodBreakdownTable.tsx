import React from "react";
import { Link } from "react-router-dom";
import styles from "./NeighborhoodBreakdownTable.module.css";

type TrendType = "stable" | "growing" | "steady";

interface NeighborhoodRow {
  name: string;
  slug: string;
  priceRange: string;
  trend: string;
  trendType: TrendType;
  dom: number;
  bestFor: string;
}

const NEIGHBORHOODS: NeighborhoodRow[] = [
  { name: "Winding Walk", slug: "winding-walk", priceRange: "$500K–$990K", trend: "↑ Stable", trendType: "stable", dom: 18, bestFor: "Families, Move-Up Buyers" },
  { name: "Moss Creek", slug: "moss-creek", priceRange: "$325K–$700K", trend: "↑ Growing", trendType: "growing", dom: 22, bestFor: "Young Families, First-Time Buyers" },
  { name: "Highland Creek", slug: "highland-creek", priceRange: "$300K–$835K", trend: "→ Steady", trendType: "steady", dom: 15, bestFor: "Luxury, Established Families" },
  { name: "Skybrook", slug: "skybrook", priceRange: "$400K–$1.3M", trend: "↑ Growing", trendType: "growing", dom: 12, bestFor: "Luxury, Golf Community" },
  { name: "Christenbury", slug: "christenbury", priceRange: "$650K–$1.6M", trend: "↑ Stable", trendType: "stable", dom: 20, bestFor: "Families, Schools" },
  { name: "Afton Village", slug: "afton-village", priceRange: "$300K–$680K", trend: "↑ Growing", trendType: "growing", dom: 25, bestFor: "Walkability, Downsizers" },
  { name: "Kellswater Bridge", slug: "kellswater-bridge", priceRange: "$450K–$750K", trend: "→ Steady", trendType: "steady", dom: 14, bestFor: "Luxury, Lake Access" },
  { name: "Bedford Farms", slug: "bedford-farms", priceRange: "$320K–$460K", trend: "↑ Stable", trendType: "stable", dom: 19, bestFor: "Families, New Construction" },
  { name: "Laurel Park", slug: "laurel-park", priceRange: "$400K–$897K", trend: "↑ Growing", trendType: "growing", dom: 23, bestFor: "First-Time Buyers, Value" },
  { name: "Carriage Downs", slug: "carriage-downs", priceRange: "$340K–$500K", trend: "→ Steady", trendType: "steady", dom: 17, bestFor: "Families, Established" },
];

export function NeighborhoodBreakdownTable({ className }: { className?: string }) {
  return (
    <section className={`${styles.section} ${className ?? ""}`}>
      <div className={styles.container}>
        <div className={styles.headerBlock}>
          <h2 className={styles.heading}>Neighborhood Breakdown</h2>
          <p className={styles.subheading}>
            How Concord's top neighborhoods compare in today's market
          </p>
        </div>
        <div className={styles.tableScroll}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th className={styles.th}>Neighborhood</th>
                <th className={styles.th}>Price Range</th>
                <th className={styles.th}>Trend</th>
                <th className={styles.th}>DOM</th>
                <th className={styles.th}>Best For</th>
              </tr>
            </thead>
            <tbody>
              {NEIGHBORHOODS.map((row, i) => (
                <tr key={row.slug} className={i % 2 === 0 ? styles.rowEven : styles.rowOdd}>
                  <td className={styles.td}>
                    <Link to={`/neighborhoods/${row.slug}`} className={styles.neighborhoodLink}>
                      {row.name}
                    </Link>
                  </td>
                  <td className={styles.td}>{row.priceRange}</td>
                  <td className={styles.td}>
                    <span className={`${styles.trendBadge} ${styles[`trend_${row.trendType}`]}`}>
                      {row.trend}
                    </span>
                  </td>
                  <td className={styles.td}>{row.dom} days</td>
                  <td className={styles.td}>{row.bestFor}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}