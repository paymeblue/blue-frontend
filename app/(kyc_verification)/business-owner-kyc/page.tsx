import Spinner from "@shared/Spinner";
import { Metadata } from "next";
import dynamic from "next/dynamic";

export const metadata: Metadata = {
  title: "Blue KYC",
  description: "Verify your identity",
};

const DynamicVerifyIdentity = dynamic(() => import("./verify-identity"), {
  loading: () => <Spinner />,
});

const BusinessOwnerKycIdentification = () => {
  return <DynamicVerifyIdentity />;
};

export default BusinessOwnerKycIdentification;
