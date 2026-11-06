import { SITE_CONTACT_EMAIL, SITE_CONTACT_EMAIL_MAILTO } from "../helpers/siteContact";
import { ReactNode, Suspense, lazy } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AuthProvider } from "../helpers/useAuth";
import { ThemeModeProvider } from "../helpers/themeMode";
import { useDomainRedirect } from "../helpers/useDomainRedirect";
import { TooltipProvider } from "./Tooltip";
import { SonnerToaster } from "./SonnerToaster";
import { ScrollToHashElement } from "./ScrollToHashElement";
import { useServiceWorker } from "../helpers/useServiceWorker";
import { useGoogleAnalytics } from "../helpers/useGoogleAnalytics";

const RelocationGuidePopup = lazy(() => import("./RelocationGuidePopup").then(m => ({ default: m.RelocationGuidePopup })));
import { Helmet } from "react-helmet";
import { useJsonLd } from "../helpers/useJsonLd";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 60 * 1000, // 1 minute “fresh” window
    },
  },
});

export const GlobalContextProviders = ({
  children,
}: {
  children: ReactNode;
}) => {
  useDomainRedirect();
  useServiceWorker();
  useGoogleAnalytics();

  const globalJsonLd = useJsonLd([
    {
      "@context": "https://schema.org",
      "@type": "RealEstateAgent",
      name: "Franklin Bellamy | Living In Concord NC",
      url: "https://livinginconcordnc.com",
      telephone: "(704) 904-5142",
      email: SITE_CONTACT_EMAIL,
      address: {
        "@type": "PostalAddress",
        addressLocality: "Concord",
        addressRegion: "NC",
        postalCode: "28027",
        addressCountry: "US",
      },
      geo: {
        "@type": "GeoCoordinates",
        latitude: 35.4088,
        longitude: -80.5795,
      },
      areaServed: [
        { "@type": "City", name: "Concord", addressRegion: "NC" },
        { "@type": "AdministrativeArea", name: "Cabarrus County" },
        { "@type": "City", name: "Charlotte", addressRegion: "NC" },
        { "@type": "City", name: "Harrisburg", addressRegion: "NC" },
        { "@type": "City", name: "Kannapolis", addressRegion: "NC" },
      ],
      priceRange: "$$",
      aggregateRating: {
        "@type": "AggregateRating",
        ratingValue: "4.9",
        reviewCount: "100",
      },
      sameAs: ["https://www.instagram.com/unlockingrealestate"],
      knowsAbout: [
        "Concord NC real estate",
        "Cabarrus County homes",
        "Relocation services",
        "Charlotte Metro Area real estate",
      ],
    },
    {
      "@context": "https://schema.org",
      "@type": "Person",
      name: "Franklin Bellamy",
      jobTitle: "NC Licensed Real Estate Broker",
      worksFor: {
        "@type": "Organization",
        name: "Lifestyle International Realty / Unlocking Real Estate",
      },
      url: "https://livinginconcordnc.com/about",
      telephone: "(704) 904-5142",
      email: SITE_CONTACT_EMAIL,
      knowsAbout: [
        "Concord NC neighborhoods",
        "Cabarrus County real estate",
        "Relocation",
        "Charlotte Metro Area housing market",
      ],
    },
    {
      "@context": "https://schema.org",
      "@type": "WebSite",
      name: "Living In Concord NC",
      url: "https://livinginconcordnc.com",
      potentialAction: {
        "@type": "SearchAction",
        target: "https://livinginconcordnc.com/?s={search_term_string}",
        "query-input": "required name=search_term_string",
      },
    },
  ]);

  return (
    <QueryClientProvider client={queryClient}>
      <Helmet>
        <link rel="preconnect" href="https://res.cloudinary.com" crossOrigin="" />
        <link rel="preconnect" href="https://assets.floot.app" crossOrigin="" />
        <link rel="dns-prefetch" href="https://images.unsplash.com" />
        <link rel="manifest" href="/manifest.json" />
                <meta name="google-site-verification" content="sCb9gmr0P-VfUAzebYS8A_NnsKhBPI-nnGqYt0uzQmQ" />
        <meta name="theme-color" content="#1A2845" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <link
          rel="apple-touch-icon"
          href="https://assets.floot.app/017b3652-9495-4591-835a-c77af11e3c4b/c220c985-e81c-41fd-acb2-857b61b56eb5.png"
        />
      </Helmet>
      {globalJsonLd}
      <AuthProvider>
        <ThemeModeProvider>
          <ScrollToHashElement />
          <TooltipProvider>
            {children}
            <Suspense fallback={null}>
              <RelocationGuidePopup />
            </Suspense>
            <SonnerToaster />
          </TooltipProvider>
        </ThemeModeProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
};