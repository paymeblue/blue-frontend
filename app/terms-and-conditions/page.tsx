import { Metadata } from "next";
import dynamic from "next/dynamic";

export const metadata: Metadata = {
  title: "Terms and Conditions",
  description: `These terms and conditions outline the rules and regulations for the
            use of Blue Fintech Technologies LTD's Website, located at
            paymeblue.com.`,
};

const Terms = dynamic(() => import("./terms"));
const TermsPage = () => <Terms />;

export default TermsPage;
