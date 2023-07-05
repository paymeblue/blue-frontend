import { Card, Space, Typography } from "antd";
import Image from "next/image";
import Link from "next/link";
import appPlay from "public/app-store.svg";
import googlePlay from "public/google-play.svg";

const { Title, Paragraph } = Typography;

type IProps = {
  key: string;
  title: string;
  desc: string;
  img: any;
};
const CardY = ({ key, title, desc, img }: IProps) => {
  return (
    <Card
      key={key}
      bordered={false}
      style={{ width: 500 }}
      className="rounded-[23px] bg-txt p-10 last-of-type:bg-primary"
    >
      <Typography className="mx-auto my-10 text-center">
        <Title
          level={1}
          className="m-0 font-semibold text-white laptop:text-[30px] laptop:leading-[40px]"
        >
          {title}
        </Title>
        <Paragraph className="mx-auto mt-2 max-w-xs text-body-text-1 laptop:text-[18px] laptop:leading-[28px]">
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
      <Image src={img} alt="free transfer" className="m-auto" priority />
    </Card>
  );
};

export default CardY;
