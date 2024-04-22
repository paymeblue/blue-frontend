"use client";
import useMatchMedia from "@hooks/useMatchMedia";
import Container from "@shared/container";
import Image from "next/image";
import img10 from "public/img-10.png";
import img11 from "public/img-11.png";
import img3 from "public/img-3.png";
import img4 from "public/img-4.png";
import img5 from "public/img-5.png";
import img6 from "public/img-6.png";
import heroBg from "public/personalHeroBg.jpg";
import HeroSection from "../../components/heroSection";

const Personal = () => {
  const isMobile = useMatchMedia();

  return (
    <div>
      <HeroSection
        title="Receive and make payments on the go"
        subTitle="Whether you're sending money to friends, receiving money, paying bills, or making purchases, Blue empowers you to do it all on the go."
        heroBg={isMobile ? img11 : heroBg}
        hasTag
        tag="Discover BluePersonal"
        imgClassName="h-[720px]"
        className="max-w-[900px]"
      />
      <Container className="py-8 lg:py-16">
        <div className="bg-purple flex flex-col lg:flex-row mb-12 items- justify-between p-5 md:p-10 min-[900px]:pb-0 laptop-md:p-20 laptop-md:pb-0 pb-0 gap-8 rounded-3xl">
          <div className="w-full mt-5 md:mt-0 lg:mt-20 max-w-[650px]">
            <h4 className="tracking-title text-[30px] leading-[35px] lg:text-[38px] font-bold m-0 lg:leading-[47px]">
              Blue-to-Blue
              <i className="font-fraunces text-primary">&nbsp;Free Transfers</i>
            </h4>
            <p className="text-base leading-[25px] tracking-text mt-3 lg:text-lg text-txt">
              Sending money to friends, family, or anyone else with a Blue
              account has never been easier. With Blue-to-Blue transfers, you
              can securely send funds directly to another Blue user using their
              wallet ID.
            </p>
          </div>
          <div>
            <Image
              src={img3}
              alt="img 3"
              width={332}
              height={671.78}
              className="object-contain hidden lg:block"
              priority
            />
            <Image
              src={img10}
              alt="img 10"
              width={241.67}
              height={489}
              className="object-contain m-auto block lg:hidden"
              priority
            />
          </div>
        </div>
        <div className="flex flex-col lg:flex-row items-center justify-center w-full gap-12 laptop-md:gap-8">
          <div className="bg-primary text-white w-full flex flex-col rounded-3xl gap-12 lg:gap-6 justify-between p-5 md:p-7 md:pb-0 md:pl-0 lg:pt-10 laptop-md:p-12 laptop-md:pb-0 laptop-md:pl-0 h-auto lg:h-[758px] pb-0 pl-0">
            <div className="w-full p-0 mt-5 laptop-md:mt-0 pl-5 md:pl-10 laptop-md:pl-12">
              <h4 className="tracking-title text-[30px] leading-[35px] laptop-md:text-[38px] max-w-g font-bold m-0 laptop-md:leading-[47px]">
                Don&apos;t have a&nbsp;
                <i className="font-fraunces inline">smartphone?&nbsp;</i>
                <br />
                No worries!
              </h4>
              <p className="tracking-text text-base leading-[25px] laptop-md:text-lg mt-3 laptop-md:leading-[28px]">
                Blue offers a hassle-free way to make and receive payments
                without a smartphone, using our USSD and text message features.
              </p>
            </div>
            <div>
              <Image
                src={img4}
                alt="img 4"
                width={662}
                height={414}
                className="object-contain mb-0 rounded-bl-3xl"
                priority
              />
            </div>
          </div>
          <div className="bg-txt text-white flex flex-col rounded-3xl gap-6 w-full justify-between h-auto lg:h-[758px] p-5 md:p-10 md:pb-0 laptop-md:p-12 laptop-md:pb-0  pb-0">
            <div className="w-full mt-5 lg:mt-auto m-auto max-w-[650px]">
              <h4 className="tracking-title text-[30px] leading-[35px] laptop-md:text-[38px] font-bold m-0 laptop-md:leading-[47px]">
                Send, request and receive money with a
                <span className="font-fraunces italic">
                  &nbsp;quick scan&nbsp;
                </span>
              </h4>
              <p className="tracking-text text-base mt-3 leading-[25px] laptop-md:text-lg laptop-md:leading-7">
                Embrace the future of payments with Blue. Simply scan the QR
                code or barcode with your smartphone to make payments on the go.
              </p>
            </div>
            <div>
              <Image
                src={img5}
                alt="img 5"
                width={332}
                height={638.81}
                className="object-contain m-auto w-[90%] md:w-auto laptop-md:w-3/5"
                priority
              />
            </div>
          </div>
        </div>
        <div className="bg-purple flex flex-col lg:flex-row mt-12 items- justify-between p-5 md:p-10 md:pb-0 laptop-md:p-20 laptop-md:pb-0 pb-0 gap-8 rounded-3xl">
          <div className="w-full mt-5 lg:mt-20 max-w-[650px]">
            <h4 className="tracking-title text-[30px] leading-[35px] laptop-md:text-[38px] font-bold m-0 laptop-md:leading-[47px]">
              <span className="font-fraunces italic text-primary">
                Sync your contacts&nbsp;
              </span>
              within Blue and send money to them easily
            </h4>
            <p className="tracking-text text-base mt-3 leading-[25px] laptop-md:text-lg laptop-md:leading-7 text-txt">
              No need to remember account details or usernames—simply select the
              contact from your list, enter the amount, and send money
              instantly.
            </p>
          </div>
          <div>
            <Image
              src={img6}
              alt="img 3"
              width={305}
              height={617.15}
              className="object-contain m-auto w-[90%] md:w-auto"
              priority
            />
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Personal;
