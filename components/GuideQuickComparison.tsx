import React from "react";
import { Check } from "lucide-react";
import styles from "./GuideQuickComparison.module.css";

const COMPARISON_DATA = [
  {
    metric: "Property Tax Rate",
    concord: "~$0.43 per $100",
    charlotte: "~$0.73 per $100",
  },
  {
    metric: "Average Commute",
    concord: "25 min to Uptown",
    charlotte: "28 min average",
  },
  {
    metric: "Median Home Price",
    concord: "$360,000",
    charlotte: "$430,000",
  },
];

export function GuideQuickComparison() {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <h2 className={styles.title}>Concord vs. Charlotte Quick Comparison</h2>
        
        <div className={styles.card}>
          <div className={styles.tableWrapper}>
            <table className={styles.table}>
              <thead>
                <tr>
                  <th className={styles.thMetric}>Metric</th>
                  <th className={styles.thConcord}>Concord</th>
                  <th className={styles.th}>Charlotte</th>
                </tr>
              </thead>
              <tbody>
                {COMPARISON_DATA.map((row, index) => (
                  <tr key={index} className={styles.tr}>
                    <td className={styles.tdMetric}>{row.metric}</td>
                    <td className={styles.tdConcord}>
                      <span className={styles.concordValue}>
                        {row.concord}
                        <Check size={16} className={styles.checkIcon} />
                      </span>
                    </td>
                    <td className={styles.td}>{row.charlotte}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className={styles.tldrWrapper}>
          <span className={styles.tldrLabel}></span>
          <p className={styles.tldrText}>
            Concord, NC offers families and professionals a lower cost of living, top-rated Cabarrus County schools, and a 25-minute commute to Charlotte. With a $360,000 median home price and property tax rates 40% lower than Charlotte, Concord is the smartest relocation choice in the Charlotte metro for 2026.
          </p>
        </div>
      </div>
    </section>
  );
}