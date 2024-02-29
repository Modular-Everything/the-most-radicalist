import "@/styles/resets.css";
import "@/styles/globals.css";

import { type Metadata } from "next";
import localFont from "next/font/local";
import { ReactNode } from "react";

import { Providers } from "@/app/providers";
import { Layout } from "@/components/Layout";

export const metadata: Metadata = {
  title: {
    template: "%s - The Most Radicalist",
    default: "The Most Radicalist - It's a WIP",
  },
  description: "This is a work in progress.",
};

const powerGrotesk = localFont({
  src: [
    {
      path: "./PowerGroteskTrial-Regular.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "./PowerGroteskTrial-Heavy.woff2",
      weight: "800",
      style: "normal",
    },
  ],
  display: "swap",
});

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className={powerGrotesk.className} suppressHydrationWarning>
      <body>
        <Providers>
          <Layout>{children}</Layout>
        </Providers>
      </body>
    </html>
  );
}
