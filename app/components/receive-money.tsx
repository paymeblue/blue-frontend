"use client";
import { detectOS, sleep } from "@lib/index";
import Container from "@shared/container";
import { Button, Typography, message } from "antd";
import Image from "next/image";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import bank from "public/bank.png";
import blue from "public/blue.png";
import empty from "public/empty.png";
import eyowo from "public/eyowo.png";
import logo from "public/logo.png";
import opay from "public/opay.png";
import palmpay from "public/palmpay.png";
import stanbic from "public/stanbic.png";
import success from "public/success.png";
import {
  ChangeEvent,
  FormEvent,
  Fragment,
  useEffect,
  useId,
  useRef,
  useState,
} from "react";
import generatePDF from "react-to-pdf";
const { Title, Paragraph } = Typography;

const ReceiveMoney = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [selected, setSelected] = useState("send");
  const ref = useRef<HTMLDivElement>(null);
  const q = searchParams.get("step");
  const [messageApi, contextHolder] = message.useMessage();
  const [isClient, setClient] = useState(false);
  let platform;
  useEffect(() => {
    setClient(true);
  }, []);
  if (isClient) {
    platform = detectOS();
  }
  const handleRadioChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSelected(e.target.value);
  };
  const submitHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (selected === "send") {
      router.push("?step=select-bank");
    } else if (selected === "signup") {
      router.push("/");
    }
  };
  const simulateAsyncOperation = (isSuccess: boolean) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (isSuccess) {
          resolve("Success!");
        } else {
          reject(new Error("Something went wrong!"));
        }
      }, 2000);
    });
  };
  const payToBankHandler = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      // Simulate a successful Promise
      await simulateAsyncOperation(true);
      router.push("?step=success");

      // Simulate a rejected Promise
      // await simulateAsyncOperation(false);
    } catch (error) {
      messageApi.open({
        content: `${error}`,
        className: "[&>div]:bg-red-800 [&>div]:text-white",
      });
    }
  };
  const handleClick = async () => {
    router.push("?step=receipt");
    await sleep(2000);
    if (ref.current) {
      generatePDF(ref, {
        filename: `receipt-${Date.now()}.pdf`,
      });
    }
    await sleep(2000);
    router.back();
  };

  const items = [
    {
      id: useId(),
      value: "send",
      icon: (
        <Image
          src={bank}
          alt="send to blue"
          className="w-[120px] h-[120px] object-contain"
        />
      ),
      title: "Send to your desired Bank Account",
      desc: "Enter your phone number and choose any bank accounts linked to your number.",
    },
    {
      id: useId(),
      value: "signup",
      icon: (
        <Image
          src={blue}
          alt="signup to blue"
          className="w-[100px] h-[100px] object-contain"
        />
      ),
      title: "Sign up with Blue Personal",
      desc: "Enjoy free transfers and more when you signup with Blue Personal.",
    },
  ];
  const bankList = [
    {
      id: useId(),
      icon: eyowo,
      value: "eyowo",
      bankName: "Eyowo MicroFinance Bank",
      holder: "Semira Yesufu - 1248592040",
    },
    {
      id: useId(),
      icon: palmpay,
      value: "palmpay",
      bankName: "Palmpay Finance",
      holder: "Semira Yesufu - 7081323920",
    },
    {
      id: useId(),
      icon: stanbic,
      value: "stanbic",
      bankName: "Stanbic Bank",
      holder: "Semira Yesufu - 6780112490",
    },
    {
      id: useId(),
      icon: opay,
      value: "opay",
      bankName: "Opay Finance",
      holder: "Semira Yesufu - 7081323920",
    },
  ];
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
    <Fragment>
      {contextHolder}
      {q === "receipt" ? (
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
              <p className="leading-[1.40625rem] text-[0.9375rem]">
                Best regards,
              </p>
              <p className="leading-[1.40625rem] text-[0.9375rem]">
                BluePay Team.
              </p>
            </div>
            <div className="bg-[#F5F8FF] max-w-[280px] break-words px-6 py-4 rounded">
              Need help? kindly contact us on&nbsp;
              <Link
                href="mailto:bluesupport@blue.com"
                className="underline text-primary"
              >
                bluesupport@blue.com
              </Link>
              &nbsp;and&nbsp;
              <Link
                href="tel:+234-3-2359000"
                className="underline text-primary"
              >
                +234 -3 - 2359000.
              </Link>
            </div>
          </Container>
        </main>
      ) : (
        <Container className="py-20">
          {q === "select-bank" ? (
            <Fragment>
              <div className="max-w-2xl mt-20 mx-auto text-center mb-10">
                <Title
                  level={3}
                  className="text-body-text-2 font-semibold text-4xl leading-normal"
                >
                  Select your desired bank account:
                </Title>
                <div className="text-body-text-2 max-w-[450px] mx-auto leading-9 text-[1.375rem] font-medium">
                  Choose the bank account you want to transfer the received
                  money to:
                </div>
              </div>
              <form onSubmit={payToBankHandler} className="max-w-lg m-auto">
                <div className="flex items-center flex-col gap-20 justify-center">
                  <div>
                    {bankList.map((item) => (
                      <div
                        key={item.id}
                        className="relative h-[80px] w-[450px] mb-6"
                      >
                        <input
                          type="radio"
                          name={item.value}
                          value={item.value}
                          id={item.value}
                          checked={selected === item.value}
                          onChange={handleRadioChange}
                          className="w-full h-full relative appearance-none checked:border-primary bg-input-field hover:border-primary border-transparent rounded border"
                        />
                        <label
                          htmlFor={item.value}
                          className="absolute w-full m-auto flex items-center justify-start gap-8 p-8 h-full top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
                        >
                          <div>
                            <Image
                              src={item.icon}
                              alt={item.value}
                              className="w-[55px] h-[55px] object-contain"
                            />
                          </div>
                          <div className="text-start">
                            <Title
                              level={5}
                              className="font-semibold leading-[1.97531rem] mb-1 text-xl text-txt"
                            >
                              {item.bankName}
                            </Title>
                            <Paragraph className="tracking-[-0.01125rem] m-0 text-base text-txt">
                              {item.holder}
                            </Paragraph>
                          </div>
                        </label>
                      </div>
                    ))}
                  </div>
                  <Button
                    type="primary"
                    htmlType="submit"
                    className="laptop mx-auto mt-6 flex items-center justify-center disabled:text-gray-900 disabled:bg-gray-200 disabled:border-none text-[0.9375rem] font-medium leading-[1.
            39663rem] text-white laptop:p-6 laptop:text-[1rem] laptop:leading-[1.5rem] "
                    block
                  >
                    Proceed
                  </Button>
                </div>
              </form>
            </Fragment>
          ) : q === "success" ? (
            <Fragment>
              <div className="flex flex-col text-center items-center max-w-md mx-auto justify-center gap-4">
                <div className="mb-10 mt-20">
                  <Image
                    src={success}
                    alt="success icon"
                    className="object-contain w-3/4 mx-auto"
                  />
                </div>
                <div>
                  <Title
                    level={5}
                    className="leading-[2.74313rem] tracking-[-0.02063rem] font-semibold text-[2.0625rem]"
                  >
                    Transfer Successful!
                  </Title>
                  <Paragraph className="tracking-[-0.025rem] max-w-xs mx-auto leading-[2.00244rem] text-txt2 font-medium text-xl">
                    You sent&nbsp;
                    <strong className="font-semibold text-txt">
                      ₦50,000.00
                    </strong>
                    &nbsp;to 2210123339 (Semira Yesufu)
                  </Paragraph>
                </div>
                <div className="flex items-center w-full flex-col justify-center">
                  <Button
                    type="primary"
                    block
                    onClick={handleClick}
                    className="laptop mx-auto mt-6 flex items-center justify-center disabled:text-gray-900 disabled:bg-gray-200 disabled:border-none text-[0.9375rem] font-medium leading-[1.
            39663rem] text-white laptop:p-6 laptop:text-[1rem] laptop:leading-[1.5rem] "
                  >
                    Download Receipt
                  </Button>

                  <Button
                    onClick={() => router.push("?step=empty")}
                    className="laptop mx-auto mt-6 flex items-center justify-center hover:bg-white/80 text-[0.9375rem] font-medium leading-[1.
            39663rem] laptop:p-6 laptop:text-[1rem] border-primary text-primary laptop:leading-[1.5rem]"
                    block
                  >
                    Done
                  </Button>
                </div>
              </div>
            </Fragment>
          ) : q === "empty" ? (
            <div className="flex flex-col text-center items-center max-w-md mx-auto justify-center gap-2">
              <div className="mt-20 mb-5">
                <Image
                  src={empty}
                  alt="empty icon"
                  className="object-contain w-3/4 mx-auto"
                />
              </div>
              <div>
                <Title
                  level={5}
                  className="leading-normal font-semibold m-0 text-[1.75rem]"
                >
                  No Linked Bank Account!
                </Title>
                <Paragraph className="font-medium text-xl">
                  There is no bank account tied to your phone number.&nbsp;
                  <Link
                    href={
                      platform === "iOS"
                        ? "#link-to-iOS-store"
                        : "#link-to-android-store"
                    }
                    className="text-primary underline"
                  >
                    Sign up for Blue to access your funds.
                  </Link>
                </Paragraph>
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-between">
              <div className="max-w-2xl mt-20 mx-auto text-center mb-10">
                <Title
                  level={2}
                  className="text-body-text-2 font-semibold text-4xl leading-[2.9925rem]"
                >
                  You just received ₦50,000.00!&nbsp;
                </Title>
                <div className="text-body-text-2 max-w-[500px] mx-auto leading-9 text-[1.375rem] font-medium">
                  <p className="text-primary font-semibold inline">
                    Semira Yesufu&nbsp;
                  </p>
                  has sent you&nbsp;
                  <strong className="text-primary">₦50,000.00&nbsp;</strong>
                  How would you like to withdraw it?
                </div>
              </div>
              <form onSubmit={submitHandler}>
                <div className="flex item-center flex-col gap-20 justify-between">
                  <div>
                    {items.map((item) => (
                      <div
                        key={item.id}
                        className="relative h-[120px] w-[500px] mb-6"
                      >
                        <input
                          type="radio"
                          name={item.value}
                          value={item.value}
                          id={item.value}
                          checked={selected === item.value}
                          onChange={handleRadioChange}
                          className="w-full h-full relative appearance-none checked:border-primary bg-input-field hover:border-primary border-transparent rounded border"
                        />
                        <label
                          htmlFor={item.value}
                          className="absolute w-full m-auto flex items-center justify-center gap-8 p-8 h-full top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
                        >
                          <div>{item.icon}</div>
                          <div>
                            <Title
                              level={4}
                              className="font-semibold leading-[1.97531rem] mb-1 text-xl text-txt"
                            >
                              {item.title}
                            </Title>
                            <Paragraph className="tracking-[-0.01125rem] m-0 text-base text-txt2">
                              {item.desc}
                            </Paragraph>
                          </div>
                        </label>
                      </div>
                    ))}
                  </div>
                  <Button
                    type="primary"
                    htmlType="submit"
                    className="laptop mx-auto mt-6 flex items-center justify-center disabled:text-gray-900 disabled:bg-gray-200 disabled:border-none text-[0.9375rem] font-medium leading-[1.
            39663rem] text-white laptop:p-6 laptop:text-[1rem] laptop:leading-[1.5rem] "
                    block
                  >
                    Proceed
                  </Button>
                </div>
              </form>
            </div>
          )}
        </Container>
      )}
    </Fragment>
  );
};

export default ReceiveMoney;
