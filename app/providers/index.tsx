"use client";

import {
  StyleProvider,
  createCache,
  extractStyle,
  px2remTransformer,
} from "@ant-design/cssinjs";
import type Entity from "@ant-design/cssinjs/es/Cache";
import theme from "@styles/theme";
import { ConfigProvider } from "antd";
import { useServerInsertedHTML } from "next/navigation";
import { ReactNode, useMemo } from "react";
import { QueryClient, QueryClientProvider } from "react-query";

const px2rem = px2remTransformer({
  rootValue: 16,
});

const Providers = ({ children }: { children: ReactNode }) => {
  const cache = useMemo<Entity>(() => createCache(), []);
  const queryClient = new QueryClient();
  useServerInsertedHTML(() => (
    <style
      id="antd"
      dangerouslySetInnerHTML={{ __html: extractStyle(cache, true) }}
    />
  ));
  return (
    <QueryClientProvider client={queryClient}>
      <ConfigProvider theme={theme}>
        <StyleProvider
          hashPriority="high"
          transformers={[px2rem]}
          cache={cache}
        >
          {children}
        </StyleProvider>
      </ConfigProvider>
    </QueryClientProvider>
  );
};

export default Providers;
