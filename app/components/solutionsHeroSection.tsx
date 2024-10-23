import Container from "@shared/container";
import { motion } from "framer-motion";
import Image, { StaticImageData } from "next/image";
import { ReactNode } from "react";

type SolutionsHeroSectionProps = {
  title: string | ReactNode;
  subTitle: string;
  hasTag?: boolean;
  tag?: string;
  heroBg: StaticImageData;
  imgClassName: string;
  className: string;
  pClassName?: string;
};
const SolutionsHeroSection = ({
  title,
  subTitle,
  heroBg,
  imgClassName,
}: SolutionsHeroSectionProps) => {
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
      <Container className="absolute max-w-[1440px] justify-center flex gap-8 flex-col my-0 top-1/2 -translate-y-1/2 translate-x-0">
        <motion.h1
          initial={{ opacity: 0, y: -100 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, stiffness: 90 }}
          className="text-[32px] leading-[32px] lg:text-[45px] lg:leading-[47px] mb-2 font-bold lg:tracking-title"
        >
          {title}
          <br /> {subTitle}
        </motion.h1>
      </Container>
    </section>
  );
};

export default SolutionsHeroSection;
