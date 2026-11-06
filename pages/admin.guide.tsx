import React, { useState, useRef } from "react";
import { useAdminGuide } from "../helpers/useAdminGuide";
import { Button } from "../components/Button";
import { Badge } from "../components/Badge";
import { Skeleton } from "../components/Skeleton";
import { toast } from "sonner";
import { FileText, Upload, CheckCircle2, AlertCircle, Info } from "lucide-react";
import styles from "./admin.guide.module.css";

// ~3MB of base64 chars per chunk → JSON payload stays well under 6MB
const CHUNK_SIZE = 3 * 1024 * 1024;
const MAX_FILE_SIZE = 50 * 1024 * 1024; // 50MB limit for the original file

export default function AdminGuide() {
  const { guideInfoQuery, uploadMutation, invalidateGuide } = useAdminGuide();
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [uploadProgress, setUploadProgress] = useState<{
    current: number;
    total: number;
  } | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.type !== "application/pdf") {
      toast.error("Please select a PDF file");
      return;
    }

    if (file.size > MAX_FILE_SIZE) {
      toast.error(
        `File too large. Maximum size is 50MB. Current size: ${(file.size / 1024 / 1024).toFixed(2)}MB`
      );
      return;
    }

    setSelectedFile(file);
  };

  const handleUpload = () => {
    if (!selectedFile) return;

    const reader = new FileReader();
    reader.onload = async () => {
      try {
        const base64Str = reader.result as string;
        // Extract only the base64 data, stripping the data URI prefix
        const base64Data = base64Str.includes(",")
          ? base64Str.split(",")[1]
          : base64Str;

        // Split base64 string into chunks
        const chunks: string[] = [];
        for (let i = 0; i < base64Data.length; i += CHUNK_SIZE) {
          chunks.push(base64Data.slice(i, i + CHUNK_SIZE));
        }

        const totalChunks = chunks.length;
        console.log(
          `Uploading ${selectedFile.name} in ${totalChunks} chunk(s)`
        );

        setUploadProgress({ current: 0, total: totalChunks });

        for (let i = 0; i < totalChunks; i++) {
          setUploadProgress({ current: i + 1, total: totalChunks });
          await uploadMutation.mutateAsync({
            chunkIndex: i,
            chunkData: chunks[i],
            totalChunks,
            fileName: selectedFile.name,
            isFirstChunk: i === 0,
          });
        }

        // All chunks uploaded — invalidate query and show success
        invalidateGuide();
        toast.success("Relocation guide uploaded successfully");
        setSelectedFile(null);
        setUploadProgress(null);
        if (fileInputRef.current) fileInputRef.current.value = "";
      } catch (error) {
        const message = error instanceof Error ? error.message : "Unknown error";
        console.error("Upload failed:", message);
        toast.error(`Upload failed: ${message}`);
        setUploadProgress(null);
      }
    };
    reader.onerror = () => {
      toast.error("Failed to read file");
    };
    reader.readAsDataURL(selectedFile);
  };

  const isUploading = uploadMutation.isPending || uploadProgress !== null;

  const uploadButtonLabel = (() => {
    if (!uploadProgress) return "Upload Guide";
    if (uploadProgress.total === 1) return "Uploading...";
    return `Uploading chunk ${uploadProgress.current}/${uploadProgress.total}...`;
  })();

  const progressPercent =
    uploadProgress
      ? Math.round((uploadProgress.current / uploadProgress.total) * 100)
      : 0;

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>Relocation Guide Management</h1>
        <p className={styles.subtitle}>
          Upload the PDF guide that visitors receive when they sign up.
        </p>
      </div>

      <div className={styles.contentGrid}>
        <div className={styles.uploadSection}>
          <div className={styles.card}>
            <div className={styles.cardHeader}>
              <h2 className={styles.cardTitle}>Upload New PDF</h2>
            </div>
            <div className={styles.cardContent}>
              <div className={styles.infoBox}>
                <Info size={20} className={styles.infoIcon} />
                <p>
                  When a visitor submits the relocation guide form on the
                  website, they will receive this uploaded PDF. If no PDF is
                  uploaded, a dynamically generated guide will be provided
                  instead.
                </p>
              </div>

              <div className={styles.uploadArea}>
                <input
                  type="file"
                  accept=".pdf"
                  className={styles.fileInput}
                  ref={fileInputRef}
                  onChange={handleFileChange}
                  disabled={isUploading}
                />
                <div
                  className={styles.uploadPlaceholder}
                  onClick={() =>
                    !isUploading && fileInputRef.current?.click()
                  }
                >
                  <Upload size={32} className={styles.uploadIcon} />
                  <p className={styles.uploadText}>Click to select PDF file</p>
                  <p className={styles.uploadSubtext}>Max size: 50MB</p>
                </div>
              </div>

              {selectedFile && (
                <div className={styles.selectedFile}>
                  <FileText size={20} className={styles.fileIcon} />
                  <div className={styles.fileDetails}>
                    <span className={styles.fileName}>{selectedFile.name}</span>
                    <span className={styles.fileSize}>
                      {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
                    </span>
                  </div>
                  <Button
                    onClick={handleUpload}
                    disabled={isUploading}
                    className={styles.uploadBtn}
                  >
                    {uploadButtonLabel}
                  </Button>
                </div>
              )}

              {uploadProgress && uploadProgress.total > 1 && (
                <div className={styles.progressBar}>
                  <div
                    className={styles.progressFill}
                    style={{ width: `${progressPercent}%` }}
                  />
                  <span className={styles.progressLabel}>
                    {progressPercent}%
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className={styles.statusSection}>
          <div className={styles.card}>
            <div className={styles.cardHeader}>
              <h2 className={styles.cardTitle}>Current Status</h2>
            </div>
            <div className={styles.cardContent}>
              {guideInfoQuery.isFetching && !guideInfoQuery.data ? (
                <Skeleton style={{ height: "100px" }} />
              ) : guideInfoQuery.data?.exists ? (
                <div className={styles.statusSuccess}>
                  <CheckCircle2 size={32} className={styles.successIcon} />
                  <div className={styles.statusDetails}>
                    <h3>Active Guide Found</h3>
                    <p className={styles.statusLabel}>
                      <strong>File:</strong>{" "}
                      {guideInfoQuery.data.fileName || "Custom Upload"}
                    </p>
                    {guideInfoQuery.data.updatedAt && (
                      <p className={styles.statusLabel}>
                        <strong>Updated:</strong>{" "}
                        {new Intl.DateTimeFormat("en-US", {
                          dateStyle: "medium",
                          timeStyle: "short",
                        }).format(new Date(guideInfoQuery.data.updatedAt))}
                      </p>
                    )}
                    <Badge variant="success" className={styles.statusBadge}>
                      Ready to send
                    </Badge>
                  </div>
                </div>
              ) : (
                <div className={styles.statusWarning}>
                  <AlertCircle size={32} className={styles.warningIcon} />
                  <div className={styles.statusDetails}>
                    <h3>No PDF Uploaded</h3>
                    <p className={styles.statusLabel}>
                      The system will fallback to dynamic generation.
                    </p>
                    <Badge variant="warning" className={styles.statusBadge}>
                      Dynamic Fallback Active
                    </Badge>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}