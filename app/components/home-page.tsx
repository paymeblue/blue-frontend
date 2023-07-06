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
  },
  {
    id: "2",
    title: "Receive and make payments without a smartphone",
    desc: "Blue offers a hassle-free way to make payments without a smartphone. You can make payments via USSD or text message.",
    img: smallPhone,
  },
];

const Home = () => {
  return (
    <Fragment>
      <HeroSection />
      <Container className="text-center">
        <Typography className="my-8">
          <Paragraph className="m-0 font-medium text-primary laptop:text-[20px] laptop:leading-[26px]">
            Guaranteed ease all through
          </Paragraph>
          <Title
            level={2}
            className="m-0 font-semibold text-txt laptop:text-[40px]"
          >
            Receive and make payment on the go
          </Title>
        </Typography>
        <Row
          gutter={[24, 36]}
          className="mx-auto my-8 items-center justify-center"
        >
          {cardInfo.map((card) => (
            <Col key={card.id}>
              <Card
                style={{ width: "380px" }}
                className="[&>.ant-card-cover]:reltive relative top-1/2 p-4 [&>.ant-card-body]:absolute [&>.ant-card-body]:inset-0 [&>.ant-card-body]:top-1/2 [&>.ant-card-body]:bg-white"
                cover={
                  <Image
                    alt={card.title}
                    src={card.img}
                    className="m-auto -mr-[5px] w-auto"
                  />
                }
              >
                <Meta
                  className="text-start"
                  title={
                    <Title
                      level={4}
                      className="m-0 my-3 font-semibold text-txt laptop:text-[30px] laptop:leading-[133%] "
                    >
                      {card.title}
                    </Title>
                  }
                  description={
                    <Paragraph className="m-0 font-medium text-txt laptop:text-[18px] laptop:leading-[26px] ">
                      {card.desc}
                    </Paragraph>
                  }
                />
              </Card>
            </Col>
          ))}
        </Row>
        <Typography className="my-16">
          <Paragraph className="m-0 font-medium text-primary laptop:text-[20px] laptop:leading-[26px]">
            Flexibility at your Fingertips
          </Paragraph>
          <Title
            level={2}
            className="m-0 font-semibold text-txt laptop:text-[40px]"
          >
            Unlock hassle - free payment options
          </Title>
        </Typography>
        {gridData.map((data) => (
          <CardX
            title={data.title}
            desc={data.desc}
            img={data.img}
            key={data.id}
          />
        ))}
        <Space className="mb-28 mt-16 flex flex-col items-center justify-around laptop:flex-row">
          <Card
            bordered={false}
            style={{ width: 500 }}
            className="rounded-[23px] bg-txt p-10"
          >
            <Typography className="mx-auto my-10 text-center">
              <Title
                level={1}
                className="m-0 font-semibold text-white laptop:text-[30px] laptop:leading-[40px]"
              >
                Send, request and receive money with a quick scan!
              </Title>
              <Paragraph className="mx-auto mt-2 max-w-xs font-medium text-body-text-1 laptop:text-[18px] laptop:leading-[26px]">
                Scan and make payments on the go. No stress, no complaints.
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
            bordered={false}
            style={{ width: 500 }}
            className="rounded-[23px] bg-primary p-10 px-0 pt-0 [&>.ant-card-body]:pt-0"
          >
            <Image
              src={screen5}
              alt="sync contacts"
              className="m-auto -mr-[25px]"
            />
            <Typography className="mx-auto -mt-8 text-center">
              <Title
                level={1}
                className="m-0 font-semibold text-white laptop:text-[30px] laptop:leading-[40px]"
              >
                Sync your contact within Blue and send money to them easily
              </Title>
              <Paragraph className="mx-auto max-w-[335px] font-medium text-body-text-1 laptop:text-[18px] laptop:leading-[26px]">
                Easily send and request money directly from your contact list
                using Blue.
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
            className="m-0 font-semibold text-txt laptop:text-[30px] laptop:leading-[40px]"
          >
            What are you waiting for? Download Blue today.
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
