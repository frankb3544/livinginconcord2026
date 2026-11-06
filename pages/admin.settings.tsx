import React, { useState, useEffect } from "react";
import { Instagram, Facebook, Video, Youtube, Save, User, Image as ImageIcon, Briefcase, FileText } from "lucide-react";
import { toast } from "sonner";
import { useSocialLinks } from "../helpers/useSocialLinks";
import { useAgentProfile } from "../helpers/useAgentProfile";
import { Button } from "../components/Button";
import { Input } from "../components/Input";
import { Skeleton } from "../components/Skeleton";
import styles from "./admin.settings.module.css";

export default function AdminSettingsPage() {
  const { socialLinksQuery, updateSocialLinksMutation } = useSocialLinks();
  const { data: socialData, isLoading: isSocialLoading } = socialLinksQuery;

  const { agentProfileQuery, updateAgentProfileMutation } = useAgentProfile();
  const { data: agentData, isLoading: isAgentLoading } = agentProfileQuery;

  const [socialFormData, setSocialFormData] = useState({
    instagram: "",
    facebook: "",
    tiktok: "",
    youtube: "",
  });

  const [agentFormData, setAgentFormData] = useState({
    name: "",
    title: "",
    description: "",
    imageUrl: "",
  });

  // Sync server data to local form state when loaded
  useEffect(() => {
    if (socialData) {
      setSocialFormData({
        instagram: socialData.instagram || "",
        facebook: socialData.facebook || "",
        tiktok: socialData.tiktok || "",
        youtube: socialData.youtube || "",
      });
    }
  }, [socialData]);

  useEffect(() => {
    if (agentData) {
      setAgentFormData({
        name: agentData.name || "",
        title: agentData.title || "",
        description: agentData.description || "",
        imageUrl: agentData.imageUrl || "",
      });
    }
  }, [agentData]);

  const handleSocialInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setSocialFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleAgentInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setAgentFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSocialSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await updateSocialLinksMutation.mutateAsync(socialFormData);
      toast.success("Social links updated successfully");
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Failed to update social links"
      );
    }
  };

  const handleAgentSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await updateAgentProfileMutation.mutateAsync(agentFormData);
      toast.success("Agent profile updated successfully");
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Failed to update agent profile"
      );
    }
  };

  const isSocialPending = updateSocialLinksMutation.isPending;
  const isAgentPending = updateAgentProfileMutation.isPending;

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.headerText}>
          <h1 className={styles.title}>Site Settings</h1>
          <p className={styles.subtitle}>
            Manage global site configurations and external links.
          </p>
        </div>
      </div>

      <div className={styles.grid}>
        <form className={styles.card} onSubmit={handleAgentSubmit}>
          <div className={styles.cardHeader}>
            <h2 className={styles.cardTitle}>Agent Profile</h2>
            <p className={styles.cardDesc}>
              Update your personal details shown on the website's author cards and about sections.
            </p>
          </div>

          <div className={styles.cardContent}>
            {isAgentLoading ? (
              <div className={styles.skeletonGroup}>
                <Skeleton className={styles.skeletonLabel} />
                <Skeleton className={styles.skeletonInput} />
                
                <Skeleton className={styles.skeletonLabel} />
                <Skeleton className={styles.skeletonInput} />
                
                <Skeleton className={styles.skeletonLabel} />
                <Skeleton className={styles.skeletonInput} />
                
                <Skeleton className={styles.skeletonLabel} />
                <Skeleton className={styles.skeletonInput} />
              </div>
            ) : (
              <div className={styles.formGroupList}>
                <div className={styles.formGroup}>
                  <label htmlFor="name" className={styles.label}>
                    <User size={18} className={styles.labelIcon} />
                    Agent Name
                  </label>
                  <Input
                    id="name"
                    name="name"
                    type="text"
                    placeholder="e.g. Franklin Bellamy"
                    value={agentFormData.name}
                    onChange={handleAgentInputChange}
                    disabled={isAgentPending}
                  />
                </div>

                <div className={styles.formGroup}>
                  <label htmlFor="title" className={styles.label}>
                    <Briefcase size={18} className={styles.labelIcon} />
                    Title
                  </label>
                  <Input
                    id="title"
                    name="title"
                    type="text"
                    placeholder="e.g. Broker / Realtor"
                    value={agentFormData.title}
                    onChange={handleAgentInputChange}
                    disabled={isAgentPending}
                  />
                </div>

                <div className={styles.formGroup}>
                  <label htmlFor="description" className={styles.label}>
                    <FileText size={18} className={styles.labelIcon} />
                    Short Description
                  </label>
                  <Input
                    id="description"
                    name="description"
                    type="text"
                    placeholder="Brief bio for author cards..."
                    value={agentFormData.description}
                    onChange={handleAgentInputChange}
                    disabled={isAgentPending}
                  />
                </div>

                <div className={styles.formGroup}>
                  <label htmlFor="imageUrl" className={styles.label}>
                    <ImageIcon size={18} className={styles.labelIcon} />
                    Profile Image URL
                  </label>
                  <Input
                    id="imageUrl"
                    name="imageUrl"
                    type="url"
                    placeholder="https://... paste an image URL"
                    value={agentFormData.imageUrl}
                    onChange={handleAgentInputChange}
                    disabled={isAgentPending}
                  />
                </div>
              </div>
            )}
          </div>

          <div className={styles.cardFooter}>
            <Button type="submit" disabled={isAgentLoading || isAgentPending}>
              {isAgentPending ? (
                "Saving..."
              ) : (
                <>
                  <Save size={16} /> Save Changes
                </>
              )}
            </Button>
          </div>
        </form>

        <form className={styles.card} onSubmit={handleSocialSubmit}>
          <div className={styles.cardHeader}>
            <h2 className={styles.cardTitle}>Social Media Links</h2>
            <p className={styles.cardDesc}>
              Update the social media URLs displayed in the site footer and contact pages.
            </p>
          </div>

          <div className={styles.cardContent}>
            {isSocialLoading ? (
              <div className={styles.skeletonGroup}>
                <Skeleton className={styles.skeletonLabel} />
                <Skeleton className={styles.skeletonInput} />
                
                <Skeleton className={styles.skeletonLabel} />
                <Skeleton className={styles.skeletonInput} />
                
                <Skeleton className={styles.skeletonLabel} />
                <Skeleton className={styles.skeletonInput} />
              </div>
            ) : (
              <div className={styles.formGroupList}>
                <div className={styles.formGroup}>
                  <label htmlFor="instagram" className={styles.label}>
                    <Instagram size={18} className={styles.labelIcon} />
                    Instagram URL
                  </label>
                  <Input
                    id="instagram"
                    name="instagram"
                    type="url"
                    placeholder="https://instagram.com/yourhandle"
                    value={socialFormData.instagram}
                    onChange={handleSocialInputChange}
                    disabled={isSocialPending}
                  />
                </div>

                <div className={styles.formGroup}>
                  <label htmlFor="facebook" className={styles.label}>
                    <Facebook size={18} className={styles.labelIcon} />
                    Facebook URL
                  </label>
                  <Input
                    id="facebook"
                    name="facebook"
                    type="url"
                    placeholder="https://facebook.com/yourpage"
                    value={socialFormData.facebook}
                    onChange={handleSocialInputChange}
                    disabled={isSocialPending}
                  />
                </div>

                <div className={styles.formGroup}>
                  <label htmlFor="tiktok" className={styles.label}>
                    <Video size={18} className={styles.labelIcon} />
                    TikTok URL
                  </label>
                  <Input
                    id="tiktok"
                    name="tiktok"
                    type="url"
                    placeholder="https://tiktok.com/@yourhandle"
                    value={socialFormData.tiktok}
                    onChange={handleSocialInputChange}
                    disabled={isSocialPending}
                  />
                </div>

                <div className={styles.formGroup}>
                  <label htmlFor="youtube" className={styles.label}>
                    <Youtube size={18} className={styles.labelIcon} />
                    YouTube URL
                  </label>
                  <Input
                    id="youtube"
                    name="youtube"
                    type="url"
                    placeholder="https://youtube.com/@yourchannel"
                    value={socialFormData.youtube}
                    onChange={handleSocialInputChange}
                    disabled={isSocialPending}
                  />
                </div>
              </div>
            )}
          </div>

          <div className={styles.cardFooter}>
            <Button type="submit" disabled={isSocialLoading || isSocialPending}>
              {isSocialPending ? (
                "Saving..."
              ) : (
                <>
                  <Save size={16} /> Save Changes
                </>
              )}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}