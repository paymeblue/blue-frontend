"use client";

import axios from "axios";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";

interface Props {
  code?: string;
}

const useHandleCodeVerify = ({ code }: Props) => {
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  const handleCodeVerify = useCallback(async () => {
    setLoading(true);
    try {
      await axios.get(
        `https://blue-api-backend.herokuapp.com/api/payment-link/verify/${code}`
      );
      router.push(`/receive-money/${code}`);
    } catch (err) {
      console.log({ err });
      setLoading(false);
    }
  }, [code]);

  useEffect(() => {
    if (!code) return;

    handleCodeVerify();
  }, [code, handleCodeVerify]);

  return {
    loading,
  };
};

export default useHandleCodeVerify;
