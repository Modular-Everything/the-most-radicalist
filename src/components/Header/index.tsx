"use client";

import { useGSAP } from "@gsap/react";
import clsx from "clsx";
import Link from "next/link";
import { useRef } from "react";

import { GridIcon } from "@/icons/GridIcon";
import { HomeIcon } from "@/icons/HomeIcon";
import { Logo } from "@/icons/Logo";
import { MoonIcon } from "@/icons/MoonIcon";
import { PersonIcon } from "@/icons/PersonIcon";
import { SunIcon } from "@/icons/SunIcon";

import { rotateLogo, showHeader } from "./animations";
import styles from "./Header.module.scss";

export function Header({
  theme,
}: {
  theme: [string, (theme: string) => void];
}) {
  const container = useRef<HTMLElement | null>(null);
  const [globalTheme, setGlobalTheme] = theme;

  useGSAP(
    () => {
      showHeader(".container");
      rotateLogo(".logo");
    },
    { scope: container }
  );

  return (
    <header className={styles.header} ref={container}>
      <div className={clsx("container", styles.header__wrapper)}>
        <Link href="/" className={clsx("logo", styles.header__logo)}>
          <Logo />
        </Link>

        <nav role="navigation">
          <ul className={styles.header__nav}>
            <li>
              <Link href="/" className={styles.header__nav__icon}>
                <HomeIcon />
              </Link>
            </li>
            <li>
              <Link href="/" className={styles.header__nav__icon}>
                <PersonIcon />
              </Link>
            </li>
            <li>
              <Link href="/" className={styles.header__nav__icon}>
                <GridIcon />
              </Link>
            </li>
          </ul>
        </nav>

        <button
          type="button"
          onClick={() =>
            setGlobalTheme(globalTheme === "light" ? "dark" : "light")
          }
          className={styles.header__lightToggle}
          aria-label="Toggle dark mode"
        >
          {globalTheme === "dark" ? <SunIcon /> : <MoonIcon />}
        </button>
      </div>
    </header>
  );
}
