import Spinner from "@shared/Spinner";
import StoreContextProvider from "app/context/store-context";
import { Metadata } from "next";
import dynamic from "next/dynamic";

export const metadata: Metadata = {
  title: "Receive money",
  description: "Receive and withdraw money sent to you from friends and family",
};

const NonBlueWithdrawal = dynamic(() => import("../non-blue-withdrawal"), {
  loading: () => <Spinner />,
});

const ReceiveMoneyPage = ({ params }: { params: { id: string } }) => (
  <StoreContextProvider>
    <NonBlueWithdrawal linkId={params.id} />
  </StoreContextProvider>
);

export default ReceiveMoneyPage;
