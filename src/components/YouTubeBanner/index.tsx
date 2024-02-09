"use client";

import { useGSAP } from "@gsap/react";
import clsx from "clsx";
import gsap from "gsap";
import Image from "next/image";
import { useRef } from "react";
import ReactPlayer from "react-player";

import { showPoster, showYouTubeBanner } from "./animations";
import styles from "./YouTubeBanner.module.scss";

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
        src="/beer2.avif"
        fill
        alt=""
        className={clsx("poster", styles.youtube__poster)}
      />

      <div className={clsx("youtube", styles.youtube__wrapper)}>
        <ReactPlayer
          url="https://www.youtube.com/watch?v=x_acAPULk38?t=20s"
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
