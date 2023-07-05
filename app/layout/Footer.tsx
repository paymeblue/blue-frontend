"use client";

import {
  InstagramOutlined,
  LinkedinOutlined,
  TwitterOutlined,
  YoutubeFilled,
} from "@ant-design/icons";
import { Layout, Space, Typography } from "antd";
const { Text } = Typography;
const { Footer } = Layout;

const policies = [
  "Electronic policy",
  "Privacy policy",
  "Terms and conditions",
];
const socialIcons = [
  {
    id: "1",
    icon: (
      <InstagramOutlined className="marker: mx-1 rounded-full bg-gray-600 p-1 text-white" />
    ),
  },
  {
    id: "2",
    icon: (
      <LinkedinOutlined className="mx-1 rounded-full bg-gray-600 p-1 text-white" />
    ),
  },
  {
    id: "3",
    icon: (
      <TwitterOutlined className="mx-1 rounded-full bg-gray-600 p-1 text-white" />
    ),
  },
  {
    id: "4",
    icon: (
      <YoutubeFilled className="mx-1 rounded-full bg-gray-600 p-1 text-white" />
    ),
  },
];
const LayoutFooter = () => {
  return (
    <Footer className="bg-black px-0 py-6">
      <Space
        size="large"
        className="[&>.ant-space-item]:wfull flex w-full flex-col items-center justify-between px-8 tablet:flex-row tablet:px-20"
      >
        <Text className="font-medium text-neutral laptop:text-[15px] laptop:leading-[21px]">
          © 2023 Blue. All rights reserved
        </Text>
        <ul className="my-0 flex items-center justify-between">
          {policies.map((item, index) => (
            <li
              key={index}
              className="mx-2 font-medium text-neutral laptop:text-[15px] laptop:leading-[21px]"
            >
              {item}
            </li>
          ))}
        </ul>
        <ul className="my-0 flex items-center justify-between">
          {socialIcons.map((item) => (
            <li
              key={item.id}
              className="mx-2 font-medium laptop:text-[15px] laptop:leading-[21px]"
            >
              {item.icon}
            </li>
          ))}
        </ul>
      </Space>
    </Footer>
  );
};

export default LayoutFooter;
