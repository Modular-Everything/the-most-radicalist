"use client";

import { useGSAP } from "@gsap/react";
import clsx from "clsx";
import gsap from "gsap";
import { MotionPathPlugin } from "gsap/all";
import _SplitText from "gsap/SplitText";
import { SplitText } from "gsap-trial/all";
import Image from "next/image";
import { useContext, useRef } from "react";

import { AppContext } from "@/app/providers";

import styles from "./BrandedHero.module.scss";

gsap.registerPlugin(MotionPathPlugin, SplitText);

export function BrandedHero() {
  const container = useRef<HTMLDivElement>(null);
  const { isLoading } = useContext(AppContext);

  // useGSAP(
  //   () => {
  //     if (!isLoading) {
  //       brandedText(".brandedText", ".logo");
  //     }
  //   },
  //   { dependencies: [isLoading], scope: container }
  // );

  return (
    <section className={styles.hero} ref={container}>
      <div className={styles.hero__overlay}>
        <Column image={"/tmdistant-shoot.webp"} quantity={3} />
        <Column image={"/tmdistant-shoot.webp"} quantity={3} />
        <Column image={"/tmdistant-shoot.webp"} quantity={3} />
        <Column image={"/tmdistant-shoot.webp"} quantity={3} />
        <Column image={"/tmdistant-shoot.webp"} quantity={3} />
      </div>
    </section>
  );
}

function Column({ image, quantity }: { image: string; quantity: number }) {
  const images = Array(quantity).fill(image);

  const containerRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);

  useGSAP(
    () => {
      const imageWidth = imageRef.current.width;
      const imageHeight = imageRef.current.height;

      const path = [
        { x: 0, y: 0 },
        { x: imageWidth, y: 0 },
        { x: imageWidth, y: imageHeight },
        { x: 0, y: imageHeight },
        { x: 0, y: 0 },
      ];

      const textSources = containerRef.current?.querySelectorAll(".text");
      const splitText: _SplitText[] = [];
      textSources?.forEach((el) => {
        const split = new SplitText(el, {
          type: "chars",
          charsClass: "char",
          position: "absolute",
        });
        split.chars.reverse();
        splitText.push(split);
      });

      splitText.forEach((text) => {
        gsap.to(text.chars, {
          motionPath: {
            path,
            curviness: 0,
            autoRotate: true,
            align: "self",
          },
          stagger: {
            each: 0.3,
            repeat: -1,
          },
          duration: 10,
          ease: "none",
        });
      });
    },
    { scope: containerRef }
  );

  return (
    <div className={styles.hero__overlay__column} ref={containerRef}>
      {images.map((src, index: number) => (
        <div
          key={index}
          className={styles.hero__overlay__column__imageContainer}
        >
          <div className={clsx(styles.text, "text")}>The Most Radicalist</div>
          <Image src={src} fill alt="" sizes="50vw" ref={imageRef} />
        </div>
      ))}
    </div>
  );
}
