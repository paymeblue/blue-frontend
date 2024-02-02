import { Metadata } from "next";
import dynamic from "next/dynamic";

export const metadata: Metadata = {
  title: "Privacy policy",
  description: `This Privacy Policy describes Our policies and procedures on
            the collection, use and disclosure of Your information when You use
            the Service and tells You about Your privacy rights and how the law
            protects You.`,
};

const Privacy = dynamic(() => import("./privacy"));
const PrivacyPage = () => <Privacy />;

export default PrivacyPage;
