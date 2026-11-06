import { SITE_CONTACT_EMAIL, SITE_CONTACT_EMAIL_MAILTO } from "../helpers/siteContact";
import React from "react";
import { Link } from "react-router-dom";
import { CheckCircle } from "lucide-react";
import { Button } from "./Button";
import styles from "./HomeAbout.module.css";

export function HomeAbout() {
  return (
    <section className={styles.aboutSection}>
      <div className={styles.container}>
        <div className={styles.aboutGrid}>
          <div className={styles.aboutImageContainer}>
            <img
              src="https://assets.floot.app/017b3652-9495-4591-835a-c77af11e3c4b/f8be1fd2-e1d3-4a44-b1b4-180567e62b3a.png"
              alt="Franklin Bellamy, NC Licensed Real Estate Broker and Relocation Specialist serving Concord NC and Cabarrus County"
              className={styles.aboutImage}
              loading="lazy"
              width={600}
              height={450}
              decoding="async"
            />
          </div>
          <div className={styles.aboutContent}>
            <h2 className={styles.sectionTitle}>
              Meet Your Concord NC Expert
            </h2>
            <Link to="/about" className={styles.aboutNameLink}>
              Franklin Bellamy
            </Link>
            <div className={styles.aboutRole}>
              NC Licensed Real Estate Broker | Relocation Specialist
            </div>
            <p className={styles.aboutBio}>
              I'm Franklin Bellamy, and I've spent the last 15+ years helping families find their perfect home in Concord NC and throughout Cabarrus County. What started as a passion for this community turned into a career built on trust, local expertise, and genuine care for every client I work with. With over 100 families helped and a 4.9-star rating, my approach is simple — I listen first, then I guide you to the right home in the right neighborhood. Whether you're relocating from out of state, upgrading for a growing family, or buying your first home in the Charlotte Metro Area, I treat every move like it matters — because it does. I'm not just your agent; I'm your neighbor and your resource long after closing day. Let's talk about your goals — call or text me at (704) 904-5142.
            </p>

            <div className={styles.aboutStats}>
              <div className={styles.aboutStat}>
                <div className={styles.aboutStatVal}>100+</div>
                <div className={styles.aboutStatLabel}>Families Helped</div>
              </div>
              <div className={styles.aboutStat}>
                <div className={styles.aboutStatVal}>4.9★</div>
                <div className={styles.aboutStatLabel}>Rating</div>
              </div>
              <div className={styles.aboutStat}>
                <div className={styles.aboutStatVal}>15+</div>
                <div className={styles.aboutStatLabel}>Years Experience</div>
              </div>
            </div>

            <div className={styles.aboutContact}>
              <div className={styles.aboutContactItem}>
                <span>📞 (704) 904-5142</span>
              </div>
              <div className={styles.aboutContactItem}>
                <span>✉️ {SITE_CONTACT_EMAIL}</span>
              </div>
            </div>

            <Button asChild className={styles.scheduleBtn}>
              <Link to="/contact">Schedule a Meeting</Link>
            </Button>

            <div className={styles.whyChooseList}>
              <h4>Why Choose Franklin</h4>
              <ul>
                <li>
                  <CheckCircle size={18} className={styles.checkIcon} />{" "}
                  NC Licensed Broker & Relocation Specialist
                </li>
                <li>
                  <CheckCircle size={18} className={styles.checkIcon} />{" "}
                  Deep knowledge of every Concord neighborhood
                </li>
                <li>
                  <CheckCircle size={18} className={styles.checkIcon} />{" "}
                  100+ families helped with a 4.9★ rating
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}