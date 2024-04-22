import { Metadata } from "next";
import dynamic from "next/dynamic";

export const metadata: Metadata = {
  title: "Business",
  description:
    "Streamline your financial operations effortlessly with Blue Business",
};

const Business = dynamic(() => import("@components/business"));
const Businesspage = () => <Business />;

export default Businesspage;
