import Container from "@shared/container";
import Image, { StaticImageData } from "next/image";
import { ReactNode } from "react";
import Store from "./DownloadStore";

type HeroSectionProps = {
  title: string | ReactNode;
  subTitle: string;
  hasTag?: boolean;
  tag?: string;
  heroBg: StaticImageData;
  imgClassName: string;
  className: string;
};
const HeroSection = ({
  title,
  subTitle,
  hasTag,
  tag,
  heroBg,
  imgClassName,
  className,
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
          <h1 className="text-[35px] leading-[45px] lg:text-[45px] lg:leading-[47px] mb-2 font-bold lg:tracking-title">
            {title}
          </h1>
          <p className="text-base lg:text-lg m-0 lg:leading-[25px] tracking-text">
            {subTitle}
          </p>
        </div>
        <Store />
      </Container>
    </section>
  );
};

export default HeroSection;
