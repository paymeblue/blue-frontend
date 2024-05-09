import { Metadata } from "next";
import About from "./about";

export const metadata: Metadata = {
  title: "About",
  description: "Receive and make payments on the go with Blue About",
};

const AboutPage = () => <About />;

export default AboutPage;
