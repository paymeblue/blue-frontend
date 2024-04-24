import Spinner from "@shared/Spinner";
import { Metadata } from "next";
import dynamic from "next/dynamic";

export const metadata: Metadata = {
  title: "Personal",
  description: "Receive and make payments on the go with Blue Personal",
};

const Personal = dynamic(() => import("./personal"), {
  loading: () => <Spinner />,
});
const Personalpage = () => <Personal />;

export default Personalpage;
