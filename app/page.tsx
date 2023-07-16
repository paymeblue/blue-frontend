import Home from "@components/home-page";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Home | Blue",
  description:
    "Blue is a P2P payment system that enables users to make payments, send and receive money, request money, and pay bills seamlessly",
};

const Homepage = () => <Home />;

export default Homepage;
