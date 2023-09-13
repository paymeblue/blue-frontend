"use client";
import { StyleProvider } from "@ant-design/cssinjs";
import theme from "@styles/theme";
import { ConfigProvider } from "antd";
import { ReactNode } from "react";

const Providers = ({ children }: { children: ReactNode }) => {
  return (
    <ConfigProvider theme={theme}>
      <StyleProvider hashPriority="high">{children}</StyleProvider>
    </ConfigProvider>
  );
};

export default Providers;
