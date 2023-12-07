"use client";

import axios from "axios";
import { useCallback, useEffect, useState } from "react";

interface Props {
  code?: string;
}

interface ReceiverDetails {
  id: number;
  amount: string;
  sender: string;
  phone: string;
  transaction_id: number;
  charges: string;
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
    } catch (err) {
      console.log({ err });
      setError(true);
    } finally {
      setLoading(false);
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
