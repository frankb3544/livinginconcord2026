import React from "react";
import { MovingGuideArticle, MovingGuideData } from "../components/MovingGuideArticle";
import guideData from "../guide-data/growing-families.json";

export default function MovingToConcordGrowingFamiliesPage() {
  return <MovingGuideArticle guide={guideData as MovingGuideData} />;
}
