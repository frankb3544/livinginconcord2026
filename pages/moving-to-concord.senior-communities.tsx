import React from "react";
import { MovingGuideArticle, MovingGuideData } from "../components/MovingGuideArticle";
import guideData from "../guide-data/senior-communities.json";

export default function MovingToConcordSeniorCommunitiesPage() {
  return <MovingGuideArticle guide={guideData as MovingGuideData} />;
}
