// @ts-nocheck

"use client";

import { useGSAP } from "@gsap/react";
import clsx from "clsx";
import gsap from "gsap";
import Image from "next/image";
import { MouseEvent, useRef } from "react";

import { Pill } from "@/components/Pill";
import { relativeDate } from "@/helpers/relativeDate";
import { CardProps } from "@/types/cards";

import styles from "./Cards.module.scss";

export function CardMedium({
  className,
  artist,
  media,
  date,
  track,
  copy,
  tags,
  background,
  ...rest
}: CardProps) {
  const container = useRef<HTMLElement>(null);
  const xTo = useRef();
  const yTo = useRef();

  const { contextSafe } = useGSAP(
    () => {
      xTo.current = gsap.quickTo(".overlay", "x", {
        duration: 2,
        ease: "power3",
      });
      yTo.current = gsap.quickTo(".overlay", "y", {
        duration: 2,
        ease: "power3",
      });
    },
    { scope: container }
  );

  const moveOverlay = contextSafe((e: MouseEvent) => {
    const rect = container.current?.getBoundingClientRect();
    const overlayCenterX = rect?.left + rect?.width / 4;
    const overlayCenterY = rect?.top + rect?.height / 4;

    xTo.current(e.clientX - overlayCenterX);
    yTo.current(e.clientY - overlayCenterY);
  });

  return (
    <article
      ref={container}
      className={clsx(styles.card, styles.card__medium, className)}
      onMouseMove={(e) => moveOverlay(e)}
      {...rest}
    >
      <div className={styles.card__background}>
        <div
          className={clsx("overlay", styles.card__background__gradient)}
          style={{ background }}
        />
      </div>

      <div className={styles.card__wrapper}>
        <div className={styles.card__medium__info}>
          <div className={styles.card__medium__date}>
            {date && <Pill label={relativeDate(date)} />}
          </div>

          <div className={styles.card__medium__meta}>
            {artist && <h4>{artist}</h4>}
            {track && <h6>{track}</h6>}
            {copy && <p>{copy}</p>}

            <ul className={styles.card__medium__tags}>
              {tags?.map((tag, index) => <li key={index}>{tag}</li>)}
            </ul>
          </div>
        </div>
        {media && (
          <div className={styles.card__medium__media}>
            <Image
              src={media}
              alt=""
              fill
              sizes="(min-width: 1280px) 25vw, (min-width: 768px) 50vw, 90vw"
            />
          </div>
        )}
      </div>
    </article>
  );
}
