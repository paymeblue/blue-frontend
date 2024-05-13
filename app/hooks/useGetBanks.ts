import axios from "axios";
import { useCallback, useEffect, useState } from "react";

export interface Bank {
  id: number;
  name: string;
  logo_url: null | string;
}

const useGetBanks = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [banks, setBanks] = useState<Bank[] | null>(null);

  const handleBanksFetch = useCallback(async () => {
    setLoading(true);
    setError(false);

    try {
      const result = await axios.get(
        "https://blue-api-backend.herokuapp.com/api/banks"
      );
      setBanks(result.data.data.banks);
    } catch (err) {
      setError(true);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    handleBanksFetch();
  }, [handleBanksFetch]);

  return { loading, error, banks };
};

export default useGetBanks;
