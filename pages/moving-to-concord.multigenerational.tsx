import React from "react";
import { MovingGuideArticle, MovingGuideData } from "../components/MovingGuideArticle";
import guideData from "../guide-data/multigenerational.json";

export default function MovingToConcordMultigenerationalPage() {
  return <MovingGuideArticle guide={guideData as MovingGuideData} />;
}
