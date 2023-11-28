"use client";
import { LoadingOutlined } from "@ant-design/icons";
import useHandleCodeVerify from "@hooks/useHandleCodeVerify";
import { Button, Spin } from "antd";
import { Typography } from "antd";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

const PageNotFound = () => {
  const code = usePathname();
  const { loading } = useHandleCodeVerify({ code: code.substring(1) });

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

  if (loading) {
    return (
      <div className="flex w-screen h-screen items-center justify-center">
        <Spin size="large" indicator={antIcon} />
      </div>
    );
  }
  return (
    <div className="flex h-screen w-screen items-center justify-center flex-col relative">
      <Image
        src="/xIcon.svg"
        alt="X Icon"
        width={47}
        height={52}
        className="absolute top-[20%] left-[40%]"
      />
      <Image
        src="/xIcon.svg"
        alt="X Icon"
        width={63}
        height={70}
        className="absolute bottom-[20%] left-[50%]"
      />
      <Image
        src="/circle.svg"
        alt="Circle Icon"
        width={28}
        height={28}
        className="absolute bottom-[50%] left-[70%]"
      />
      <Typography className="text-center text-[3rem] font-[700] text-txt">
        404 <br /> Page Not Found
      </Typography>
      <Typography className="text-center text-body-text-2">
        We're sorry, the page you requested could <br /> not be found
      </Typography>
      <Link href="/" className="mt-4">
        <Button type="primary" className="px-20 h-12">
          Proceed
        </Button>
      </Link>
    </div>
  );
};

export default PageNotFound;
