"use client";

import { useGSAP } from "@gsap/react";
import clsx from "clsx";
import { useRef, useState } from "react";

import { revealPage } from "./animations";
import styles from "./PageLoader.module.scss";

export function PageLoader() {
  const container = useRef<HTMLDivElement | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useGSAP(
    () => {
      revealPage(".loader", ".wrapper", setLoading);
    },
    { scope: container }
  );

  if (loading) {
    return (
      <div ref={container}>
        <div className={clsx("wrapper", styles.pageLoader)}>
          <div className="loader">The</div>
          <div className="loader">Most</div>
          <div className="loader">Radicalist</div>
        </div>
      </div>
    );
  }

  return null;
}
