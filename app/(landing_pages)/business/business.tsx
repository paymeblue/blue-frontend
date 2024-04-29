"use client";
import Container from "@shared/container";
import { motion } from "framer-motion";
import Image from "next/image";
import heroBg from "public/businessHeroBg.jpg";
import img7 from "public/img-7.png";
import img8 from "public/img-8.png";
import img9 from "public/img-9.png";
import HeroSection from "../../components/heroSection";

const Business = () => {
  return (
    <div>
      <HeroSection
        title="Streamline your financial operations effortlessly"
        subTitle="Seamlessly manage incoming payments and track your finances with Blue's all-in-one business manager tools, ensuring efficiency and simplicity for your business operations."
        heroBg={heroBg}
        hasTag
        tag="Discover BlueBusiness"
        imgClassName="h-[720px]"
        className="max-w-[980px]"
      />
      <Container className="py-8 lg:py-16">
        <motion.div
          initial={{ y: 35, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.35 }}
          viewport={{ once: true }}
          className="bg-purple flex flex-col lg:flex-row mb-8 items- justify-between p-5 lg:p-20 lg:pb-0 pb-0 gap-8 rounded-3xl"
        >
          <div className="w-full mt-5 lg:mt-20 max-w-[616px]">
            <h4 className="tracking-title text-[30px] leading-[35px] lg:text-[38px] font-bold m-0 lg:leading-[47px]">
              Boost your business sales with
              <i className="font-fraunces text-primary">
                {" "}
                data driven insights &nbsp;
              </i>
            </h4>
            <p className="text-base leading-[25px] tracking-text mt-3 lg:text-lg text-txt">
              Enhance your revenue-generating strategies with clear
              visualisations tracking your sales and expenses.
            </p>
          </div>
          <div>
            <Image
              src={img7}
              alt="img 7"
              width={449}
              height={455}
              className="object-contain m-auto w-auto"
              priority
            />
          </div>
        </motion.div>
        <div className="flex flex-col lg:flex-row items-center justify-center w-full gap-6">
          <motion.div
            initial={{ y: 35, x: -10, opacity: 0 }}
            whileInView={{ y: 0, x: 0, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.4 }}
            viewport={{ once: true }}
            className="bg-primary text-white w-full flex flex-col rounded-3xl gap-6 justify-between p-5 lg:p-12 lg:pb-0 h-auto lg:h-[758px] pb-0"
          >
            <div className="w-full max-w-[520px] m-auto mt-5 lg:m-auto">
              <h4 className="tracking-title text-[30px] leading-[35px] lg:text-[38px] font-bold m-0 lg:leading-[47px]">
                Add and&nbsp;
                <span className="font-fraunces inline italic">
                  manage your team&nbsp;
                </span>
                <br />
                seamlessly
              </h4>
              <p className="text-base leading-[25px] tracking-text mt-3 lg:text-lg">
                Easily add and manage your team members as an admin, overseeing
                their operations to ensure accountability.
              </p>
            </div>
            <div>
              <Image
                src={img8}
                alt="img 8"
                width={332}
                height={251}
                className="object-contain m-auto w-[90%] md:w-1/2 laptop-md:w-[revert-layer]"
                priority
              />
            </div>
          </motion.div>
          <motion.div
            initial={{ y: 35, x: 10, opacity: 0 }}
            whileInView={{ y: 0, x: 0, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.4 }}
            viewport={{ once: true }}
            className="bg-txt text-white w-full flex flex-col rounded-3xl gap-12 lg:gap-6 justify-between p-5 lg:pb-0 md:p-7 md:pb-0 md:pl-0 lg:pt-16 laptop-md:p-16 laptop-md:pb-0 laptop-md:pl-0 h-auto lg:h-[758px] pb-0 pl-0"
          >
            <div className="w-full p-0 mx-auto mt-5 laptop-md:mt-0 pl-5 md:pl-10 laptop-md:pl-12">
              <h4 className="tracking-title text-[30px] leading-[35px] laptop-md:text-[38px] font-bold m-0 laptop-md:leading-[47px]">
                <i className="font-fraunces">Integrate BlueBusiness&nbsp;</i>
                with your Point-of-Sale system
              </h4>
              <p className="tracking-text text-base w-full max-w-[485px] leading-[25px] laptop-md:text-lg mt-3 laptop-md:leading-[28px]">
                BlueBusiness Desktop allows for seamless integration into your
                Point of Sale system, facilitating swift customer payments via
                barcode scan.
              </p>
            </div>
            <div>
              <Image
                src={img9}
                alt="img 9"
                width={490}
                height={490}
                className="object-contain mb-0 laptop-md:-translate-y-2.5 rounded-bl-3xl"
                priority
              />
            </div>
          </motion.div>
        </div>
      </Container>
    </div>
  );
};

export default Business;
