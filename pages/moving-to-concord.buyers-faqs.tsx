import React from "react";
import { MovingGuideArticle, MovingGuideData } from "../components/MovingGuideArticle";
import guideData from "../guide-data/buyers-faqs.json";

export default function MovingToConcordBuyersFaqsPage() {
  return <MovingGuideArticle guide={guideData as MovingGuideData} />;
}
