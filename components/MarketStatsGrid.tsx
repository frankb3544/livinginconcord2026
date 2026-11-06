import React from "react";
import { Area, AreaChart, Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts";
import { ChartContainer, ChartTooltip, ChartTooltipContent, ChartLegend, ChartLegendContent } from "./Chart";
import { Link } from "react-router-dom";
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "./Accordion";
import { Button } from "./Button";
import { LOCAL_TRENDS_FAQS } from "../helpers/localTrendsFaqs";
import styles from "./MarketStatsGrid.module.css";

const STATS = [
  {
    label: "Median sale price",
    value: "$360,000",
    change: "0.0% vs May 2025",
    changeType: "neutral",
  },
  {
    label: "Average sale price",
    value: "$439,299",
    change: "↓ 6.5% vs May 2025",
    changeType: "down",
  },
  {
    label: "Days on market",
    value: "43 days",
    change: "↑ 7.1% vs May 2025",
    changeType: "up",
  },
  {
    label: "List-to-sale ratio",
    value: "96.1%",
    change: "↑ 1.0% vs May 2025",
    changeType: "up",
  },
  {
    label: "Active inventory",
    value: "338 homes",
    change: "↑ 10.8% vs May 2025",
    changeType: "up",
  },
  {
    label: "Months supply",
    value: "3.1 mo",
    change: "↑ 8.3% vs May 2025",
    changeType: "up",
  },
] as const;

const medianPriceData = [
  { name: "Apr'24", value: 400000 },
  { name: "May", value: 405000 },
  { name: "Jun", value: 415000 },
  { name: "Jul", value: 450000 },
  { name: "Aug", value: 445000 },
  { name: "Sep", value: 420000 },
  { name: "Oct", value: 395000 },
  { name: "Nov", value: 380000 },
  { name: "Dec", value: 360000 },
  { name: "Jan'25", value: 355000 },
  { name: "Feb", value: 365000 },
  { name: "Mar", value: 370000 },
  { name: "Apr", value: 395000 },
  { name: "May", value: 420000 },
  { name: "Jun", value: 430000 },
  { name: "Jul", value: 445000 },
  { name: "Aug", value: 435000 },
  { name: "Sep", value: 415000 },
  { name: "Oct", value: 395000 },
  { name: "Nov", value: 375000 },
  { name: "Dec", value: 360000 },
  { name: "Jan'26", value: 368500 },
  { name: "Feb", value: 385000 },
  { name: "Mar", value: 370000 }
];

const comparisonData = [
  { name: "New listings", mar2025: 218, mar2026: 205 },
  { name: "Closed sales", mar2025: 122, mar2026: 111 },
  { name: "Months supply", mar2025: 2.4, mar2026: 3.1 }
];

const neighborhoodData = [
  { name: "Christenbury", min: 650, range: 950 },
  { name: "Skybrook", min: 400, range: 900 },
  { name: "Winding Walk", min: 500, range: 490 },
  { name: "Laurel Park", min: 400, range: 497 },
  { name: "Highland Creek", min: 300, range: 535 },
  { name: "Moss Creek", min: 325, range: 375 },
  { name: "Afton Village", min: 300, range: 380 },
];

const areaConfig = {
  value: {
    label: "Median Price",
    color: "#185FA5",
  },
};

const barConfig = {
  mar2025: {
    label: "May 2025",
    color: "rgba(24,95,165,0.2)",
  },
  mar2026: {
    label: "May 2026",
    color: "#185FA5",
  },
};

const neighborhoodConfig = {
  range: {
    label: "Price Range",
    color: "#185FA5",
  },
};

const CustomYAxisTick = (props: any) => {
  const { x, y, payload } = props;
  const slugMap: Record<string, string> = {
    "Christenbury": "christenbury",
    "Skybrook": "skybrook",
    "Winding Walk": "winding-walk",
    "Laurel Park": "laurel-park",
    "Highland Creek": "highland-creek",
    "Moss Creek": "moss-creek",
    "Afton Village": "afton-village"
  };
  const slug = slugMap[payload.value];

  if (slug) {
    return (
      <g transform={`translate(${x},${y})`}>
        <Link to={`/neighborhoods/${slug}`} className={styles.tickLink}>
          <text x={0} y={0} dy={4} textAnchor="end" fill="currentColor" fontSize={12} className={styles.tickText}>
            {payload.value}
          </text>
        </Link>
      </g>
    );
  }

  return (
    <g transform={`translate(${x},${y})`}>
      <text x={0} y={0} dy={4} textAnchor="end" fill="var(--muted-foreground)" fontSize={12}>
        {payload.value}
      </text>
    </g>
  );
};

const NeighborhoodTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    return (
      <div className={styles.customTooltip}>
        <div className={styles.tooltipTitle}>{label} · Concord NC</div>
              <div className={styles.tooltipContent}>
          {data.min >= 1000 ? `${(data.min / 1000).toFixed(1)}M` : `${data.min}K`} – {(data.min + data.range) >= 1000 ? `${((data.min + data.range) / 1000).toFixed(1)}M` : `${data.min + data.range}K`} (est. · Franklin Bellamy, May 2026)
        </div>
      </div>
    );
  }
  return null;
};

export function MarketStatsGrid({ className }: { className?: string }) {
  return (
    <div className={`${styles.container} ${className ?? ""}`}>
      <div className={styles.grid}>
        {STATS.map((stat) => (
          <div key={stat.label} className={styles.card}>
            <div className={styles.cardLabel}>{stat.label}</div>
            <div className={styles.cardValue}>{stat.value}</div>
            <div className={styles.cardSubtext}>
              <span className={`${styles.change} ${styles[`change_${stat.changeType}`]}`}>
                {stat.change}
              </span>
              {" · Canopy MLS"}
            </div>
          </div>
        ))}
      </div>

      <div className={styles.chartsContainer}>
        <div className={styles.chartCard}>
          <div>
            <h3 className={styles.chartTitle}>Median sold price — 12-month trend</h3>
            <p className={styles.chartSubtitle}>Concord NC · Single family · Source: RPR Realtors Property Resource, June 2026</p>
          </div>
          
          <div className={styles.chartWrapper}>
            <ChartContainer config={areaConfig}>
              <AreaChart data={medianPriceData}>
                <CartesianGrid vertical={false} strokeDasharray="3 3" />
                <XAxis dataKey="name" minTickGap={30} />
                <YAxis 
                  domain={[320000, 'auto']} 
                  tickFormatter={(value) => `$${value / 1000}k`}
                  width={60}
                />
                <ChartTooltip content={<ChartTooltipContent indicator="line" />} />
                <Area
                  type="monotone"
                  dataKey="value"
                  stroke="#185FA5"
                  fill="rgba(24,95,165,0.07)"
                  strokeWidth={2}
                />
              </AreaChart>
            </ChartContainer>
          </div>
        </div>

        <div className={styles.chartCard}>
          <div>
            <h3 className={styles.chartTitle}>March 2025 vs May 2026 — key metrics</h3>
            <p className={styles.chartSubtitle}>All residential · Source: Canopy MLS Local Market Update, April 5, 2026</p>
          </div>
          
          <div className={styles.chartWrapper}>
            <ChartContainer config={barConfig}>
              <BarChart data={comparisonData}>
                <CartesianGrid vertical={false} strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis width={40} />
                <ChartTooltip content={<ChartTooltipContent />} />
                <ChartLegend content={<ChartLegendContent />} verticalAlign="top" />
                <Bar dataKey="mar2025" fill="rgba(24,95,165,0.2)" radius={[3, 3, 0, 0]} />
                <Bar dataKey="mar2026" fill="#185FA5" radius={[3, 3, 0, 0]} />
              </BarChart>
            </ChartContainer>
          </div>
        </div>
      </div>

      {/* 1. Neighborhood price ranges */}
      <div className={styles.chartCardFullWidth}>
        <div>
          <h3 className={styles.chartTitle}>Neighborhood price ranges — Concord NC</h3>
          <p className={styles.chartSubtitle}>May 2026 · Source: Franklin Bellamy, NC Licensed Broker — verified market experience</p>
        </div>
                <div className={`${styles.chartWrapper} ${styles.neighborhoodChartWrapper}`}>
          <ChartContainer config={neighborhoodConfig}>
            <BarChart data={neighborhoodData} layout="vertical" margin={{ top: 10, right: 20, bottom: 0, left: 20 }}>
              <CartesianGrid horizontal={false} strokeDasharray="3 3" />
              <XAxis type="number" tickFormatter={(v) => v >= 1000 ? `${(v / 1000).toFixed(1)}M` : `${v}K`} domain={[0, 1700]} />
              <YAxis type="category" dataKey="name" width={100} tick={<CustomYAxisTick />} />
              <ChartTooltip content={<NeighborhoodTooltip />} cursor={{ fill: 'rgba(0,0,0,0.05)' }} />
              <Bar dataKey="min" stackId="a" fill="rgba(24,95,165,0.18)" radius={[0, 0, 0, 0]} />
              <Bar dataKey="range" stackId="a" fill="#185FA5" radius={[0, 4, 4, 0]} />
            </BarChart>
          </ChartContainer>
        </div>
        <p className={styles.sectionDisclaimer}>
          Price ranges reflect Franklin Bellamy's verified knowledge of active and recent sales in each neighborhood as of May 2026. These are estimates only, not formal appraisals. Individual home values vary based on size, condition, lot, and upgrades. Verify current pricing with a licensed broker before making any real estate decision. Always confirm with Franklin before publishing updated ranges.
        </p>
      </div>

      {/* 2. Market conditions gauge */}
      <div className={styles.chartCardFullWidth}>
        <div>
          <h3 className={styles.chartTitle}>Market conditions — Concord NC</h3>
          <p className={styles.chartSubtitle}>3.1 months supply · Source: Canopy MLS, May 2026</p>
        </div>
        <div className={styles.gaugeContainer}>
          <div className={styles.gaugeTrack}>
            <div className={styles.gaugeIndicator} style={{ left: '43%' }} />
          </div>
          <div className={styles.gaugeLabels}>
            <span className={styles.gaugeLabelLeft}>Buyer's (5+ mo)</span>
            <span className={styles.gaugeLabelCenter}>Balanced (3–4 mo)</span>
            <span className={styles.gaugeLabelRight}>Seller's (&lt;3 mo)</span>
          </div>
        </div>
                <p className={styles.gaugeDescription}>
          At 3.1 months of supply, Concord sits in shifting toward buyers territory as of May 2026. Inventory is up 8.3% year over year, giving buyers slightly more options than in 2025 — but well-priced homes in the Cox Mill school zone still move quickly. Source: Canopy MLS, May 2026.
        </p>
        <p className={styles.sectionDisclaimer}>
          Market condition thresholds are general real estate guidelines. Actual conditions vary by neighborhood, price point, and property type. Consult a licensed broker for guidance specific to your situation.
        </p>

        <div className={styles.tipsSection}>
          <div className={styles.tipsColumn}>
            <h4 className={styles.tipsTitle}>What this means for buyers</h4>
            <ul className={styles.tipsList}>
              <li>With 3.1 months of supply, you have slightly more choices than last year, but well-priced homes still sell fast.</li>
              <li>List-to-sale ratio is 96.1%, meaning there is some room for negotiation on homes sitting longer than the 60-day average.</li>
              <li>Interest rates are fluctuating—lock in your rate and get pre-approved before touring.</li>
            </ul>
            <Link to="/contact" className={styles.tipsLink}>Get buyer representation →</Link>
          </div>
          <div className={styles.tipsColumn}>
            <h4 className={styles.tipsTitle}>What this means for sellers</h4>
            <ul className={styles.tipsList}>
              <li>Pricing accurately is critical. Overpriced homes are sitting on the market longer (43 days average).</li>
              <li>Inventory is up 10.8%, meaning more competition in your neighborhood.</li>
              <li>Homes in top condition still command near-asking price (96.1% average). Focus on curb appeal and minor repairs.</li>
            </ul>
            <Link to="/contact" className={styles.tipsLink}>Get a free home valuation →</Link>
          </div>
        </div>
      </div>

      {/* 3. FAQ Accordion */}
      <div className={styles.chartCardFullWidth}>
        <div>
          <h3 className={styles.chartTitle}>Questions buyers and sellers are asking</h3>
        </div>
        <div className={styles.faqWrapper}>
          <Accordion type="single" collapsible>
            {LOCAL_TRENDS_FAQS.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`}>
                <AccordionTrigger>{faq.question}</AccordionTrigger>
                <AccordionContent>{faq.answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>

      
    </div>
  );
}