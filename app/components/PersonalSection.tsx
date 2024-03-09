import DownloadBtns from "@shared/downloadBtns";
import { Card, Space, Typography } from "antd";
import Image from "next/image";
import screen4 from "public/blue-to-blue.png";
import { default as screen6, default as screen7 } from "public/contact.png";
import qrCode from "public/qr-code.png";
import screen5 from "public/small-phone.png";
import { Fragment } from "react";

const { Title, Paragraph } = Typography;

const PersonalSection = () => {
  return (
    <Fragment>
      <Space className="mb-12 hidden w-full flex-col items-center justify-around rounded-[1.4375rem] laptop:flex bg-primary tablet:flex-row laptop:px-8 laptop:pb-0 laptop:pt-8">
        <Typography className="mx-12 text-start laptop:max-w-md">
          <Title
            level={1}
            className="m-0 font-medium text-white laptop:text-[2rem] tracking-[-1%] laptop:leading-[2.5rem]"
          >
            Blue to Blue{" "}
            <span className="font-fraunces font-normal italic">Free</span>{" "}
            Transfers.
          </Title>
          <Paragraph className="mb-0 mt-2 font-normal text-body-text-1/70 laptop:text-[1.125rem] laptop:leading-[1.625rem]">
            You can expect no hidden charges and no transfer failures with Blue
            transfers. Download Blue today.
          </Paragraph>
          <DownloadBtns />
        </Typography>
        <Image
          src={screen4}
          alt="free transfer"
          priority
          // className="m-auto w-3/4"
          width={332}
          height={160}
        />
      </Space>
      <Space className="mb-12 hidden w-full flex-col items-center justify-around rounded-[1.4375rem] laptop:flex bg-txt tablet:flex-row laptop:px-8 laptop:pb-0 laptop:pt-8">
        <Image
          src={screen5}
          alt="free transfer"
          priority
          // className="m-auto w-3/4"
          width={435}
          height={160}
        />
        <Typography className="mx-12 text-start laptop:max-w-md">
          <Title
            level={1}
            className="m-0 font-medium text-white tracking-[-1%] laptop:text-[2rem] laptop:leading-[2.5rem]"
          >
            Receive and make payments without a
            <span className="font-fraunces font-normal italic">
              {" "}
              smartphone
            </span>
          </Title>
          <Paragraph className="mb-0 mt-2 font-normal text-body-text-1/70 laptop:text-[1.125rem] laptop:leading-[1.625rem]">
            Blue offers a hassle-free way to make payments without a smartphone.
            You can make payments via USSD or text message.
          </Paragraph>
          <DownloadBtns />
        </Typography>
      </Space>
      <Space
        size="large"
        className="mb-6 mt-0 flex w-full flex-col items-center justify-evenly laptop:mb-28 laptop:mt-16 laptop:hidden laptop:flex-row [&>.ant-space-item]:w-full tablet:[&>.ant-space-item]:w-3/4 laptop:[&>.ant-space-item]:w-full"
      >
        <Card
          bordered={false}
          className="rounded-[23px] bg-primary p-10 px-0 pb-0 [&>.ant-card-body]:p-3 [&>.ant-card-body]:pb-0 laptop:[&>.ant-card-body]:p-6 laptop:[&>.ant-card-body]:pb-0"
        >
          <Typography className="mx-auto mb-8 text-center">
            <Title
              level={1}
              className="m-0 font-medium text-white tracking-[-1%] laptop:text-[2rem] laptop:leading-[2.5rem]"
            >
              Blue to Blue{" "}
              <span className="font-fraunces font-normal italic">Free</span>{" "}
              Transfers
            </Title>
            <Paragraph className="mx-auto mt-2 min-w-[270px] text-[0.9375rem] font-normal leading-[1.3125rem] text-body-text-1/70 mobile-md:min-w-max laptop:text-[1.125rem] laptop:leading-[1.625rem]">
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
            width={285}
          />
        </Card>
        <Card
          bordered={false}
          className="rounded-[23px] bg-txt p-10 px-0 pb-0 [&>.ant-card-body]:p-3 [&>.ant-card-body]:pb-0 laptop:[&>.ant-card-body]:p-6 laptop:[&>.ant-card-body]:pb-0"
        >
          <Typography className="mx-auto mb-8 text-center">
            <Title
              level={1}
              className="m-0 text-[1.2rem] font-medium tracking-[-1%] text-white tablet:font-semibold laptop:text-[1.7rem] laptop:leading-[2.5rem]"
            >
              Receive and make
              <br className="block laptop:hidden" /> payments without a
              <br className="block laptop:hidden" />
              smartphone
            </Title>
            <Paragraph className="mx-auto mt-2 max-w-[335px] text-[0.9375rem] font-semibold leading-[1.3125rem] text-body-text-1 laptop:text-[1.125rem] laptop:leading-[1.625rem]">
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
          bordered={false}
          className="w-full rounded-[23px] bg-txt p-0 laptop:py-[1rem] [&>.ant-card-body]:px-3 laptop:[&>.ant-card-body]:p-6"
        >
          <Typography className="mx-auto my-10 text-center">
            <Title
              level={1}
              className="m-0 text-[1.2rem] max-w-[477px] w-full mx-auto font-medium tracking-[-1%] text-white laptop:text-[2rem] laptop:leading-[2.5rem]"
            >
              Send, request and receive money with a{" "}
              <span className="font-fraunces font-normal italic">
                quick scan!
              </span>
            </Title>
            <Paragraph className="mx-auto mt-2 text-[0.9375rem] w-full max-w-[319px] font-normal leading-[1.3125rem] text-body-text-1/70 laptop:text-[1.125rem] laptop:leading-[1.625rem]">
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
            height={285}
          />
        </Card>
        <Card
          bordered={false}
          className="w-full rounded-[23px] bg-primary p-10 laptop:pb-[3.6rem] laptop-md:pb-12 px-0 pt-0 [&>.ant-card-body]:p-3 [&>.ant-card-body]:pt-0 laptop:[&>.ant-card-body]:p-6 laptop:[&>.ant-card-body]:pt-0"
        >
          <Image
            src={screen6}
            alt="sync contacts"
            className="m-auto w-auto object-contain"
            priority
            width={285}
            height={145}
          />
          <Typography className="mx-auto mt-8 text-center laptop:mt-10">
            <Title
              level={1}
              className="m-auto max-w-[280px] text-[1.2rem]  font-medium leading-[-1%] text-white laptop:max-w-md laptop:text-[2rem] laptop:leading-[2.5rem]"
            >
              Sync your{" "}
              <span className="font-fraunces font-normal italic">contact</span>{" "}
              within Blue <br className="hidden laptop:block" /> and send money
              to them easily
            </Title>
            <Paragraph className="md-mobile:min-w-max mx-auto mt-2 max-w-[354px] text-[0.9375rem] font-normal leading-[1.3125rem] text-body-text-1/70 laptop:text-[1.125rem] laptop:leading-[1.625rem]">
              Easily send and request money directly from your contact list
              using Blue.
            </Paragraph>
            <DownloadBtns />
          </Typography>
        </Card>
      </Space>
    </Fragment>
  );
};

export default PersonalSection;
