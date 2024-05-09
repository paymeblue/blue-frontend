"use client";
import Container from "@shared/container";
import { motion } from "framer-motion";
import Image from "next/image";
import heroBg from "public/aboutHeroBg.png";
import blur from "public/blur.png";
import gridImg from "public/gridImg.png";
import { Fragment } from "react";

const About = () => {
  return (
    <Fragment>
      <section className="text-white w-full relative">
        <Image
          alt="Hero Bg"
          src={heroBg}
          width={1440}
          height={520}
          sizes="100vw"
          className={`w-full object-cover h-[400px] lg:h-auto`}
          placeholder="blur"
          quality={100}
          priority
        />
        <Container className="inset-0 top-[52%] mobile-md:top-1/2 absolute max-w-[841px] text-center px-4 md:px-20 laptop:px-4 laptop-md:px-20 m-auto w-full justify-center flex gap-1 flex-col translate-x-0 -translate-y-1/2">
          <motion.h1
            initial={{ opacity: 0, y: -100 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, stiffness: 90 }}
            className="text-[32px] leading-[35px] lg:text-[45px] lg:leading-[47px] mb-5 font-bold lg:tracking-title"
          >
            Think Payments, Think Blue
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35, stiffness: 90 }}
            className=" text-base lg:text-lg m-0 leading-[25px] tracking-text"
          >
            Unlock the power of your smartphone as your ultimate payment tool
            with Blue, enabling you to make and receive payments effortlessly,
            from anywhere, and at anytime.
          </motion.p>
        </Container>
      </section>
      <div className="max-w-[1440px] px-6 tablet:px-20 laptop:px-6 laptop-md:px-20 mx-auto mt-6 w-full  md:px-20 py-8 lg:py-14 grid gap-12 grid-cols-1 lg:grid-cols-2 items-center justify-between lg:justify-center">
        <div className="w-full max-w-[616px]">
          <h3 className="font-bold text-[30px] leading-[33px] lg:text-[40px] lg:leading-[47px] tracking-title">
            We&apos;re on a mission to:
            <br />
            <span className="text-primary lg:text-[45px]">
              Simplify all things payments
            </span>
          </h3>
          <p className="text-[15px] mt-3 lg:mt-4 w-full max-w-[520px] leading-[25px] lg:text-lg lg:leading-[27px] tracking-text">
            At Blue, we aim to revolutionize the way payments are made and
            received, ultimately eliminating the need for cash and cards. We
            envision a future where your mobile phone becomes your primary
            method of payment, creating an ecosystem where transactions are
            seamlessly conducted with just a tap or a scan.
          </p>
        </div>
        <div className="w-full md:p-8 md:pt-0">
          <Image
            src={gridImg}
            alt="grid image"
            className="object-contain m-auto"
          />
        </div>
      </div>
      <section className="bg-[#141752CC] px-4 lg:px-0  relative pb-8 lg:pb-20 w-full text-white">
        <Image
          src={blur}
          alt="blur blue bg"
          width={357.68}
          height={357.68}
          className="object-contain m-auto absolute -z-10 blur-sm inset-0"
          placeholder="blur"
          quality={100}
          priority
        />
        <div className="max-w-[900px] px-6 tablet:px-20 laptop:px-6 laptop-md:px-20 mx-auto w-full  md:px-20 py-8 lg:py-14">
          <p className="py-2 mb-3 lg:mb-5 px-4 lg:px-6 lg:py-3 flex items-center justify-center gap-2 rounded-full bg-white/30 m-0 w-max text-[15px] leadimg-[15px] lg:text-base lg:leading-[16px] lg:tracking-text">
            <span className="w-[7px] h-[7px] shadow-[0px_1px_8px_0px_#FFFFFFAD] inline-block bg-white rounded-full" />
            Why choose Blue?
          </p>
          <h1 className="text-[30px] mb-5 w-full max-w-[650px] leading-[35px] lg:text-[35px] lg:leading-[42px] lg:mb-10 font-semibold tracking-title">
            Unlock the power of your smartphone as your ultimate payment tool.
          </h1>
          <div className="text-[15px] mt-3 lg:mt-4 leading-[25px] lg:text-lg lg:leading-[27px] tracking-text space-y-5 lg:space-y-9">
            <p className="m-0">
              In today's digital age, internet penetration and mobile phone
              usage have reached unprecedented levels, especially in Africa and
              Nigeria. However, despite this technological advancement,
              transactions are often hindered by issues such as network
              downtime, failures, and slow processing times. At Blue, we're
              committed to solving this prevalent problem by streamlining
              payment processes and speeding up transactions, ensuring that
              payments are swift, reliable, and hassle-free.
            </p>
            <p className="m-0">
              We want Blue to be the first thing you think of when making a
              payment—a lifestyle choice that empowers individuals and
              businesses alike. Whether you're shopping at your favorite local
              market or running a bustling enterprise, Blue enables you to pay
              and receive payments effortlessly wherever you go. Our mission is
              simple: think payments, think Blue. By enabling businesses and
              individuals to transact with ease, we're paving the way for a
              future where financial transactions are
              <b>&nbsp;faster, safer, and more convenient for everyone.</b>
            </p>
          </div>
        </div>
        <h5 className="font-fraunces mx-auto text-[30px] leading-[37px] w-[350px] px-6 lg:px-0 my-0 lg:pt-2 lg:pb-10 md:w-full max-w-[780px] text-center lg:text-[40px] lg:leading-[47px] tracking-title">
          “With Blue, payments are no longer a burden but a seamless part of
          everyday life”
        </h5>
      </section>
    </Fragment>
  );
};

export default About;
