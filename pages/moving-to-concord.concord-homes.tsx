import React from "react";
import { MovingGuideArticle, MovingGuideData } from "../components/MovingGuideArticle";
import guideData from "../guide-data/concord-homes.json";

export default function MovingToConcordConcordHomesPage() {
  return <MovingGuideArticle guide={guideData as MovingGuideData} />;
}
