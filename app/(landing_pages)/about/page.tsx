import Spinner from "@shared/Spinner";
import { Metadata } from "next";
import dynamic from "next/dynamic";

export const metadata: Metadata = {
  title: "About",
  description: "Receive and make payments on the go with Blue About",
};

const About = dynamic(() => import("./about"), { loading: () => <Spinner /> });
const AboutPage = () => <About />;

export default AboutPage;
