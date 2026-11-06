import React from "react";
import { MovingGuideArticle, MovingGuideData } from "../components/MovingGuideArticle";
import guideData from "../guide-data/home-financing.json";

export default function MovingToConcordHomeFinancingPage() {
  return <MovingGuideArticle guide={guideData as MovingGuideData} />;
}
