"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useState } from "react";

import { Hero } from "@/components/Hero";

export default function LandingPage() {
  const [timeline, setTimeline] = useState<gsap.core.Timeline>();

  useGSAP(() => {
    const timeline = gsap.timeline();
    setTimeline(timeline);
  });

  return (
    <>
      <Hero timeline={timeline} />
      <div style={{ display: "grid", placeItems: "center", height: "100vh" }}>
        The rest of the site goes here...
      </div>
    </>
  );
}
