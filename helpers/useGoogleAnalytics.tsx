import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import ReactGA from "react-ga4";

const GA_MEASUREMENT_ID = "G-LZBP1XPWZ1";
let isInitialized = false;

/**
 * A custom hook to initialize Google Analytics 4 and track page views.
 * Listens to location changes from react-router-dom and automatically
 * sends pageview hits.
 */
export function useGoogleAnalytics() {
  const location = useLocation();

  useEffect(() => {
    // Avoid running analytics inside the Floot development sandbox
    const isSandbox = window.location.hostname.includes("sandbox.floot.app");

    if (isSandbox) {
      return;
    }

    // Initialize GA4 only once
    if (!isInitialized) {
      ReactGA.initialize(GA_MEASUREMENT_ID);
      isInitialized = true;
    }

    // Track the page view on route change
    ReactGA.send({
      hitType: "pageview",
      page: location.pathname + location.search,
    });
  }, [location.pathname, location.search]);
}