"use client";
import axios from "axios";
import { useCallback, useEffect, useState } from "react";

interface IUseFetchBankList {
  phone: string;
  code: string;
}

export interface LinkedBank {
  account_number: string;
  bank_name: string;
  receiver_name: string;
  bank_code: string;
}

const useFetchBankList = ({ phone, code }: IUseFetchBankList) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [linkedBanks, setLinkedBanks] = useState<LinkedBank[] | null>(null);

  const handleFetchBankList = useCallback(async () => {
    setLoading(true);
    setError(false);
    try {
      const result = await axios.get(
        `https://blue-api-backend.herokuapp.com/api/payment-link/linked-accounts?phone=${phone}&url_code=${code}`
      );
      setLinkedBanks(result.data.data);
    } catch (err) {
    } finally {
      setLoading(false);
    }
  }, [code, phone]);

  useEffect(() => {
    if (!code && !phone) return;
    handleFetchBankList();
  }, [code, phone, handleFetchBankList]);

  return { linkedBanks, error, loading };
};

export default useFetchBankList;
