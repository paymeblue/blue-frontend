import Spinner from "@shared/Spinner";
import { Metadata } from "next";
import dynamic from "next/dynamic";

export const metadata: Metadata = {
  title: "Home",
  description:
    "Blue is a P2P payment system that enables users to make payments, send and receive money, request money, and pay bills seamlessly",
};

const Home = dynamic(() => import("@components/home"), {
  loading: () => <Spinner />,
});
const Homepage = () => <Home />;

export default Homepage;
