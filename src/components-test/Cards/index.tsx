"use client";

import { useGSAP } from "@gsap/react";
import clsx from "clsx";
import gsap from "gsap";
import Image from "next/image";
import Link from "next/link";
import { MouseEvent, useRef, useState } from "react";

import styles from "./Cards.module.scss";

const cards = [
  {
    id: 0,
    title: "Title One",
    copy: "Copy One",
    media: "/beer1.avif",
  },
  {
    id: 1,
    title: "Title Two",
    copy: "Copy Two",
    media: "/beer2.avif",
  },
  {
    id: 2,
    title: "Title Three",
    copy: "Copy Three",
    media: "/beer3.avif",
  },
  {
    id: 3,
    title: "Title Four",
    copy: "Copy Four",
    media: "/beer1.avif",
  },
];

type ActiveCardType = number | null;
type SetActiveCardType = (value: ActiveCardType) => void;

/**
 * Calculates the opacity value for a card based on its ID and the active card.
 * @param id - The ID of the card.
 * @param activeCard - The ID of the active card.
 * @returns The opacity value for the card.
 */
function getOpacity(id: number, activeCard: ActiveCardType) {
  if (activeCard === id) {
    return 0;
  } else if (activeCard) {
    return 0.5;
  }
  return 0.3;
}

/**
 * Renders a card component.
 *
 * @param title - The title of the card.
 * @param copy - The copy of the card.
 * @param media - The media of the card.
 * @param state - The state of the card.
 * @param id - The ID of the card.
 * @returns The rendered card component.
 */
function Card({
  title,
  copy,
  media,
  state,
  id,
}: {
  title: string;
  copy: string;
  media: string;
  state: [activeCard: ActiveCardType, setActiveCard: SetActiveCardType];
  id: number;
}) {
  const [activeCard, setActiveCard] = state;
  const cardContainer = useRef<HTMLDivElement>(null);
  const yTo = useRef();

  const { contextSafe } = useGSAP(
    () => {
      // Animate the skrim opacity based on the active card.
      gsap.to(".skrim", {
        opacity: getOpacity(id, activeCard),
      });

      // Animate the content position based on the mouse position.
      // @ts-ignore
      yTo.current = gsap.quickTo(".content", "y", {
        duration: 0.01,
        ease: "power3",
      });
    },
    { scope: cardContainer, dependencies: [activeCard] }
  );

  const moveContent = contextSafe((e: MouseEvent) => {
    // Get the boundary of the card container.
    const boundary = cardContainer.current?.getBoundingClientRect();
    // Get the height of the content.
    const targetHeight =
      cardContainer.current?.querySelector(".content")?.clientHeight;

    if (!boundary || !targetHeight) return;

    // Calculate the Y position of the content based on the mouse position.
    let y = Math.max(0, e.clientY - boundary?.top - targetHeight / 2);
    y = Math.max(0, y);
    y = Math.min(y, boundary?.height - targetHeight);

    // Animate the content position.
    // @ts-ignore
    yTo.current(y);
  });

  return (
    <article
      className={styles.card}
      ref={cardContainer}
      onMouseMove={(e) => moveContent(e)}
    >
      <Link
        href="/"
        onMouseOver={() => setActiveCard(id)}
        onMouseOut={() => setActiveCard(null)}
        onFocus={() => setActiveCard(id)}
        onBlur={() => setActiveCard(null)}
      >
        <div className={clsx("skrim", styles.card__skrim)} />
        <div className={styles.card__media}>
          <Image src={media} alt="" fill sizes="100vw" />
        </div>
      </Link>
      <div className={clsx("content", styles.card__content)}>
        <h5>{title}</h5>
        <p>{copy}</p>
      </div>
    </article>
  );
}

/**
 * Renders a collection of cards.
 * @returns JSX.Element
 */
export function Cards() {
  const [activeCard, setActiveCard] = useState<ActiveCardType>(null);

  return (
    <section className={styles.cards__wrapper}>
      {cards.map((card, index) => (
        <Card
          key={card.id}
          title={card.title}
          copy={card.copy}
          media={card.media}
          state={[activeCard, setActiveCard]}
          id={index}
        />
      ))}
    </section>
  );
}
