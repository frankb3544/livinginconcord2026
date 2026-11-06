import React from "react";
import { Navigate } from "react-router-dom";
import { Lock } from "lucide-react";
import { PasswordLoginForm } from "../components/PasswordLoginForm";
import { useAuth } from "../helpers/useAuth";
import styles from "./login.module.css";

export default function AdminLoginPage() {
  const { authState } = useAuth();

  // If already authenticated, redirect to the dashboard
  if (authState.type === "authenticated") {
    return <Navigate to="/admin/dashboard" replace />;
  }

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <div className={styles.header}>
          <Lock className={styles.icon} size={24} />
          <h1 className={styles.title}>Admin Login</h1>
          <p className={styles.subtitle}>LivingInConcord.com</p>
        </div>
        <div className={styles.content}>
          <PasswordLoginForm redirectTo="/admin/dashboard" />
        </div>
      </div>
    </div>
  );
}