import DownloadBtns from "@shared/downloadBtns";
import { Space, Typography } from "antd";
import Image from "next/image";
import dataPhone from "public/data-phone.png";
import desktop from "public/desktop.png";
import chart from "public/expense-chart.png";
import teamPhone from "public/team-phone.png";
import { Fragment } from "react";

const { Title, Paragraph } = Typography;

const BusinessSegment = () => {
  return (
    <Fragment>
      <Space className="flex flex-col w-full px-8 laptop:px-10 laptop-md:px-0 [&>.ant-space-item]:w-full laptop:pb-0 md:flex-row justify-between my-8 md:my-16 items-center bg-txt py-12 gap-8 rounded-2xl pb-0">
        <Typography className="mx-auto w-full md:text-start md:max-w-[400px]">
          <Title
            level={3}
            className="m-0 text-white text-[1.25rem] leading-[1.6625rem] laptop:text-[2rem] laptop:leading-[2.5rem] font-medium"
          >
            Boost your Business sales with{" "}
            <span className="font-fraunces font-light italic">
              data driven{" "}
            </span>
            insights
          </Title>
          <Paragraph className="mb-0 mt-2 text-[.9375rem] leading-[1.3125rem] text-body-text-1/70 laptop:text-[18px] max-w-[387px] w-full laptop:leading-[26px]">
            Enhance your revenue-generating strategies with clear visualisations
            tracking your sales and expenses.
          </Paragraph>
          <DownloadBtns />
        </Typography>
        <div className="relative">
          <Image
            src={chart}
            alt="img"
            priority
            className="m-auto absolute w-1/2 z-10 aspect-auto laptop:aspect-[0] laptop-md:aspect-auto md:-left-8 laptop:w-auto bottom-0 object-contain"
            width={257.61}
          />
          <Image
            src={dataPhone}
            alt="img"
            priority
            className="m-auto w-full aspect-auto object-contain md:max-w-max translate-x-4"
            width={332}
            height={260}
          />
        </div>
      </Space>
      <Space className="flex flex-col w-full px-8 laptop:px-10 laptop-md:px-0 [&>.ant-space-item]:w-full laptop:pb-0 md:flex-row justify-between my-8 md:my-16 items-center bg-primary py-12 gap-8 rounded-2xl pb-0">
        <Typography className="mx-auto w-full md:text-start md:max-w-md">
          <Title
            level={3}
            className="m-0 text-white text-[1.25rem] leading-[1.6625rem] laptop:text-[2rem] laptop:leading-[2.5rem] font-medium"
          >
            Add and manage{" "}
            <span className="font-fraunces font-normal italic">your team </span>
            seamlessly
          </Title>
          <Paragraph className="mb-0 mt-2 text-[.9375rem] leading-[1.3125rem] text-body-text-1/70 laptop:text-[18px] max-w-[387px] w-full laptop:leading-[26px]">
            Easily add and manage your team members as an admin, overseeing
            their operations to ensure accountability.
          </Paragraph>
          <DownloadBtns />
        </Typography>
        <Image
          src={teamPhone}
          alt="img"
          priority
          className="m-auto w-full aspect-auto object-contain pl-4 ml-4  md:max-w-max"
          width={332}
          height={263}
        />
      </Space>
      <Space className="flex flex-col-reverse w-full px-8 laptop:pb-0 [&>.ant-space-item]:w-full md:flex-row justify-between my-8 md:my-16 items-center bg-txt py-12 gap-8 rounded-2xl pb-0">
        <Image
          src={desktop}
          alt="blue desktop img"
          priority
          className="m-auto w-full aspect-auto sm:aspect-square xl:aspect-[0] md:-translate-x-8 rounded-b-2xl pl-4 md:pl-0 md:rounded-none md:max-w-full"
          width={589}
          height={424}
        />

        <Typography className="mx-auto w-full md:text-start md:max-w-md">
          <Title
            level={3}
            className="m-0 text-white text-[1.25rem] leading-[1.6625rem] laptop:text-[2rem] laptop:leading-[2.5rem] font-medium"
          >
            Point of Sale easy integration
          </Title>
          <Paragraph className="mb-0 mt-2 text-[.9375rem] leading-[1.3125rem] text-body-text-1/70 laptop:text-[18px] max-w-[387px] w-full laptop:leading-[26px]">
            BlueBusiness Desktop allows for seamless integration into your Point
            of Sale, facilitating swift customer payments via barcode scan.
          </Paragraph>
          <DownloadBtns />
        </Typography>
      </Space>
    </Fragment>
  );
};

export default BusinessSegment;
