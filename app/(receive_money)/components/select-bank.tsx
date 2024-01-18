"use client";
import { CheckCircleOutlined } from "@ant-design/icons";
import Portal from "@shared/portal";
import { Button, Form, Input, Typography, message } from "antd";
import Image from "next/image";
import { useRouter } from "next/navigation";
import bank from "public/bank.png";
import { ChangeEvent, Fragment, useState } from "react";
import EmptyState from "./empty-state";
import useFetchBankList, { LinkedBank } from "@hooks/useFetchBankList";
import useWithdrawFund from "@hooks/useWithdrawFund";

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
  const {
    loading: loadingLinkedBanks,
    error: errorFetchingLinkedBanks,
    linkedBanks,
  } = useFetchBankList({ code, phone });

  const [selected, setSelected] = useState("");
  const [selectedBank, setSelectedBank] = useState<LinkedBank | undefined>();
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const [messageApi, contextHolder] = message.useMessage();

  const {
    handleWithdraw,
    loading: loadingWithdraw,
    isWidthrawing,
  } = useWithdrawFund({
    id: String(id),
    messageApi,
    selectedBank: selectedBank!,
    onSuccess: (response) => {
      sendReceipt(response.data);
      messageApi.open({
        content: `${response.message}`,
        className: "[&>div]:bg-[#17B472] [&>div]:text-white",
        icon: <CheckCircleOutlined />,
      });
      router.replace("?step=success");
      closeModal();
    },
  });

  if (errorFetchingLinkedBanks) {
    return <EmptyState />;
  }
  const handleRadioChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSelected(e.target.value);
    const selectedItem = linkedBanks?.find(
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
    if (!selectedBank) return;
    handleWithdraw(acctNum, selectedBank?.account_number);
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
                loading={loadingWithdraw}
              >
                {loadingWithdraw
                  ? isWidthrawing
                    ? "Withdrawing"
                    : "Verifying"
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
      {loadingLinkedBanks ? (
        Array.from({ length: 3 }, (_, index) => (
          <LoadingBankSkeleton key={index} />
        ))
      ) : (
        <form className="max-w-lg w-full m-auto">
          <div className="flex items-center w-full flex-col gap-20 justify-center">
            <div className="w-full">
              {linkedBanks?.map((item) => {
                return (
                  <div
                    key={item.account_number}
                    className="relative w-full h-[90px] max-w-[450px] mb-6"
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
