"use client";
import { formatCurrency } from "@lib/index";
import Container from "@shared/container";
import { Button, Typography } from "antd";
import { useCtx } from "app/context/store-context";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import bank from "public/bank.png";
import blue from "public/blue.png";
import {
  ChangeEvent,
  FormEvent,
  Fragment,
  useEffect,
  useRef,
  useState,
} from "react";
import Receipt from "../components/receipt";
import SelectBank from "../components/select-bank";
import Success from "../components/success";

const { Title, Paragraph } = Typography;

const ReceiveMoney = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { updateStore, state } = useCtx();
  const [selected, setSelected] = useState("send");
  const [receiptData, setReceiptData] = useState("");
  const ref = useRef<HTMLElement>(null);
  const q = searchParams.get("step");
  const amount = searchParams.get("amount");
  const sender = searchParams.get("sender");
  const phone = searchParams.get("phone");
  console.log(state, "state");
  useEffect(() => {
    const data = { amount, sender, phone };
    updateStore(data);
  }, []);

  const handleRadioChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSelected(e.target.value);
  };
  const submitHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (selected === "send") {
      router.replace("?step=select-bank");
    } else if (selected === "signup") {
      router.replace("/");
    }
  };
  const addReceiptId = (data: any) => {
    setReceiptData(data);
  };
  const items = [
    {
      id: "1",
      value: "send",
      icon: (
        <Image
          src={bank}
          alt="send to blue"
          className="w-[100px] h-[100px] laptop:w-[120px] laptop:h-[120px] object-contain"
        />
      ),
      title: "Send to your desired Bank Account",
      desc: "Enter your phone number and choose any bank accounts linked to your number.",
    },
    {
      id: "2",
      value: "signup",
      icon: (
        <Image
          src={blue}
          alt="signup to blue"
          className="w-[80px] h-[80px] laptop:w-[100px] laptop:h-[100px] object-contain"
        />
      ),
      title: "Sign up with Blue Personal",
      desc: "Enjoy free transfers and more when you signup with Blue Personal.",
    },
  ];

  return (
    <Fragment>
      {q === "receipt" ? (
        <Receipt ref={ref} receiptData={receiptData} />
      ) : (
        <Container className="py-8 laptop:py-20">
          {q === "select-bank" ? (
            <SelectBank
              sendReceipt={addReceiptId}
              code=""
              phone=""
              transaction_id={0}
            />
          ) : q === "success" ? (
            <Success refElem={ref} data={receiptData} />
          ) : (
            <div className="flex flex-col items-center justify-between">
              <div className="max-w-2xl laptop-md:mt-20 mb-8 mx-auto text-center laptop:mb-10">
                <Title
                  level={2}
                  className="text-body-text-2 text-xl font-semibold laptop:text-4xl leading-[1.6625rem] laptop:leading-[2.9925rem]"
                >
                  You just received {formatCurrency(Number(amount))}
                  !&nbsp;
                </Title>
                <div className="text-body-text-2 max-w-[500px] mx-auto leading-[1.3125rem] text-[0.9375rem] laptop:leading-9 laptop:text-[1.375rem] font-medium">
                  <p className="text-primary capitalize font-semibold inline">
                    {sender?.replaceAll("%20", " ").toLowerCase()}&nbsp;
                  </p>
                  has sent you&nbsp;
                  <strong className="text-primary">
                    {formatCurrency(Number(amount))}&nbsp;
                  </strong>
                  How would you like to withdraw it?
                </div>
              </div>
              <form onSubmit={submitHandler} className="w-full">
                <div className="flex w-full item-center flex-col gap-10 laptop:gap-20 justify-between">
                  <div className="w-full">
                    {items.map((item) => (
                      <div
                        key={item.id}
                        className="relative h-[120px] w-full mx-auto max-w-[500px] mb-6"
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
                          className="absolute w-full m-auto flex items-center justify-center gap-4 laptop:gap-8 p-4 laptop:p-8 h-full top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
                        >
                          <div>{item.icon}</div>
                          <div>
                            <Title
                              level={4}
                              className="font-semibold leading-[1.3125rem] text-[0.9375rem] laptop:leading-[1.97531rem] mb-1 laptop:text-xl text-txt"
                            >
                              {item.title}
                            </Title>
                            <Paragraph className="tracking-[-0.00813rem] leading-5 text-[0.8125rem] laptop:tracking-[-0.01125rem] m-0 laptop:text-base text-txt2">
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
                    className="laptop mx-auto mt-6 flex items-center max-w-[500px] justify-center disabled:text-gray-900 disabled:bg-gray-200 disabled:border-none text-[0.9375rem] font-medium leading-[1.
            39663rem] text-white laptop:p-6 laptop:text-[1rem] laptop:leading-[1.5rem] "
                    size="large"
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
