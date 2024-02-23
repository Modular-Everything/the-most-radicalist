// import { Footer } from '@/components/Footer'
import { ReactNode } from "react";

import { Header } from "@/components/Header";

export function Layout({ children }: { children: ReactNode }) {
  return (
    <>
      <Header />
      {/* <main className="flex-auto">{children}</main> */}
      <main>{children}</main>
      {/* <Footer /> */}
    </>
  );
}
