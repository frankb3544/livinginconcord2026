import { useEffect } from "react";

export function useDomainRedirect() {
  useEffect(() => {
    // Only run in the browser
    if (typeof window === "undefined") return;

    // Do not run if inside an iframe (e.g., Floot sandbox preview)
    if (window.self !== window.top) return;

    const targetHostname = "livinginconcordnc.com";
    const currentHostname = window.location.hostname;

    // Only redirect from the legacy Floot hosts to the canonical domain.
    // Localhost, Vercel previews, and the canonical domain itself must
    // render in place (the original Floot version redirected every host,
    // which blanked local dev and would bounce all preview deployments).
    const legacyHosts = ["livingconcord.floot.app", "sandbox.floot.app"];
    if (!legacyHosts.includes(currentHostname)) return;

    // Construct the new URL maintaining path, query params, and hash
    const currentPath = window.location.pathname;
    const currentSearch = window.location.search;
    const currentHash = window.location.hash;

    const newUrl = `https://${targetHostname}${currentPath}${currentSearch}${currentHash}`;

    // Perform the redirect
    window.location.replace(newUrl);
  }, []);
}