import React from "react";
import { MovingGuideArticle, MovingGuideData } from "../components/MovingGuideArticle";
import guideData from "../guide-data/commuting.json";

export default function MovingToConcordCommutingPage() {
  return <MovingGuideArticle guide={guideData as MovingGuideData} />;
}
