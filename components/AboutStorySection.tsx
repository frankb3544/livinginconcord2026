import React from "react";
import { Link } from "react-router-dom";
import { MapPin } from "lucide-react";
import styles from "./AboutStorySection.module.css";

const NEIGHBORHOODS: { name: string; slug: string }[] = [
  { name: "Winding Walk", slug: "winding-walk" },
  { name: "Moss Creek", slug: "moss-creek" },
  { name: "Highland Creek", slug: "highland-creek" },
  { name: "Skybrook", slug: "skybrook" },
  { name: "Christenbury", slug: "christenbury" },
  { name: "Afton Village", slug: "afton-village" },
  { name: "Kellswater Bridge", slug: "kellswater-bridge" },
  { name: "Bedford Farms", slug: "bedford-farms" },
  { name: "Laurel Park", slug: "laurel-park" },
  { name: "Carriage Downs", slug: "carriage-downs" },
  { name: "All Concord", slug: "ALL_CONCORD" },
  { name: "All Charlotte Metro Area", slug: "" },
];

export function AboutStorySection({ className }: { className?: string }) {
  return (
    <section className={`${styles.section} ${className || ""}`}>
      <div className={styles.container}>
        <h2 className={styles.heading}>My Story</h2>

        <h3 className={styles.storySubheading}>15+ Years of Local Real Estate Experience</h3>

        <div className={styles.prose}>
          <p>
            I came to Concord NC in 2007 and knew almost immediately this was
            where I wanted to build my life. The tree-lined streets, the friendly
            neighbors, the energy of a city that was growing but hadn't lost its
            character — it all clicked. I got into real estate because I wanted
            to help other people experience that same feeling. Over the past 15+
            years, I've built a career on knowing this market inside and out, and
            I take real pride in the relationships I've built along the way.
          </p>
          <p>
            My specialty is relocation. I know what it's like to move to a new
            city and feel overwhelmed by choices — which neighborhood fits your
            lifestyle, which schools match your kids' needs, where the best
            commute routes are. I've helped over 100 families navigate that
            process, many of them moving from out of state. My approach is
            simple: I listen to what matters to you, give you honest answers, and
            make sure you feel confident every step of the way. I'm not here to
            sell you a house — I'm here to help you find a home.
          </p>
          <p>
            I've lived in Concord since 2007, and I've watched this city grow
            from a quiet suburb into one of the most sought-after communities in
            the Charlotte Metro Area. I've explored every corner of Cabarrus
            County — from the trails at Frank Liske Park to Friday nights at the
            Concord Mills area, from neighborhood cookouts in Christenbury to
            morning coffee at local spots downtown. This city is home, and I
            love helping other families make it theirs too.
          </p>
        </div>

        <h3 className={styles.storySubheading}>NC Licensed Real Estate Broker</h3>

        <div className={styles.neighborhoodsBlock}>
          <h3 className={styles.subheading}>Neighborhoods I Serve</h3>
          <div className={styles.neighborhoodGrid}>
            {NEIGHBORHOODS.map((n) => {
              if (!n.slug) {
                return (
                  <span key={n.name} className={styles.neighborhoodPillSpan}>
                    <MapPin size={14} className={styles.pillIcon} />
                    {n.name}
                  </span>
                );
              }
              return (
                <Link
                  key={n.name}
                  to={n.slug === "ALL_CONCORD" ? "/neighborhoods" : `/neighborhoods/${n.slug}`}
                  className={styles.neighborhoodPill}
                >
                  <MapPin size={14} className={styles.pillIcon} />
                  {n.name}
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}