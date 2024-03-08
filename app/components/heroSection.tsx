import DownloadBtns from "@shared/downloadBtns";
import { Typography } from "antd";
import Image from "next/image";
import phones from "public/phones.png";
const { Title, Paragraph } = Typography;

const HeroSection = () => {
  return (
    <main className="flex flex-col items-center justify-center">
      <div className="grid grid-cols-2 items-center justify-center">
        <div className="bg-[#EAEAFF] pl-20 pt-28 rounded-br-[24px]">
          <Image src={phones} alt="phones" width={587} height={592} />
        </div>
        <Typography className="mx-12 text-start laptop:max-w-2xl">
          <Title
            level={1}
            className="m-0 laptop:text-[50px] laptop:leading-[55px] tracking-[-5%] font-bold"
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
          <Paragraph className="mb-0 mt-2 text-body-text-2 laptop:text-[18px] max-w-[502px] w-full laptop:leading-[26px]">
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
