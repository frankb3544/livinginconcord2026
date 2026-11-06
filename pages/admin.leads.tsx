import React from "react";
import { useAdminLeads } from "../helpers/useAdminLeads";
import { Badge } from "../components/Badge";
import { Skeleton } from "../components/Skeleton";
import * as Tabs from "@radix-ui/react-tabs";
import styles from "./admin.leads.module.css";

const formatDate = (date: Date | string) => {
  return new Intl.DateTimeFormat('en-US', { 
    year: 'numeric', 
    month: 'short', 
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  }).format(new Date(date));
};

export default function AdminLeads() {
  const { leadsQuery } = useAdminLeads();
  const { data, isLoading } = leadsQuery;

  if (isLoading) {
    return (
      <div className={styles.container}>
        <div className={styles.header}>
          <h1 className={styles.title}>Lead Management</h1>
        </div>
        <Skeleton style={{ height: "40px", marginBottom: "20px" }} />
        <Skeleton style={{ height: "300px" }} />
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>Lead Management</h1>
        <p className={styles.subtitle}>Review inquiries and contact submissions across the site.</p>
      </div>

      <Tabs.Root className={styles.tabsRoot} defaultValue="contacts">
        <Tabs.List className={styles.tabsList} aria-label="Lead categories">
          <Tabs.Trigger className={styles.tabsTrigger} value="contacts">
            General Contact
            <Badge variant="secondary" className={styles.tabBadge}>{data?.contacts?.length || 0}</Badge>
          </Tabs.Trigger>
          <Tabs.Trigger className={styles.tabsTrigger} value="guides">
            Guide Downloads
            <Badge variant="secondary" className={styles.tabBadge}>{data?.guideDownloads?.length || 0}</Badge>
          </Tabs.Trigger>
          <Tabs.Trigger className={styles.tabsTrigger} value="valuations">
            Valuations
            <Badge variant="secondary" className={styles.tabBadge}>{data?.valuationRequests?.length || 0}</Badge>
          </Tabs.Trigger>
          <Tabs.Trigger className={styles.tabsTrigger} value="market">
            Market Updates
            <Badge variant="secondary" className={styles.tabBadge}>{data?.marketUpdateSignups?.length || 0}</Badge>
          </Tabs.Trigger>
        </Tabs.List>

        <Tabs.Content className={styles.tabsContent} value="contacts">
          <div className={styles.tableWrapper}>
            <table className={styles.table}>
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Name</th>
                  <th>Contact Info</th>
                  <th>Interest</th>
                  <th>Message</th>
                </tr>
              </thead>
              <tbody>
                {data?.contacts?.length === 0 ? (
                  <tr><td colSpan={5} className={styles.emptyState}>No contact submissions yet.</td></tr>
                ) : (
                  data?.contacts?.map(lead => (
                    <tr key={lead.id}>
                      <td className={styles.dateCell}>{formatDate(lead.createdAt)}</td>
                      <td className={styles.fw500}>{lead.fullName}</td>
                      <td>
                        <div className={styles.contactCell}>
                          <a href={`mailto:${lead.email}`}>{lead.email}</a>
                          {lead.phone && <span>{lead.phone}</span>}
                        </div>
                      </td>
                      <td>{lead.interestedIn ? <Badge variant="outline">{lead.interestedIn}</Badge> : "-"}</td>
                      <td className={styles.messageCell}>{lead.message || "-"}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </Tabs.Content>

        <Tabs.Content className={styles.tabsContent} value="guides">
          <div className={styles.tableWrapper}>
            <table className={styles.table}>
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Phone</th>
                </tr>
              </thead>
              <tbody>
                {data?.guideDownloads?.length === 0 ? (
                  <tr><td colSpan={4} className={styles.emptyState}>No guide downloads yet.</td></tr>
                ) : (
                  data?.guideDownloads?.map(lead => (
                    <tr key={lead.id}>
                      <td className={styles.dateCell}>{formatDate(lead.createdAt)}</td>
                      <td className={styles.fw500}>{lead.fullName}</td>
                      <td><a href={`mailto:${lead.email}`}>{lead.email}</a></td>
                      <td>{lead.phone || "-"}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </Tabs.Content>

        <Tabs.Content className={styles.tabsContent} value="valuations">
          <div className={styles.tableWrapper}>
            <table className={styles.table}>
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Phone</th>
                  <th>Property Address</th>
                </tr>
              </thead>
              <tbody>
                {data?.valuationRequests?.length === 0 ? (
                  <tr><td colSpan={5} className={styles.emptyState}>No valuation requests yet.</td></tr>
                ) : (
                  data?.valuationRequests?.map(lead => (
                    <tr key={lead.id}>
                      <td className={styles.dateCell}>{formatDate(lead.createdAt)}</td>
                      <td className={styles.fw500}>{lead.fullName}</td>
                      <td><a href={`mailto:${lead.email}`}>{lead.email}</a></td>
                      <td>{lead.phone || "-"}</td>
                      <td className={styles.addressCell}>{lead.propertyAddress}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </Tabs.Content>

        <Tabs.Content className={styles.tabsContent} value="market">
          <div className={styles.tableWrapper}>
            <table className={styles.table}>
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Name</th>
                  <th>Email</th>
                </tr>
              </thead>
              <tbody>
                {data?.marketUpdateSignups?.length === 0 ? (
                  <tr><td colSpan={3} className={styles.emptyState}>No market update signups yet.</td></tr>
                ) : (
                  data?.marketUpdateSignups?.map(lead => (
                    <tr key={lead.id}>
                      <td className={styles.dateCell}>{formatDate(lead.createdAt)}</td>
                      <td className={styles.fw500}>{lead.fullName}</td>
                      <td><a href={`mailto:${lead.email}`}>{lead.email}</a></td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </Tabs.Content>
      </Tabs.Root>
    </div>
  );
}