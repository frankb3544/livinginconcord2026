import React from "react";
import { MovingGuideArticle, MovingGuideData } from "../components/MovingGuideArticle";
import guideData from "../guide-data/apartment-living.json";

export default function MovingToConcordApartmentLivingPage() {
  return <MovingGuideArticle guide={guideData as MovingGuideData} />;
}
