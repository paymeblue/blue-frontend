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
};
const CardX = ({ title, desc, img }: IProps) => {
  return (
    <Space
      className={`mb-12 flex w-full flex-col items-center justify-between rounded-[1.4375rem] bg-primary last-of-type:bg-txt tablet:flex-row laptop:pb-0 laptop:pl-8 laptop:pt-8 laptop:last-of-type:flex-row-reverse`}
    >
      <Typography className="mx-12 max-w-md text-start">
        <Title
          level={1}
          className="m-0 font-bold text-white laptop:text-[30px] laptop:leading-[38px]"
        >
          {title}
        </Title>
        <Paragraph className="mt-2 font-medium text-body-text-1 laptop:text-[18px] laptop:leading-[26px]">
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
