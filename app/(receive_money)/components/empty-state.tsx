import { detectOS } from "@lib/index";
import { Button, Typography } from "antd";
import Image from "next/image";
import Link from "next/link";
import empty from "public/empty.png";
import { Fragment, ReactNode, useEffect, useState } from "react";

const { Title, Paragraph } = Typography;

interface Props {
  title?: string;
  description?: string | ReactNode;
  btnText?: string;
  btnOnClick?: () => void;
}

const EmptyState = ({ title, description, btnText, btnOnClick }: Props) => {
  const [isClient, setClient] = useState(false);
  let platform;
  useEffect(() => {
    setClient(true);
  }, []);
  if (isClient) {
    platform = detectOS();
  }
  return (
    <Fragment>
      <div className="flex flex-col text-center items-center w-[250px] laptop:w-auto max-w-md mx-auto justify-center gap-2">
        <div className="mt-20 mb-5">
          <Image
            src={empty}
            alt="empty icon"
            className="object-contain w-1/2 laptop:w-3/4 mx-auto"
          />
        </div>
        <div>
          <Title
            level={5}
            className="laptop:leading-normal  font-semibold m-0 leading-[1.3125rem] text-lg laptop:text-[1.75rem]"
          >
            {title || "No Linked Bank Account!"}
          </Title>
          <Paragraph className="font-medium  leading-5 text-[0.8125rem] laptop:text-xl">
            {description ? (
              <span>{description}&nbsp;</span>
            ) : (
              <span>
                There is no bank account tied to your phone number.&nbsp;
              </span>
            )}
            {/* <br className="laptop:hidden" />
            <Link
              href={
                platform === "iOS"
                  ? "/#link-to-iOS-store"
                  : "/#link-to-android-store"
              }
              className="text-primary underline"
            >
              {btnText || "Sign up for Blue to access your funds."}
            </Link> */}
          </Paragraph>
          {btnOnClick ? (
            <Button
              onClick={btnOnClick}
              type="primary"
              className="max-lg:w-full  lg:px-20 h-12 text-[0.8125rem] laptop:text-xl"
            >
              {btnText || "Sign up on Blue to access your funds"}
            </Button>
          ) : (
            <Link
              href={
                platform === "iOS"
                  ? "/#link-to-iOS-store"
                  : "/#link-to-android-store"
              }
              className="mt-4 max-lg:w-[90%]"
            >
              <Button
                type="primary"
                className="max-lg:w-full  lg:px-20 h-12 text-[0.8125rem] laptop:text-xl"
              >
                {btnText || "Sign up on Blue to access your funds"}
              </Button>
            </Link>
          )}
        </div>
      </div>
    </Fragment>
  );
};

export default EmptyState;
