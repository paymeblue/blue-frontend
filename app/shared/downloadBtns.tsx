import { Space } from "antd";
import Image from "next/image";
import Link from "next/link";
import appPlay from "public/app-store.svg";
import googlePlay from "public/google-play.svg";

const DownloadBtns = () => {
  return (
    <Space className="mt-5 sm:mt-6 laptop-md:mt-8">
      <Link href="#" target="_blank">
        <Image
          src={googlePlay}
          alt="download blue app on google play"
          priority
          className="mx-auto object-contain cursor-pointer w-full max-w-[196px] md:max-w-[auto]"
          width={196}
          height={60}
        />
      </Link>
      <Link href="#" target="_blank">
        <Image
          src={appPlay}
          alt="download blue app on google play"
          priority
          className="mx-auto cursor-pointer object-contain w-full max-w-[196px] md:max-w-[auto]"
          height={60}
          width={196}
        />
      </Link>
    </Space>
  );
};

export default DownloadBtns;
