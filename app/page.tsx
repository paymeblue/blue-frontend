import Home from "@components/home-page";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Home | Blue",
  description:
    "Receive and make payments easily with Blue, you can make your payments seamlessly, request and receive money, all on one platform.",
};

const Homepage = () => <Home />;

export default Homepage;
