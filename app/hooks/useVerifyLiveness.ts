import axios, { AxiosError, AxiosResponse } from "axios";
import { useState } from "react";

interface VerifyLivenessRequest {
  verification_id: string;
  token: string;
}

interface VerifyLivenessResponse {
  status: string;
  message: string;
}

interface Props {
  isLocal?: boolean;
}

const local = "http://localhost:3000/api";
const production = "https://blue-api-backend.herokuapp.com/api";

const useVerifyLiveness = ({ isLocal = false }: Props) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [message, setMessage] = useState("");
  const [response, setResponse] = useState<VerifyLivenessResponse | null>(null);

  const verifyLiveness = async (payload: VerifyLivenessRequest) => {
    setLoading(true);
    setError(false);
    setResponse(null);
    try {
      const result: AxiosResponse<VerifyLivenessResponse> = await axios.post(
        `${isLocal ? local : production}/kycs/verify-liveness`,
        {
          verification_id: payload.verification_id,
        },
        {
          headers: {
            Authorization: `Bearer ${payload.token}`,
          },
        }
      );
      setResponse(result.data);
      setMessage(result.data?.message);
      setError(false);
      return result.data;
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        setMessage(err.response?.data.message);
      }
      setResponse(null);
      setError(true);
      return null;
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    error,
    message,
    response,
    verifyLiveness,
  };
};

export default useVerifyLiveness;
