import { SITE_CONTACT_EMAIL, SITE_CONTACT_EMAIL_MAILTO } from "../helpers/siteContact";
import React from "react";
import { Link } from "react-router-dom";
import { usePageMeta } from "../helpers/usePageMeta";
import { PageBreadcrumbs } from "../components/PageBreadcrumbs";
import { PageAuthorBlock } from "../components/PageAuthorBlock";
import styles from "./privacy-policy.module.css";

const BREADCRUMBS = [
  { label: "Home", href: "/" },
  { label: "Privacy Policy" },
];

export default function PrivacyPolicyPage() {
  const meta = usePageMeta({
    title: "Privacy Policy | Living in Concord NC",
    description: "Read the privacy policy for LivingInConcord.com. Learn how we collect, use, and protect your personal information on our Concord NC real estate platform.",
    canonicalPath: "/privacy-policy",
  });

  return (
    <div className={styles.page}>
      {meta}
      <PageBreadcrumbs items={BREADCRUMBS} />
      
      <main className={styles.container}>
        <header className={styles.header}>
          <h1 className={styles.title}>Privacy Policy</h1>
          <p className={styles.effectiveDate}>Effective as of: 2026</p>
        </header>

        <article className={styles.content}>
          <section className={styles.section}>
            <p className={styles.paragraph}>
              At LivingInConcord.com ("we," "us," or "our"), operated by Franklin Bellamy and Unlocking Real Estate, we are committed to protecting your personal information and your right to privacy. This Privacy Policy outlines how we collect, use, share, and protect your information when you visit our website and use our services.
            </p>
          </section>

          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>1. Information We Collect</h2>
            <p className={styles.paragraph}>
              We collect information that you voluntarily provide to us when expressing an interest in obtaining information about real estate in Concord, NC, or when you participate in activities on the website. This includes:
            </p>
            <ul className={styles.list}>
              <li className={styles.listItem}><strong>Personal Identification Information:</strong> Name, email address, phone number, and physical address when you fill out lead capture forms, sign up for market updates, or request the relocation guide.</li>
              <li className={styles.listItem}><strong>Real Estate Preferences:</strong> Information provided through our neighborhood qualifier tools, home valuation requests, budget expectations, timeline, and buying/selling motivations.</li>
              <li className={styles.listItem}><strong>Communications:</strong> Records of your correspondence with us, including AI chatbot conversations.</li>
            </ul>
          </section>

          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>2. How We Use Your Information</h2>
            <p className={styles.paragraph}>
              We use the personal information collected via our website for a variety of business purposes, including:
            </p>
            <ul className={styles.list}>
              <li className={styles.listItem}>To provide personalized real estate services and consultation.</li>
              <li className={styles.listItem}>To send you marketing and promotional communications, such as monthly market reports (you can opt-out at any time).</li>
              <li className={styles.listItem}>To respond to your inquiries and offer support.</li>
              <li className={styles.listItem}>To improve our website, user experience, and real estate offerings.</li>
            </ul>
          </section>

          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>3. Information Sharing</h2>
            <p className={styles.paragraph}>
              We do not sell, trade, or rent your personal identification information to others. We may share your information only in the following situations:
            </p>
            <ul className={styles.list}>
              <li className={styles.listItem}><strong>With your consent:</strong> We may share your data with trusted partners (like mortgage lenders or inspectors) if you explicitly request us to do so.</li>
              <li className={styles.listItem}><strong>For legal reasons:</strong> If required by law, subpoena, or other legal processes, or to protect the rights, property, or safety of our users or others.</li>
            </ul>
          </section>

          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>4. Cookies & Tracking</h2>
            <p className={styles.paragraph}>
              We may use cookies, web beacons, tracking pixels, and other tracking technologies to collect and store your information. This helps us customize the site and improve your experience by understanding analytics, such as which pages you visit and how you interact with our content.
            </p>
          </section>

          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>5. Third-Party Services</h2>
            <p className={styles.paragraph}>
              Our website utilizes third-party service providers to facilitate our operations. These include, but are not limited to:
            </p>
            <ul className={styles.list}>
              <li className={styles.listItem}><strong>Web3Forms:</strong> Used for secure processing and delivery of your form submissions.</li>
              <li className={styles.listItem}><strong>OpenRouter / OpenAI:</strong> Powers our AI chatbot features. Conversations may be processed by these services to generate helpful real estate responses.</li>
              <li className={styles.listItem}><strong>Analytics Providers:</strong> Tools to help us understand website traffic and usage patterns.</li>
            </ul>
            <p className={styles.paragraph}>
              These third parties have access to your personal information only to perform these tasks on our behalf and are obligated not to disclose or use it for any other purpose.
            </p>
          </section>

          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>6. Data Security</h2>
            <p className={styles.paragraph}>
              We implement reasonable administrative, technical, and physical security measures to protect your personal information. However, please remember that no method of transmission over the internet or method of electronic storage is 100% secure, and we cannot guarantee its absolute security.
            </p>
          </section>

          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>7. Your Rights</h2>
            <p className={styles.paragraph}>
              Depending on your location, you may have rights regarding your personal information, including the right to access, correct, or delete the data we hold about you. If you wish to exercise these rights, please contact us using the information provided below. You may also opt-out of marketing communications at any time by following the unsubscribe link in our emails.
            </p>
          </section>

          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>8. Children's Privacy</h2>
            <p className={styles.paragraph}>
              Our website and services are not directed to individuals under the age of 18. We do not knowingly collect personal information from children. If we become aware that we have collected such data, we will take steps to delete it promptly.
            </p>
          </section>

          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>9. Changes to This Policy</h2>
            <p className={styles.paragraph}>
              We may update this Privacy Policy from time to time in order to reflect changes to our practices or for other operational, legal, or regulatory reasons. The updated version will be indicated by an updated "Effective Date" at the top of this page.
            </p>
          </section>

          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>10. Contact Us</h2>
            <p className={styles.paragraph}>
              If you have questions or comments about this Privacy Policy, please contact us at:
            </p>
            <div className={styles.contactInfo}>
              <p className={styles.paragraph}><strong>Franklin Bellamy</strong></p>
              <p className={styles.paragraph}>Lifestyle International Realty / Unlocking Real Estate</p>
              <p className={styles.paragraph}>Email: <a href={SITE_CONTACT_EMAIL_MAILTO}>{SITE_CONTACT_EMAIL}</a></p>
              <p className={styles.paragraph}>Phone: <a href="tel:704-904-5142">(704) 904-5142</a></p>
            </div>
          </section>
        </article>

        <PageAuthorBlock 
          disclaimer="This privacy policy is provided for informational purposes. For specific legal questions about your data rights, consult a qualified attorney."
        />
      </main>
    </div>
  );
}