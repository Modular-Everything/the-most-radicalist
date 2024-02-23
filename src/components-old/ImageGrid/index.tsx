"use client";

import { useGSAP } from "@gsap/react";
import clsx from "clsx";
import type { gsap } from "gsap";
import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";

import { moveSideImages, moveTitleUp, scaleCenterImage } from "./animations";
import styles from "./ImageGrid.module.scss";

export function ImageGrid({
  timeline,
}: {
  timeline: gsap.core.Timeline | undefined;
}) {
  const container = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      timeline
        ?.add(moveTitleUp(".title"))
        .add(moveSideImages(".leftImage", ".rightImage"), "-=0.7")
        .add(scaleCenterImage(".centerImage", ".srcImage"), "<");
    },
    { dependencies: [timeline], scope: container }
  );

  return (
    <section className={styles.imageGrid} ref={container}>
      <div className={styles.imageGrid__inner}>
        <div className={clsx("leftImage", styles.imageGrid__imageWrapper)}>
          <Image
            sizes="(min-width: 1200px) 50vw, (min-width: 768px) 75vw, 100vw"
            quality={90}
            priority
            fill
            className={styles.imageGrid__image}
            src="/beer1.avif"
            alt=""
          />
        </div>

        <div className={styles.imageGrid__imageWrapper} />

        <Link
          href="/landing"
          className={clsx("centerImage", styles.imageGrid__imageWrapper)}
          data-wrapper-center
          onClick={(e) => {
            e.preventDefault();
            timeline?.play();
          }}
        >
          <div className={styles.imageGrid__textReveal}>
            <h2 className={clsx("title", styles.imageGrid__imageTitle)}>
              Good Beer
            </h2>
          </div>
          <Image
            priority
            fill
            className={clsx("srcImage", styles.imageGrid__image)}
            data-image-center
            src="/beer2.avif"
            alt=""
          />
        </Link>

        <div className={clsx("rightImage", styles.imageGrid__imageWrapper)}>
          <Image
            sizes="(min-width: 1200px) 50vw, (min-width: 768px) 75vw, 100vw"
            quality={90}
            priority
            fill
            className={clsx("rightImage", styles.imageGrid__image)}
            src="/beer3.avif"
            alt=""
          />
        </div>
      </div>
    </section>
  );
}
