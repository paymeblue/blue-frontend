"use client";
import { CheckCircleOutlined } from "@ant-design/icons";
import Portal from "@shared/portal";
import { Button, Form, Input, Typography, message } from "antd";
import { useCtx } from "app/context/store-context";
import axios, { AxiosError, AxiosResponse } from "axios";
import Image from "next/image";
import { useRouter } from "next/navigation";
import bank from "public/bank.png";
import { ChangeEvent, Fragment, useEffect, useState } from "react";
import { useQuery } from "react-query";
import EmptyState from "./empty-state";

type Bank = {
  account_number: string;
  bank_code: string;
  bank_name: string;
  receiver_name: string;
};
type BasicResponse = {
  status: "fail" | "string";
  message: string;
};

const { Title, Paragraph } = Typography;
const { Item } = Form;
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
const SelectBank = ({
  sendReceipt,
  code,
  phone,
  transaction_id,
  id,
}: {
  sendReceipt: (id: number) => void;
  code: string;
  phone: string;
  transaction_id: number;
  id: number;
}) => {
  const { state } = useCtx();

  console.log(state.phone);
  const [selected, setSelected] = useState("");
  const [selectedBank, setSelectedBank] = useState<Bank | undefined>();
  const [open, setOpen] = useState(false);
  const [verify, setVerify] = useState({ loading: false, status: undefined });
  const router = useRouter();
  const [messageApi, contextHolder] = message.useMessage();
  useEffect(() => {
    if (state.phone) {
    }
  }, [state.phone]);
  console.log(selectedBank, "selected bank");
  const fetchBankList = async (phone: string | null): Promise<Bank[]> => {
    try {
      const result = await axios.get(
        // `https://blue-api-backend.herokuapp.com/api/payment-link/linked-accounts?phone=${phone}`
        `https://blue-api-backend.herokuapp.com/api/payment-link/linked-accounts?phone=${phone}&url_code=${code}`
      );
      return result.data.data;
    } catch (error) {
      console.log(error, "error in fetching list of banks");
      throw error;
    }
  };
  const withdrawFund = async (data: Bank) => {
    try {
      const body: Partial<{
        amount: number | undefined;
        transaction_id: string;
        account_number: string;
        bank_code: string;
        bank_name: string;
        receiver_name: string;
      }> = {
        ...data,
      };
      delete body.receiver_name;
      delete body.bank_name;
      const response: AxiosResponse = await axios.post(
        `https://blue-api-backend.herokuapp.com/api/payment-link/${id}/withdraw`,
        body
      );
      console.log(response, "withdrawal response");
      sendReceipt(response.data.data);
      messageApi.open({
        content: `${response.data.message}`,
        className: "[&>div]:bg-[#17B472] [&>div]:text-white",
        icon: <CheckCircleOutlined />,
      });
      router.replace("?step=success");
      closeModal();
      return response.data.data;
    } catch (error: any) {
      console.log(error, "withdrawal error");
      if (axios.isAxiosError(error)) {
        // Axios error (HTTP error response)
        const axiosError: AxiosError = error;
        console.log(axiosError, "axios error");
        if (axiosError.response) {
          console.log("Error Status:", axiosError.response.status);
          console.log("Error Data:", axiosError.response.data);
          messageApi.open({
            content: `${(axiosError.response.data as BasicResponse).message}`,
            className: "[&>div]:bg-red-800 [&>div]:text-white",
          });
        } else {
          console.log("Network Error:", axiosError.message);
          messageApi.open({
            content: `${axiosError.message}`,
            className: "[&>div]:bg-red-800 [&>div]:text-white",
          });
        }
      } else {
        // Non-Axios error (e.g., network error)
        console.log("Unexpected Error:", error.message);
        messageApi.open({
          content: `${error.message}`,
          className: "[&>div]:bg-red-800 [&>div]:text-white",
        });
      }
    }
    // };
  };
  const { data, isLoading, error } = useQuery(
    "bank-list",
    () => fetchBankList(phone),
    { retry: false }
    // { enabled: !!state.phone }
  );

  const { data: transfer, isLoading: withdrawalLoading } = useQuery(
    "transfer-bank",
    () => withdrawFund(selectedBank!),
    { enabled: !!verify.status, retry: false }
  );
  if (error) {
    return <EmptyState />;
  }
  console.log(transfer, "transfer complete");
  const handleRadioChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSelected(e.target.value);
    const selectedItem = data?.find(
      (item: any) => item.account_number === e.target.value
    );
    setSelectedBank(selectedItem);
    setOpen(true);
  };
  const closeModal = () => {
    setOpen(false);
    setSelected("");
  };

  const onFinish = async ({ acctNum }: { acctNum: string }) => {
    setVerify((prev) => ({ ...prev, loading: true }));
    const body = {
      account_number: acctNum,
      masked_account: selectedBank?.account_number,
    };
    try {
      const result = await axios.post(
        `https://blue-api-backend.herokuapp.com/api/payment-link/${id}/validate-account`,
        body
      );
      setVerify((prev) => ({ ...prev, status: result.data.status }));
      messageApi.open({
        content: `${result.data.message}`,
        className: "[&>div]:bg-green-800 [&>div]:text-white",
      });
      if (selectedBank) {
        setSelectedBank(() => ({
          ...selectedBank,
          account_number: acctNum,
        }));
      }
    } catch (error) {
      messageApi.open({
        content: `Account numbers didn't match. Please enter the correct account number for the account.`,
        className: "[&>div]:bg-red-800 [&>div]:text-white",
      });
    } finally {
      setVerify((prev) => ({ ...prev, loading: false }));
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
            <Form onFinish={onFinish}>
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
              <Item name="acctNum">
                <Input
                  type="text"
                  className="border w-full mb-3 border-primary outline-0 ring-0 rounded px-4 py-3"
                  placeholder="1234567890"
                />
              </Item>
              <Button
                type="primary"
                htmlType="submit"
                className="laptop mx-auto mt-6 flex items-center justify-center disabled:text-gray-900 disabled:bg-gray-200 disabled:border-none text-[0.9375rem] font-medium leading-[1.
            39663rem] text-white laptop:p-6 laptop:text-[1rem] laptop:leading-[1.5rem] "
                block
                size="large"
                loading={verify.loading || withdrawalLoading}
              >
                {verify.loading
                  ? "Verifying"
                  : withdrawalLoading
                  ? "Attempting Withdrawal"
                  : "Verify"}
              </Button>
            </Form>
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
      {isLoading ? (
        Array.from({ length: 3 }, (_, index) => (
          <LoadingBankSkeleton key={index} />
        ))
      ) : (
        <form className="max-w-lg w-full m-auto">
          <div className="flex items-center w-full flex-col gap-20 justify-center">
            <div className="w-full">
              {data?.map((item: Bank) => {
                return (
                  <div
                    key={item.account_number}
                    className="relative w-full h-[80px] max-w-[450px] mb-6"
                  >
                    <input
                      type="radio"
                      name={item.account_number}
                      value={item.account_number}
                      id={item.account_number}
                      checked={selected === item.account_number}
                      onChange={handleRadioChange}
                      className="w-full h-full relative appearance-none checked:border-primary bg-input-field hover:border-primary border-transparent rounded border"
                    />
                    <label
                      htmlFor={item.account_number}
                      className="absolute w-full m-auto flex items-center justify-start gap-4 p-4 laptop:gap-8 laptop:p-8 h-full top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
                    >
                      <div>
                        <Image
                          src={bank}
                          alt="send to blue"
                          className="laptop:w-[55px] w-[45px] h-[45px] laptop:h-[55px] object-contain"
                        />
                      </div>
                      <div className="text-start">
                        <Title
                          level={5}
                          className="font-semibold laptop:leading-[1.97531rem] mb-1 leading-[1.3125rem] text-[0.9375rem] laptop:text-xl text-txt"
                        >
                          {item.bank_name}
                        </Title>
                        <Paragraph className="laptop:leading-[1.85113rem] font-medium m-0 leading-5 text-[0.8125rem] laptop:text-lg text-txt">
                          {item.receiver_name} - {item.account_number}
                        </Paragraph>
                      </div>
                    </label>
                  </div>
                );
              })}
            </div>
          </div>
        </form>
      )}
    </Fragment>
  );
};

export default SelectBank;
