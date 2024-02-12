"use client";

import { useGSAP } from "@gsap/react";
import clsx from "clsx";
import { useEffect, useRef } from "react";

import { CardMedium } from "@/components/Cards/CardMedium";

import { animateMediumCards } from "./animations";
import styles from "./CardMarquee.module.scss";
import cards from "./mock-data";

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

  // useGSAP(
  //   () => {
  //     animateMediumCards(".card");
  //   },
  //   { scope: container }
  // );

  return (
    <div className={styles.marquee} ref={container}>
      <div className={styles.marquee__track}>
        <div className={styles.marquee__grid}>
          {cards?.map((card) => (
            <CardMedium
              className={clsx("card", styles.marquee__card)}
              key={card.id}
              artist={card.artist}
              media={card.media}
              date={card.date}
              track={card.track}
              copy={card.copy}
              tags={card.tags}
              background={card.background}
            />
          ))}
          {cards?.map((card) => (
            <CardMedium
              className={clsx(
                styles.marquee__card,
                styles.marquee__card__clone
              )}
              aria-hidden="true"
              key={card.id}
              artist={card.artist}
              media={card.media}
              date={card.date}
              track={card.track}
              copy={card.copy}
              tags={card.tags}
              background={card.background}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
