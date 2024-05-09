import { Metadata } from "next";
import Personal from "./personal";

export const metadata: Metadata = {
  title: "Personal",
  description: "Receive and make payments on the go with Blue Personal",
};

const PersonalPage = () => <Personal />;

export default PersonalPage;
