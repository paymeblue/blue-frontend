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

const px2rem = px2remTransformer({
  rootValue: 16,
});

const Providers = ({ children }: { children: ReactNode }) => {
  const cache = useMemo<Entity>(() => createCache(), []);
  useServerInsertedHTML(() => (
    <style
      id="antd"
      dangerouslySetInnerHTML={{ __html: extractStyle(cache, true) }}
    />
  ));
  return (
    <ConfigProvider theme={theme}>
      <StyleProvider hashPriority="high" transformers={[px2rem]} cache={cache}>
        {children}
      </StyleProvider>
    </ConfigProvider>
  );
};

export default Providers;
