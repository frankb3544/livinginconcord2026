import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { 
  LayoutDashboard, 
  FileText, 
  MapPin, 
  BarChart3, 
  MessageSquare, 
  Users, 
  BookOpen, 
  ExternalLink, 
  Menu, 
  X, 
  LogOut,
  Settings
} from "lucide-react";
import { useAuth } from "../helpers/useAuth";
import styles from "./AdminLayout.module.css";

interface AdminLayoutProps {
  children: React.ReactNode;
}

const NAV_LINKS = [
  { name: "Dashboard", path: "/admin/dashboard", icon: LayoutDashboard },
  { name: "Blog Posts", path: "/admin/blog", icon: FileText },
  { name: "Neighborhoods", path: "/admin/neighborhoods", icon: MapPin },
  { name: "Market Data", path: "/admin/market-data", icon: BarChart3 },
  { name: "Testimonials", path: "/admin/testimonials", icon: MessageSquare },
  { name: "Leads", path: "/admin/leads", icon: Users },
  { name: "Relocation Guide", path: "/admin/guide", icon: BookOpen },
  { name: "Settings", path: "/admin/settings", icon: Settings },
];

export const AdminLayout: React.FC<AdminLayoutProps> = ({ children }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const { logout } = useAuth();

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMobileMenuOpen]);

  const toggleMobileMenu = () => setIsMobileMenuOpen((prev) => !prev);

  return (
    <div className={styles.layout}>
      {/* Mobile Top Bar */}
      <div className={styles.mobileTopBar}>
        <div className={styles.logoMobile}>
          <span className={styles.logoText}>LivingInConcord</span>
          <span className={styles.badge}>Admin</span>
        </div>
        <button 
          className={styles.mobileMenuBtn} 
          onClick={toggleMobileMenu}
          aria-label="Toggle admin menu"
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Overlay */}
      {isMobileMenuOpen && (
        <div className={styles.overlay} onClick={toggleMobileMenu} />
      )}

      {/* Sidebar */}
      <aside className={`${styles.sidebar} ${isMobileMenuOpen ? styles.sidebarOpen : ""}`}>
        <div className={styles.sidebarHeader}>
          <div className={styles.logoDesktop}>
            <span className={styles.logoText}>LivingInConcord</span>
            <span className={styles.badge}>Admin</span>
          </div>
        </div>

        <nav className={styles.nav}>
          <ul className={styles.navList}>
            {NAV_LINKS.map((link) => {
              const Icon = link.icon;
              const isActive = location.pathname.startsWith(link.path);
              return (
                <li key={link.path}>
                  <Link 
                    to={link.path} 
                    className={`${styles.navLink} ${isActive ? styles.navLinkActive : ""}`}
                  >
                    <Icon size={20} className={styles.navIcon} />
                    <span>{link.name}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className={styles.sidebarFooter}>
          <a href="/" target="_blank" rel="noopener noreferrer" className={styles.footerLink}>
            <ExternalLink size={20} className={styles.navIcon} />
            <span>Back to Site</span>
          </a>
          <button onClick={() => logout()} className={styles.footerLink}>
            <LogOut size={20} className={styles.navIcon} />
            <span>Logout</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className={styles.mainContent}>
        <div className={styles.contentContainer}>
          {children}
        </div>
      </main>
    </div>
  );
};