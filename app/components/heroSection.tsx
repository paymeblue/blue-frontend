import Container from "@shared/container";
import DownloadBtns from "@shared/downloadBtns";
import { QRCode, Space, Typography } from "antd";
import Image from "next/image";
import spiralLine from "public/spiral.svg";

const { Text, Title, Paragraph } = Typography;

const HeroSection = () => {
  return (
    <main className="flex h-[600px] flex-col items-center justify-center  bg-primary laptop:h-[772px]">
      <Container className="my-0 text-center">
        <Typography className="m-auto max-w-2xl">
          <Title
            level={1}
            className="m-0 text-[1.3rem] font-bold text-white laptop:text-[3rem] laptop:leading-[110%]"
          >
            Receive and make <br /> payments easily with Blue!
          </Title>
          <Paragraph className="mt-2 hidden max-w-xl text-[0.9375rem]  font-medium leading-[1.3125rem] text-body-text-1  laptop:block laptop:text-[1.25rem] laptop:leading-[1.625rem]">
            With Blue, you can make payments seamlessly, request and receive
            money, all on one platform.
          </Paragraph>
          <Paragraph className="mt-2 block max-w-xl text-[0.9375rem] font-medium leading-[1.3125rem] text-body-text-1  laptop:hidden laptop:text-[1.25rem] laptop:leading-[1.625rem]">
            With Blue, you can make payments
            <br className="block tablet:hidden" />
            seamlessly, request &nbsp;
            <br className="hidden tablet:block" />
            and receive
            <br className="block tablet:hidden" />
            money, all on one platform.
          </Paragraph>
        </Typography>
        <div className="mb-8">
          <DownloadBtns />
        </div>
        <Space className="relative inset-0">
          <QRCode
            errorLevel="Q"
            color="#4341CD"
            bgColor="white"
            className="rounded-2xl p-6"
            type="svg"
            value="https://paymeblue.com/"
          />
          <div className="absolute bottom-[-35%] left-[40%] flex w-full items-center tablet:-bottom-[50%] tablet:left-[50%] tablet:w-max laptop:left-[60%]">
            <Image
              src={spiralLine}
              alt="directional line"
              priority
              className="w-[35%] laptop:w-[30%]"
            />
            <Text className="text-[0.8rem] font-medium leading-[1.3125rem] text-[#EAEAFE] tablet:text-[0.9375rem] laptop:text-[1.25rem] laptop:leading-[1.625rem]">
              Scan this code to <br /> download now
            </Text>
          </div>
        </Space>
      </Container>
    </main>
  );
};

export default HeroSection;
