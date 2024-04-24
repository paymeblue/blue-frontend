import Container from "@shared/container";
import Image from "next/image";
import Link from "next/link";
import heroBg from "public/homeHeroBg.jpg";
import img1 from "public/img-1.png";
import img2 from "public/img-2.png";
import { ChevronRight } from "./assets/icons";
import Swift from "./assets/svg/swift";
import TransfersIcon from "./assets/svg/transfers";
import Versatile from "./assets/svg/versatile";
import HeroSection from "./heroSection";

const Home = () => {
  return (
    <div>
      <HeroSection
        title={
          <span>
            Say goodbye to lengthy transaction processes and hello to&nbsp;
            <i className="italic font-fraunces">seamless, instant payments</i>
          </span>
        }
        subTitle="Experience the future of payments with Blue. Whether you're an individual or a business, our all-in-one platform enables you to send and receive payments effortlessly. "
        heroBg={heroBg}
        className="max-w-[780px]"
        imgClassName="h-[779px]"
      />
      <Container className="text-center mb-16">
        <div className="mt-16 md:mt-24 mb-8 text-center">
          <h2 className="text-txt font-bold tracking-title text-[30px] leading-[35px]  laptop:text-[2.375rem] laptop:leading-[47px]">
            Receive and make{" "}
            <span className="text-primary italic font-fraunces">payments</span>{" "}
            on the go
          </h2>
          <p className="w-full text-base m-auto text-body-text-2 laptop:text-lg leading-[23px]">
            Blue ensures a guaranteed swift, versatile, and seamless way for you
            to receive and make payments.
          </p>
        </div>
        <div className="mx-auto my-20 bg-lilac flex px-6 md:px-0 flex-wrap border border-[#EFE5FF] rounded-xl py-12 items-center justify-center gap-5 laptop-md:flex-nowrap">
          <div className="border-[#efe5ff] p-4 md:p-6 border w-full max-w-[23.375rem] gap-6 shadow-[0rem_0rem_0rem_.3125rem_#FFFFFF] flex flex-col justify-start items-start bg-[#FCFAFF] rounded-xl">
            <Swift />
            <div className="text-start">
              <h5 className="font-medium text-[18px] laptop:text-[1.4375rem] mb-0.5 leading-[2.25rem]">
                Swift Transactions
              </h5>
              <p className="text-sm lg:leading-[23px] lg:text-base text-start w-full max-w-[19.625rem] text-body-text-2">
                Make instant and seamless payments on the go with Blue. It only
                takes a few clicks.
              </p>
            </div>
          </div>
          <div className="border-[#efe5ff] border w-full max-w-[23.375rem] gap-6 shadow-[0rem_0rem_0rem_.3125rem_#FFFFFF] flex flex-col justify-start items-start bg-[#FCFAFF] p-4 md:p-6 rounded-xl">
            <Versatile />
            <div className="text-start">
              <h5 className="font-medium text-[18px] laptop:text-[1.4375rem] mb-0.5 leading-[2.25rem]">
                Versatile Payment Option
              </h5>
              <p className="text-sm lg:leading-[23px] lg:text-base text-start w-full max-w-[19.625rem] text-body-text-2">
                From Blue to Blue users, to QR codes, phone, or USSD, choose
                your preferred way to pay and get paid hassle-free.
              </p>
            </div>
          </div>
          <div className="border-[#efe5ff] border w-full max-w-[23.375rem] gap-6 shadow-[0rem_0rem_0rem_.3125rem_#FFFFFF] flex flex-col justify-start items-start bg-[#FCFAFF] p-4 md:p-6 rounded-xl">
            <TransfersIcon />
            <div className="text-start">
              <h5 className="font-medium text-[18px] laptop:text-[1.4375rem] mb-0.5 leading-[2.25rem]">
                Free Transfers
              </h5>
              <p className="text-sm lg:leading-[23px] lg:text-base text-start w-full max-w-[19.625rem] text-body-text-2">
                Get Free transfers to fellow blue users without any hidden
                charges.
              </p>
            </div>
          </div>
        </div>
        <div className="flex mb-12 lg:mb-auto flex-col-reverse lg:grid lg:grid-cols-2 items-center justify-between gap-10 lg:gap-16">
          <div className="max-w-[551px] w-full text-start">
            <h4 className="font-bold text-[29px] lg:text-[40px] leading-[47px] tracking-title m-0">
              Discover&nbsp;
              <i className="text-primary font-fraunces">BluePersonal</i>
            </h4>
            <p className="m-0 text-base lg:text-lg lg:leading-[28px] text-[#32374E] tracking-text">
              Designed with individuals in mind, BluePersonal offers a suite of
              features tailored to simplify your everyday payments. Whether
              you're sending money to friends, receiving money, paying bills, or
              making purchases, BluePersonal empowers you to do it all on the
              go.
            </p>
            <div className="mt-2 lg:mt-4">
              <Link
                href="/personal"
                className="flex gap-2 text-base leading-[16px] tracking-text items-center justify-start text-primary"
              >
                Learn more
                <ChevronRight />
              </Link>
            </div>
          </div>
          <div>
            <Image src={img1} alt="blue personal" className="object-contain" />
          </div>
        </div>
        <div className="flex flex-col lg:grid lg:grid-cols-2 items-center justify-between gap-10 lg:gap-16">
          <div>
            <Image src={img2} alt="blue business" className="object-contain" />
          </div>
          <div className="max-w-[551px] w-full text-start">
            <h4 className="font-bold text-[29px] lg:text-[40px] leading-[47px] tracking-title m-0">
              Discover<i className="text-primary font-fraunces">BlueBusiness</i>
            </h4>
            <p className="m-0 text-base lg:text-lg lg:leading-[28px] text-[#32374E] tracking-text">
              BlueBusiness offers a range of features tailored to streamline
              financial operations for businesses. Seamlessly manage incoming
              payments and track your finances with Blue's all-in-one business
              manager tools, ensuring efficiency and simplicity for your
              business operations.
            </p>
            <div className="mt-2 lg:mt-4">
              <Link
                href="/business"
                className="flex gap-2 text-base leading-[16px] tracking-text items-center justify-start text-primary"
              >
                Learn more
                <ChevronRight />
              </Link>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Home;
