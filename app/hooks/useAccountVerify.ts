import axios from "axios";
import { useState } from "react";

interface Account {
  account_name: string;
  account_number: string;
  bank: string;
}

const useAccountVerify = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [account, setAccount] = useState<Account | null>(null);

  const verifyAccount = async (
    urlCode: string,
    accountNumber: string,
    bankId: string
  ) => {
    setLoading(true);
    setAccount(null);
    setError(false);
    try {
      const result = await axios.post(
        "https://blue-api-backend.herokuapp.com/api/payment-link/verify-account",
        {
          url_code: urlCode,
          account_number: accountNumber,
          bank_id: bankId,
        }
      );
      setAccount(result.data.data);

      setError(false);
    } catch (err) {
      setAccount(null);
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    account,
    verifyAccount,
    error,
  };
};

export default useAccountVerify;
