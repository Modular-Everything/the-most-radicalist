"use client";

import clsx from "clsx";
import Link from "next/link";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

import { GridIcon } from "@/icons/GridIcon";
import { HomeIcon } from "@/icons/HomeIcon";
import { Logo } from "@/icons/Logo";
import { MoonIcon } from "@/icons/MoonIcon";
import { PersonIcon } from "@/icons/PersonIcon";
import { SunIcon } from "@/icons/SunIcon";

import styles from "./Header.module.scss";

function ThemeToggle({ className }: { className: string }) {
  const { resolvedTheme, setTheme } = useTheme();
  const otherTheme = resolvedTheme === "dark" ? "light" : "dark";
  const [mounted, setMounted] = useState<boolean>(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <button
      type="button"
      onClick={() => setTheme(otherTheme)}
      className={className}
      aria-label={mounted ? `Switch to ${otherTheme} theme` : "Toggle theme"}
    >
      {resolvedTheme === "dark" ? <SunIcon /> : <MoonIcon />}
    </button>
  );
}

export function Header() {
  return (
    <header className={styles.header}>
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

      <ThemeToggle className={styles.header__lightToggle} />
    </header>
  );
}
