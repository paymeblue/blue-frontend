import { Metadata } from "next";
import Contact from "./contact-us";

export const metadata: Metadata = {
  title: "Contact us",
  description: "Stay connected with us for all your needs!",
};

const ContactPage = () => <Contact />;

export default ContactPage;
