"use client";
import axios from "axios";
import { useCallback, useEffect, useState } from "react";

interface Props {
  token: string | null;
  type?: "business" | "personal";
}

interface IUserKycDetails {
  first_name: string;
  last_name: string;
  phone: string;
  wallet_code: string;
}

const useUserKycDetailsGet = ({ token, type = "personal" }: Props) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [userKycDetails, setUserKycDetails] = useState<IUserKycDetails | null>(
    null
  );

  const handleUserKycDetailsGet = useCallback(async () => {
    setLoading(true);
    setError(false);
    try {
      const base =
        type === "personal"
          ? "https://blue-api-backend.herokuapp.com/api/kycs"
          : "https://blue-business-backend-8c46f2828f9e.herokuapp.com/api/kycs/web";
      const res = await axios.get(base, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const details = res?.data?.data as IUserKycDetails;
      setUserKycDetails(details);
    } catch (err) {
      setError(true);
    } finally {
      setLoading(false);
    }
  }, [token, type]);

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
