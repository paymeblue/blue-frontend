"use client";

import {
  StyleProvider,
  createCache,
  extractStyle,
  px2remTransformer,
} from "@ant-design/cssinjs";
import theme from "@styles/theme";
import { ConfigProvider } from "antd";
import { useServerInsertedHTML } from "next/navigation";
import React from "react";

const px2rem = px2remTransformer({
  rootValue: 16,
});

const StyledComponentsRegistry = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const cache = createCache();
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

export default StyledComponentsRegistry;
