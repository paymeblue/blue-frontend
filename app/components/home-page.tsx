"use client";
import HeroSection from "@components/heroSection";
import Container from "@shared/container";
import DownloadBtns from "@shared/downloadBtns";
import { Typography } from "antd";
import { Metadata } from "next";
import { Fragment } from "react";
import OurProducts from "./Products";
import Swift from "./assets/svg/swift";
import TransfersIcon from "./assets/svg/transfers";
import Versatile from "./assets/svg/versatile";

export const metadata: Metadata = {
  title: "Home | Blue",
  description:
    "Receive and make payments easily with Blue, you can make payments seamlessly, request and receive money, all on one platform.",
};

const { Title, Paragraph } = Typography;

const Home = () => {
  return (
    <Fragment>
      <HeroSection />
      <Container className="text-center">
        <div>
          <Typography className="mt-16 md:mt-24 mb-8 text-center">
            <Title
              level={2}
              className="text-txt font-bold tracking-[-2%] text-[24px] leading-[1.995rem]  laptop:text-[2.375rem] laptop:leading-[2.85rem]"
            >
              Receive and Make{" "}
              <span className="text-primary font-medium italic font-fraunces">
                Payment
              </span>{" "}
              on the Go
            </Title>
            <Paragraph className="max-w-[592px] w-full text-[15px] leading-[21px] m-auto text-body-text-2 laptop:text-[18px] laptop:leading-[27px]">
              Guaranteed swift, versatile, and seamless way to receive and make
              payments.
            </Paragraph>
          </Typography>
          <div className="mx-auto my-8 bg-lilac flex px-6 md:px-0 flex-wrap border border-[#EFE5FF] rounded-xl py-12 items-center justify-center gap-5 laptop-md:flex-nowrap">
            <div className="border-[#efe5ff] p-4 md:p-6 border w-full max-w-[23.375rem] gap-6 shadow-[0rem_0rem_0rem_.3125rem_#FFFFFF] flex flex-col justify-start items-start bg-[#FCFAFF] rounded-xl">
              <Swift />
              <div className="text-start">
                <Title
                  level={5}
                  className="font-medium text-[1.375rem] laptop:text-[1.4375rem] mb-0.5 leading-[2.25rem]"
                >
                  Swift Transactions
                </Title>
                <Paragraph className="text-[.9375rem] leading-[1.375rem] laptop:text-base text-start w-full max-w-[19.625rem] text-body-text-2">
                  Make instant and seamless payments on the go with Quickpay. It
                  only takes a few clicks.
                </Paragraph>
              </div>
            </div>
            <div className="border-[#efe5ff] border w-full max-w-[23.375rem] gap-6 shadow-[0rem_0rem_0rem_.3125rem_#FFFFFF] flex flex-col justify-start items-start bg-[#FCFAFF] p-4 md:p-6 rounded-xl">
              <Versatile />
              <div className="text-start">
                <Title
                  level={5}
                  className="font-medium text-[1.375rem] laptop:text-[1.4375rem] mb-0.5 leading-[2.25rem]"
                >
                  Versatile Payment Option
                </Title>
                <Paragraph className="text-[.9375rem] leading-[1.375rem] laptop:text-base text-start w-full max-w-[19.625rem] text-body-text-2">
                  From Blue to Blue users, to QR codes, phone, or USSD, choose
                  your preferred way to pay and get paid hassle-free.
                </Paragraph>
              </div>
            </div>
            <div className="border-[#efe5ff] border w-full max-w-[23.375rem] gap-6 shadow-[0rem_0rem_0rem_.3125rem_#FFFFFF] flex flex-col justify-start items-start bg-[#FCFAFF] p-4 md:p-6 rounded-xl">
              <TransfersIcon />
              <div className="text-start">
                <Title
                  level={5}
                  className="font-medium text-[1.375rem] laptop:text-[1.4375rem] mb-0.5 leading-[2.25rem]"
                >
                  Free Transfers
                </Title>
                <Paragraph className="text-[.9375rem] leading-[1.375rem] laptop:text-base text-start w-full max-w-[19.625rem] text-body-text-2">
                  Get Free transfers to fellow blue users without any hidden
                  charges.
                </Paragraph>
              </div>
            </div>
          </div>
        </div>
        <OurProducts />
        <Typography className="mx-auto my-8 max-w-sm text-center">
          <Title
            level={5}
            className="m-auto max-w-xs font-medium text-[1.5rem] leading-[1.995rem] text-txt md:max-w-sm laptop:text-[32px] laptop:leading-[40px]"
          >
            What are you waiting for? Download Blue today.
          </Title>
          <DownloadBtns />
        </Typography>
      </Container>
    </Fragment>
  );
};
export default Home;
