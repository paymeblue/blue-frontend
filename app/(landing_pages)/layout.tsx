"use client";

import { Footer } from "@layout/index";
import Navbar from "@layout/navbar";
import { SectionProvider } from "app/context/section-scroll-context";
import { ReactNode } from "react";

const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <SectionProvider>
      <Navbar />
      {children}
      <Footer />
    </SectionProvider>
  );
};

export default Layout;
