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
  return (
    <Footer className="bg-black px-0 py-6">
      <Space
        size="large"
        className="[&>.ant-space-item]:wfull flex w-full flex-col items-center justify-between px-8 laptop:flex-row laptop:px-20"
      >
        <Text className="text-[1rem] font-semibold leading-[1.5rem] text-neutral laptop:text-[0.9375rem] laptop:font-medium laptop:leading-[1.3125rem]">
          © 2023 Blue. All rights reserved
        </Text>
        <ul className="my-0 flex flex-col items-center justify-between gap-2 laptop:flex-row laptop:gap-0">
          {policies.map((item) => (
            <li
              key={item.id}
              className="mx-2 text-[1rem] font-semibold leading-[1.5rem] text-neutral laptop:text-[0.9375rem] laptop:font-medium laptop:leading-[1.3125rem]"
            >
              <Link href={item.link} className="text-inherit">
                {item.text}
              </Link>
            </li>
          ))}
        </ul>
        <ul className="my-0 flex items-center justify-between">
          {socialIcons.map((item) => (
            <li
              key={item.id}
              className="mx-2 text-[1rem] font-semibold leading-[1.5rem] laptop:text-[0.9375rem] laptop:font-medium laptop:leading-[1.3125rem]"
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
