import Home from "@components/home";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Home",
  description:
    "Blue is a P2P payment system that enables users to make payments, send and receive money, request money, and pay bills seamlessly",
};

const HomePage = () => <Home />;

export default HomePage;
