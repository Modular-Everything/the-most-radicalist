"use client";

import { useGSAP } from "@gsap/react";
import clsx from "clsx";
import { useContext, useRef } from "react";

import { AppContext } from "@/app/providers";

import { revealPage } from "./animations";
import styles from "./PageLoader.module.scss";

export function PageLoader() {
  const container = useRef<HTMLDivElement | null>(null);
  const { isLoading, setLoading } = useContext(AppContext);

  useGSAP(
    () => {
      revealPage(".loader", ".wrapper", setLoading);
    },
    { scope: container }
  );

  if (isLoading) {
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
