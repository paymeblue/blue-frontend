import { Metadata } from "next";
import dynamic from "next/dynamic";

export const metadata: Metadata = {
  title: "Receive money",
  description: "Receive and withdraw money sent to you from friends and family",
};

const ReceiveMoney = dynamic(() => import("@components/receive-money"));

const ReceiveMoneyPage = () => <ReceiveMoney />;

export default ReceiveMoneyPage;
