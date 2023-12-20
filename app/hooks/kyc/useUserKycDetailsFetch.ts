"use client";
import { useCallback, useEffect, useState } from "react";

interface Props {
  token: string | null;
}

interface IUserKycDetails {
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  bvn: string;
  walletId: string;
}

const useUserKycDetailsGet = ({ token }: Props) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [userKycDetails, setUserKycDetails] = useState<IUserKycDetails | null>(
    null
  );

  const handleUserKycDetailsGet = useCallback(async () => {
    setLoading(true);
    setError(false);
    try {
      // const res = await axios.get() // Call accelerate endpoint
      setUserKycDetails({
        firstName: "Victor",
        lastName: "Whyte",
        bvn: "22222222222",
        dateOfBirth: "1999-04-22",
        walletId: "12222333",
      });
    } catch (err) {
      setError(true);
    } finally {
      setLoading(false);
    }
  }, [token]);

  useEffect(() => {
    if (!token) return;
    handleUserKycDetailsGet();
  }, [token, handleUserKycDetailsGet]);

  return {
    loading,
    error,
    userKycDetails,
  };
};

export default useUserKycDetailsGet;
