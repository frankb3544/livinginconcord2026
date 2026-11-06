import React from "react";
import { MovingGuideArticle, MovingGuideData } from "../components/MovingGuideArticle";
import guideData from "../guide-data/pros-and-cons.json";

export default function MovingToConcordProsAndConsPage() {
  return <MovingGuideArticle guide={guideData as MovingGuideData} />;
}
