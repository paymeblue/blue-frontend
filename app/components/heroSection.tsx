import DownloadBtns from "@shared/downloadBtns";
import { Typography } from "antd";
import Image from "next/image";
import phones from "public/phones.png";
const { Title, Paragraph } = Typography;

const HeroSection = () => {
  return (
    <main className="w-full max-w-[2560px] m-auto">
      <div className="flex gap-12 sm:gap-6 flex-col-reverse md:grid-cols-2 bg-[#EAEAFF] md:grid md:bg-white w-full items-center justify-center">
        <div className="bg-[#EAEAFF] md:px-8 mx-6 md:mx-auto w-full clear-both md:pt-28 rounded-br-[24px]">
          <Image
            src={phones}
            alt="phones"
            width={587}
            height={592}
            className="m-auto w-auto"
          />
        </div>
        <Typography className="mx-6 mt-32 md:mt-0 md:mx-12 text-center md:text-start md:max-w-2xl">
          <Title
            level={1}
            className="m-0 text-[28px] leading-[34px] laptop:text-[40px] laptop:leading-[50px] laptop-md:text-[50px] laptop-md:leading-[55px] tracking-[-5%] font-bold"
          >
            Easy Banking for{" "}
            <span className="font-fraunces text-primary font-normal italic tracking-[-2%]">
              You
            </span>{" "}
            and
            <span className="font-fraunces text-primary font-normal italic">
              {" "}
              Your Business!{" "}
            </span>
          </Title>
          <Paragraph className="mb-0 mt-2 text-body-text-2 text-[.9375rem] laptop-md:text-[18px] laptop-md:leading-[26px] laptop:text-base max-w-[502px] w-full">
            Experience swift transactions and seamless business management with
            Blue's All-In-One Platform.
          </Paragraph>
          <DownloadBtns />
        </Typography>
      </div>
    </main>
  );
};

export default HeroSection;
