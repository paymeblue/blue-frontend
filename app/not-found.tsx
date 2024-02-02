"use client";
import { LoadingOutlined } from "@ant-design/icons";
import useHandleCodeVerify from "@hooks/useHandleCodeVerify";
import { Button, Spin, Typography } from "antd";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import notFound from "public/404.png";

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
    <div className="flex h-screen w-screen items-center justify-center flex-col">
      <Image
        src={notFound}
        alt="X Icon"
        width={347.21}
        height={322.89}
        className="object-contain"
      />
      <Typography className="text-center font-satoshi font-[700] text-txt">
        <span className="text-[2rem] lg:text-[2.5rem]">Page Not Found</span>
      </Typography>
      <Typography className="text-center font-satoshi text-body-text-2">
        We're sorry, the page you requested <br /> could not be found
      </Typography>
      <Link href="/" className="mt-4 max-lg:w-[90%]">
        <Button
          type="primary"
          className="max-lg:w-full font-satoshi lg:px-20 h-12"
        >
          Proceed
        </Button>
      </Link>
    </div>
  );
};

export default PageNotFound;
