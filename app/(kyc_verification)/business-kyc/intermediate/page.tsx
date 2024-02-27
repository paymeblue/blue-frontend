import { LoadingOutlined } from "@ant-design/icons";
import { Metadata } from "next";
import dynamic from "next/dynamic";

export const metadata: Metadata = {
  title: "Blue Business KYC",
  description: "Verify your Business identity intermediate",
};

const DynamicVerifyIdentity = dynamic(() => import("./VerifyIntermediate"), {
  loading: () => (
    <LoadingOutlined
      style={{
        fontSize: 32,
        display: "flex",
        alignItems: "center",
        minHeight: "10rem",
        color: "#4341CD",
      }}
      spin
    />
  ),
});

const KycIdentification = () => {
  return <DynamicVerifyIdentity />;
};

export default KycIdentification;
