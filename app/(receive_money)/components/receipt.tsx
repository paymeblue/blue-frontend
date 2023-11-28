/* eslint-disable react/display-name */
import Container from "@shared/container";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import logo from "public/logo.png";
import { Ref, forwardRef, useId } from "react";
import { useQuery } from "react-query";
type Response = {
  status: "success" | "fail";
  message: string;
  data: {
    id: 183;
    amount: string;
    received_by: string;
    order_reference: string;
    receiver_name: string;
    narration: string | null;
    payment_mode: string;
    status: string;
    created_at: string;
  };
};
const Receipt = forwardRef(({ receiptData }: any, ref: Ref<HTMLElement>) => {
  const fetchReceiptDetailst = async (transId: string): Promise<Response> => {
    try {
      const result = await axios.get(
        `https://blue-api-backend.herokuapp.com/api/payment-link/receipt?transaction_id=${transId}`
      );
      return result.data.data;
    } catch (error) {
      console.log(error, "error in fetching list of banks");
      throw error;
    }
  };
  const { data } = useQuery(
    "receipt",
    () => fetchReceiptDetailst(receiptData.transaction_id),
    { enabled: !!receiptData }
  );
  console.log(receiptData, "receipt");
  console.log(data, "trans receipt");
  const receiptDetails = [
    { id: useId(), heading: "Transaction Type:", desc: "Blue to Blue" },
    {
      id: useId(),
      heading: "Transaction Date:",
      desc: "30 - Oct - 2023 11:27:30PM",
    },
    { id: useId(), heading: "Amount:", desc: "₦1,248,000.00" },
    { id: useId(), heading: "Beneficiary Name:", desc: "Favour momoh" },
    { id: useId(), heading: "Credit Account:", desc: "9086452572" },
    { id: useId(), heading: "Narration:", desc: "Happy Flexing" },
    { id: useId(), heading: "Status", desc: "Successful" },
  ];
  return (
    <main ref={ref}>
      <nav className="w-full flex items-center px-6 py-4 tablet:px-20 m-auto justify-between bg-primary">
        <p className="text-lg font-medium text-white leading-6">
          Transaction Receipt
        </p>
        <div>
          <Link href="/">
            <Image
              src={logo}
              alt="blue logo"
              className="w-1/2 mx-auto object-contain h-1/2"
              priority
              width={75}
              height={75}
            />
          </Link>
        </div>
      </nav>
      <Container className="px-6 pb-20">
        <div className="border border-[#0000000f] gap-2 flex-col rounded bg-[#ececec17] p-4 flex">
          {receiptDetails.map((item, i) => (
            <div key={item.id}>
              <small className="leading-6 text-[0.8125rem] text-txt2">
                {item.heading}
              </small>
              <p
                className={`font-medium ${
                  i === receiptDetails.length - 1 && "last:text-[#009999]"
                } leading-6 text-sm text-body-text-2`}
              >
                {item.desc}
              </p>
            </div>
          ))}
        </div>
        <div className="my-4">
          <p className="leading-[1.40625rem] text-[0.9375rem]">Best regards,</p>
          <p className="leading-[1.40625rem] text-[0.9375rem]">BluePay Team.</p>
        </div>
        <div className="bg-[#F5F8FF] max-w-[280px] text-[0.875rem] break-words px-6 py-4 rounded">
          Need help? kindly contact us on&nbsp;
          <Link
            href="mailto:bluesupport@blue.com"
            className="underline text-primary"
          >
            bluesupport@blue.com
          </Link>
          &nbsp;and&nbsp;
          <Link href="tel:+234-3-2359000" className="underline text-primary">
            +234 -3 - 2359000.
          </Link>
        </div>
      </Container>
    </main>
  );
});

export default Receipt;
