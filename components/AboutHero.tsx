import React from "react";
import { Link } from "react-router-dom";
import { Button } from "./Button";
import { useAgentProfile } from "../helpers/useAgentProfile";
import styles from "./AboutHero.module.css";

export function AboutHero({ className }: { className?: string }) {
  const { agentProfileQuery } = useAgentProfile();

  const handleViewListings = () => {
    window.open("https://unlockingre.com", "_blank", "noopener,noreferrer");
  };

  return (
    <section className={`${styles.hero} ${className || ""}`}>
      <div className={styles.heroInner}>
        <div className={styles.photoCol}>
          <div className={styles.photoWrapper}>
            <img
              src={agentProfileQuery.data?.imageUrl || "https://assets.floot.app/017b3652-9495-4591-835a-c77af11e3c4b/f8be1fd2-e1d3-4a44-b1b4-180567e62b3a.png"}
              alt={`${agentProfileQuery.data?.name || "Franklin Bellamy"}, Concord NC Real Estate Expert`}
              className={styles.photo}
              fetchPriority="high"
              width={340}
              height={430}
              decoding="async"
            />
          </div>
        </div>

        <div className={styles.contentCol}>
          <h1 className={styles.headline}>
            Meet Franklin Bellamy — Concord NC Real Estate Expert
          </h1>
          <p className={styles.subtitle}>
            NC Licensed Real Estate Broker | Relocation Specialist | MLS Member |
            NAR Member — Helping families buy, sell, and relocate in Concord NC
            with expert local knowledge and a client-first approach.
          </p>
          <div className={styles.actions}>
            <Button asChild size="lg" className={styles.primaryBtn}>
              <Link to="/contact">Book a Free Consultation</Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className={styles.outlineBtn}
              onClick={handleViewListings}
            >
              View Listings at UnlockingRE.com
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}