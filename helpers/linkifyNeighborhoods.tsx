import React from "react";
import { Link } from "react-router-dom";

interface LinkableNeighborhood {
  name: string;
  slug: string;
}

export function linkifyNeighborhoods(
  text: string,
  neighborhoods: LinkableNeighborhood[],
  linkClassName?: string
): React.ReactNode[] {
  // Sort by length descending to match longest names first
  const sortedNeighborhoods = [...neighborhoods].sort(
    (a, b) => b.name.length - a.name.length
  );

  let elements: React.ReactNode[] = [text];

  for (const n of sortedNeighborhoods) {
    const nextElements: React.ReactNode[] = [];
    let linkedThisNeighborhood = false;

    for (const el of elements) {
      if (typeof el === "string" && !linkedThisNeighborhood) {
        const index = el.toLowerCase().indexOf(n.name.toLowerCase());
        if (index !== -1) {
          const before = el.slice(0, index);
          const match = el.slice(index, index + n.name.length);
          const after = el.slice(index + n.name.length);

          if (before) nextElements.push(before);
          nextElements.push(
            <Link
              key={n.slug}
              to={`/neighborhoods/${n.slug}`}
              className={linkClassName}
            >
              {match}
            </Link>
          );
          if (after) nextElements.push(after);

          linkedThisNeighborhood = true;
        } else {
          nextElements.push(el);
        }
      } else {
        nextElements.push(el);
      }
    }
    elements = nextElements;
  }

  return elements.map((el, i) => <React.Fragment key={i}>{el}</React.Fragment>);
}