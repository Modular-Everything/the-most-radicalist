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
  description:
    "I’m Spencer, a software designer and entrepreneur based in New York City. I’m the founder and CEO of Planetaria, where we develop technologies that empower regular people to explore space on their own terms.",
  alternates: {
    types: {
      "application/rss+xml": `${process.env.NEXT_PUBLIC_SITE_URL}/feed.xml`,
    },
  },
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
