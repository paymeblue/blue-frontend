"use client";
import SolutionsHeroSection from "@components/solutionsHeroSection";
import Container from "@shared/container";
import { motion } from "framer-motion";
import Image from "next/image";
import { useRouter } from "next/navigation";
import sol1 from "public/sol-1.png";
import sol2 from "public/sol-2.png";
import sol3 from "public/sol-3.png";
import sol4 from "public/sol-4.png";
import sol5 from "public/sol-5.png";
import heroBg from "public/solutions-bg.png";
import { Fragment } from "react";

const Solutions = () => {
  const router = useRouter();
  const goToContactHandler = () => {
    router.prefetch("/contact-us");
    router.push("/contact-us");
  };
  return (
    <Fragment>
      <SolutionsHeroSection
        title="Tailored Industry Solutions:"
        subTitle="Simplifying Payments with Blue"
        heroBg={heroBg}
        imgClassName="h-[446px]"
        className="max-w-[980px]"
      />
      <Container className="py-8 lg:py-16 !my-0 !lg:my-6">
        <div>
          <motion.h2
            initial={{ opacity: 0, y: -100 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, stiffness: 90 }}
            className="text-[32px] leading-[35px] lg:text-[40px] lg:leading-[47px] mb-5 font-bold font-avenir lg:tracking-title"
          >
            Making Payments Easy and Convenient
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35, stiffness: 90 }}
            className=" text-base lg:text-lg m-0 leading-[27px] tracking-text font-grotesque"
          >
            Blue understands that efficient payment processing is crucial for
            businesses across different industries. Our innovative QR code
            payment gateway revolutionizes how offline businesses, such as
            retailers, supermarkets, restaurants, and hospitality venues, handle
            transactions. By integrating QR code technology, we ensure that
            payments are seamless, fast, and secure, enhancing the overall
            customer experience.
          </motion.p>
        </div>
        <div className="py-8 lg:pt-20 pb-0">
          <motion.h3
            initial={{ opacity: 0, y: -100 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, stiffness: 90 }}
            className="mb-0 font-semibold text-3xl lg:text-4xl font-satoshi"
          >
            Retail and Supermarkets
          </motion.h3>
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8">
            <div className="w-full max-w-[600px]">
              <motion.p
                initial={{ opacity: 0, y: -100 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, stiffness: 90 }}
                className="text-base lg:text-lg m-0 leading-[27px] tracking-text font-medium font-grotesque"
              >
                Challenge:
              </motion.p>
              <motion.p
                initial={{ opacity: 0, y: 25 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.35, stiffness: 90 }}
                className="text-base lg:text-lg m-0 leading-[27px] tracking-text font-grotesque"
              >
                Retailers face challenges with long checkout times and handling
                cash transactions, which can slow down the sales process and
                reduce customer satisfaction.
              </motion.p>
            </div>
            <div className="w-full max-w-[600px]">
              <motion.p
                initial={{ opacity: 0, y: -100 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, stiffness: 90 }}
                className="text-base lg:text-lg m-0 leading-[27px] tracking-text font-medium font-grotesque"
              >
                Solution:
              </motion.p>
              <motion.p
                initial={{ opacity: 0, y: 25 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.35, stiffness: 90 }}
                className=" text-base lg:text-lg m-0 leading-[27px] tracking-text font-grotesque"
              >
                Blue’s QR code wallet feature enables customers to complete
                purchases without cash or debit cards. By integrating our
                BlueBusiness™ system with existing Point-of-Sale (POS) systems,
                retailers can facilitate swift payments through barcode scans.
              </motion.p>
            </div>
          </div>
        </div>
      </Container>
      <div className="mx-auto max-w-[1560px] px-6 laptop-md:pl-[7.65rem] tablet:pr-0 laptop-md:pr-0">
        <div className="py-6 lg:py-0 flex flex-col laptop-md:flex-row laptop-md:items-center justify-between gap-8">
          <div>
            <ul className="w-full laptop-md:max-w-[600px] list-disc list-inside">
              <motion.p
                initial={{ opacity: 0, y: -100 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, stiffness: 90 }}
                className="text-base lg:text-lg m-0 leading-[27px] tracking-text font-medium font-grotesque"
              >
                Key Features:
              </motion.p>
              <motion.li
                initial={{ opacity: 0, y: 25 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.35, stiffness: 90 }}
                className="text-base lg:text-lg m-0 leading-[27px] tracking-text font-grotesque"
              >
                Integration with POS Systems: Seamless integration with existing
                infrastructure for easy setup.
              </motion.li>
              <motion.li
                initial={{ opacity: 0, y: 25 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.35, stiffness: 90 }}
                className="text-base lg:text-lg m-0 leading-[27px] tracking-text font-grotesque"
              >
                Instant Transactions: Customers can complete payments in seconds
                by scanning QR codes.
              </motion.li>
            </ul>
            <ul className="w-full laptop-md:max-w-[600px]  list-disc list-inside">
              <motion.p
                initial={{ opacity: 0, y: -100 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, stiffness: 90 }}
                className="text-base lg:text-lg m-0 leading-[27px] tracking-text font-medium font-grotesque"
              >
                Outcome:
              </motion.p>
              <motion.li
                initial={{ opacity: 0, y: 25 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.35, stiffness: 90 }}
                className="text-base lg:text-lg m-0 leading-[27px] tracking-text font-grotesque"
              >
                Reduced Wait Times: Stores have experienced a 40% decrease in
                average checkout time.
              </motion.li>
              <motion.li
                initial={{ opacity: 0, y: 25 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.35, stiffness: 90 }}
                className="text-base lg:text-lg m-0 leading-[27px] tracking-text font-grotesque"
              >
                Increased Sales: The convenience of QR code payments has
                encouraged impulse buying, boosting overall sales.
              </motion.li>
            </ul>
          </div>
          <motion.div
            initial={{ x: 100, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.35 }}
            viewport={{ once: true }}
            className="flex flex-col md:flex-row items-center laptop-md:justify-center gap-4"
          >
            <Image src={sol1} alt="sol-1" width={326} height={420} />
            <Image src={sol2} alt="sol-1" width={319} height={358} />
          </motion.div>
        </div>
      </div>
      <Container className="py-8 !my-0 !lg:my-6">
        <div>
          <motion.h3
            initial={{ opacity: 0, y: -100 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, stiffness: 90 }}
            className="mb-0 font-semibold text-3xl lg:text-4xl font-satoshi"
          >
            Hospitality and Restaurants
          </motion.h3>
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8">
            <div className="w-full max-w-[600px]">
              <motion.p
                initial={{ opacity: 0, y: -100 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, stiffness: 90 }}
                className="text-base lg:text-lg m-0 leading-[27px] tracking-text font-medium font-grotesque"
              >
                Challenge:
              </motion.p>
              <motion.p
                initial={{ opacity: 0, y: 25 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.35, stiffness: 90 }}
                className="text-base lg:text-lg m-0 leading-[27px] tracking-text font-grotesque"
              >
                Restaurants often deal with busy dining environments where speed
                and efficiency at checkout are paramount. Traditional payment
                methods can be cumbersome and lead to longer wait times for
                customers.
              </motion.p>
            </div>
            <div className="w-full max-w-[600px]">
              <motion.p
                initial={{ opacity: 0, y: -100 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, stiffness: 90 }}
                className="text-base lg:text-lg m-0 leading-[27px] tracking-text font-medium font-grotesque"
              >
                Solution:
              </motion.p>
              <motion.p
                initial={{ opacity: 0, y: 25 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.35, stiffness: 90 }}
                className=" text-base lg:text-lg m-0 leading-[27px] tracking-text font-grotesque"
              >
                With Blue's QR code payment gateway, restaurants can allow
                customers to pay directly from their smartphones, eliminating
                the need for physical cash or cards. Our BlueBusiness desktop
                application facilitates integration into the restaurant's POS,
                enabling quick payment processing
              </motion.p>
            </div>
          </div>
        </div>
      </Container>
      <div className="mx-auto max-w-[1560px] px-6 laptop:px-6 laptop-md:px-20 laptop-md:pr-[7.65rem] laptop-md:pl-0">
        <div className="py-6 lg:py-0 flex laptop-md:items-center flex-col laptop-md:flex-row justify-between gap-8">
          <motion.div
            initial={{ x: -100, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.35 }}
            viewport={{ once: true }}
            className="flex flex-col md:flex-row items-center laptop-md:justify-center gap-4"
          >
            <Image
              src={sol3}
              alt="sol-3"
              width={326}
              height={420}
              className="rounded-xl laptop-md:rounded-none"
            />
            <Image src={sol4} alt="sol-4" width={319} height={358} />
          </motion.div>
          <div>
            <ul className="w-full laptop-md:max-w-[600px] list-disc list-inside">
              <motion.p
                initial={{ opacity: 0, y: -100 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, stiffness: 90 }}
                className="text-base lg:text-lg m-0 leading-[27px] tracking-text font-medium font-grotesque"
              >
                Key Features:
              </motion.p>
              <motion.li
                initial={{ opacity: 0, y: 25 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.35, stiffness: 90 }}
                className="text-base lg:text-lg m-0 leading-[27px] tracking-text font-grotesque"
              >
                Contactless Payments: Enhance hygiene and safety by allowing
                contactless payments.
              </motion.li>
              <motion.li
                initial={{ opacity: 0, y: 25 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.35, stiffness: 90 }}
                className="text-base lg:text-lg m-0 leading-[27px] tracking-text font-grotesque"
              >
                Customizable QR Codes: Restaurants can generate unique QR codes
                for each table or order.
              </motion.li>
            </ul>
            <ul className="w-full laptop-md:max-w-[600px]  list-disc list-inside">
              <motion.p
                initial={{ opacity: 0, y: -100 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, stiffness: 90 }}
                className="text-base lg:text-lg m-0 leading-[27px] tracking-text font-medium font-grotesque"
              >
                Outcome:
              </motion.p>
              <motion.li
                initial={{ opacity: 0, y: 25 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.35, stiffness: 90 }}
                className="text-base lg:text-lg m-0 leading-[27px] tracking-text font-grotesque"
              >
                Improved Table Turnover: Faster payment processing has led to a
                25% increase in table turnover.
              </motion.li>
              <motion.li
                initial={{ opacity: 0, y: 25 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.35, stiffness: 90 }}
                className="text-base lg:text-lg m-0 leading-[27px] tracking-text font-grotesque"
              >
                Enhanced Customer Experience: Diners appreciate the convenience
                and safety of contactless payments, leading to positive reviews
                and repeat visits.
              </motion.li>
            </ul>
          </div>
        </div>
      </div>
      <Container className="py-8 lg:py-16 !my-0 !lg:my-6">
        <motion.div
          initial={{ y: 35, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.35 }}
          viewport={{ once: true }}
          className="bg-purple flex flex-col md:flex-row mb-8 relative items-center justify-between p-8 pb-0 md:p-10 md:pb-0 laptop-md:p-20 gap-8 rounded-3xl"
        >
          <div className="w-full max-w-[500px]">
            <h4 className="tracking-title text-[30px] leading-[35px] lg:text-[38px] font-bold m-0 lg:leading-[47px]">
              Get Started Today!
            </h4>
            <p className="text-base leading-[25px] tracking-text mt-3 lg:text-lg text-txt">
              Discover how Blue can transform your payment processes. Contact us
              for a demo session today.
            </p>
            <button
              className="border-primary text-primary font-satoshi px-5 text-sm lg:text-base border rounded-lg py-2.5 lg:py-3 hover:bg-primary/5"
              onClick={goToContactHandler}
            >
              Contact us
            </button>
          </div>
          <div className="laptop-md:absolute laptop-md:right-20 laptop-md:bottom-1 -mb-3 md:-mb-2 laptop:-mb-4 laptop-md:-mb-5">
            <Image
              src={sol5}
              alt="img 3"
              width={332}
              height={671.78}
              className="object-contain hidden lg:block"
              priority
            />
            <Image
              src={sol5}
              alt="img 10"
              width={241.67}
              height={489}
              className="object-contain m-auto block lg:hidden"
              priority
            />
          </div>
        </motion.div>
      </Container>
    </Fragment>
  );
};

export default Solutions;
