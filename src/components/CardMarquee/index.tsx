"use client";

import { useGSAP } from "@gsap/react";
import clsx from "clsx";
import gsap from "gsap";
import Image from "next/image";
import { useEffect, useRef } from "react";

import styles from "./CardMarquee.module.scss";

const cards = [
  { id: 0, title: "JDilla", media: "/beer1.avif" },
  { id: 1, title: "Jay Z", media: "/beer2.avif" },
  { id: 2, title: "Nas", media: "/beer3.avif" },
  { id: 3, title: "Kanye West", media: "/beer1.avif" },
  { id: 4, title: "Drake", media: "/beer2.avif" },
  { id: 5, title: "Kendrick Lamar", media: "/beer3.avif" },
  { id: 6, title: "J Cole", media: "/beer1.avif" },
  { id: 7, title: "Biggie", media: "/beer2.avif" },
  { id: 8, title: "Tupac", media: "/beer3.avif" },
  { id: 9, title: "Eminem", media: "/beer1.avif" },
  { id: 10, title: "Lil Wayne", media: "/beer2.avif" },
  { id: 11, title: "50 Cent", media: "/beer3.avif" },
  { id: 12, title: "Snoop Dogg", media: "/beer1.avif" },
  { id: 13, title: "Ice Cube", media: "/beer2.avif" },
  { id: 14, title: "NWA", media: "/beer3.avif" },
  { id: 15, title: "Public Enemy", media: "/beer1.avif" },
  { id: 16, title: "Wu Tang Clan", media: "/beer2.avif" },
];

export function CardMarquee() {
  const container = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const totalCards = cards.length;
    const cardSpeed = Math.floor(totalCards / 4);
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
      gsap.defaults({
        ease: "power2.inOut",
        duration: 1.25,
        transformOrigin: "center center",
        stagger: function (index) {
          if (index === 0) {
            return 0.5;
          }
          if (index === 1) {
            return 1.25;
          }
          if (index === 2) {
            return 0.25;
          }
          if (index === 3) {
            return 1;
          }
          if (index > 3 && index < 8) {
            return 0.5;
          }
          return 0;
        },
      });

      // stagger in the cards, starting with the first card and scaling down to the last card
      gsap.fromTo(
        ".card",
        {
          scale: 1.25,
          autoAlpha: 0,
        },
        {
          scale: 1,
          autoAlpha: 1,
        }
      );
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
              <div className={styles.marquee__card__info}>
                <h4>{card.title}</h4>
              </div>
              <div className={styles.marquee__card__media}>
                <Image
                  src={card.media}
                  alt=""
                  fill
                  sizes="(min-width: 1280px) 25vw, (min-width: 768px) 50vw, 90vw"
                />
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}
