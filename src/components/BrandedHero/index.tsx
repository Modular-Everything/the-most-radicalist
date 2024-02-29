"use client";

import { useGSAP } from "@gsap/react";
import clsx from "clsx";
import gsap from "gsap";
import { MotionPathPlugin } from "gsap/all";
import { SplitText } from "gsap-trial/all";
import Image from "next/image";
import { useContext, useRef } from "react";

import { AppContext } from "@/app/providers";
import { horizontalLoop } from "@/helpers/horizontalLoop";

import styles from "./BrandedHero.module.scss";

gsap.registerPlugin(MotionPathPlugin, SplitText);

export function BrandedHero() {
  const container = useRef<HTMLDivElement>(null);
  const { isLoading } = useContext(AppContext);
  const tl = useRef(null);

  useGSAP(
    () => {
      if (!isLoading) {
        tl.current = gsap
          .timeline({
            ease: "expo.inOut",
          })
          .to(".loaderImage", {
            scale: 1,
            delay: 1,
          })
          .to(".imageContainer", {
            opacity: 1,
            stagger: {
              each: 0.05,
            },
          })
          .to(
            ".horizontalMarquee",
            {
              opacity: 1,
            },
            "-=0.75"
          )
          .to(
            ".verticalMarquee",
            {
              opacity: 1,
            },
            "-=0.25"
          );
      }
    },
    { scope: container, dependencies: [isLoading] }
  );

  return (
    <section className={styles.hero} ref={container}>
      <div className={styles.hero__overlay__loader}>
        <div
          className={clsx(styles.hero__overlay__loader__image, "loaderImage")}
        >
          <Image src={"/tmdistant-shoot.webp"} fill alt="" sizes="100vw" />
        </div>
      </div>

      <div className={clsx(styles.hero__overlay, "overlay")}>
        <Column image={"/tmdistant-shoot.webp"} quantity={3} />
        <VerticalMarqueeText />
        <Column image={"/tmdistant-shoot.webp"} quantity={3} />
        <VerticalMarqueeText />
        <Column image={"/tmdistant-shoot.webp"} quantity={3} />
        <VerticalMarqueeText />
        <Column image={"/tmdistant-shoot.webp"} quantity={3} />
        <VerticalMarqueeText />
        <Column image={"/tmdistant-shoot.webp"} quantity={3} />
      </div>
    </section>
  );
}

function Column({ image, quantity }: { image: string; quantity: number }) {
  const images = Array(quantity).fill(image);
  const imageRef = useRef<HTMLImageElement>(null);

  return (
    <div className={styles.hero__overlay__column}>
      {images.map((src, index: number) => (
        <>
          <div
            key={index}
            className={clsx(
              styles.hero__overlay__column__imageContainer,
              "imageContainer"
            )}
          >
            <Image src={src} fill alt="" sizes="50vw" ref={imageRef} />
          </div>
          {(index !== 0 || index !== images.length - 1) && (
            <HorizontalMarqueeText />
          )}
        </>
      ))}
    </div>
  );
}

function HorizontalMarqueeText() {
  const container = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const boxes = gsap.utils.toArray(".box");
      horizontalLoop(boxes, {
        repeat: -1,
      });
    },
    { scope: container }
  );

  return (
    <div
      className={clsx(styles.hero__overlay__text, "horizontalMarquee")}
      ref={container}
    >
      {Array(2)
        .fill(null)
        .map((_, i) => (
          <span
            key={i}
            className={clsx(styles.hero__overlay__text__inner, "box")}
          >
            The Most Radicalist
          </span>
        ))}
    </div>
  );
}

function VerticalMarqueeText() {
  const container = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const boxes = gsap.utils.toArray(".box");
      horizontalLoop(boxes, {
        repeat: -1,
      });
    },
    { scope: container }
  );

  return (
    <div
      className={clsx(
        styles.hero__overlay__text,
        styles.hero__overlay__textRotated,
        "verticalMarquee"
      )}
      ref={container}
    >
      {Array(4)
        .fill(null)
        .map((_, i) => (
          <span
            key={i}
            className={clsx(styles.hero__overlay__text__inner, "box")}
          >
            The Most Radicalist
          </span>
        ))}
    </div>
  );
}
