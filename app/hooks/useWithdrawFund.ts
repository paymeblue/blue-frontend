"use client";
import { MessageInstance } from "antd/es/message/interface";
import axios, { AxiosResponse } from "axios";
import { useState } from "react";
import { LinkedBank } from "./useFetchBankList";

interface IUseWithdrawFund {
  id: string;
  messageApi: MessageInstance;
  selectedBank: LinkedBank;
  onSuccess?: (x: any) => void;
}

const useWithdrawFund = ({
  id,
  messageApi,
  selectedBank,
  onSuccess,
}: IUseWithdrawFund) => {
  const [loading, setLoading] = useState(false);

  const handleWithdraw = async (
    enteredAccountNumber: string,
    maskedAccountNumber: string
  ) => {
    setLoading(true);
    try {
      // Validate the acconut number
      const body = {
        account_number: enteredAccountNumber,
        masked_account: maskedAccountNumber,
      };

      const result = await axios.post(
        `https://blue-api-backend.herokuapp.com/api/payment-link/${id}/validate-account`,
        body
      );
      messageApi.open({
        content: `${result.data.message}`,
        className: "[&>div]:bg-green-800 [&>div]:text-white",
      });

      //   Withdraw the funds
      const payload = {
        bank_code: selectedBank.bank_code,
        account_number: enteredAccountNumber,
      };

      const response: AxiosResponse = await axios.post(
        `https://blue-api-backend.herokuapp.com/api/payment-link/${id}/withdraw`,
        payload
      );

      if (onSuccess) {
        onSuccess(response.data);
      }
    } catch (err: any) {
      console.log({ err });
      const message = err?.response?.data?.message;
      if (message === "Invalid account number") {
        messageApi.open({
          content: `Account numbers didn't match. Please enter the correct account number for the account.`,
          className: "[&>div]:bg-red-800 [&>div]:text-white",
        });
      } else {
        messageApi.open({
          content: message || "Something went wrong. Please try again later",
          className: "[&>div]:bg-red-800 [&>div]:text-white",
        });
      }
    } finally {
      setLoading(false);
    }
  };

  return { loading, handleWithdraw };
};

export default useWithdrawFund;
