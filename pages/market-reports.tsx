import React, { useMemo } from "react";
import { Link } from "react-router-dom";
import { TrendingUp, TrendingDown, Home, Calendar, Activity } from "lucide-react";
import { usePageMeta } from "../helpers/usePageMeta";
import { useJsonLd } from "../helpers/useJsonLd";
import { PageBreadcrumbs } from "../components/PageBreadcrumbs";
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer,
  BarChart, Bar,
} from "recharts";
import { useMarketData } from "../helpers/useMarketData";
import { Button } from "../components/Button";
import { Skeleton } from "../components/Skeleton";
import { MarketSummaryTrends } from "../components/MarketSummaryTrends";
import { NeighborhoodBreakdownTable } from "../components/NeighborhoodBreakdownTable";
import { MarketUpdateSignupSection } from "../components/MarketUpdateSignupSection";
import { AboutTheData } from "../components/AboutTheData";
import { PageAuthorBlock } from "../components/PageAuthorBlock";
import { LIVING_IN_CONCORD_SCHEMA, FRANKLIN_BELLAMY_PERSON_SCHEMA } from "../helpers/schemaConstants";
import styles from "./market-reports.module.css";

const MARKET_REPORTS_BREADCRUMBS = [
  { label: "Home", href: "/" },
  { label: "Market Reports" },
];

const MARKET_REPORTS_BREADCRUMBS_JSON_LD = {
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
      "name": "Market Reports",
      "item": "https://livinginconcordnc.com/market-reports"
    }
  ]
};

const MARKET_REPORTS_JSON_LD = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  "name": "Concord NC Market Reports",
  "description": "Stay up to date with Concord NC real estate market reports.",
  "url": "https://livinginconcordnc.com/market-reports"
};

const MARKET_REPORTS_ARTICLE_JSON_LD = {
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": "Concord NC Market Reports | 2026 Housing Data",
  "description": "Latest Concord NC real estate data — median prices, inventory levels, days on market, and neighborhood trends updated monthly.",
  "author": {
    "@id": "https://livinginconcordnc.com/#founder"
  },
  "publisher": {
    "@id": "https://livinginconcordnc.com/#organization"
  },
  "mainEntityOfPage": "https://livinginconcordnc.com/market-reports"
};

const MARKET_REPORTS_DATASET_JSON_LD = {
  "@context": "https://schema.org",
  "@type": "Dataset",
  "name": "Concord NC Real Estate Market Data",
  "description": "Monthly real estate market statistics for Concord NC including median prices, homes sold, days on market, and active listings.",
  "license": "https://livinginconcordnc.com/market-reports",
  "creator": {
    "@id": "https://livinginconcordnc.com/#founder"
  },
  "spatialCoverage": "Concord, NC"
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

export default function MarketReportsPage() {
  const meta = usePageMeta({
    title: "Market Reports & Data | Concord NC Real Estate Market",
    description:
      "View latest Concord NC real estate market reports. Explore median prices, inventory levels, days on market, and neighborhood data updated monthly.",
    canonicalPath: "/market-reports",
    ogImage: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=1200&q=80",
  });
  const jsonLd = useJsonLd([
    LIVING_IN_CONCORD_SCHEMA,
    FRANKLIN_BELLAMY_PERSON_SCHEMA,
    MARKET_REPORTS_JSON_LD,
    MARKET_REPORTS_BREADCRUMBS_JSON_LD,
    MARKET_REPORTS_ARTICLE_JSON_LD,
    MARKET_REPORTS_DATASET_JSON_LD,
    SPRING_2026_REPORT_JSON_LD
  ]);

  const { data, isFetching } = useMarketData();

  const chartData = useMemo(() => {
    if (!data) return [];
    return [...data].reverse().map((item) => {
      const date = new Date(item.year, item.month - 1);
      return {
        ...item,
        monthName: new Intl.DateTimeFormat("en-US", { month: "short", year: "numeric" }).format(date),
        medianPriceNumber: Number(item.medianPrice),
        homesSoldNumber: Number(item.homesSold),
        priceChangeYoyNumber: Number(item.priceChangeYoy),
      };
    });
  }, [data]);

  const latestData = chartData[chartData.length - 1];

  const formatCurrency = (val: number) =>
    new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(val);

  return (
    <div className={styles.page}>
      {meta}
      {jsonLd}
      <PageBreadcrumbs items={MARKET_REPORTS_BREADCRUMBS} />
      {/* 1. HERO */}
      <section className={styles.hero}>
        <div className={styles.heroContainer}>
          <h1 className={styles.heroTitle}>Concord NC Market Reports</h1>
          <p className={styles.heroSubtitle}>
            Stay informed with the latest real estate market trends, pricing data, and inventory insights for Concord and the surrounding areas.
          </p>
        </div>
      </section>

      <section className={styles.content}>
        <div className={styles.container}>
          {/* 1.5 CURRENT MARKET STATUS */}
          <div className={styles.statusSection}>
            <div className={styles.statusCard}>
              <h2 className={styles.statusHeader}>Market Update: June 2026</h2>
              <div className={styles.statusContent}>
                <p>The median sales price for a home in Concord, NC is $360,000 as of May 2026.</p>
                <p>Concord currently has 3.1 months of housing inventory, placing the market in shifting toward buyers territory.</p>
                <p>The average home in Concord spends 43 days on the market before going under contract.</p>
              </div>
            </div>
          </div>

          {/* 2. CURRENT MARKET SNAPSHOT */}
          <div className={styles.sectionHeader}>
            <h2>Current Market Snapshot</h2>
            <p>Data from {latestData ? latestData.monthName : "the latest month"}</p>
          </div>

          {isFetching ? (
            <div className={styles.statsGrid}>
              {Array.from({ length: 4 }).map((_, i) => (
                <Skeleton key={i} className={styles.statSkeleton} />
              ))}
            </div>
          ) : latestData ? (
            <div className={styles.statsGrid}>
              <div className={styles.statCard}>
                <div className={styles.statHeader}>
                  <h3>Median Price</h3>
                  <div className={styles.statIcon}><TrendingUp size={20} /></div>
                </div>
                <div className={styles.statValue}>{formatCurrency(latestData.medianPriceNumber)}</div>
                <div className={styles.statTrend}>
                  {latestData.priceChangeYoyNumber >= 0 ? (
                    <span className={styles.trendUp}><TrendingUp size={16} /> +{latestData.priceChangeYoyNumber}% YoY</span>
                  ) : (
                    <span className={styles.trendDown}><TrendingDown size={16} /> {latestData.priceChangeYoyNumber}% YoY</span>
                  )}
                </div>
              </div>

              <div className={styles.statCard}>
                <div className={styles.statHeader}>
                  <h3>Avg Days on Market</h3>
                  <div className={styles.statIcon}><Calendar size={20} /></div>
                </div>
                <div className={styles.statValue}>{latestData.avgDaysOnMarket} Days</div>
                <div className={styles.statTrend}>Average time to sell</div>
              </div>

              <div className={styles.statCard}>
                <div className={styles.statHeader}>
                  <h3>Homes Sold</h3>
                  <div className={styles.statIcon}><Home size={20} /></div>
                </div>
                <div className={styles.statValue}>{latestData.homesSoldNumber}</div>
                <div className={styles.statTrend}>Closed properties this month</div>
              </div>

              <div className={styles.statCard}>
                <div className={styles.statHeader}>
                  <h3>Active Listings</h3>
                  <div className={styles.statIcon}><Activity size={20} /></div>
                </div>
                <div className={styles.statValue}>{latestData.activeListings}</div>
                <div className={styles.statTrend}>Available inventory</div>
              </div>
            </div>
          ) : null}

          {/* 3. CHARTS */}
          <div className={styles.chartsGrid}>
            <div className={styles.chartContainer}>
              <h3>Median Price Trends (12 Months)</h3>
              {isFetching ? (
                <Skeleton className={styles.chartSkeleton} />
              ) : (
                <div className={styles.chartWrapper}>
                  <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={chartData} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--border)" />
                      <XAxis dataKey="monthName" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: "var(--muted-foreground)" }} dy={10} />
                      <YAxis
                        axisLine={false}
                        tickLine={false}
                        tick={{ fontSize: 12, fill: "var(--muted-foreground)" }}
                        tickFormatter={(value) => `$${value / 1000}k`}
                      />
                      <RechartsTooltip
                        formatter={(value: number) => formatCurrency(value)}
                        contentStyle={{ borderRadius: "8px", border: "none", boxShadow: "var(--shadow-md)" }}
                      />
                      <Line type="monotone" dataKey="medianPriceNumber" stroke="var(--primary)" strokeWidth={3} dot={{ r: 4, fill: "var(--primary)" }} activeDot={{ r: 6 }} />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              )}
            </div>

            <div className={styles.chartContainer}>
              <h3>Homes Sold per Month</h3>
              {isFetching ? (
                <Skeleton className={styles.chartSkeleton} />
              ) : (
                <div className={styles.chartWrapper}>
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={chartData} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--border)" />
                      <XAxis dataKey="monthName" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: "var(--muted-foreground)" }} dy={10} />
                      <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: "var(--muted-foreground)" }} />
                      <RechartsTooltip
                        contentStyle={{ borderRadius: "8px", border: "none", boxShadow: "var(--shadow-md)" }}
                      />
                      <Bar dataKey="homesSoldNumber" fill="var(--secondary)" radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* 4. MARKET SUMMARY TRENDS */}
      <MarketSummaryTrends />

      {/* 5. NEIGHBORHOOD BREAKDOWN TABLE */}
      <NeighborhoodBreakdownTable />

      {/* 6. EMAIL SIGNUP */}
      <MarketUpdateSignupSection />

      {/* 7. CTA */}
      <section className={styles.ctaOuter}>
        <div className={styles.container}>
          <div className={styles.ctaSection}>
            <h2>Want a custom market analysis for your property?</h2>
            <p>Get a detailed, professional evaluation of your home's worth in today's market.</p>
            <Button asChild size="lg">
              <Link to="/contact">Request Home Valuation</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* 8. ABOUT THE DATA */}
      <AboutTheData />

      {/* 9. AUTHOR BLOCK */}
      <div className={styles.authorSection}>
        <PageAuthorBlock showMarketDisclaimer={true} />
      </div>
    </div>
  );
}