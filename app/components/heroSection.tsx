import Container from "@shared/container";
import { QRCode, Space, Typography } from "antd";
import Image from "next/image";
import Link from "next/link";
import appPlay from "public/app-store.svg";
import googlePlay from "public/google-play.svg";
import spiralLine from "public/spiral.svg";

const { Text, Title, Paragraph } = Typography;

const HeroSection = () => {
  return (
    <main className="flex h-[600px] flex-col items-center justify-center  bg-primary laptop:h-[772px]">
      <Container className="my-0 text-center">
        <Typography className="m-auto max-w-2xl">
          <Title
            level={1}
            className="m-0 text-[1.3rem] font-semibold text-white laptop:text-[3rem] laptop:font-bold laptop:leading-[110%]"
          >
            Receive and make <br className="hidden mobile-md:block" /> payments
            easily with Blue!
          </Title>
          <Paragraph className="mt-4 max-w-xl text-[0.9375rem] font-medium leading-[1.3125rem]  text-body-text-1 laptop:text-[1.25rem] laptop:leading-[1.625rem]">
            With Blue, you can make payments
            <br className="block tablet:hidden" />
            seamlessly, request
            <br className="hidden tablet:block" />
            and receive
            <br className="block tablet:hidden" />
            money, all on one platform.
          </Paragraph>
        </Typography>
        <div className="mb-8">
          <Space>
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
        </div>
        <Space className="relative inset-0">
          <QRCode
            errorLevel="Q"
            color="#4341CD"
            bgColor="white"
            className="rounded-2xl p-6"
            type="svg"
            value="https://www.blue.com"
          />
          <div className="absolute -bottom-[75%] -left-[5%] flex w-max items-center mobile-md:left-[12%] mobile-lg:left-[25%] tablet:left-[35%] laptop:-bottom-[60%] laptop:left-[70%]">
            <Image src={spiralLine} alt="directional line" priority />
            <Text className="w-full text-[0.9375rem] font-medium leading-[1.3125rem] text-[#EAEAFE] laptop:text-[1.25rem] laptop:leading-[1.625rem]">
              Scan this code to <br /> download now
            </Text>
          </div>
        </Space>
      </Container>
    </main>
  );
};

export default HeroSection;
