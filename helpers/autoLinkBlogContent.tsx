/**
 * Escapes special characters in a string for use in a regular expression.
 */
function escapeRegExp(str: string): string {
  return str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

/**
 * Processes raw HTML blog content and automatically injects internal links
 * for specific keywords (neighborhoods, market reports, guides, etc.).
 * 
 * Rules:
 * 1. Never double-link text already inside an <a> tag.
 * 2. Only link the FIRST occurrence of each term.
 * 3. Handles existing HTML tags without corrupting them.
 * 
 * @param html The raw HTML string of the blog content.
 * @param currentSlug The slug of the current blog post (can be used to avoid self-linking if needed).
 * @param neighborhoods List of neighborhood objects to link to.
 * @returns The modified HTML string with injected internal links.
 */
export function autoLinkBlogContent(
  html: string,
  currentSlug: string,
  neighborhoods: { slug: string; name: string }[],
  blogPosts: { slug: string; title: string }[] = []
): string {
  if (!html || typeof html !== "string") {
    return html || "";
  }

  const safeNeighborhoods = neighborhoods || [];
  const safeBlogPosts = blogPosts || [];
  let processedHtml = html;

  /**
   * Helper function to find the first occurrence of any phrase from the list
   * and replace it with an anchor tag, ignoring matches inside existing HTML tags.
   */
  const linkPhrases = (phrases: string[], url: string) => {
    if (!phrases || phrases.length === 0) return;

    // Sort phrases by length descending to match longer specific phrases before shorter ones
    // e.g. "moving to concord guide" should match before "moving guide"
    const sortedPhrases = [...phrases].sort((a, b) => b.length - a.length);
    const escapedPhrases = sortedPhrases.map(escapeRegExp);
    const pattern = `\\b(${escapedPhrases.join("|")})\\b`;

    // If any phrase in this group is already inside an existing <a> tag, skip linking entirely.
    // This prevents double-linking content that was already manually linked by the author.
    const alreadyLinkedPattern = new RegExp(
      `<a[^>]*>[^<]*(${escapedPhrases.join("|")})[^<]*<\\/a>`,
      "i"
    );
    if (alreadyLinkedPattern.test(processedHtml)) {
      console.log(`[autoLinkBlogContent] Skipping phrases already linked in existing <a> tag: [${phrases.join(", ")}]`);
      return;
    }

    let replaced = false;

    // Regex explanation:
    // Group 1: (<a\b[^>]*>[\s\S]*?<\/a>|<[^>]+>) matches any full <a>...</a> block OR any single HTML tag <...>.
    // Group 2: matches the target phrases.
    // By replacing, if Group 1 matches, we just return it untouched. If Group 2 matches and we haven't replaced yet, we link it.
    const regex = new RegExp(`(<a\\b[^>]*>[\\s\\S]*?<\\/a>|<[^>]+>)|(${pattern})`, "gi");

    processedHtml = processedHtml.replace(regex, (match, tag, text) => {
      // If the match is an HTML tag (or existing <a> block), leave it entirely alone
      if (tag) {
        return tag;
      }
      
      // If we matched the text and haven't replaced this conceptual target yet
      if (text && !replaced) {
        replaced = true;
        return `<a href="${url}">${text}</a>`;
      }

      // If already replaced, just return the text as is
      return match;
    });
  };

  // 1. Neighborhoods Hub
  linkPhrases(
    ["Concord neighborhoods", "Concord NC neighborhoods", "neighborhoods in Concord"],
    "/neighborhoods"
  );

  // 2. Individual Neighborhoods (Link each neighborhood at most once)
  for (const nh of safeNeighborhoods) {
    if (nh.name && nh.slug) {
      linkPhrases([nh.name], `/neighborhoods/${nh.slug}`);
    }
  }

  // 3. Market Reports
  linkPhrases(
    [
      "housing market report",
      "market reports",
      "market report",
      "market data",
    ],
    "/market-reports"
  );

  // 4. Relocation Guide
  linkPhrases(
    [
      "moving to concord guide",
      "relocation guide",
      "moving guide"
    ],
    "/moving-to-concord"
  );

  // 5. Franklin Bellamy
  linkPhrases(["Franklin Bellamy"], "/about");

  // 6. Contact / Consultation
  linkPhrases(
    [
      "schedule a consultation",
      "schedule a call",
      "schedule a showing",
      "schedule a tour",
      "consultation",
      "contact",
    ],
    "/contact"
  );

  // 7. Cross-link other blog posts
  for (const post of safeBlogPosts) {
    if (post.slug && post.title && post.slug !== currentSlug) {
      const phrases = [post.title];
      
      // Attempt to create a shorter phrase by stripping generic location keywords
      // and cleaning up leftover dangling punctuation
      const withoutConcord = post.title
        .replace(/\bConcord NC\b/gi, '')
        .trim()
        .replace(/^[:\-]+|[:\-]+$/g, '')
        .trim();
        
      if (withoutConcord && withoutConcord.length > 4) {
        phrases.push(withoutConcord);
      }
      
      // If there's a colon, the part before the colon is usually a strong conceptual phrase
      if (post.title.includes(':')) {
        const prefix = post.title.split(':')[0].trim();
        if (prefix.length > 4) {
          phrases.push(prefix);
        }
      }

      // Deduplicate the generated phrases and pass them to linkPhrases
      const uniquePhrases = Array.from(new Set(phrases));
      linkPhrases(uniquePhrases, `/blog/${post.slug}`);
    }
  }

  return processedHtml;
}