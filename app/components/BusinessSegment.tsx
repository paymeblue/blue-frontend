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
      <Space className="flex justify-between my-16 items-center bg-txt rounded-2xl p-16 pt-10 pb-0">
        <Typography className="mx-12 text-start laptop:max-w-[400px]">
          <Title
            level={1}
            className="m-0 text-white laptop:text-[2rem] laptop:leading-[2.5rem] leading-[-1%] font-medium"
          >
            Boost your Business sales with{" "}
            <span className="font-fraunces font-light italic">
              data driven{" "}
            </span>
            insights
          </Title>
          <Paragraph className="mb-0 mt-2 text-body-text-1/70 laptop:text-[18px] max-w-[387px] w-full laptop:leading-[26px]">
            Enhance your revenue-generating strategies with clear visualisations
            tracking your sales and expenses.
          </Paragraph>
          <DownloadBtns />
        </Typography>
        <Image
          src={chart}
          alt="img"
          priority
          className="m-auto absolute"
          width={257.61}
        />
        <Image
          src={dataPhone}
          alt="img"
          priority
          className="m-auto w-"
          width={332}
          height={260}
        />
      </Space>
      <Space className="flex justify-between my-16 items-center bg-primary rounded-2xl p-16 pt-10 pb-0">
        <Typography className="mx-12 text-start laptop:max-w-md">
          <Title
            level={1}
            className="m-0 text-white laptop:text-[2rem] laptop:leading-[2.5rem] leading-[-1%] font-medium"
          >
            Add and manage{" "}
            <span className="font-fraunces font-normal italic">your team </span>
            seamlessly
          </Title>
          <Paragraph className="mb-0 mt-2 text-body-text-1/70 laptop:text-[18px] max-w-[387px] w-full laptop:leading-[26px]">
            Easily add and manage your team members as an admin, overseeing
            their operations to ensure accountability.
          </Paragraph>
          <DownloadBtns />
        </Typography>
        <Image
          src={teamPhone}
          alt="img"
          priority
          className="m-auto w-"
          width={332}
          height={263}
        />
      </Space>
      <Space className="flex justify-between my-16 items-center bg-txt rounded-2xl p-16 pb-0">
        <Image
          src={desktop}
          alt="blue desktop img"
          priority
          className="m-auto w-"
          width={589}
          height={424}
        />
        <Typography className="mx-12 text-start laptop:max-w-md">
          <Title
            level={1}
            className="m-0 text-white laptop:text-[2rem] laptop:leading-[2.5rem] leading-[-1%] font-medium"
          >
            Point of Sale easy integration
          </Title>
          <Paragraph className="mb-0 mt-2 text-body-text-1/70 laptop:text-[18px] max-w-[387px] w-full laptop:leading-[26px]">
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
