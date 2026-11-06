import React, { useState } from "react";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import { Download, ArrowRight, Home, TrendingUp, Map, BookOpen } from "lucide-react";
import { PageAuthorBlock } from "../components/PageAuthorBlock";
import { PdfFlipbook } from "../components/PdfFlipbook";
import { Button } from "../components/Button";
import { Spinner } from "../components/Spinner";
import styles from "./resources-concord.module.css";

const PDF_URL = "/_cdn/static/Living_in_Concord_Guide_2026_Relocation.pdf";

export default function ResourcesConcordPage() {
  const [isDownloading, setIsDownloading] = useState(false);

  const handleDownload = async () => {
    if (isDownloading) return;
    setIsDownloading(true);
    try {
      const response = await fetch(PDF_URL);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = "Living_in_Concord_Guide.pdf";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Failed to download PDF", error);
      window.open(PDF_URL, "_blank"); // Fallback
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    <div className={styles.page}>
      <Helmet>
        <title>Resources | Living in Concord NC</title>
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>

      {/* Hero Section */}
      <section className={styles.hero}>
        <div className={styles.heroContainer}>
          <h1 className={styles.heroTitle}>
            Thank You — Your Concord NC Resources Are Ready
          </h1>
          <p className={styles.heroSubtitle}>
            Franklin personally reviews every inquiry and will be in touch within 1-2 hours during working hours. In the meantime, you can read or download your exclusive relocation guide below.
          </p>
        </div>
      </section>

      {/* Viewer Section */}
      <section className={styles.viewerSection}>
        <div className={styles.viewerContainer}>
          <div className={styles.viewerHeader}>
            <h2 className={styles.viewerTitle}>Living in Concord: The Ultimate Guide</h2>
            <Button 
              variant="outline" 
              className={styles.desktopDownloadBtn}
              onClick={handleDownload}
              disabled={isDownloading}
            >
              {isDownloading ? <Spinner size="sm" /> : <Download size={18} />} 
              {isDownloading ? "Downloading..." : "Direct Download"}
            </Button>
          </div>
          
          <div className={styles.flipbookWrapper}>
            <PdfFlipbook pdfUrl={PDF_URL} />
          </div>

          <div className={styles.mobileDownloadWrapper}>
            <Button 
              variant="primary" 
              className={styles.mobileDownloadBtn}
              onClick={handleDownload}
              disabled={isDownloading}
            >
              {isDownloading ? <Spinner size="sm" /> : <Download size={18} />} 
              {isDownloading ? "Downloading..." : "Direct Download PDF"}
            </Button>
          </div>
        </div>
      </section>

      {/* Explore More Section */}
      <section className={styles.exploreSection}>
        <div className={styles.exploreContainer}>
          <h2 className={styles.exploreTitle}>Explore More of Concord NC</h2>
          <div className={styles.cardsGrid}>
            <Link to="/neighborhoods" className={styles.card}>
              <div className={styles.cardIconWrapper}><Home size={24} /></div>
              <span className={styles.cardText}>Explore Neighborhoods</span>
              <ArrowRight size={18} className={styles.cardArrow} />
            </Link>
            <Link to="/market-reports" className={styles.card}>
              <div className={styles.cardIconWrapper}><TrendingUp size={24} /></div>
              <span className={styles.cardText}>Market Reports & Stats</span>
              <ArrowRight size={18} className={styles.cardArrow} />
            </Link>
            <Link to="/moving-to-concord" className={styles.card}>
              <div className={styles.cardIconWrapper}><Map size={24} /></div>
              <span className={styles.cardText}>Moving Guide Hub</span>
              <ArrowRight size={18} className={styles.cardArrow} />
            </Link>
            <Link to="/blog" className={styles.card}>
              <div className={styles.cardIconWrapper}><BookOpen size={24} /></div>
              <span className={styles.cardText}>Real Estate Blog</span>
              <ArrowRight size={18} className={styles.cardArrow} />
            </Link>
          </div>
        </div>
      </section>

      {/* Author Block */}
      <section className={styles.authorBlockWrapper}>
        <PageAuthorBlock
          disclaimer="This guide is provided for informational purposes only. Local market conditions, school assignments, and property taxes are subject to change. Consult with Franklin Bellamy directly for the most current data regarding your specific relocation needs."
        />
      </section>
    </div>
  );
}