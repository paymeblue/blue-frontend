import Spinner from "@shared/Spinner";
import { Metadata } from "next";
import dynamic from "next/dynamic";

export const metadata: Metadata = {
  title: "Identity Verification Portal",
  description: "Verify your identity using BVN or NIN with liveness detection",
};

const DynamicVerificationPortal = dynamic(
  () => import("./verification-portal"),
  {
    loading: () => <Spinner />,
  }
);

const YouVerifyVerificationPage = () => {
  return <DynamicVerificationPortal />;
};

export default YouVerifyVerificationPage;
