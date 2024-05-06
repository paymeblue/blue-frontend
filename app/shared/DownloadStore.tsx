"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import apple from "public/app-store.png";
import google from "public/google-play.png";
import { QRCodeSVG } from "qrcode.react";
import { Fragment } from "react";

const DownloadStore = ({ centered }: { centered?: boolean }) => {
  return (
    <Fragment>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.5, delay: 0.35 }}
        className={`flex items-center gap-3 ${centered ? "justify-center" : "justify-start"}`}
      >
        <Link href="/" className="rounded-lg">
          <Image
            width={159.28}
            height={53.09}
            src={apple}
            className="object-contain w-[159.28px] h-[53.09px]"
            alt="app store"
          />
        </Link>
        <Link href="/" className="rounded-lg">
          <Image
            width={159.28}
            height={53.09}
            className="object-contain w-[159.28px] h-[53.09px]"
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
  );
};

export default DownloadStore;
