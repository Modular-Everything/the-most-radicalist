import "@/styles/resets.css";
import "@/styles/globals.css";

import { type Metadata } from "next";
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

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className="h-full antialiased" suppressHydrationWarning>
      {/* <body className="flex h-full bg-zinc-50 dark:bg-black"> */}
      <body>
        <Providers>
          {/* <div className="flex w-full"> */}
          <div>
            <Layout>{children}</Layout>
          </div>
        </Providers>
      </body>
    </html>
  );
}
