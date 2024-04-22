import { QRCode } from "antd";
import Image from "next/image";
import Link from "next/link";
import { Fragment } from "react";

import apple from "public/app-store.png";
import google from "public/google-play.png";
const DownloadStore = ({ centered }: { centered?: boolean }) => {
  return (
    <Fragment>
      <div
        className={`flex items-center gap-3 ${centered ? "justify-center" : "justify-start"}`}
      >
        <Link href="/" className="border border-white rounded-lg">
          <Image
            width={159.28}
            height={53.09}
            src={apple}
            className="object-contain"
            alt="app store"
          />
        </Link>
        <Link href="/" className="border border-white rounded-lg">
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
        <QRCode
          errorLevel="M"
          includeMargin
          className="rounded-lg w-[80px] h-[80px] lg:w-auto lg:h-auto"
          value="https://ant.design/"
          bgColor="white"
          icon="http://localhost:3000/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Ficon.b48ed9b6.png&w=3840&q=100"
          type="svg"
          bordered
          size={128}
        />
        <p className="text-[15px] leading-[20.77px] m-0 lg:text-base lg:leading-[22px] w-full max-w-[158px] tracking-text">
          or, scan the qr code to download the app.
        </p>
      </div>
    </Fragment>
  );
};

export default DownloadStore;
