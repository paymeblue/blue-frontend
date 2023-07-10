"use client";
import CardX from "@components/cardX";
import HeroSection from "@components/heroSection";
import Container from "@shared/container";
import { Card, Col, Row, Space, Typography } from "antd";
import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import appPlay from "public/app-store.svg";
import googlePlay from "public/google-play.svg";
import qrCode from "public/qr-code.svg";
import screen1 from "public/screen-1.svg";
import screen2 from "public/screen-2.svg";
import screen3 from "public/screen-3.svg";
import screen4 from "public/screen-4.svg";
import screen5 from "public/screen-5.svg";
import screen6 from "public/screen-6.svg";
import screen7 from "public/screen-7.svg";
import smallPhone from "public/small-phone.svg";
import { Fragment } from "react";

export const metadata: Metadata = {
  title: "Home | Blue",
  description:
    "Receive and make payments easily with Blue, you can make payments seamlessly, request and receive money, all on one platform.",
};

const { Title, Paragraph } = Typography;
const { Meta } = Card;

type CardInfo = {
  id: string;
  img: any;
  title: string;
  desc: string;
};

const cardInfo: CardInfo[] = [
  {
    id: "1",
    img: screen1,
    title: "Quick pay 🚀",
    desc: "Make instant and seamless payments on the go with Quickpay. It only takes a few clicks.",
  },
  {
    id: "2",
    img: screen2,
    title: "Send money 💸",
    desc: "Experience the freedom of fast transfers and no hidden charges with Blue. Send money to anyone in an instant!",
  },
  {
    id: "3",
    img: screen3,
    title: "Request money 💸",
    desc: "Easily chat with loved ones and customers, and request payments with BlueChat.",
  },
];
const gridData = [
  {
    id: "1",
    title: "Blue to Blue Free Transfers.",
    desc: "You can expect no hidden charges and no transfer failures with Blue transfers. Download Blue today.",
    img: screen4,
    second: false,
    hash: "blue-to-blue",
  },
  {
    id: "2",
    title: "Receive and make payments without a smartphone",
    desc: "Blue offers a hassle-free way to make payments without a smartphone. You can make payments via USSD or text message.",
    img: smallPhone,
    second: true,
    hash: "offline-mode",
  },
];

const Home = () => {
  return (
    <Fragment>
      <HeroSection />
      <Container className="text-center">
        <div id="benefits">
          <Typography className="my-8 laptop:mt-16">
            <Paragraph className="m-0 text-[0.9375rem] font-medium leading-[1.3125rem] text-primary laptop:text-[1.25rem] laptop:leading-[1.625rem]">
              Guaranteed ease all through
            </Paragraph>
            <Title
              level={2}
              className="m-0 text-[1.3rem] font-semibold leading-[133%] text-txt laptop:text-[2.3rem] laptop:leading-normal"
            >
              Receive & Make payment <br className="block tablet:hidden" /> on
              the go
            </Title>
          </Typography>
          <Row
            gutter={[24, 24]}
            className="mx-auto my-8 flex-col flex-nowrap items-center justify-between laptop:flex-row"
          >
            {cardInfo.map((card) => (
              <Col key={card.id} className="w-full tablet:w-auto laptop:w-full">
                <Card
                  className="relative top-1/2 m-auto p-4 [&>.ant-card-body]:absolute [&>.ant-card-body]:inset-0 [&>.ant-card-body]:top-1/2 [&>.ant-card-body]:bg-white [&>.ant-card-cover]:relative"
                  cover={
                    <Image
                      alt={card.title}
                      src={card.img}
                      className="m-auto mr-[-25px] w-auto mobile-lg:mr-[-5px] tablet:mr-[-25px] laptop-md:mr-[15px]"
                    />
                  }
                >
                  <Meta
                    className="text-center tablet:text-start"
                    title={
                      <Title
                        level={4}
                        className="m-0 mb-0 text-[1.2rem] font-semibold leading-[133%] text-txt laptop:my-3 laptop:text-[1.7rem] laptop:leading-[133%] "
                      >
                        {card.title}
                      </Title>
                    }
                    description={
                      <Paragraph className="m-0 text-[0.9375rem] font-normal leading-[1.3125rem] text-txt laptop:text-[1.125rem] laptop:font-medium laptop:leading-[1.625rem]">
                        {card.desc}
                      </Paragraph>
                    }
                  />
                </Card>
              </Col>
            ))}
          </Row>
        </div>

        <Typography className="mb-8 mt-12 laptop:my-16">
          <Paragraph className="m-0 text-[0.9375rem] font-medium leading-[1.3125rem] text-primary laptop:text-[1.25rem] laptop:leading-[1.625rem]">
            Flexibility at your Fingertips
          </Paragraph>
          <Title
            level={2}
            className="m-0 text-[1.3rem] font-semibold leading-normal text-txt laptop:text-[2.3rem]"
          >
            Unlock hassle - free
            <br className="block tablet:hidden" /> payment options
          </Title>
        </Typography>
        {gridData.map((data) => (
          <CardX
            title={data.title}
            desc={data.desc}
            img={data.img}
            key={data.id}
            second={data.second}
            hash={data.hash}
          />
        ))}
        <Space
          size="large"
          className="mb-6 mt-0 flex flex-col items-center justify-evenly laptop:mb-28 laptop:mt-16 laptop:hidden laptop:flex-row"
        >
          <Card
            bordered={false}
            id="blue-to-blue"
            className="rounded-[23px] bg-primary p-10 px-0 pb-0 [&>.ant-card-body]:p-3 [&>.ant-card-body]:pb-0 laptop:[&>.ant-card-body]:p-6 laptop:[&>.ant-card-body]:pb-0"
          >
            <Typography className="mx-auto mb-8 text-center">
              <Title
                level={1}
                className="m-0 text-[1.2rem] font-semibold leading-[133%] text-white laptop:text-[1.7rem] laptop:leading-[2.5rem]"
              >
                Blue to Blue Free Transfers
              </Title>
              <Paragraph className="mx-auto max-w-[335px] text-[0.9375rem] font-medium leading-[1.3125rem] text-body-text-1 laptop:text-[1.125rem] laptop:leading-[1.625rem]">
                You can expect no hidden charges and
                <br className="mobile-md:block tablet:hidden" /> no transfer
                failures with Blue transfers.
                <br className="block tablet:hidden" /> Download Blue today.
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
            <Image
              src={screen6}
              alt="free transfers"
              className="m-auto mr-[-5px] mobile-md:mr-[20px] mobile-lg:mr-[65px]"
            />
          </Card>
          <Card
            id="offline-mode"
            bordered={false}
            className="rounded-[23px] bg-txt p-10 px-0 pb-0 [&>.ant-card-body]:p-3 [&>.ant-card-body]:pb-0 laptop:[&>.ant-card-body]:p-6 laptop:[&>.ant-card-body]:pb-0"
          >
            <Typography className="mx-auto mb-8 text-center">
              <Title
                level={1}
                className="m-0 text-[1.2rem] font-semibold leading-[133%] text-white laptop:text-[1.7rem] laptop:leading-[2.5rem]"
              >
                Receive and make
                <br className="block laptop:hidden" /> payments without a
                <br className="block laptop:hidden" />
                smartphone
              </Title>
              <Paragraph className="mx-auto max-w-[335px] text-[0.9375rem] font-medium leading-[1.3125rem] text-body-text-1 laptop:text-[1.125rem] laptop:leading-[1.625rem]">
                Blue offers a hassle - free way to make
                <br className="block tablet:hidden" /> payments without a
                smartphone. You
                <br className="block tablet:hidden" /> can make payments via
                USSD or text
                <br className="block tablet:hidden" /> message.
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
            <Image
              src={screen7}
              alt="free transfers"
              className="m-auto mr-[-30px] mobile-md:mr-[-5px] mobile-lg:mr-[20px] tablet:mr-[40px]"
            />
          </Card>
        </Space>
        <Space
          size="large"
          className="mb-14 mt-0 flex w-full flex-col items-center justify-evenly laptop:mb-28 laptop:mt-16 laptop:flex-row [&.ant-space-item]:w-full"
        >
          <Card
            id="qr-scan"
            bordered={false}
            className="oopw-full rounded-[23px] bg-txt p-0 laptop:px-[2.5rem] laptop:py-[2rem] laptop-md:py-[2.75rem] [&>.ant-card-body]:p-3 laptop:[&>.ant-card-body]:p-6"
          >
            <Typography className="mx-auto my-10 text-center">
              <Title
                level={1}
                className="m-0 text-[1.2rem] font-semibold leading-[133%] text-white laptop:text-[1.7rem] laptop:leading-[2.5rem]"
              >
                Send, request and receive
                <br className="block laptop:hidden" /> money with a quick scan!
              </Title>
              <Paragraph className="mx-auto max-w-[335px] text-[0.9375rem] font-medium leading-[1.3125rem] text-body-text-1 laptop:text-[1.125rem] laptop:leading-[1.625rem]">
                Scan and make payments on the go.
                <br className="block laptop:hidden" /> No stress, no complaints.
              </Paragraph>
              <Space className="mt-8">
                <Link href="#">
                  <Image
                    src={googlePlay}
                    alt="download blue app on google play"
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
            <Image src={qrCode} alt="quick scan" className="m-auto" priority />
          </Card>
          <Card
            id="phone-transfer"
            bordered={false}
            className="oopw-full rounded-[23px] bg-primary p-10 px-0 pt-0 [&>.ant-card-body]:p-3 [&>.ant-card-body]:pt-0 laptop:[&>.ant-card-body]:p-6 laptop:[&>.ant-card-body]:pt-0"
          >
            <Image
              src={screen5}
              alt="sync contacts"
              className="m-auto -mr-[25px] mobile-md:mr-[-30px] tablet:mr-[-35px] laptop-md:mr-[50px]"
            />
            <Typography className="mx-auto -mt-8 text-center">
              <Title
                level={1}
                className="m-0 text-[1.2rem] font-semibold leading-[133%] text-white laptop:text-[1.7rem] laptop:leading-[2.5rem]"
              >
                Sync your contact within
                <br className="block laptop:hidden" /> Blue and send money
                to&nbsp;
                <br className="block laptop:hidden" />
                them easily
              </Title>
              <Paragraph className="mx-auto max-w-[335px] text-[0.9375rem] font-medium leading-[1.3125rem] text-body-text-1 laptop:text-[1.125rem] laptop:leading-[1.625rem]">
                Easily send and request money directly
                <br className="mobile-md:block laptop:hidden" /> from your
                contact list using Blue.
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
          </Card>
        </Space>
        <Typography className="mx-auto my-8 max-w-sm text-center">
          <Title
            level={5}
            className="m-0 text-[1.3rem] font-semibold leading-[133%] text-txt laptop:text-[1.7rem] laptop:leading-[2.5rem]"
          >
            What are you waiting
            <br className="block tablet:hidden" /> for? Download Blue
            <br className="block tablet:hidden" /> today.
          </Title>
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
      </Container>
    </Fragment>
  );
};
export default Home;
