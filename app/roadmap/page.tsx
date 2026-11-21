import type { Metadata } from "next";
import BreadcrumbSchema from "@/components/common/BreadcrumbSchema";
import CtaBand from "@/components/homepage/CtaBand";
import FaqSimple from "@/components/homepage/FaqSimple";
import {
  RoadmapHero,
  PhaseList,
  Communication,
  WhoYouWorkWith,
  WhatWeAsk,
  roadmapFaq,
} from "@/components/roadmap/RoadmapParts";

export const metadata: Metadata = {
  title: "Roadmap: how a Star Works project runs",
  description:
    "See the six steps of a Star Works project, from the first free call to launch and support, with timelines, who is involved and what you receive.",
  alternates: { canonical: "/roadmap" },
};

export default function RoadmapPage() {
  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: "Home", url: "/" },
          { name: "Roadmap", url: "/roadmap" },
        ]}
      />
      <div className="theme-dark">
        <RoadmapHero />
      </div>
      <div className="theme-round theme-light">
        <PhaseList />
      </div>
      <div className="theme-round theme-dark">
        <Communication />
      </div>
      <div className="theme-round theme-light">
        <WhoYouWorkWith />
      </div>
      <div className="theme-round theme-dark">
        <WhatWeAsk />
      </div>
      <div className="theme-round theme-light">
        <FaqSimple data={roadmapFaq} />
      </div>
      <div className="theme-round theme-dark">
        <CtaBand />
      </div>
    </>
  );
}
