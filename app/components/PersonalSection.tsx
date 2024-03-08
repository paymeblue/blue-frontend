import CardX from "@components/cardX";
import DownloadBtns from "@shared/downloadBtns";
import { Card, Space, Typography } from "antd";
import Image from "next/image";
import qrCode from "public/qr-code.png";
import screen4 from "public/screen-4.png";
import screen5 from "public/screen-5.png";
import screen7 from "public/screen-7.png";
import smallPhone from "public/small-phone.svg";
import { Fragment } from "react";

const { Title, Paragraph } = Typography;

const PersonalSection = () => {
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
  return (
    <Fragment>
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
        className="mb-6 mt-0 flex w-full flex-col items-center justify-evenly laptop:mb-28 laptop:mt-16 laptop:hidden laptop:flex-row [&>.ant-space-item]:w-full tablet:[&>.ant-space-item]:w-3/4 laptop:[&>.ant-space-item]:w-full"
      >
        <Card
          bordered={false}
          id="blue-to-blue"
          className="rounded-[23px] bg-primary p-10 px-0 pb-0 [&>.ant-card-body]:p-3 [&>.ant-card-body]:pb-0 laptop:[&>.ant-card-body]:p-6 laptop:[&>.ant-card-body]:pb-0"
        >
          <Typography className="mx-auto mb-8 text-center">
            <Title
              level={1}
              className="m-0 text-[1.2rem] font-extrabold leading-[133%] text-white tablet:font-semibold laptop:text-[1.7rem] laptop:leading-[2.5rem]"
            >
              Blue to Blue Free Transfers
            </Title>
            <Paragraph className="mx-auto mt-2 min-w-[270px] text-[0.9375rem] font-semibold leading-[1.3125rem] text-body-text-1 mobile-md:min-w-max tablet:font-medium laptop:text-[1.125rem] laptop:leading-[1.625rem]">
              You can expect no hidden charges and
              <br className="hidden mobile-md:block" /> no transfer failures
              with Blue transfers.
              <br className="block" /> Download Blue today.
            </Paragraph>
            <DownloadBtns />
          </Typography>
          <Image
            src={screen4}
            alt="free transfers"
            className="m-auto w-auto object-contain"
            // width={285}
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
              className="m-0 text-[1.2rem] font-extrabold leading-[133%] text-white tablet:font-semibold laptop:text-[1.7rem] laptop:leading-[2.5rem]"
            >
              Receive and make
              <br className="block laptop:hidden" /> payments without a
              <br className="block laptop:hidden" />
              smartphone
            </Title>
            <Paragraph className="mx-auto mt-2 max-w-[335px] text-[0.9375rem] font-semibold leading-[1.3125rem] text-body-text-1 tablet:font-medium laptop:text-[1.125rem] laptop:leading-[1.625rem]">
              Blue offers a hassle - free way to make
              <br className="block" /> payments without a smartphone. You
              <br className="block" /> can make payments via USSD or text
              <br className="block" /> message.
            </Paragraph>
            <DownloadBtns />
          </Typography>
          <Image
            src={screen7}
            alt="free transfers"
            className="m-auto w-auto object-contain"
            // width={285}
          />
        </Card>
      </Space>
      <Space
        size="large"
        className="mx-auto mb-14 mt-0 flex w-full flex-col items-center justify-between laptop:mb-28 laptop:mt-16 laptop:flex-row [&>.ant-space-item]:w-full tablet:[&>.ant-space-item]:w-3/4 laptop:[&>.ant-space-item]:h-full"
      >
        <Card
          id="qr-scan"
          bordered={false}
          className="w-full rounded-[23px] bg-txt p-0 laptop:py-[1rem] [&>.ant-card-body]:px-3 laptop:[&>.ant-card-body]:p-6"
        >
          <Typography className="mx-auto my-10 text-center">
            <Title
              level={1}
              className="m-0 text-[1.2rem] font-extrabold leading-[133%] text-white tablet:font-semibold laptop:text-[1.7rem] laptop:leading-[2.5rem]"
            >
              Send, request and receive
              <br /> money with a quick scan!
            </Title>
            <Paragraph className="mx-auto mt-2 text-[0.9375rem] font-semibold leading-[1.3125rem] text-body-text-1 tablet:font-medium laptop:text-[1.125rem] laptop:leading-[1.625rem]">
              Scan and make payments on the go.
              <br /> No stress, no complaints.
            </Paragraph>
            <DownloadBtns />
          </Typography>
          <Image
            src={qrCode}
            alt="quick scan"
            className="m-auto w-auto object-contain"
            priority
            width={285}
          />
        </Card>
        <Card
          id="phone-transfer"
          bordered={false}
          className="w-full rounded-[23px] bg-primary p-10 laptop:pb-[3.6rem] laptop-md:pb-12 px-0 pt-0 [&>.ant-card-body]:p-3 [&>.ant-card-body]:pt-0 laptop:[&>.ant-card-body]:p-6 laptop:[&>.ant-card-body]:pt-0"
        >
          <Image
            src={screen5}
            alt="sync contacts"
            className="m-auto w-auto object-contain"
            priority
            width={285}
          />
          <Typography className="mx-auto mt-8 text-center laptop:mt-10">
            <Title
              level={1}
              className="m-auto max-w-[280px] text-[1.2rem]  font-extrabold leading-[133%] text-white tablet:font-semibold laptop:max-w-md laptop:text-[1.7rem] laptop:leading-[2.5rem]"
            >
              Sync your contact within Blue{" "}
              <br className="hidden laptop:block" /> and send money to them
              easily
            </Title>
            <Paragraph className="md-mobile:min-w-max mx-auto mt-2 min-w-[270px] text-[0.9375rem] font-semibold leading-[1.3125rem] text-body-text-1 tablet:font-medium laptop:text-[1.125rem] laptop:leading-[1.625rem]">
              Easily send and request money directly
              <br /> from your contact list using Blue.
            </Paragraph>
            <DownloadBtns />
          </Typography>
        </Card>
      </Space>
    </Fragment>
  );
};

export default PersonalSection;
