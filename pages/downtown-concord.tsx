import React from "react";
import { InfoPage, InfoPageData } from "../components/InfoPage";
import pageData from "../page-data/downtown-concord.json";

export default function DowntownConcordPage() {
  return (
    <InfoPage
      page={pageData as InfoPageData}
      ctaTitle="Thinking About Living Downtown?"
      ctaSubtitle="Call or text Franklin Bellamy at (704) 904-5142 for current downtown Concord listings and recent sales."
    />
  );
}
