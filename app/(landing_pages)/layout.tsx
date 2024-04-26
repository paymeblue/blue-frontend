import { Footer, Navbar } from "@layout/index";
import { Fragment, ReactNode } from "react";

const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <Fragment>
      <Navbar />
      <main>{children}</main>
      <Footer />
    </Fragment>
  );
};

export default Layout;
