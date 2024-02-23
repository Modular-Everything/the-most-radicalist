"use client";

import { useGSAP } from "@gsap/react";
import clsx from "clsx";
import gsap from "gsap";
import dynamic from "next/dynamic";
import Image from "next/image";
import { useRef } from "react";

import { showPoster, showYouTubeBanner } from "./animations";
import styles from "./YouTubeBanner.module.scss";

const ReactPlayer = dynamic(() => import("react-player/lazy"), { ssr: false });

export function YouTubeBanner() {
  const container = useRef<HTMLDivElement | null>(null);

  useGSAP(
    () => {
      const timeline = gsap.timeline();
      timeline.add(showPoster(".poster")).add(showYouTubeBanner(".youtube"));
    },
    { scope: container }
  );

  return (
    <section className={styles.youtube} ref={container}>
      <Image
        src="/ytthumb.jpeg"
        width={1600}
        height={900}
        sizes="(max-width: 768px) 60vw, 100vw"
        alt=""
        className={clsx("poster", styles.youtube__poster)}
      />

      <div className={clsx("youtube", styles.youtube__wrapper)}>
        <ReactPlayer
          url="https://www.youtube.com/watch?v=x_acAPULk38?t=50s"
          muted
          playing
          width="100%"
          height="auto"
          playsinline
          className={styles.youtube__embed}
        />
      </div>
    </section>
  );
}
