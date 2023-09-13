import { Metadata } from "next";
import dynamic from "next/dynamic";

export const metadata: Metadata = {
  title: "Contact us",
  description: "Stay connected with us for all your needs!",
};

const Contact = dynamic(() => import("./contact-us"));
const ContactPage = () => <Contact url={process.env.API_URL!} />;

export default ContactPage;
