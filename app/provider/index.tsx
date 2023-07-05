"use client";
import { StyleProvider } from "@ant-design/cssinjs";
import theme from "@styles/theme";
import { ConfigProvider } from "antd";
import { Fragment, ReactNode } from "react";

interface IProps {
  children: ReactNode;
}

const Provider = ({ children }: IProps) => {
  return (
    <Fragment>
      <ConfigProvider theme={theme}>
        <StyleProvider hashPriority="high">{children}</StyleProvider>
      </ConfigProvider>
    </Fragment>
  );
};

export default Provider;
