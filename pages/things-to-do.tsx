import React from "react";
import { InfoPage, InfoPageData } from "../components/InfoPage";
import pageData from "../page-data/things-to-do.json";

export default function ThingsToDoPage() {
  return <InfoPage page={pageData as InfoPageData} />;
}
