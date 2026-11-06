import { SITE_CONTACT_EMAIL, SITE_CONTACT_EMAIL_MAILTO } from "../helpers/siteContact";
import React from "react";
import { Link } from "react-router-dom";
import {
  Bar,
  BarChart,
  Line,
  LineChart,
  Pie,
  PieChart,
  Cell,
  CartesianGrid,
  XAxis,
  YAxis,
} from "recharts";
import { usePageMeta } from "../helpers/usePageMeta";
import { useJsonLd } from "../helpers/useJsonLd";
import { PageBreadcrumbs } from "../components/PageBreadcrumbs";
import { Button } from "../components/Button";
import { Badge } from "../components/Badge";
import { PageAuthorBlock } from "../components/PageAuthorBlock";
import { DataDisclaimer } from "../components/DataDisclaimer";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "../components/Chart";
import styles from "./moving-to-concord.schools-guide.module.css";

const PAGE_TITLE = "Concord NC Schools Guide | Living in Concord NC";
const PAGE_DESC =
  "Explore top-rated Cabarrus County schools, ratings, and neighborhoods near the best schools in Concord NC. Essential reading for relocating families.";
const PAGE_URL =
  "https://livinginconcordnc.com/moving-to-concord/schools-guide";

const BREADCRUMBS = [
  { label: "Home", href: "/" },
  { label: "Moving Guide", href: "/moving-to-concord" },
  { label: "Schools Guide" },
];

const JSON_LD = [
  {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: "https://livinginconcordnc.com/",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Moving Guide",
        item: "https://livinginconcordnc.com/moving-to-concord",
      },
      {
        "@type": "ListItem",
        position: 3,
        name: "Schools Guide",
        item: PAGE_URL,
      },
    ],
  },
  {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: "Concord NC Schools Guide: Everything Parents Need to Know",
    description: PAGE_DESC,
    author: {
      "@type": "Person",
      name: "Franklin Bellamy",
      jobTitle: "NC Licensed Real Estate Broker",
      url: "https://livinginconcordnc.com/about"
    },
    publisher: {
      "@type": "Organization",
      name: "LivingInConcordNC.com"
    },
  },
  {
    "@context": "https://schema.org",
    "@type": "EducationalOrganization",
    "name": "Cabarrus County Schools",
    "description": "Public school district serving Concord NC and Cabarrus County with approximately 35,000 students.",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Concord",
      "addressRegion": "NC",
      "addressCountry": "US"
    },
    "numberOfEmployees": {
      "@type": "QuantitativeValue",
      "value": 4500
    }
  },
  {
    "@context": "https://schema.org",
    "@type": "RealEstateAgent",
    "name": "Franklin Bellamy - Unlocking Real Estate",
    "telephone": "(704) 904-5142",
    "email": SITE_CONTACT_EMAIL,
    "url": "https://livinginconcordnc.com",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Concord",
      "addressRegion": "NC",
      "postalCode": "28027",
      "addressCountry": "US"
    }
  }
];

// Chart Data & Configs
const performanceData = [
  { name: "Cox Mill High", score: 95 },
  { name: "J.M. Robinson", score: 92 },
  { name: "NW Cabarrus", score: 88 },
  { name: "Concord", score: 85 },
  { name: "A.L. Brown", score: 82 },
];
const performanceConfig = {
  score: { label: "Performance Rating", color: "var(--primary)" },
};

const enrollmentData = [
  { year: "2018", students: 29500 },
  { year: "2019", students: 30200 },
  { year: "2020", students: 30800 },
  { year: "2021", students: 31500 },
  { year: "2022", students: 32400 },
  { year: "2023", students: 33100 },
  { year: "2024", students: 34200 },
  { year: "2025", students: 35000 },
];
const enrollmentConfig = {
  students: { label: "Enrolled Students", color: "var(--primary)" },
};

const typeDistributionData = [
  { name: "Elementary", value: 23, fill: "var(--primary)" },
  { name: "Middle", value: 9, fill: "var(--secondary)" },
  { name: "High", value: 8, fill: "var(--accent)" },
  { name: "Charter/Private", value: 4, fill: "var(--success)" },
];
const typeDistributionConfig = {
  value: { label: "Schools" },
};

const spendingData = [
  { name: "Cabarrus Co.", amount: 9800 },
  { name: "NC Average", amount: 10200 },
  { name: "US Average", amount: 14300 },
];
const spendingConfig = {
  amount: { label: "Spending per Student", color: "var(--primary)" },
};

export default function SchoolsGuidePage() {
  const meta = usePageMeta({
    title: PAGE_TITLE,
    description: PAGE_DESC,
    canonicalPath: "/moving-to-concord/schools-guide",
  });
  const jsonLd = useJsonLd(JSON_LD);

  return (
    <div className={styles.page}>
      {meta}
      {jsonLd}
      <PageBreadcrumbs items={BREADCRUMBS} />

      <section className={styles.hero}>
        <div className={styles.heroContainer}>
          <h1 className={styles.heroTitle}>
            Concord NC Schools Guide: Everything Parents Need to Know
          </h1>
          <p className={styles.heroSubtitle}>
            Explore top-rated districts, private options, and neighborhood school zones in Cabarrus County.
          </p>
        </div>
      </section>

      {/* District Overview Stats Bar */}
      <section className={styles.statsBar}>
        <div className={styles.statsContainer}>
          <div className={styles.statItem}>
            <div className={styles.statValue}>~35,000</div>
            <div className={styles.statLabel}>Students Enrolled</div>
          </div>
          <div className={styles.statItem}>
            <div className={styles.statValue}>44</div>
            <div className={styles.statLabel}>Public Schools</div>
          </div>
          <div className={styles.statItem}>
            <div className={styles.statValue}>89%</div>
            <div className={styles.statLabel}>Graduation Rate</div>
          </div>
          <div className={styles.statItem}>
            <div className={styles.statValue}>15:1</div>
            <div className={styles.statLabel}>Student-Teacher Ratio</div>
          </div>
        </div>
      </section>

      <main className={styles.content}>
        <section className={styles.contentSection}>
          <h2>Cabarrus County Schools Overview</h2>
          <p>
            For many families relocating to the Concord area, securing an
            excellent education is the absolute top priority. The region is
            primarily served by Cabarrus County Schools (CCS), an expansive and
            highly rated district. CCS is widely celebrated for its innovative
            approaches to education, strong parent involvement, and safe,
            welcoming campuses.
          </p>

          <div className={styles.chartGrid}>
            <div className={styles.chartCard}>
              <h3>Enrollment Trends</h3>
              <p className={styles.chartDesc}>Steady growth in the district over the last 8 years.</p>
              <div className={styles.chartWrapper} style={{ height: 300 }}>
                <ChartContainer config={enrollmentConfig}>
                  <LineChart data={enrollmentData}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} />
                    <XAxis dataKey="year" tickLine={false} axisLine={false} />
                    <YAxis
                      tickFormatter={(value) => `${value / 1000}k`}
                      domain={["auto", "auto"]}
                      tickLine={false}
                      axisLine={false}
                    />
                    <ChartTooltip content={<ChartTooltipContent indicator="line" />} />
                    <Line
                      type="monotone"
                      dataKey="students"
                      stroke="var(--color-students)"
                      strokeWidth={3}
                      dot={{ fill: "var(--color-students)", r: 4 }}
                      activeDot={{ r: 6 }}
                    />
                  </LineChart>
                </ChartContainer>
              </div>
            </div>

            <div className={styles.chartCard}>
              <h3>School Type Distribution</h3>
              <p className={styles.chartDesc}>Breakdown of educational facilities in the area.</p>
              <div className={styles.chartWrapper} style={{ height: 300 }}>
                <ChartContainer config={typeDistributionConfig}>
                  <PieChart>
                    <ChartTooltip content={<ChartTooltipContent nameKey="name" />} />
                    <Pie
                      data={typeDistributionData}
                      dataKey="value"
                      nameKey="name"
                      cx="50%"
                      cy="50%"
                      outerRadius={100}
                      label
                    >
                      {typeDistributionData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.fill} />
                      ))}
                    </Pie>
                  </PieChart>
                </ChartContainer>
              </div>
            </div>
          </div>
        </section>

        <section className={styles.contentSection}>
          <h2>Top Area High Schools Performance</h2>
          <p>
            Concord's high schools are recognized regionally for their excellent
            graduation rates, expansive Advanced Placement (AP) course offerings,
            and spirited athletic traditions.
          </p>
          <div className={styles.chartCardFull}>
            <div className={styles.chartWrapper} style={{ height: 350 }}>
              <ChartContainer config={performanceConfig}>
                <BarChart data={performanceData} margin={{ top: 20 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <XAxis dataKey="name" tickLine={false} axisLine={false} />
                  <YAxis tickLine={false} axisLine={false} domain={[0, 100]} />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Bar
                    dataKey="score"
                    fill="var(--color-score)"
                    radius={[4, 4, 0, 0]}
                    maxBarSize={60}
                  />
                </BarChart>
              </ChartContainer>
            </div>
          </div>
        </section>

        <DataDisclaimer variant="mid" text="Performance ratings and school comparisons above are based on publicly available NC School Report Card data and community assessments. Verify current ratings directly with Cabarrus County Schools." />

        <section className={styles.contentSection}>
          <h2>Notable High Schools</h2>
          <div className={styles.cardGrid}>
            {[
              { name: "Cox Mill High", rating: "A", students: "~1,800", desc: "20+ AP Courses, consistently top-ranked in the county." },
              { name: "Jay M. Robinson High", rating: "A", students: "~1,700", desc: "Features a highly sought-after Engineering Magnet program." },
              { name: "Northwest Cabarrus High", rating: "B+", students: "~1,500", desc: "Strong STEM focus and excellent athletics." },
              { name: "Concord High", rating: "B", students: "~1,400", desc: "Offers the prestigious International Baccalaureate (IB) Program." },
            ].map((school, i) => (
              <div key={i} className={styles.schoolCard}>
                <div className={styles.schoolCardHeader}>
                  <h3 className={styles.schoolCardTitle}>{school.name}</h3>
                  <Badge variant={school.rating.includes("A") ? "success" : "primary"}>
                    Rating: {school.rating}
                  </Badge>
                </div>
                <div className={styles.schoolCardMeta}>
                  <span>Students: {school.students}</span>
                </div>
                <p className={styles.schoolCardDesc}>{school.desc}</p>
              </div>
            ))}
          </div>
        </section>

        <section className={styles.contentSection}>
          <h2>Notable Middle Schools</h2>
          <p>
            Bridging the gap between foundational studies and high school rigor,
            local middle schools provide robust academic, arts, and athletic
            programs.
          </p>
          <div className={styles.cardGrid}>
            {[
              { name: "Jay M. Robinson Middle", rating: "A", students: "~950", desc: "Known for strong faculty and diverse extracurriculars." },
              { name: "Northwest Cabarrus Middle", rating: "A-", students: "~880", desc: "Excellent transition programs and STEM initiatives." },
              { name: "C.C. Griffin Middle", rating: "B+", students: "~820", desc: "Focused on holistic student development and arts." },
            ].map((school, i) => (
              <div key={i} className={styles.schoolCard}>
                <div className={styles.schoolCardHeader}>
                  <h3 className={styles.schoolCardTitle}>{school.name}</h3>
                  <Badge variant={school.rating.includes("A") ? "success" : "primary"}>
                    Rating: {school.rating}
                  </Badge>
                </div>
                <div className={styles.schoolCardMeta}>
                  <span>Students: {school.students}</span>
                </div>
                <p className={styles.schoolCardDesc}>{school.desc}</p>
              </div>
            ))}
          </div>
        </section>

        <section className={styles.contentSection}>
          <h2>Notable Elementary Schools</h2>
          <p>
            Strong foundational learning begins at Concord's exceptional
            elementary schools. Parents consistently praise the engaged faculty
            and tight-knit community feel.
          </p>
          <div className={styles.cardGrid}>
            {[
              { name: "Cox Mill Elementary", rating: "A", students: "~750", desc: "Highly rated academics and active PTA." },
              { name: "W.M. Irvin Elementary", rating: "A", students: "~680", desc: "Diverse student body with excellent reading programs." },
              { name: "Bethel Elementary", rating: "A-", students: "~620", desc: "Community-focused with strong parent involvement." },
              { name: "Patriots Elementary", rating: "A-", students: "~700", desc: "Modern facilities and dedicated teaching staff." },
              { name: "Odell Elementary", rating: "B+", students: "~580", desc: "Growing school with new technology integration." },
              { name: "Rocky River Elementary", rating: "A", students: "~710", desc: "Award-winning environmental science programs." },
            ].map((school, i) => (
              <div key={i} className={styles.schoolCard}>
                <div className={styles.schoolCardHeader}>
                  <h3 className={styles.schoolCardTitle}>{school.name}</h3>
                  <Badge variant={school.rating.includes("A") ? "success" : "primary"}>
                    Rating: {school.rating}
                  </Badge>
                </div>
                <div className={styles.schoolCardMeta}>
                  <span>Students: {school.students}</span>
                </div>
                <p className={styles.schoolCardDesc}>{school.desc}</p>
              </div>
            ))}
          </div>
        </section>

        <section className={styles.contentSection}>
          <div className={styles.infoBox}>
            <h3 className={styles.infoBoxTitle}>School Zones & Real Estate Impact</h3>
            <p className={styles.infoBoxText}>
              Because school zones heavily influence lifestyle and resale value, many buyers target specific communities. In Cabarrus County, homes located within <strong>A-rated school zones typically hold an 8-12% higher market value</strong> compared to those in B-rated zones. Furthermore, these homes often sell faster and retain their value better during market shifts. Always verify the current assigned schools for a specific address using the official mapping tool before making an offer, as zoning lines can shift due to area growth.
            </p>
          </div>
        </section>

        <section className={styles.contentSection}>
          <h2>Spending Per Student Comparison</h2>
          <p>
            Cabarrus County runs an highly efficient district. While spending per student is slightly below the state and national averages, the district consistently outperforms expectations, proving that strategic allocation of resources goes a long way.
          </p>
          <div className={styles.chartCardFull}>
            <div className={styles.chartWrapper} style={{ height: 250 }}>
              <ChartContainer config={spendingConfig}>
                <BarChart data={spendingData} layout="vertical" margin={{ left: 20, right: 30 }}>
                  <CartesianGrid strokeDasharray="3 3" horizontal={false} />
                  <XAxis type="number" tickFormatter={(val) => `$${val}`} tickLine={false} axisLine={false} />
                  <YAxis dataKey="name" type="category" width={100} tickLine={false} axisLine={false} />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Bar
                    dataKey="amount"
                    fill="var(--color-amount)"
                    radius={[0, 4, 4, 0]}
                    barSize={40}
                  />
                </BarChart>
              </ChartContainer>
            </div>
          </div>
        </section>

        <section className={styles.contentSection}>
          <h2>Private & Charter Options</h2>
          <p>
            Families seeking alternative or faith-based educational models will
            find strong options in the area. Top-rated private and public
            charter schools such as <strong>Cabarrus Charter Academy</strong>{" "}
            and <strong>Cannon School</strong> offer rigorous academics, smaller
            class sizes, and deeply personalized learning environments.
          </p>
        </section>

        <section className={styles.contentSection}>
          <h2>Magnet & Specialty Programs</h2>
          <p>
            Cabarrus County Schools also provides several "School of Choice"
            programs to accommodate unique student interests. These include
            highly sought-after STEM (Science, Technology, Engineering, and
            Mathematics) magnet programs, International Baccalaureate (IB)
            curriculums, and Spanish language immersion schools.
          </p>
        </section>

        <section className={styles.contentSection}>
          <h2>Neighborhoods Near Top Schools</h2>
          <p>
            Neighborhoods like{" "}
            <Link to="/neighborhoods/cox-mill">The Cox Mill Area</Link> and{" "}
            <Link to="/neighborhoods/highland-creek">Highland Creek</Link> are
            particularly renowned for their premier school assignments. Check
            out our full <Link to="/neighborhoods">Neighborhoods Guide</Link>{" "}
            for a deeper dive into community features.
          </p>
        </section>

        <section className={styles.contentSection}>
          <h2>Tips for Relocating Families</h2>
          <ul className={styles.tipsList}>
            <li>
              <strong>Verify Zones Early:</strong> Always use the official
              Cabarrus County Schools mapping tool to confirm the assigned
              schools for a specific address. Zoning lines can shift due to area
              growth.
            </li>
            <li>
              <strong>Plan Your Tours:</strong> Once you narrow down your target
              neighborhoods, reach out to the respective school administrators to
              schedule a campus tour.
            </li>
            <li>
              <strong>Prepare Records:</strong> Have your children's transcripts,
              immunization records, and birth certificates readily available for
              a frictionless enrollment process upon closing.
            </li>
          </ul>
        </section>

        <section className={styles.contentSection}>
          <h2>Explore Top Neighborhoods</h2>
          <p>
            Looking for specific communities within these top-rated school zones? Start by exploring <Link to="/neighborhoods/winding-walk">Winding Walk</Link>, <Link to="/neighborhoods/christenbury">Christenbury</Link>, and <Link to="/neighborhoods/moss-creek">Moss Creek</Link>.
          </p>
          <p>
            <strong>Call or text Franklin Bellamy at (704) 904-5142 to find a home in your ideal school zone.</strong>
          </p>
        </section>

        <PageAuthorBlock disclaimer="School data on this page is sourced from Cabarrus County Schools, the NC Department of Public Instruction (NC DPI), and GreatSchools. Enrollment figures, ratings, and school zone boundaries are subject to change. Always verify current information at cabarrus.k12.nc.us." />
      </main>

      <section className={styles.bottomCta}>
        <div className={styles.bottomCtaContainer}>
          <h2 className={styles.bottomCtaTitle}>
            Ready to Explore Homes in Top School Zones?
          </h2>
          <p className={styles.bottomCtaSubtitle}>
            Franklin can help you navigate Cabarrus County's school boundaries
            and find the perfect neighborhood for your family's educational needs.
          </p>
          <div className={styles.bottomCtaButtons}>
            <Button asChild size="lg" className={styles.bottomCtaBtn}>
              <Link to="/contact">Schedule a Consultation</Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className={styles.bottomCtaOutlineBtn}
            >
              <Link to="/moving-to-concord">Get the Full Relocation Guide</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}