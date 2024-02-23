// import { Footer } from '@/components/Footer'
import { ReactNode } from "react";

import { Header } from "@/components/Header";
import { PageLoader } from "@/components/PageLoader";

import styles from "./Layout.module.scss";

export function Layout({ children }: { children: ReactNode }) {
  return (
    <>
      <PageLoader />

      <div className={styles.layout}>
        <Header />
        <main>{children}</main>
      </div>
    </>
  );
}
