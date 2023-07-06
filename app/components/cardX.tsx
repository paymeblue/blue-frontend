import { Space, Typography } from "antd";
import Image from "next/image";
import Link from "next/link";
import appPlay from "public/app-store.svg";
import googlePlay from "public/google-play.svg";

const { Title, Paragraph } = Typography;
type IProps = {
  title: string;
  desc: string;
  img: any;
  second: boolean;
};
const CardX = ({ second, title, desc, img }: IProps) => {
  return (
    <Space
      className={`mb-12 hidden w-full flex-col items-center justify-between rounded-[1.4375rem] laptop:flex ${
        second ? "bg-txt tablet:flex-row-reverse" : "bg-primary tablet:flex-row"
      }  laptop:pb-0 laptop:pl-8 laptop:pt-8`}
    >
      <Typography className="mx-12 max-w-md text-start">
        <Title
          level={1}
          className="m-0 font-semibold text-white laptop:text-[1.875rem] laptop:leading-[2.375rem]"
        >
          {title}
        </Title>
        <Paragraph className="mt-2 font-medium text-body-text-1 laptop:text-[1.125rem] laptop:leading-[1.625rem]">
          {desc}
        </Paragraph>
        <Space className="mt-8">
          <Link href="#">
            <Image
              src={googlePlay}
              alt="download blue app on google play"
              priority
            />
          </Link>
          <Link href="#">
            <Image
              src={appPlay}
              alt="download blue app on google play"
              priority
            />
          </Link>
        </Space>
      </Typography>
      <Image src={img} alt="free transfer" priority />
    </Space>
  );
};

export default CardX;
