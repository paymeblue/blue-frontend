import { Metadata } from "next";
import Terms from "./terms";

export const metadata: Metadata = {
  title: "Terms and Conditions",
  description: `These terms and conditions outline the rules and regulations for the
            use of Blue Fintech Technologies LTD's Website, located at
            paymeblue.com.`,
};

const TermsPage = () => <Terms />;

export default TermsPage;
