import Portal from "@shared/portal";
import { Button, Typography, message } from "antd";
import Image from "next/image";
import { useRouter } from "next/navigation";
import eyowo from "public/eyowo.png";
import opay from "public/opay.png";
import palmpay from "public/palmpay.png";
import stanbic from "public/stanbic.png";
import { ChangeEvent, FormEvent, Fragment, useId, useState } from "react";
import { useQuery } from "react-query";

const { Title, Paragraph } = Typography;
export const LoadingBankSkeleton = () => {
  return (
    <div className="bg-input-field rounded-md p-4 mb-5 max-w-[450px] w-full mx-auto">
      <div className="animate-pulse flex items-center justify-center space-x-1">
        <div className="rounded-full bg-gray-200 h-10 w-10" />
        <div className="flex-1 space-y-1 py-1">
          <div className="h-3 w-[75%] bg-gray-200 rounded" />
          <div className="h-3  w-[95%] bg-gray-200 rounded" />
        </div>
      </div>
    </div>
  );
};
const SelectBank = () => {
  const [selected, setSelected] = useState("");
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const [messageApi, contextHolder] = message.useMessage();
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
  const fetchBankList = async (
    phone: string
  ): Promise<{
    data: Array<{
      icon: string;
      value: string;
      bankName: string;
      holder: string;
    }>;
  }> => {
    try {
      const response = await fetch(
        `${process.env.BLUE_API}payment-link?phone=${phone}`
      );

      if (!response.ok) {
        const result = await response.json();
        throw new Error(result.message);
      }

      const result = await response.json();
      console.log(response, result, "fetching list of banks successful!");
      return result;
    } catch (error) {
      console.error(error, "error in fetching list of banks");
      throw error;
    }
  };

  useQuery("bank-list", () => fetchBankList("08037683537"));

  const handleRadioChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSelected(e.target.value);
    setOpen(true);
  };
  const closeModal = () => setOpen(false);
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
  return (
    <Fragment>
      {contextHolder}
      {open && (
        <Portal onClose={closeModal}>
          <div
            onClick={(e) => e.stopPropagation()}
            className="py-8 px-4 laptop:px-8 m-auto rounded-lg bg-white"
          >
            <form onSubmit={payToBankHandler}>
              <div className="text-center mb-1">
                <Title
                  level={4}
                  className="leading-7 text-[#101828] laptop:leading-[3.37644rem] font-bold laptop:text-[1.75rem] text-lg m-0"
                >
                  Confirm Account Number
                </Title>
                <Paragraph className="leading-[1.125rem] max-w-sm tracking-[-0.00813rem] font-normal laptop:tracking-[-0.01375rem] laptop:text-[1.375rem] text-[0.8125rem] text-body-text-2">
                  Input your entire account number to confirm it's yours.
                </Paragraph>
              </div>
              <input
                type="text"
                className="border w-full mb-3 border-primary outline-0 ring-0 rounded px-4 py-3"
                defaultValue="1234567890"
              />
              <Button
                type="primary"
                htmlType="submit"
                className="laptop mx-auto mt-6 flex items-center justify-center disabled:text-gray-900 disabled:bg-gray-200 disabled:border-none text-[0.9375rem] font-medium leading-[1.
            39663rem] text-white laptop:p-6 laptop:text-[1rem] laptop:leading-[1.5rem] "
                block
                size="large"
              >
                Withdraw
              </Button>
            </form>
          </div>
        </Portal>
      )}
      <div className="max-w-2xl laptop-md:mt-20 mb-8 mx-auto text-center laptop:mb-10">
        <Title
          level={3}
          className="text-body-text-2 font-semibold leading-[1.6625rem] text-xl laptop:text-4xl laptop:leading-normal"
        >
          Select your desired bank account:
        </Title>
        <div className="text-body-text-2 max-w-[450px] mx-auto leading-[1.3125rem] text-[0.9375rem] laptop:leading-9 laptop:text-[1.375rem] font-medium">
          Choose the bank account you want to transfer the received money to:
        </div>
      </div>
      {/* {isLoading &&
        Array.from({ length: 3 }, (_, index) => (
          <LoadingBankSkeleton key={index} />
        ))} */}
      <form className="max-w-lg w-full m-auto">
        <div className="flex items-center w-full flex-col gap-20 justify-center">
          <div className="w-full">
            {bankList.map((item) => (
              <div
                key={item.id}
                className="relative w-full h-[80px] max-w-[450px] mb-6"
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
                  className="absolute w-full m-auto flex items-center justify-start gap-4 p-4 laptop:gap-8 laptop:p-8 h-full top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
                >
                  <div>
                    <Image
                      src={item.icon}
                      alt={item.value}
                      className="laptop:w-[55px] w-[45px] h-[45px] laptop:h-[55px] object-contain"
                    />
                  </div>
                  <div className="text-start">
                    <Title
                      level={5}
                      className="font-semibold laptop:leading-[1.97531rem] mb-1 leading-[1.3125rem] text-[0.9375rem] laptop:text-xl text-txt"
                    >
                      {item.bankName}
                    </Title>
                    <Paragraph className="laptop:leading-[1.85113rem] font-medium m-0 leading-5 text-[0.8125rem] laptop:text-lg text-txt">
                      {item.holder}
                    </Paragraph>
                  </div>
                </label>
              </div>
            ))}
          </div>
        </div>
      </form>
    </Fragment>
  );
};

export default SelectBank;
