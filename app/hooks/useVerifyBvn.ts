import axios, { AxiosError, AxiosResponse } from "axios";
import { useState } from "react";

interface VerifyBvnRequest {
  bvn: string;
  dateOfBirth: string;
  token: string;
}

interface VerifyBvnResponse {
  status: string;
  message: string;
  data?: {
    isFirstNameValid: boolean;
    isLastNameValid: boolean;
    isDateOfBirthValid: boolean;
    validationMessage: string;
  };
}

interface Props {
  isLocal?: boolean;
}

const local = "http://localhost:3000/api";
const production = "https://blue-api-backend.herokuapp.com/api";

const useVerifyBvn = ({ isLocal = false }: Props) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [message, setMessage] = useState("");
  const [response, setResponse] = useState<VerifyBvnResponse | null>(null);

  const verifyBvn = async (payload: VerifyBvnRequest) => {
    setLoading(true);
    setError(false);
    setResponse(null);
    try {
      const result: AxiosResponse<VerifyBvnResponse> = await axios.post(
        `${isLocal ? local : production}/kycs/verify-bvn`,
        {
          bvn: payload.bvn,
          date_of_birth: payload.dateOfBirth,
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
    verifyBvn,
  };
};

export default useVerifyBvn;
