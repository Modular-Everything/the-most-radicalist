"use client";

import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { useRouter } from "next/navigation";
import { useState } from "react";

import { ImageGrid } from "@/components/ImageGrid";

// To do
// - [x] Set up router
// - [x] useGSAP to trigger on page load
// - [x] Set up timeline
// - [x] Timeline paused initially
// - [ ] Set up timeline as a state?

export default function Home() {
  const router = useRouter();
  const [timeline, setTimeline] = useState<gsap.core.Timeline>();

  useGSAP(() => {
    const timeline = gsap.timeline({
      paused: true,
      onStart: () => router.prefetch("/landing"),
      onComplete: () => router.push("/landing"),
    });
    setTimeline(timeline);
  });

  return <ImageGrid timeline={timeline} />;
}
