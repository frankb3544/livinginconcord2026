import React from "react";
import { Link } from "react-router-dom";
import {
  FileText,
  MapPin,
  BarChart3,
  MessageSquare,
  Users,
  Download,
  Home,
  Mail,
  CheckCircle2,
  XCircle,
  FlaskConical,
} from "lucide-react";
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts";
import { useAdminStats } from "../helpers/useAdminStats";
import { Skeleton } from "../components/Skeleton";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartConfig,
} from "../components/Chart";
import styles from "./admin.dashboard.module.css";

const abChartConfig: ChartConfig = {
  leads: {
    label: "Leads",
    color: "var(--primary)",
  },
  variantA: {
    label: "Variant A",
    color: "var(--primary)",
  },
  variantB: {
    label: "Variant B",
    color: "var(--accent)",
  },
};

export default function AdminDashboardPage() {
  const { statsQuery } = useAdminStats();
  const { data: stats, isFetching } = statsQuery;

  const isLoading = isFetching && !stats;

  const cards = [
    {
      label: "Blog Posts",
      value: stats?.totalBlogPosts,
      icon: FileText,
      link: "/admin/blog",
      color: "primary",
    },
    {
      label: "Neighborhoods",
      value: stats?.totalNeighborhoods,
      icon: MapPin,
      link: "/admin/neighborhoods",
      color: "accent",
    },
    {
      label: "Market Data",
      value: stats?.totalMarketDataEntries,
      icon: BarChart3,
      link: "/admin/market-data",
      color: "info",
    },
    {
      label: "Testimonials",
      value: stats?.totalTestimonials,
      icon: MessageSquare,
      link: "/admin/testimonials",
      color: "warning",
    },
    {
      label: "Contact Leads",
      value: stats?.totalContacts,
      icon: Users,
      link: "/admin/leads",
      color: "success",
    },
    {
      label: "Guide Downloads",
      value: stats?.totalGuideDownloads,
      icon: Download,
      link: "/admin/leads",
      color: "info",
    },
    {
      label: "Valuation Requests",
      value: stats?.totalValuationRequests,
      icon: Home,
      link: "/admin/leads",
      color: "primary",
    },
    {
      label: "Update Signups",
      value: stats?.totalMarketUpdateSignups,
      icon: Mail,
      link: "/admin/leads",
      color: "accent",
    },
  ];

  const abChartData = [
    { variant: "Variant A", leads: stats?.variantALeads ?? 0, fill: "var(--color-variantA)" },
    { variant: "Variant B", leads: stats?.variantBLeads ?? 0, fill: "var(--color-variantB)" },
  ];

  const totalAbLeads = (stats?.variantALeads ?? 0) + (stats?.variantBLeads ?? 0);
  const variantAPercent = totalAbLeads > 0 ? Math.round(((stats?.variantALeads ?? 0) / totalAbLeads) * 100) : 0;
  const variantBPercent = totalAbLeads > 0 ? Math.round(((stats?.variantBLeads ?? 0) / totalAbLeads) * 100) : 0;

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1 className={styles.title}>Welcome back, Franklin</h1>
        <p className={styles.subtitle}>Here is what's happening today.</p>
      </header>

      <div className={styles.grid}>
        {cards.map((card, idx) => {
          const Icon = card.icon;
          return (
            <Link key={idx} to={card.link} className={styles.card}>
              <div className={styles.cardHeader}>
                <h3 className={styles.cardLabel}>{card.label}</h3>
                <div className={`${styles.iconWrapper} ${styles[card.color]}`}>
                  <Icon size={20} />
                </div>
              </div>
              <div className={styles.cardContent}>
                {isLoading ? (
                  <Skeleton className={styles.skeletonValue} />
                ) : (
                  <span className={styles.cardValue}>{card.value ?? 0}</span>
                )}
              </div>
            </Link>
          );
        })}
      </div>

      <div className={styles.guideStatusSection}>
        <h2 className={styles.sectionTitle}>System Status</h2>
        <div className={styles.statusCard}>
          <div className={styles.statusInfo}>
            <h3 className={styles.statusTitle}>Relocation Guide PDF</h3>
            <p className={styles.statusDesc}>
              Required for the "Moving to Concord" lead magnet.
            </p>
          </div>
          <div className={styles.statusBadge}>
            {isLoading ? (
              <Skeleton className={styles.skeletonStatus} />
            ) : stats?.hasRelocationGuide ? (
              <div className={styles.statusSuccess}>
                <CheckCircle2 size={20} />
                <span>Uploaded</span>
              </div>
            ) : (
              <div className={styles.statusError}>
                <XCircle size={20} />
                <span>Missing</span>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className={styles.abTestSection}>
        <h2 className={styles.sectionTitle}>A/B Test Results</h2>
        <div className={styles.abCard}>
          <div className={styles.abCardHeader}>
            <div className={styles.abCardIcon}>
              <FlaskConical size={18} />
            </div>
            <div>
              <h3 className={styles.abCardTitle}>Contact Form Qualifier Variants</h3>
              <p className={styles.abCardDesc}>Leads generated per qualifier variant</p>
            </div>
          </div>

          {isLoading ? (
            <div className={styles.abLoadingState}>
              <Skeleton className={styles.skeletonAb} />
            </div>
          ) : (
            <div className={styles.abContent}>
              <div className={styles.abStats}>
                <div className={styles.abStatItem}>
                  <div className={`${styles.abStatDot} ${styles.abDotA}`} />
                  <div className={styles.abStatDetails}>
                    <span className={styles.abStatLabel}>Variant A</span>
                    <span className={styles.abStatValue}>{stats?.variantALeads ?? 0}</span>
                    <span className={styles.abStatPercent}>{variantAPercent}%</span>
                  </div>
                </div>
                <div className={styles.abStatItem}>
                  <div className={`${styles.abStatDot} ${styles.abDotB}`} />
                  <div className={styles.abStatDetails}>
                    <span className={styles.abStatLabel}>Variant B</span>
                    <span className={styles.abStatValue}>{stats?.variantBLeads ?? 0}</span>
                    <span className={styles.abStatPercent}>{variantBPercent}%</span>
                  </div>
                </div>
              </div>

              <div className={styles.abChartWrapper}>
                <ChartContainer config={abChartConfig}>
                  <BarChart data={abChartData} margin={{ top: 8, right: 8, bottom: 0, left: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} />
                    <XAxis dataKey="variant" tickLine={false} axisLine={false} />
                    <YAxis tickLine={false} axisLine={false} allowDecimals={false} />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Bar dataKey="leads" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ChartContainer>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}