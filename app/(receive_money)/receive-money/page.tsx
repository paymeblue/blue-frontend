import StoreContextProvider from "app/context/store-context";
import { Metadata } from "next";
import dynamic from "next/dynamic";

export const metadata: Metadata = {
  title: "Receive money",
  description: "Receive and withdraw money sent to you from friends and family",
};

const ReceiveMoney = dynamic(() => import("./receive-money"));

const ReceiveMoneyPage = () => (
  <StoreContextProvider>
    <ReceiveMoney />
  </StoreContextProvider>
);

export default ReceiveMoneyPage;
