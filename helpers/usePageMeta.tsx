import React from "react";

export interface PageMeta {
  title: string;
  description: string;
  canonicalPath?: string;
  ogType?: string;
  ogImage?: string;
  noIndex?: boolean;
  articlePublishedTime?: string;
  articleAuthor?: string;
}

/**
 * Returns a React fragment with standard SEO meta tags.
 * React 19 will automatically hoist these to the document <head>.
 * Note: Must be rendered in the component tree to take effect.
 * 
 * @example
 * const meta = usePageMeta({ title: "Home", description: "..." });
 * return <div>{meta}<h1>Home</h1></div>;
 */
export function usePageMeta({
  title,
  description,
  canonicalPath,
  ogType = "website",
  ogImage,
  noIndex,
  articlePublishedTime,
  articleAuthor,
}: PageMeta) {
    const fullTitle = title;
  const domain = "https://livinginconcordnc.com";
  const canonicalUrl = canonicalPath
    ? `${domain}${canonicalPath.startsWith("/") ? canonicalPath : `/${canonicalPath}`}`
    : undefined;

  return (
    <>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      
      {noIndex && <meta name="robots" content="noindex" />}
      {canonicalUrl && <link rel="canonical" href={canonicalUrl} />}
      
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content={ogType} />
      <meta property="og:site_name" content="LivingInConcord.com" />
      <meta property="og:locale" content="en_US" />
      {canonicalUrl && <meta property="og:url" content={canonicalUrl} />}
      {ogImage && <meta property="og:image" content={ogImage} />}
      {articlePublishedTime && <meta property="article:published_time" content={articlePublishedTime} />}
      {articleAuthor && <meta property="article:author" content={articleAuthor} />}
      
      <meta
        name="twitter:card"
        content={ogImage ? "summary_large_image" : "summary"}
      />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      {ogImage && <meta name="twitter:image" content={ogImage} />}
    </>
  );
}