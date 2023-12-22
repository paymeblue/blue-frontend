"use client";
import { LoadingOutlined } from "@ant-design/icons";
import useUserKycDetailsGet from "@hooks/kyc/useUserKycDetailsFetch";
import {
  DOJAH_APP_ID,
  DOJAH_PUBLIC_KEY,
  DOJAH_WIDGET_ID,
} from "@lib/constants";
import { Spin } from "antd";
import EmptyState from "app/(receive_money)/components/empty-state";
import { useSearchParams } from "next/navigation";
// @ts-ignore
import Dojah from "react-dojah";

const VerifyIdentity = () => {
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  const { error, loading, userKycDetails } = useUserKycDetailsGet({
    token,
  });
  const antIcon = (
    <LoadingOutlined
      style={{
        fontSize: 32,
        display: "flex",
        alignItems: "center",
        minHeight: "10rem",
        color: "#4341CD",
      }}
      spin
    />
  );

  const closeWebview = () => {
    window.postMessage("closeWebView", "*");
    window?.Close.postMessage("closeWebView", "*");
  };

  const closeWebViewOnError = () => {
    window.postMessage("closeWebViewError", "*");
    window?.Close.postMessage("closeWebViewError", "*");
  };

  const response = (type: any, data: any) => {
    console.log(type, data);
    if (type === "success") {
      console.log({ type, data });
      closeWebview();
    } else if (type === "error") {
      closeWebViewOnError();
    } else if (type === "close") {
      closeWebViewOnError();
    } else if (type === "begin") {
    } else if (type === "loading") {
    }
  };

  if (!token) {
    return (
      <div className="flex w-screen h-screen items-center justify-center">
        <EmptyState
          title="Invalid credentials"
          description="We could not verify your identity. Please log into Blue and try again."
          btnText="Sign up for Blue today!"
        />
      </div>
    );
  }

  if (loading) {
    return (
      <div className="flex w-screen h-screen items-center justify-center">
        <Spin size="large" indicator={antIcon} />
      </div>
    );
  }

  if (error || !userKycDetails) {
    return (
      <div className="flex w-screen h-screen items-center justify-center">
        <EmptyState
          title="Invalid credentials"
          description="We could not verify your identity. Please return to the Blue app and try again."
          btnText="Return to app"
          btnOnClick={() => {
            closeWebViewOnError();
          }}
        />
      </div>
    );
  }

  return (
    <Dojah
      response={response}
      appID={DOJAH_APP_ID}
      publicKey={DOJAH_PUBLIC_KEY}
      type={"custom"}
      config={{
        widget_id: DOJAH_WIDGET_ID,
      }}
      userData={{
        first_name: userKycDetails.first_name,
        last_name: userKycDetails.last_name,
        dob: userKycDetails.date_of_birth,
        residence_country: "NG",
      }}
      metadata={{
        wallet_code: userKycDetails.wallet_code,
      }}
      govData={{
        bvn: userKycDetails.bvn,
      }}
    />
  );
};

export default VerifyIdentity;
