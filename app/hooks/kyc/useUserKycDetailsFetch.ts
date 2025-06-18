"use client";
import axios from "axios";
import { useCallback, useEffect, useState } from "react";

interface Props {
  token: string | null;
  type?: "business" | "personal";
  isLocal?: boolean;
}

interface IUserKycDetails {
  first_name: string;
  last_name: string;
  phone: string;
  wallet_code: string;
}

const local = "http://localhost:3000/api";

const PERSONAL_API_URL = "https://blue-api-backend.herokuapp.com/api";
const BUSINESS_API_URL =
  "https://blue-business-backend-8c46f2828f9e.herokuapp.com/api";

const useUserKycDetailsGet = ({
  token,
  type = "personal",
  isLocal = false,
}: Props) => {
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
          ? `${isLocal ? local : PERSONAL_API_URL}/kycs`
          : `${isLocal ? local : BUSINESS_API_URL}/kycs/web`;
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
    if (!token) {
      setError(true);
      setUserKycDetails(null);
      setLoading(false);
      return;
    }
    handleUserKycDetailsGet();
  }, [token, handleUserKycDetailsGet]);

  return {
    loading,
    error,
    userKycDetails,
  };
};

export default useUserKycDetailsGet;
