import Container from "@shared/container";
import Image from "next/image";
import gridImg from "public/gridImg.png";
import vector from "public/vector.png";
import { Fragment } from "react";

const AboutPage = () => {
  return (
    <Fragment>
      <section className="text-white w-full relative bg-txt h-[474px]">
        <Container className="inset-0 top-[52%] mobile-md:top-1/2 absolute max-w-[775px] text-center px-4 md:px-20 laptop:px-4 laptop-md:px-20 m-auto w-full justify-center flex gap-1 flex-col translate-x-0 -translate-y-1/2">
          <h1 className="text-[35px] leading-[38px] lg:text-[45px] lg:leading-[47px] mb-5 font-bold lg:tracking-title">
            Redefining{" "}
            <span className="font-fraunces italic">Easy Banking</span> and{" "}
            <span className="font-fraunces italic">Seamless Payments </span>
            for Everyone
          </h1>
          <p className=" text-base lg:text-lg m-0 leading-[25px] tracking-text">
            Founded with a vision to revolutionize the way individuals and
            businesses manage their finances, Blue is committed to providing
            seamless, secure, and user-friendly payment solutions.
          </p>
        </Container>
        <Image
          src={vector}
          alt="blue branding"
          className="absolute right-10 opacity-10 -bottom-12 w-[15%]"
        />
      </section>
      <Container className="mx-auto my-6 w-full px-4 md:px-20 laptop:px-4 laptop-md:px-20 py-8 lg:py-14 grid gap-12 md:gap-20 lg:gap-8 grid-cols-1 lg:grid-cols-2 items-start justify-between lg:justify-center">
        <div className="w-full max-w-[616px]">
          <h3 className="font-bold text-[30px] leading-[33px] lg:text-[40px] lg:leading-[47px] tracking-title">
            We&apos;re on a mission to:
            <br />
            <i className="font-fraunces text-primary">
              Simplify all things payments
            </i>
          </h3>
          <div className="text-[15px] leading-[25px] lg:text-base lg:leading-[27px] tracking-text space-y-3 lg:space-y-5">
            <p className="m-0">
              At Blue, we're committed to simplifying the world of payments for
              both individuals and businesses. Lorem ipsum dolor sit amet,
              consectetur adipiscing elit. Sed tempor justo nec dui condimentum,
              sit amet consectetur justo efficitur. Proin pulvinar justo et quam
              pharetra, at ultricies justo pellentesque.
            </p>
            <p className="m-0">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
              tempor justo nec dui condimentum, sit amet consectetur justo
              efficitur. Proin pulvinar justo et quam pharetra, at ultricies
              justo pellentesque. Vestibulum ante ipsum primis in faucibus orci
              luctus et ultrices posuere cubilia curae; Cras sed lorem vel quam
              interdum hendrerit. Sed nec mi vitae arcu dictum tincidunt. Ut
              vestibulum odio ut diam molestie, nec finibus nulla commodo.
            </p>
            <p className="m-0">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
              tempor justo nec dui condimentum, sit amet consectetur justo
              efficitur. Proin pulvinar justo et quam pharetra, at ultricies
              justo pellentesque. Vestibulum ante ipsum primis in faucibus orci
              luctus et ultrices posuere cubilia curae.
            </p>
          </div>
        </div>
        <div className="w-full">
          <Image
            src={gridImg}
            alt="grid image"
            className="object-contain m-auto"
            priority
            placeholder="blur"
            quality={100}
          />
        </div>
      </Container>
    </Fragment>
  );
};

export default AboutPage;
