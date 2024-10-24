import { ReactNode } from "react";

type FAQ = {
  title: string;
  content: string | ReactNode;
};

export const generalFaqs: FAQ[] = [
  {
    title: "What is PayMeBlue?",
    content:
      "Blue is a financial technology platform that allows individuals and businesses to make and receive payments seamlessly. It supports various financial transactions like transferring funds, paying bills, and purchasing goods, all via mobile and web platforms.",
  },
  {
    title: "How do I sign up for Blue?",
    content:
      "To sign up, visit the Blue website or download the app from the App Store or Google Play. You'll need to provide basic personal information such as your name, email address, and phone number. Once your details are verified, you can start using the platform.",
  },
  {
    title: "Is Blue free to use?",
    content:
      "Yes, Blue is free to download and offers certain free services, like Blue-to-Blue transfers. However, some transactions may incur fees depending on the service type and payment method.",
  },
  {
    title: "What platforms are supported?",
    content:
      "Blue is available on iOS, Android, and desktop browsers. It also supports USSD and text message transactions for users without smartphones.",
  },
  {
    title: "How secure is Blue?",
    content:
      "Blue uses advanced encryption technologies to ensure the security of your data and transactions. It complies with industry-standard security protocols to protect against fraud and unauthorized access.",
  },
  {
    title: "Are there any fees for making transfers?",
    content:
      "Blue-to-Blue transfers are free of charge. However, there may be fees associated with transactions involving third-party banks or other financial institutions. Detailed fee structures can be found on the website.",
  },
  {
    title: "Can I link my bank account to Blue?",
    content:
      "Yes, you can link your bank account to Blue to make transfers and withdrawals easily. This allows you to move money between your Blue wallet and your bank account.",
  },
  {
    title: "How do I pay bills using Blue?",
    content:
      "To pay bills, go to the 'Pay Bills' section in the app or website. Select the type of bill, input the required details, and confirm the payment. You can save your billing information for faster future payments.",
  },
  {
    title: "How do I contact customer support?",
    content:
      "You can contact Blue support via the Contact Us page on the website, which includes a form to submit inquiries. Alternatively, you can reach them through the in-app chat or email (contactus@paymeblue.com).",
  },
  {
    title: "I forgot my password, how can I reset it?",
    content:
      "To reset your password, click on the 'Forgot Password' link on the login page. You will receive an email with instructions to reset your password.",
  },
  {
    title: "What should I do if I notice unauthorized transactions?",
    content:
      "If you notice any unauthorized activity in your Blue account, contact customer support immediately. You can lock your account through the app while investigating.",
  },
  {
    title: "How is my data protected?",
    content:
      "Blue implements strong encryption methods and adheres to privacy laws to ensure your personal and financial data is secure. All transactions are monitored for suspicious activity.",
  },
  {
    title: "Does Blue share my information with third parties?",
    content:
      "Blue does not sell your personal data to third parties. However, it may share information with trusted partners as part of its service operations, as detailed in its privacy policy.",
  },
  {
    title: "Where can I find Blue’s terms and conditions?",
    content:
      "You can view Blue's terms and conditions on their website at the footer of every page, under the 'Terms and Conditions'.",
  },
];

export const personalAccountFaqs: FAQ[] = [
  {
    title: "What can I do with a Blue personal account?",
    content: (
      <>
        <p>With a personal account, you can:</p>
        <ul className="list-disc">
          <li className="">
            • Send and receive money from friends and family.
          </li>
          <li>• Pay bills and make purchases.</li>
          <li>
            • Use Blue-to-Blue free transfers to send money to other Blue users.
          </li>
          <li>• Pay using QR codes.</li>
          <li>• Sync contacts for easier money transfers.</li>
        </ul>
      </>
    ),
  },
  {
    title: "How do I transfer money using Blue?",
    content:
      "You can transfer money by selecting the 'Send Money' option, entering the recipient's wallet ID or selecting them from your synced contacts, and specifying the amount. You can also use the QR code scanning feature for quick transfers.",
  },
  {
    title: "Can I use Blue without a smartphone?",
    content:
      "Yes, PayMeBlue offers a USSD and text message option, allowing you to perform transactions without the need for a smartphone.",
  },
];

export const businessAccountFaqs: FAQ[] = [
  {
    title: "What are the benefits of using Blue for my business?",
    content: (
      <>
        <p>Blue offers several benefits for businesses, including:</p>
        <ul className="list-disc">
          <li className="">• Integration with Point-of-Sale (POS) systems.</li>
          <li>• Tools for managing payments and tracking finances.</li>
          <li>• Data-driven insights for optimizing sales.</li>
          <li>
            • The ability to manage teams and transactions through an admin
            dashboard
          </li>
        </ul>
      </>
    ),
  },
  {
    title: "How do I integrate Blue with my POS system?",
    content:
      "Blue's Business solution allows seamless integration with your existing POS systems, enabling barcode payments. You can also use Blue Business desktop tools to manage these integrations.",
  },
  {
    title: "How can I manage my team using PayMeBlue Business?",
    content:
      "You can add and manage your team members from the admin dashboard. This allows you to monitor their activity, manage permissions, and track transactions to ensure accountability.",
  },
];
