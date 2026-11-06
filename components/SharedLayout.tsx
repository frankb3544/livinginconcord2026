import { SITE_CONTACT_EMAIL, SITE_CONTACT_EMAIL_MAILTO } from "../helpers/siteContact";
import React, { useState, Suspense } from "react";
import { Link } from "react-router-dom";
import { Home, Menu, X, Instagram, Facebook, Youtube, ChevronDown } from "lucide-react";
import { Button } from "./Button";
import { useSocialLinks } from "../helpers/useSocialLinks";
import { useNeighborhoods } from "../helpers/useNeighborhoods";
import styles from "./SharedLayout.module.css";

const Chatbot = React.lazy(() => import("./Chatbot").then(m => ({ default: m.Chatbot })));

export default function SharedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { socialLinksQuery } = useSocialLinks();
  const { data: neighborhoodsData } = useNeighborhoods();

  const sortedNeighborhoods = neighborhoodsData 
    ? [...neighborhoodsData].sort((a, b) => a.name.localeCompare(b.name))
    : [];

  return (
    <div className={styles.layout}>
      <header className={styles.header}>
        <div className={styles.headerContainer}>
          <Link to="/" className={styles.logo}>
            <img src="/logo.webp" alt="Living In Concord NC" className={styles.logoImg} />
          </Link>

          <nav className={styles.desktopNav}>
            <Link to="/home-search" className={styles.navLink}>
              Home Search
            </Link>
                        <div className={styles.navDropdownWrapper}>
              <Link to="/neighborhoods" className={styles.navLink}>
                Neighborhoods <ChevronDown size={14} className={styles.dropdownIcon} />
              </Link>
                            <div className={styles.navDropdown}>
                <div className={styles.navDropdownContent}>
                  <Link to="/neighborhoods/28027-concord-nc" className={styles.dropdownLink}>28027 Concord NC</Link>
                </div>
              </div>
            </div>
            <div className={styles.navDropdownWrapper}>
              <Link to="/market-reports" className={styles.navLink}>
                Market Reports <ChevronDown size={14} className={styles.dropdownIcon} />
              </Link>
              <div className={styles.navDropdown}>
                <div className={styles.navDropdownContent}>
                                    <Link to="/market-reports/local-trends" className={styles.dropdownLink}>Local Trends & Stats</Link>
                </div>
              </div>
            </div>
            <div className={styles.navDropdownWrapper}>
              <Link to="/moving-to-concord" className={styles.navLink}>
                Moving Guide <ChevronDown size={14} className={styles.dropdownIcon} />
              </Link>
              <div className={styles.navDropdown}>
                <div className={styles.navDropdownContent}>
                  <Link to="/moving-to-concord" className={styles.dropdownLink}>Moving to Concord</Link>
                  <Link to="/moving-to-concord/cabarrus-county" className={styles.dropdownLink}>Cabarrus County Guide</Link>
                  <Link to="/moving-to-concord/schools-guide" className={styles.dropdownLink}>Schools Guide</Link>
                  <Link to="/moving-to-concord/harrisburg" className={styles.dropdownLink}>Moving to Harrisburg</Link>
                  <Link to="/moving-to-concord/kannapolis" className={styles.dropdownLink}>Moving to Kannapolis</Link>
                  <Link to="/moving-to-concord/cost-of-living-concord-nc" className={styles.dropdownLink}>Cost of Living in Concord</Link>
                  <Link to="/moving-to-concord/cox-mill-high-school" className={styles.dropdownLink}>Cox Mill High School Guide</Link>
                  <Link to="/moving-to-concord/is-concord-nc-safe" className={styles.dropdownLink}>Is Concord NC Safe?</Link>
                  <Link to="/moving-to-concord/moving-from-new-york-to-concord-nc" className={styles.dropdownLink}>Moving from NYC to Concord</Link>
                  <Link to="/moving-to-concord/apartment-living" className={styles.dropdownLink}>Apartment Living</Link>
                  <Link to="/moving-to-concord/buyers-faqs" className={styles.dropdownLink}>Buyer FAQs</Link>
                  <Link to="/moving-to-concord/commuting" className={styles.dropdownLink}>Commuting Guide</Link>
                  <Link to="/moving-to-concord/concord-homes" className={styles.dropdownLink}>Concord Homes</Link>
                  <Link to="/moving-to-concord/growing-families" className={styles.dropdownLink}>Growing Families</Link>
                  <Link to="/moving-to-concord/home-financing" className={styles.dropdownLink}>Home Financing</Link>
                  <Link to="/moving-to-concord/multigenerational" className={styles.dropdownLink}>Multigenerational Living</Link>
                  <Link to="/moving-to-concord/pros-and-cons" className={styles.dropdownLink}>Pros & Cons of Concord</Link>
                  <Link to="/moving-to-concord/senior-communities" className={styles.dropdownLink}>Senior Communities</Link>
                </div>
              </div>
            </div>
            <Link to="/blog" className={styles.navLink}>
              Blog
            </Link>
            <Link to="/about" className={styles.navLink}>
              About
            </Link>
            <Link to="/contact" className={styles.navLink}>
              Contact
            </Link>
          </nav>

          <div className={styles.headerActions}>
            <Button asChild className={styles.contactBtn}>
              <Link to="/contact">Contact Franklin</Link>
            </Button>
            <button
              className={styles.mobileMenuBtn}
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {mobileMenuOpen && (
          <nav className={styles.mobileNav}>
            <Link
              to="/home-search"
              className={styles.mobileNavLink}
              onClick={() => setMobileMenuOpen(false)}
            >
              Home Search
            </Link>
                        <div className={styles.mobileNavGroup}>
              <Link
                to="/neighborhoods"
                className={styles.mobileNavLink}
                onClick={() => setMobileMenuOpen(false)}
              >
                Neighborhoods
              </Link>
                            <div className={styles.mobileSubNav}>
                <Link
                  to="/neighborhoods/28027-concord-nc"
                  className={styles.mobileSubNavLink}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  28027 Concord NC
                </Link>
              </div>
            </div>
            <div className={styles.mobileNavGroup}>
              <Link
                to="/market-reports"
                className={styles.mobileNavLink}
                onClick={() => setMobileMenuOpen(false)}
              >
                Market Reports
              </Link>
                            <div className={styles.mobileSubNav}>
                <Link
                  to="/market-reports/local-trends"
                  className={styles.mobileSubNavLink}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Local Trends & Stats
                </Link>
              </div>
            </div>
            <div className={styles.mobileNavGroup}>
              <Link
                to="/moving-to-concord"
                className={styles.mobileNavLink}
                onClick={() => setMobileMenuOpen(false)}
              >
                Moving Guide
              </Link>
              <div className={styles.mobileSubNav}>
                <Link
                  to="/moving-to-concord"
                  className={styles.mobileSubNavLink}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Moving to Concord
                </Link>
                <Link
                  to="/moving-to-concord/cabarrus-county"
                  className={styles.mobileSubNavLink}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Cabarrus County Guide
                </Link>
                <Link
                  to="/moving-to-concord/schools-guide"
                  className={styles.mobileSubNavLink}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Schools Guide
                </Link>
                <Link
                  to="/moving-to-concord/harrisburg"
                  className={styles.mobileSubNavLink}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Moving to Harrisburg
                </Link>
                <Link
                  to="/moving-to-concord/kannapolis"
                  className={styles.mobileSubNavLink}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Moving to Kannapolis
                </Link>
                                                <Link
                  to="/moving-to-concord/cost-of-living-concord-nc"
                  className={styles.mobileSubNavLink}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Cost of Living in Concord
                </Link>
                <Link
                  to="/moving-to-concord/cox-mill-high-school"
                  className={styles.mobileSubNavLink}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Cox Mill High School Guide
                </Link>
                <Link
                  to="/moving-to-concord/is-concord-nc-safe"
                  className={styles.mobileSubNavLink}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Is Concord NC Safe?
                </Link>
                <Link
                  to="/moving-to-concord/moving-from-new-york-to-concord-nc"
                  className={styles.mobileSubNavLink}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Moving from NYC to Concord
                </Link>
                <Link
                  to="/moving-to-concord/apartment-living"
                  className={styles.mobileSubNavLink}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Apartment Living
                </Link>
                <Link
                  to="/moving-to-concord/buyers-faqs"
                  className={styles.mobileSubNavLink}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Buyer FAQs
                </Link>
                <Link
                  to="/moving-to-concord/commuting"
                  className={styles.mobileSubNavLink}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Commuting Guide
                </Link>
                <Link
                  to="/moving-to-concord/concord-homes"
                  className={styles.mobileSubNavLink}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Concord Homes
                </Link>
                <Link
                  to="/moving-to-concord/growing-families"
                  className={styles.mobileSubNavLink}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Growing Families
                </Link>
                <Link
                  to="/moving-to-concord/home-financing"
                  className={styles.mobileSubNavLink}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Home Financing
                </Link>
                <Link
                  to="/moving-to-concord/multigenerational"
                  className={styles.mobileSubNavLink}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Multigenerational Living
                </Link>
                <Link
                  to="/moving-to-concord/pros-and-cons"
                  className={styles.mobileSubNavLink}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Pros & Cons of Concord
                </Link>
                <Link
                  to="/moving-to-concord/senior-communities"
                  className={styles.mobileSubNavLink}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Senior Communities
                </Link>
              </div>
            </div>
            <Link
              to="/blog"
              className={styles.mobileNavLink}
              onClick={() => setMobileMenuOpen(false)}
            >
              Blog
            </Link>
            <Link
              to="/about"
              className={styles.mobileNavLink}
              onClick={() => setMobileMenuOpen(false)}
            >
              About
            </Link>
            <Link
              to="/contact"
              className={styles.mobileNavLink}
              onClick={() => setMobileMenuOpen(false)}
            >
              Contact
            </Link>
          </nav>
        )}
      </header>

      <main className={styles.main}>{children}</main>

      <footer className={styles.footer}>
        <div className={styles.footerContainer}>
          <div className={styles.footerGrid}>
            <div className={styles.footerCol}>
              <div className={styles.footerLogo}>
                <span className={styles.footerLogoChip}>
                  <img src="/logo.webp" alt="Living In Concord NC" className={styles.footerLogoImg} />
                </span>
              </div>
              <p className={styles.footerDesc}>
                Your complete guide to living in Concord, North Carolina. Expert
                real estate guidance from Franklin Bellamy.
              </p>
            </div>
            <div className={styles.footerCol}>
              <h3 className={styles.footerHeading}>Explore</h3>
              <ul className={styles.footerList}>
                <li>
                  <Link to="/">Home</Link>
                </li>
                <li>
                  <Link to="/neighborhoods">Neighborhoods</Link>
                </li>
                <li>
                  <Link to="/market-reports">Market Reports</Link>
                </li>
                <li>
                  <Link to="/moving-to-concord">Moving Guide</Link>
                </li>
                <li>
                  <Link to="/blog">Blog</Link>
                </li>
                <li>
                  <Link to="/about">About</Link>
                </li>
              </ul>
            </div>
            <div className={styles.footerCol}>
              <h3 className={styles.footerHeading}>Neighborhoods</h3>
              <ul className={styles.footerList}>
                {sortedNeighborhoods.map((neighborhood) => (
                  <li key={neighborhood.id}>
                    <Link to={`/neighborhoods/${neighborhood.slug}`}>{neighborhood.name}</Link>
                  </li>
                ))}
              </ul>
            </div>
            <div className={styles.footerCol}>
              <h3 className={styles.footerHeading}>Moving Services</h3>
              <ul className={styles.footerList}>
                <li>
                  <Link to="/blog">Blog</Link>
                </li>
                <li>
                  <Link to="/contact">Schedule Consultation</Link>
                </li>
                <li>
                  <Link to="/relocation-help">Relocation Help</Link>
                </li>
                <li>
                  <Link to="/home-search">Home Search</Link>
                </li>
                <li>
                  <Link to="/cash-offers">Cash Offers</Link>
                </li>
                <li>
                  <Link to="/seller-resources">Seller Resources</Link>
                </li>
                <li>
                  <Link to="/contact">Contact Franklin</Link>
                </li>
              </ul>
            </div>
            <div className={styles.footerCol}>
              <h3 className={styles.footerHeading}>Connect</h3>
              <ul className={styles.footerList}>
                <li>(704) 904-5142</li>
                <li>{SITE_CONTACT_EMAIL}</li>
                <li>Lifestyle International Realty / Unlocking Real Estate</li>
                <li>Concord, NC 28027</li>
                {socialLinksQuery.data?.instagram && (
                  <li>
                    <a href={socialLinksQuery.data.instagram} target="_blank" rel="noopener noreferrer" className={styles.socialLink}>
                      <Instagram size={16} /> Instagram
                    </a>
                  </li>
                )}
                {socialLinksQuery.data?.facebook && (
                  <li>
                    <a href={socialLinksQuery.data.facebook} target="_blank" rel="noopener noreferrer" className={styles.socialLink}>
                      <Facebook size={16} /> Facebook
                    </a>
                  </li>
                )}
                {socialLinksQuery.data?.tiktok && (
                  <li>
                    <a href={socialLinksQuery.data.tiktok} target="_blank" rel="noopener noreferrer" className={styles.socialLink}>
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5" />
                      </svg>
                      TikTok
                    </a>
                  </li>
                )}
                {socialLinksQuery.data?.youtube && (
                  <li>
                    <a href={socialLinksQuery.data.youtube} target="_blank" rel="noopener noreferrer" className={styles.socialLink}>
                      <Youtube size={16} /> YouTube
                    </a>
                  </li>
                )}
              </ul>
            </div>
          </div>
          <div className={styles.footerBottom}>
            <p>
              &copy; {new Date().getFullYear()} Living in Concord NC. All rights
              reserved.
            </p>
            <div className={styles.footerLegal}>
                            <Link to="/privacy-policy">Privacy Policy</Link>
              <Link to="/terms-of-service">Terms</Link>
            </div>
          </div>
        </div>
      </footer>
      <Suspense fallback={null}>
        <Chatbot />
      </Suspense>
    </div>
  );
}