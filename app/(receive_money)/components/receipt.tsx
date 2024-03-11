/* eslint-disable @next/next/no-img-element */
/* eslint-disable react/display-name */
import { LoadingOutlined } from "@ant-design/icons";
import { capitalizeFirstLetter, convertISOToDateAndFormat } from "@lib/index";
import Container from "@shared/container";
import { Spin } from "antd";
import axios from "axios";
import Link from "next/link";
import { Ref, forwardRef, useId } from "react";
import { useQuery } from "react-query";
type Response = {
  id: number;
  amount: string;
  received_by: string;
  order_reference: string;
  receiver_name: string;
  narration: string | null;
  payment_mode: string;
  status: string;
  created_at: string;
};
const antIcon = (
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
);
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
  const { data, isLoading } = useQuery(
    "receipt",
    () => fetchReceiptDetailst(receiptData.transaction_id),
    { enabled: !!receiptData.transaction_id }
  );

  const receiptDetails = [
    {
      id: useId(),
      heading: "Transaction Type:",
      desc: capitalizeFirstLetter(data?.payment_mode ?? "withdrawl"),
    },
    {
      id: useId(),
      heading: "Transaction Date:",
      desc: convertISOToDateAndFormat(
        data?.created_at ?? new Date().toISOString()
      ),
    },
    { id: useId(), heading: "Amount:", desc: `₦${data?.amount}` },
    { id: useId(), heading: "Beneficiary Name:", desc: data?.receiver_name },
    { id: useId(), heading: "Credit Account:", desc: data?.received_by },
    { id: useId(), heading: "Narration:", desc: data?.narration ?? "N/A" },
    {
      id: useId(),
      heading: "Status",
      desc: capitalizeFirstLetter(data?.status ?? "successful") || "Successful",
    },
  ];
  if (isLoading) {
    return (
      <div className="flex w-screen h-screen  items-center justify-center">
        <Spin size="large" indicator={antIcon} />
      </div>
    );
  }
  return (
    <main ref={ref}>
      <nav className="w-full flex items-center px-6 py-4 tablet:px-20 m-auto justify-between bg-primary">
        <p className="text-lg font-medium m-0  p-0 text-white leading-6">
          Transaction Receipt
        </p>
        <div>
          <Link href="/">
            <img
              src="/receipt-logo.png"
              alt="blue logo"
              className="w-[100px] mx-auto object-contain"
            />
          </Link>
        </div>
      </nav>
      <Container className="px-6 pb-20">
        <div className="border border-[#0000000f] gap-2 flex-col rounded bg-[#ececec17] p-4 flex">
          {receiptDetails.map((item, i) => (
            <div key={item.id}>
              <small className="leading-6  text-[0.8125rem] text-txt2">
                {item.heading}
              </small>
              <p
                className={`font-medium  ${
                  i === receiptDetails.length - 1 && "last:text-[#009999]"
                } leading-6 text-sm text-body-text-2`}
              >
                {item.desc}
              </p>
            </div>
          ))}
        </div>
        <div className="my-4">
          <p className="leading-[1.40625rem]  text-[0.9375rem]">
            Best regards,
          </p>
          <p className="leading-[1.40625rem]  text-[0.9375rem]">
            BluePay Team.
          </p>
        </div>
        <div className="bg-[#F5F8FF] max-w-[280px]  text-[0.875rem] break-words px-6 py-4 rounded">
          Need help? kindly contact us on
          <br />
          <Link
            href="mailto:hello@paymeblue.com"
            className="underline  text-primary"
          >
            hello@paymeblue.com
          </Link>
          &nbsp;and
          <br />
          <Link href="tel:+2347077655432" className="underline  text-primary">
            +2347077655432
          </Link>
        </div>
      </Container>
    </main>
  );
});

export default Receipt;
