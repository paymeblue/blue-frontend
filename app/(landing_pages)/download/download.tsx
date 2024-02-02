"use client";
import { LoadingOutlined } from "@ant-design/icons";
import { detectOS } from "@lib/index";
import { Spin } from "antd";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const antIconStyle = {
  fontSize: 32,
  display: "flex",
  alignItems: "center",
  minHeight: "10rem",
  color: "#4341CD",
};

const Download = () => {
  const router = useRouter();
  const [isClient, setClient] = useState(false);

  useEffect(() => {
    setClient(true);
  }, []);

  const platform = isClient ? detectOS() : null;

  useEffect(() => {
    if (isClient) {
      const redirectLink =
        platform === "iOS" ? "/#link-to-iOS-store" : "/#link-to-android-store";
      router.replace(redirectLink);
    }
  }, [isClient, platform, router]);

  return (
    <div className="flex w-screen h-screen items-center justify-center">
      <Spin
        size="large"
        indicator={<LoadingOutlined style={antIconStyle} spin />}
      />
    </div>
  );
};

export default Download;
