import DownloadBtns from "@shared/downloadBtns";
import { Space, Typography } from "antd";
import Image from "next/image";

const { Title, Paragraph } = Typography;
type IProps = {
  title: string;
  desc: string;
  img: any;
  second: boolean;
  hash: string;
};
const CardX = ({ hash, second, title, desc, img }: IProps) => {
  return (
    <Space
      id={hash}
      className={`mb-12 hidden w-full flex-col items-center justify-around rounded-[1.4375rem] laptop:flex ${
        second ? "bg-txt tablet:flex-row-reverse" : "bg-primary tablet:flex-row"
      }  laptop:px-8 laptop:pb-0 laptop:pt-8`}
    >
      <Typography className="mx-12 text-start laptop:max-w-md">
        <Title
          level={1}
          className="m-0 font-semibold text-white laptop:text-[1.7rem] laptop:leading-[2.375rem]"
        >
          {title}
        </Title>
        <Paragraph className="mb-0 mt-2 font-medium text-body-text-1 laptop:text-[1.125rem] laptop:leading-[1.625rem]">
          {desc}
        </Paragraph>
        <DownloadBtns />
      </Typography>
      <Image src={img} alt="free transfer" priority className="m-auto w-3/4" />
    </Space>
  );
};

export default CardX;
