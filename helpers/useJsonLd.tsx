import { Fragment } from "react";

/**
 * Declaratively injects JSON-LD script tags.
 * React 19 automatically hoists these to the document head.
 * 
 * @example
 * const jsonLd = useJsonLd({ "@context": "https://schema.org", "@type": "FAQPage", ... });
 * return (
 *   <>
 *     {jsonLd}
 *     <div><h1>FAQ</h1></div>
 *   </>
 * );
 */
export function useJsonLd(
  data: Record<string, any> | Record<string, any>[] | null
) {
  if (!data) return null;

  const schemas = Array.isArray(data) ? data : [data];

  return (
    <Fragment>
      {schemas.map((schema, index) => {
        const html = JSON.stringify(schema).replace(/</g, "\\u003c");
        return (
          <script
            key={index}
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: html }}
          />
        );
      })}
    </Fragment>
  );
}