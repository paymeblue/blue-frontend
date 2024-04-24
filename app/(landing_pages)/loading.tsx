"use client";
import { LoadingOutlined } from "@ant-design/icons";
import { Spin } from "antd";

const Loading = () => {
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

  return (
    <div className="flex w-screen h-screen items-center justify-center">
      <Spin size="large" indicator={antIcon} />
    </div>
  );
};

export default Loading;
