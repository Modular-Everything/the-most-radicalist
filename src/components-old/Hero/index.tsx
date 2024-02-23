import { useGSAP } from "@gsap/react";
import clsx from "clsx";
import gsap from "gsap";
import SplitText from "gsap-trial/SplitText";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

import { animateCopy, animateOverlay, animateTitle } from "./animations";
import styles from "./Hero.module.scss";

gsap.registerPlugin(SplitText);

export function Hero({
  timeline,
}: {
  timeline: gsap.core.Timeline | undefined;
}) {
  const container = useRef<HTMLDivElement | null>(null);
  const [lines, setLines] = useState<Element[]>([]);

  useEffect(() => {
    const split = new SplitText(".copy", {
      type: "lines",
      linesClass: styles.hero__copy__lineChild,
    });

    // eslint-disable-next-line no-new
    new SplitText(".copy", {
      type: "lines",
      linesClass: styles.hero__copy__lineParent,
    });

    setLines(split.lines);
  }, []);

  useGSAP(
    () => {
      timeline
        ?.add(animateOverlay(".overlay"))
        .add(animateTitle(".title"), "<")
        .add(animateCopy(lines), "-=0.8");
    },
    { dependencies: [lines], scope: container }
  );

  return (
    <div className={styles.hero} ref={container}>
      <div className={styles.hero__textWrapper}>
        <div className={styles.hero__titleWrapper}>
          <h1 className={clsx("title", styles.hero__title)}>Good Beer</h1>
        </div>

        <div className={styles.hero__copyWrapper}>
          <p className={clsx("copy", styles.hero__copy)}>
            Experience the finest beers at our shop. Handpicked for quality and
            taste, each brew promises a unique, refreshing experience. Cheers to
            beers!
          </p>
        </div>
      </div>

      <div className={clsx("overlay", styles.hero__overlay)} />

      <Image
        src="/beer2.avif"
        fill
        priority
        loading="eager"
        alt=""
        className={styles.hero__image}
      />
    </div>
  );
}
