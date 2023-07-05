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
    <main className="mb-16 flex h-screen flex-col items-center  justify-center bg-primary">
      <Container className="text-center">
        <Typography className="m-auto max-w-2xl">
          <Title
            level={1}
            className="m-0 font-bold text-white laptop:text-[50px] laptop:leading-[110%]"
          >
            Receive and make payments easily with Blue!
          </Title>
          <Paragraph className="mt-2 max-w-xl font-medium text-body-text-1 laptop:text-[20px] laptop:leading-[26px]">
            With Blue, you can make payments seamlessly, request and receive
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
          <div className="absolute -bottom-[70%] left-[70%] flex w-max items-center">
            <Image src={spiralLine} alt="directional line" priority />
            <Text className="w-full font-medium text-[#EAEAFE] laptop:text-[20px] laptop:leading-[26px]">
              Scan this code to <br /> download now
            </Text>
          </div>
        </Space>
      </Container>
    </main>
  );
};

export default HeroSection;
