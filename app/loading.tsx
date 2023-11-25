"use client";
import { LoadingOutlined } from "@ant-design/icons";
import { Spin } from "antd";
import Image from "next/image";
import logo from "public/logo.png";

const Loading = () => {
  const antIcon = (
    <LoadingOutlined
      style={{
        fontSize: 32,
        display: "flex",
        alignItems: "center",
        minHeight: "10rem",
        color: "#fff",
      }}
      spin
    />
  );

  return (
    <div className="flex h-screen items-center gap-1 flex-col justify-center bg-primary">
      <Image
        src={logo}
        alt="loading"
        priority
        className="w-auto object-contain"
      />
      <Spin size="large" indicator={antIcon} />
    </div>
  );
};

export default Loading;
