"use client";

import axios from "axios";
import { useCallback, useEffect, useState } from "react";

interface Props {
  code?: string;
}

interface ReceiverDetails {
  amount: string;
  sender: string;
  phone: string;
  transaction_id: number;
}

const useGetReceiverDetails = ({ code }: Props) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [receiverDetails, setReceiverDetails] =
    useState<ReceiverDetails | null>(null);

  const handleCodeVerify = useCallback(async () => {
    setLoading(true);
    setError(false);
    try {
      const res = await axios.get(
        `https://blue-api-backend.herokuapp.com/api/payment-link/receiver-details/${code}`
      );
      const details = res?.data?.data as ReceiverDetails;
      setReceiverDetails(details);
      setLoading(false);
    } catch (err) {
      console.log({ err });
      setLoading(false);
      setError(true);
    }
  }, [code]);

  useEffect(() => {
    if (!code) return;

    handleCodeVerify();
  }, [code, handleCodeVerify]);

  return {
    loading,
    receiverDetails,
    error,
  };
};

export default useGetReceiverDetails;
