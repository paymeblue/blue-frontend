import Spinner from "@shared/Spinner";
import { Metadata } from "next";
import dynamic from "next/dynamic";

export const metadata: Metadata = {
  title: "Blue Business KYC",
  description: "Verify your Business identity pro",
};

const DynamicVerifyIdentity = dynamic(() => import("./VerifyPro"), {
  loading: () => <Spinner />,
});

const KycIdentification = () => {
  return <DynamicVerifyIdentity />;
};

export default KycIdentification;
