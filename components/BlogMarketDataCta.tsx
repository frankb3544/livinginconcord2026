import React from "react";
import { Link } from "react-router-dom";
import { TrendingUp } from "lucide-react";
import { Button } from "./Button";
import styles from "./BlogMarketDataCta.module.css";

interface Props {
  className?: string;
}

export function BlogMarketDataCta({ className }: Props) {
  return (
    <div className={`${styles.container} ${className ?? ""}`}>
      <div className={styles.iconWrap}>
        <TrendingUp size={24} />
      </div>
      <h3 className={styles.heading}>Concord Market Trends</h3>
      <p className={styles.description}>
        Stay informed with up-to-date data on median prices, days on market, and year-over-year changes in Concord's housing market.
      </p>
      <Button asChild className={styles.btn}>
        <Link to="/market-reports">View Latest Market Data</Link>
      </Button>
    </div>
  );
}