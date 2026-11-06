import { SITE_CONTACT_EMAIL } from "./siteContact";

export const LIVING_IN_CONCORD_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "RealEstateAgent",
  "@id": "https://livinginconcordnc.com/#organization",
  "name": "Living in Concord NC",
  "image": "https://livinginconcordnc.com/logo.webp",
  "url": "https://livinginconcordnc.com",
  "telephone": "(704) 904-5142",
  "email": SITE_CONTACT_EMAIL,
  "description": "Expert real estate guidance for buying, selling, and relocating in Concord NC",
  "address": {
    "@type": "PostalAddress",
    "addressLocality": "Concord",
    "addressRegion": "NC",
    "postalCode": "28027",
    "addressCountry": "US"
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": 35.4088,
    "longitude": -80.5795
  },
  "openingHoursSpecification": [
    {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      "opens": "08:00",
      "closes": "18:00"
    },
    {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": "Saturday",
      "opens": "09:00",
      "closes": "17:00"
    }
  ],
  "areaServed": [
    "Concord NC",
    "Cabarrus County",
    "Charlotte Metro Area",
    "Harrisburg NC",
    "Kannapolis NC"
  ],
  "priceRange": "$$",
  "currenciesAccepted": "USD",
  "paymentAccepted": "Check, Credit Card",
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "4.9",
    "reviewCount": "100",
    "bestRating": "5",
    "worstRating": "1"
  },
  "sameAs": [
    "https://www.instagram.com/unlockingrealestate"
  ],
  "founder": {
    "@id": "https://livinginconcordnc.com/#founder"
  }
};

export const FRANKLIN_BELLAMY_PERSON_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "Person",
  "@id": "https://livinginconcordnc.com/#founder",
  "name": "Franklin Bellamy",
  "jobTitle": "NC Licensed Real Estate Broker",
  "url": "https://livinginconcordnc.com/about",
  "telephone": "(704) 904-5142",
  "email": SITE_CONTACT_EMAIL,
  "worksFor": {
    "@id": "https://livinginconcordnc.com/#organization"
  },
  "affiliation": {
    "@type": "Organization",
    "name": "Lifestyle International Realty"
  },
  "hasCredential": [
    {
      "@type": "EducationalOccupationalCredential",
      "credentialCategory": "NC Real Estate Broker License",
      "recognizedBy": { "@type": "Organization", "name": "North Carolina Real Estate Commission" }
    }
  ],
  "knowsAbout": [
    "Concord NC Real Estate",
    "Relocation Services",
    "First-Time Home Buyers",
    "Luxury Homes",
    "Concord NC neighborhoods",
    "Cabarrus County real estate",
    "Charlotte Metro Area housing market"
  ]
};