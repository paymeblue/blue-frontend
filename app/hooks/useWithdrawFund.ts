"use client";
import { MessageInstance } from "antd/es/message/interface";
import axios, { AxiosResponse } from "axios";
import { useState } from "react";

interface IUseWithdrawFund {
  messageApi: MessageInstance;
  onSuccess?: (x: any) => void;
}
``;

const useWithdrawFund = ({ messageApi, onSuccess }: IUseWithdrawFund) => {
  const [loading, setLoading] = useState(false);

  const handleWithdraw = async (code: string | undefined) => {
    if (!code) return;
    setLoading(true);
    try {
      const response: AxiosResponse = await axios.get(
        `https://blue-api-backend.herokuapp.com/api/payment-link/withdraw?url_code=${code}`
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
