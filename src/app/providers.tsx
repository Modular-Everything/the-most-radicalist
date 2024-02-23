"use client";

import { usePathname } from "next/navigation";
import { ThemeProvider, useTheme } from "next-themes";
import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useEffect,
  useRef,
  useState,
} from "react";

function usePrevious<T>(value: T) {
  const ref = useRef<T>();

  useEffect(() => {
    ref.current = value;
  }, [value]);

  return ref.current;
}

function ThemeWatcher() {
  const { resolvedTheme, setTheme } = useTheme();

  useEffect(() => {
    const media = window.matchMedia("(prefers-color-scheme: dark)");

    function onMediaChange() {
      const systemTheme = media.matches ? "dark" : "light";
      if (resolvedTheme === systemTheme) {
        setTheme("system");
      }
    }

    onMediaChange();
    media.addEventListener("change", onMediaChange);

    return () => {
      media.removeEventListener("change", onMediaChange);
    };
  }, [resolvedTheme, setTheme]);

  return null;
}

export const AppContext = createContext<{
  previousPathname?: string;
  isLoading: boolean;
  setLoading: Dispatch<SetStateAction<boolean>>;
}>({
  previousPathname: undefined,
  isLoading: false,
  setLoading: () => {},
});

export function Providers({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const previousPathname = usePrevious(pathname);
  const [isLoading, setLoading] = useState<boolean>(true);

  return (
    <AppContext.Provider value={{ previousPathname, isLoading, setLoading }}>
      <ThemeWatcher />
      <ThemeProvider disableTransitionOnChange>{children}</ThemeProvider>
    </AppContext.Provider>
  );
}
