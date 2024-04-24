import Container from "@shared/container";
import Image, { StaticImageData } from "next/image";
import Link from "next/link";
import apple from "public/app-store2.png";
import google from "public/google-play2.png";
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
          <p className="p-2 lg:p-3 rounded-lg lg:rounded-xl bg-white/30 m-0 w-max text-[15px] leadimg-[15px] lg:text-lg lg:leading-[18px] lg:tracking-text">
            {tag}
          </p>
        )}
        <div className={className} style={{ width: "100%" }}>
          <h1 className="text-[35px] leading-[45px] lg:text-[40px] lg:leading-[47px] mb-2 lg:mb-4 font-bold lg:tracking-title">
            {title}
          </h1>
          <p
            className={`text-base lg:text-lg m-0 lg:leading-[25px] w-full tracking-text ${pClassName}`}
          >
            {subTitle}
          </p>
        </div>
        <Fragment>
          <div className="flex items-center gap-3 justify-start">
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
          </div>
          <div className="w-[calc(100%-70px)] md:w-max custom_svg_border border-[#73706f] p-4 rounded-xl flex items-center justify-center gap-3">
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
              or, scan the qr code to download the app.
            </p>
          </div>
        </Fragment>
      </Container>
    </section>
  );
};

export default HeroSection;
