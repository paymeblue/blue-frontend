import { Metadata } from "next";
import Business from "./business";

export const metadata: Metadata = {
  title: "Business",
  description:
    "Streamline your financial operations effortlessly with Blue Business",
};

const BusinessPage = () => <Business />;

export default BusinessPage;
