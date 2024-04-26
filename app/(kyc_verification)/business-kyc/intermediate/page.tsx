import Spinner from "@shared/Spinner";
import { Metadata } from "next";
import dynamic from "next/dynamic";

export const metadata: Metadata = {
  title: "Blue Business KYC",
  description: "Verify your Business identity intermediate",
};

const DynamicVerifyIdentity = dynamic(() => import("./VerifyIntermediate"), {
  loading: () => <Spinner />,
});

const KycIdentification = () => {
  return <DynamicVerifyIdentity />;
};

export default KycIdentification;
