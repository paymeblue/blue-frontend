import { Footer } from "@layout/index";
import Navbar from "@layout/navbar";
import { Fragment, ReactNode } from "react";

const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <Fragment>
      <Navbar />
      {children}
      <Footer />
    </Fragment>
  );
};

export default Layout;
