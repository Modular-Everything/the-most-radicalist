"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

import { MoonIcon } from "@/icons/MoonIcon";
import { SunIcon } from "@/icons/SunIcon";

function ThemeToggle() {
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
      // className={styles.header__lightToggle}
      aria-label={mounted ? `Switch to ${otherTheme} theme` : "Toggle theme"}
    >
      {resolvedTheme === "dark" ? <SunIcon /> : <MoonIcon />}
    </button>
  );
}

export function Header() {
  return (
    <header>
      <ThemeToggle />
    </header>
  );
}
