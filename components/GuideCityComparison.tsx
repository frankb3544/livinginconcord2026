import React from "react";
import { Check } from "lucide-react";
import styles from "./GuideCityComparison.module.css";

const COMPARISON_DATA = [
  {
    metric: "Median Home Price",
    nyc: "$850K",
    dc: "$650K",
    la: "$950K",
    concord: "$390K",
  },
  {
    metric: "Property Tax Rate",
    nyc: "0.88%",
    dc: "0.61%",
    la: "0.70%",
    concord: "1.22%†",
  },
    {
    metric: "Sales Tax",
    nyc: "8.875%",
    dc: "6.0%",
    la: "9.75%",
    concord: "7.0%",
  },
  {
    metric: "State Income Tax",
    nyc: "10.9%",
    dc: "10.75%",
    la: "13.3%",
    concord: "3.99%",
  },
  {
    metric: "Average Commute",
    nyc: "41 min",
    dc: "41 min",
    la: "31 min",
    concord: "27 min",
  },
  {
    metric: "Cost of Living Index",
    nyc: "187",
    dc: "152",
    la: "166",
    concord: "96",
  },
];

export function GuideCityComparison() {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <h2 className={styles.title}>
          Why People Are Leaving NYC, DC, and LA for Concord NC
        </h2>

        <div className={styles.card}>
          <div className={styles.tableWrapper}>
            <table className={styles.table}>
              <thead>
                <tr>
                  <th className={styles.thMetric}>Metric</th>
                  <th className={styles.th}>NYC</th>
                  <th className={styles.th}>DC</th>
                  <th className={styles.th}>LA</th>
                  <th className={styles.thConcord}>Concord</th>
                </tr>
              </thead>
              <tbody>
                {COMPARISON_DATA.map((row, index) => (
                  <tr key={index} className={styles.tr}>
                    <td className={styles.tdMetric}>{row.metric}</td>
                    <td className={styles.td}>{row.nyc}</td>
                    <td className={styles.td}>{row.dc}</td>
                    <td className={styles.td}>{row.la}</td>
                    <td className={styles.tdConcord}>
                      <span className={styles.concordValue}>
                        {row.concord}
                        <Check size={16} className={styles.checkIcon} />
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className={styles.sources}>
            <p>
              † While Concord's property tax rate is higher, the significantly lower home prices mean you pay ~$4,758/yr vs ~$7,480 in NYC.
            </p>
            <p>
              Sources: Zillow & Redfin (Q1 2026), Tax Foundation (2026), U.S. Census Bureau ACS (2020–2024), BestPlaces Cost of Living Index, state & local tax authorities. Data as of Q1 2026.
            </p>
          </div>
        </div>

        <div className={styles.callout}>
          <p className={styles.calloutText}>
            At Concord's median price, your monthly mortgage payment is roughly{" "}
            <strong>~$2,050</strong>. The same payment in NYC buys you almost
            nothing.
          </p>
        </div>
      </div>
    </section>
  );
}