"use client";

import { AntdRegistry } from "@ant-design/nextjs-registry";
import theme from "@styles/theme";
import { ConfigProvider } from "antd";
import { ReactNode } from "react";
import { QueryClient, QueryClientProvider } from "react-query";

const Providers = ({ children }: { children: ReactNode }) => {
  const queryClient = new QueryClient();

  return (
    <AntdRegistry>
      <ConfigProvider theme={theme}>
        <QueryClientProvider client={queryClient}>
          {children}
        </QueryClientProvider>
      </ConfigProvider>
    </AntdRegistry>
  );
};

export default Providers;
