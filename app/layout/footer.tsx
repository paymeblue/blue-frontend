"use client";

import { PhoneOutlined } from "@ant-design/icons";
// import LinkedinOutlined from "@components/assets/icons/linkedin";
import { Layout, Space, Typography } from "antd";
import Link from "next/link";
const { Text } = Typography;
const { Footer } = Layout;

const policies = [
  { id: "1", text: "Privacy policy", link: "/privacy" },
  { id: "2", text: "Terms and conditions", link: "/terms-and-conditions" },
];
// const socialIcons = [
//   {
//     id: "1",
//     link: "#",
//     icon: (
//       <InstagramOutlined className="mx-[2px] rounded-full bg-[#202124] p-[6px] text-[13px] text-white" />
//     ),
//   },
//   {
//     id: "2",
//     link: "#",
//     icon: (
//       <LinkedinOutlined className="mx-[2px] rounded-full bg-[#202124] p-[6px] text-[13px] text-white" />
//     ),
//   },
//   {
//     id: "3",
//     link: "#",
//     icon: (
//       <TwitterOutlined className="mx-[2px] rounded-full bg-[#202124] p-[6px] text-[13px] text-white" />
//     ),
//   },
//   {
//     id: "4",
//     link: "#",
//     icon: (
//       <YoutubeFilled className="mx-[2px] rounded-full bg-[#202124] p-[6px] text-[13px] text-white" />
//     ),
//   },
// ];

const socialIcons = [
  {
    id: "1",
    link: "tel:+2349075561565",
    icon: (
      <PhoneOutlined className="mx-[2px] rounded-full bg-[#202124] p-[6px] text-[13px] text-white" />
    ),
  },
];
const LayoutFooter = () => {
  const year = new Date().getFullYear();
  return (
    <Footer className="bg-black px-0 py-6">
      <Space
        size="large"
        className="m-auto flex w-full flex-col items-center justify-between px-8 laptop:flex-row laptop:px-20 [&>.ant-space-item]:w-full [&>.ant-space-item]:first:text-center laptop:[&>.ant-space-item]:first:text-start"
      >
        <Text className="text-lg font-normal leading-[1.3125rem] text-neutral/90">
          © 2023 - {year} Blue. All rights reserved
        </Text>
        <ul className="mx-auto my-0 flex flex-col items-center justify-center gap-2 laptop:flex-row laptop:gap-0">
          {policies.map((item) => (
            <li
              key={item.id}
              className="mx-2 text-lg font-normal leading-[1.3125rem] text-neutral/90"
            >
              <Link href={item.link} className="text-inherit">
                {item.text}
              </Link>
            </li>
          ))}
        </ul>
        <ul className="my-0 flex items-center justify-center laptop:justify-end">
          {socialIcons.map((item) => (
            <li
              key={item.id}
              className="mx-2 text-lg font-normal leading-[1.3125rem]"
            >
              <Link href={item.link} target="_blank" className="text-inherit">
                {item.icon}
              </Link>
            </li>
          ))}
        </ul>
      </Space>
    </Footer>
  );
};

export default LayoutFooter;
