import { useNavigate } from "react-router-dom";
import { useCallbackRef } from "./useCallbackRef";

/**
 * Returns a click handler for a container that uses dangerouslySetInnerHTML.
 * Intercepts clicks on internal anchor tags (href starting with "/") and
 * navigates using React Router instead of causing a full page reload.
 */
export function useBlogInternalLinks() {
  const navigate = useNavigate();

  const handleClick = useCallbackRef((e: React.MouseEvent<HTMLElement>) => {
    const target = e.target as HTMLElement;
    const anchor = target.closest("a");
    if (!anchor) return;

    const href = anchor.getAttribute("href");
    if (!href) return;

    // Only intercept internal links (starting with /)
    if (!href.startsWith("/")) return;

    e.preventDefault();
    console.log("[useBlogInternalLinks] Navigating to internal link:", href);
    navigate(href);
  });

  return handleClick;
}