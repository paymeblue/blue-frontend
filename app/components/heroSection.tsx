import Container from "@shared/container";
import { motion } from "framer-motion";
import Image, { StaticImageData } from "next/image";
import Link from "next/link";
import apple from "public/app-store.png";
import google from "public/google-play.png";
import { QRCodeSVG } from "qrcode.react";
import { Fragment, ReactNode } from "react";

type HeroSectionProps = {
  title: string | ReactNode;
  subTitle: string;
  hasTag?: boolean;
  tag?: string;
  heroBg: StaticImageData;
  imgClassName: string;
  className: string;
  pClassName?: string;
};
const HeroSection = ({
  title,
  subTitle,
  hasTag,
  tag,
  heroBg,
  imgClassName,
  className,
  pClassName,
}: HeroSectionProps) => {
  return (
    <section className="text-white relative">
      <Image
        alt="Hero Bg"
        src={heroBg}
        sizes="100vw"
        className={`w-full object-cover ${imgClassName}`}
        placeholder="blur"
        quality={100}
        priority
      />
      <Container
        className={`absolute max-w-[1400px] justify-center flex gap-8 flex-col my-0 top-1/2 -translate-y-1/2 translate-x-0 z-10`}
      >
        {hasTag && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.5, delay: 0.25 }}
            className="py-2 px-4 lg:px-6 lg:py-3 flex items-center justify-center rounded-lg gap-2 lg:rounded-xl bg-white/30 m-0 w-max text-[15px] leadimg-[15px] lg:text-base lg:leading-[16px] lg:tracking-text"
          >
            <span className="w-[7px] h-[7px] shadow-[0px_1px_8px_0px_#FFFFFFAD] inline-block bg-white rounded-full" />
            {tag}
          </motion.p>
        )}
        <div className={className} style={{ width: "100%" }}>
          <motion.h1
            initial={{ opacity: 0, y: -100 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, stiffness: 90 }}
            className="text-[32px] leading-[38px] lg:text-[40px] lg:leading-[47px] mb-2 lg:mb-4 font-bold lg:tracking-title"
          >
            {" "}
            {title}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35, stiffness: 90 }}
            className={`text-base lg:text-lg m-0 lg:leading-[25px] w-full tracking-text ${pClassName}`}
          >
            {subTitle}
          </motion.p>
        </div>
        <Fragment>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.5, delay: 0.35 }}
            className="flex items-center gap-3 justify-start"
          >
            <Link href="/">
              <Image
                width={159.28}
                height={53.09}
                src={apple}
                className="object-contain"
                alt="app store"
              />
            </Link>
            <Link href="/">
              <Image
                width={159.28}
                height={53.09}
                className="object-contain"
                src={google}
                alt="google play"
              />
            </Link>
          </motion.div>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.5, delay: 0.35 }}
            className="w-[calc(100%-70px)] md:w-max custom_svg_border py-5 px-8 rounded-xl flex items-center justify-center gap-3"
          >
            <QRCodeSVG
              value="https://deploy-preview-27--blue-frontend.netlify.app/"
              fgColor="#000000"
              level="M"
              imageSettings={{
                src: "/icon.png",
                x: undefined,
                y: undefined,
                height: 30,
                width: 30,
                excavate: false,
              }}
              includeMargin
              className="rounded-lg w-[80px] h-[80px] lg:w-auto lg:h-auto"
              bgColor="white"
              type="svg"
              size={77}
            />
            <p className="text-[15px] leading-[20.77px] m-0 lg:text-base lg:leading-[22px] w-full max-w-[158px] tracking-text">
              or, scan the QR code to download the app.
            </p>
          </motion.div>
        </Fragment>
      </Container>
    </section>
  );
};

export default HeroSection;
