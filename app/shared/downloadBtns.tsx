import { Space } from "antd";
import Image from "next/image";
import Link from "next/link";
import appPlay from "public/app-store.svg";
import googlePlay from "public/google-play.svg";

const DownloadBtns = () => {
  return (
    <Space className="mt-8 gap-0 tablet:gap-2">
      <Link href="#">
        <Image
          src={googlePlay}
          alt="download blue app on google play"
          priority
          className="mx-auto w-4/5 tablet:w-auto"
        />
      </Link>
      <Link href="#">
        <Image
          src={appPlay}
          alt="download blue app on google play"
          priority
          className="mx-auto w-4/5 tablet:w-auto"
        />
      </Link>
    </Space>
  );
};

export default DownloadBtns;
