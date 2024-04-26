"use client";
import Container from "@shared/container";
import { motion } from "framer-motion";
import Image from "next/image";
import gridImg from "public/gridImg.png";
import vector from "public/vector.png";
import { Fragment } from "react";

const AboutPage = () => {
  return (
    <Fragment>
      <section className="text-white w-full relative bg-primary-grad-nav h-[474px]">
        <Container className="inset-0 top-[52%] mobile-md:top-1/2 absolute max-w-[925px] text-center px-4 md:px-20 laptop:px-4 laptop-md:px-20 m-auto w-full justify-center flex gap-1 flex-col translate-x-0 -translate-y-1/2">
          <motion.h1
            initial={{ opacity: 0, y: -100 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, stiffness: 90 }}
            className="text-[32px] leading-[35px] lg:text-[45px] lg:leading-[47px] mb-5 font-bold lg:tracking-title"
          >
            Redefining{" "}
            <span className="font-fraunces text-[35px] leading-[38px] lg:text-[47px] lg:leading-[47px] italic">
              Easy Banking
            </span>{" "}
            and{" "}
            <span className="font-fraunces text-[35px] leading-[38px] lg:text-[47px] lg:leading-[47px] italic">
              Seamless Payments{" "}
            </span>
            for Everyone
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35, stiffness: 90 }}
            className=" text-base lg:text-lg m-0 leading-[25px] tracking-text"
          >
            Founded with a vision to revolutionize the way individuals and
            businesses manage their finances, Blue is committed to providing
            seamless, secure, and user-friendly payment solutions.
          </motion.p>
        </Container>
        <Image
          src={vector}
          alt="blue branding"
          className="absolute right-10 opacity-10 -bottom-12 w-[15%]"
        />
      </section>
      <div className="max-w-[1440px] px-6 tablet:px-20 laptop:px-6 laptop-md:px-20 mx-auto my-6 w-full  md:px-20 py-8 lg:py-14 grid gap-12 grid-cols-1 lg:grid-cols-2 items-center justify-between lg:justify-center">
        <div className="w-full max-w-[616px]">
          <h3 className="font-bold text-[30px] leading-[33px] lg:text-[40px] lg:leading-[47px] tracking-title">
            We&apos;re on a mission to:
            <br />
            <i className="font-fraunces text-[30px] leading-[33px] lg:text-[45px] lg:leading-[47px] text-primary">
              Simplify all things payments
            </i>
          </h3>
          <div className="text-[15px] mt-3 lg:mt-4 leading-[25px] lg:text-base lg:leading-[27px] tracking-text space-y-3 lg:space-y-5">
            <p className="m-0">
              At Blue, we aim to revolutionize the way payments are made and
              received, ultimately eliminating the need for cash and cards. We
              envision a future where your mobile phone becomes your primary
              method of payment, creating an ecosystem where transactions are
              seamlessly conducted with just a tap or a scan.
            </p>
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
              and receive payments effortlessly wherever you go.
            </p>
            <p className="m-0">
              With Blue, payments are no longer a burden but a seamless part of
              everyday life. Our mission is simple: think payments, think Blue.
              By enabling businesses and individuals to transact with ease,
              we're paving the way for a future where financial transactions are
              faster, safer, and more convenient for everyone.
            </p>
          </div>
        </div>
        <div className="w-full md:p-8">
          <Image
            src={gridImg}
            alt="grid image"
            className="object-contain m-auto"
            priority
            placeholder="blur"
            quality={100}
          />
        </div>
      </div>
    </Fragment>
  );
};

export default AboutPage;
