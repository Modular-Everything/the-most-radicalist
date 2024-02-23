"use client";

import { useGSAP } from "@gsap/react";
import clsx from "clsx";
import Image from "next/image";
import { useContext, useRef } from "react";

import { AppContext } from "@/app/providers";
import { Logo } from "@/icons/Logo";

import { brandedText } from "./animations";
import styles from "./Hero.module.scss";

interface HeroProps {
  branded?: boolean;
}

export function Hero({ branded }: HeroProps) {
  const container = useRef<HTMLHeadingElement>(null);
  const { isLoading } = useContext(AppContext);

  useGSAP(
    () => {
      if (!isLoading) {
        brandedText(".brandedText", ".logo");
      }
    },
    { dependencies: [isLoading], scope: container }
  );

  return (
    <section className={styles.hero}>
      <h1 className={styles.hero__overlay} ref={container}>
        {branded && (
          <div className={styles.hero__overlay__branded}>
            <span className="brandedText">The</span>
            <span className={clsx("brandedText logo", styles.logo)}>
              <Logo />
            </span>
            <span className="brandedText">Most</span>
            <span className="brandedText">Radicalist</span>
          </div>
        )}
      </h1>

      <Image src="/tmdistant.jpeg" alt="" width={1440} height={720} priority />
    </section>
  );
}
