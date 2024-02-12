"use client";

import { useGSAP } from "@gsap/react";
import clsx from "clsx";
import gsap from "gsap";
import Image from "next/image";
import { useEffect, useRef } from "react";

import { animateMediumCards } from "./animations";
import styles from "./CardMarquee.module.scss";
import cards from "./mock-data";
import { CardProps } from "./types";

function SmallCard({ artist, media, date, track, copy, tags }: CardProps) {
  return (
    <>
      <div className={styles.marquee__card__info}>
        {artist && <h4>{artist}</h4>}
      </div>
      {media && (
        <div className={styles.marquee__card__media}>
          <Image
            src={media}
            alt=""
            fill
            sizes="(min-width: 1280px) 25vw, (min-width: 768px) 50vw, 90vw"
          />
        </div>
      )}
    </>
  );
}

export function CardMarquee() {
  const container = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const totalCards = cards.length;
    const cardSpeed = Math.floor(totalCards / 2);
    // set the card-count CSS variable to totalCards
    container.current?.style.setProperty("--card-count", totalCards.toString());
    // set the card-speed CSS variable to cardSpeed
    container.current?.style.setProperty(
      "--card-speed",
      `${cardSpeed.toString()}s`
    );
  }, []);

  useGSAP(
    () => {
      animateMediumCards(".card");
    },
    { scope: container }
  );

  return (
    <div className={styles.marquee} ref={container}>
      <div className={styles.marquee__track}>
        <div className={styles.marquee__grid}>
          {cards?.map((card) => (
            <article
              className={clsx("card", styles.marquee__card)}
              key={card.id}
            >
              <SmallCard
                artist={card.artist}
                media={card.media}
                date={card.data}
                track={card.artistTrack}
                copy={card.copy}
                tags={card.tags}
              />
            </article>
          ))}
          {cards?.map((card) => (
            <article
              className={clsx([
                styles.marquee__card,
                styles.marquee__card__clone,
              ])}
              key={card.id}
              aria-hidden="true"
            >
              <SmallCard
                artist={card.artist}
                media={card.media}
                date={card.data}
                track={card.artistTrack}
                copy={card.copy}
                tags={card.tags}
              />
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}
