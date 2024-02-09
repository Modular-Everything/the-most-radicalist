"use client";

import { ReactNode, useEffect, useState } from "react";

import { Header } from "../Header";

export function PageWrapper({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<string>(() => {
    // Check for saved theme in local storage
    const savedTheme = window.localStorage.getItem("theme");
    if (savedTheme) {
      return savedTheme;
    } else {
      // If no saved theme, check for user system preference
      return window.matchMedia("(prefers-color-scheme: dark)").matches
        ? "dark"
        : "light";
    }
  });

  function handleStorageChange(e: StorageEvent) {
    if (e.key === "theme" && e.newValue) {
      setTheme(e.newValue);
    }
  }

  useEffect(() => {
    // Listen for theme changes from other tabs
    window.addEventListener("storage", handleStorageChange);

    // Save theme to local storage whenever it changes
    window.localStorage.setItem("theme", theme);

    // Remove all theme classes from body
    document.body.classList.remove("light", "dark");

    // Add theme class to body
    document.body.classList.add(theme);

    // Remove event listener on cleanup
    return () => window.removeEventListener("storage", handleStorageChange);
  }, [theme]);

  return (
    <>
      <Header theme={[theme, setTheme]} />
      {children}
    </>
  );
}
