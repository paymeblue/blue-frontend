"use client";
import { formatCurrency, sleep } from "@lib/index";
import html2canvas from "html2canvas";
import Image from "next/image";
import { useRouter } from "next/navigation";
import blueWhite from "public/blue-white.png";
import success from "public/done.png";

const Success = () => {
  const router = useRouter();

  const handleClick = async () => {
    router.replace("?step=receipt");
    await sleep(2000);
    const componentElement = "";
    //  const componentElement = refElem.current;

    if (componentElement) {
      html2canvas(componentElement, { allowTaint: true, useCORS: true })
        .then((canvas) => {
          const imgData = canvas.toDataURL("image/png");
          const link = document.createElement("a");
          link.href = imgData;
          link.download = `receipt-${Date.now()}.png`;
          link.click();
        })
        .catch((error) => {
          console.error("Error capturing component:", error);
        });
    }
    await sleep(2000);
    router.replace("/");
  };
  return (
    <div className="flex px-4 flex-col text-center  items-center max-w-[1440px] w-full mx-auto justify-center gap-4">
      <div className="mt-8 laptop:mt-20">
        <Image
          src={success}
          alt="success icon"
          width={188}
          height={150}
          className="object-contain w-[166px] h-[166px] laptop:w-[188px] lg:h-[150px] mx-auto"
          priority
        />
      </div>
      <div>
        <h5 className="laptop:leading-[40px] leading-[26px] text-[20px] font-medium laptop:text-[32px]">
          Withdrawal Successful!
        </h5>
        <p className="mx-auto text-[15px] leading-[21px] laptop:leading-[26px] text-txt2 m-0 laptop:text-xl">
          You withdrawn {formatCurrency(10000)} to
          <br /> 2210123339 - Stanbic IBTC
          <br />
          (Favour Onotse Momoh)
        </p>
      </div>
      <button
        type="button"
        onClick={handleClick}
        className="laptop mx-auto mt-6 flex  max-w-[336px] items-center border-primary hover:bg-gray-50 border rounded-lg text-primary w-full justify-center disabled:text-gray-900 disabled:bg-gray-200 disabled:border-none text-[0.9375rem] font-medium leading-[1.39663rem] p-4 laptop:text-[1rem] laptop:leading-[1.5rem] "
      >
        Download Receipt
      </button>

      <div className="p-5 mt-24 lg:mt-28 laptop-md:mt-32 w-full max-w-[696px] flex flex-col items-start gap-4 rounded-lg bg-[#F3F3FE] ">
        <Image
          src={blueWhite}
          alt="success icon"
          width={72.5}
          height={72.5}
          className="object-contain w-[40px] h-[40px] m-auto md:m-0 laptop:w-[72.5px] lg:h-[72.5px]"
          priority
        />
        <div className="flex gap-12 flex-col md:flex-row md:items-start w-full justify-between">
          <div className="text-center max-w-[256px] md:max-w-max mx-auto md:m-0 md:text-start w-full md:flex-1">
            <h3 className="font-medium leading-[21px] m-0 lg:mb-1 text-[17px] text-txt">
              Sign up on Blue Personal today!
            </h3>
            <p className="leading-[19px] text-[13.5px] m-0 laptop-md:text-[15.5px] text-txt2">
              Enjoy{" "}
              <span className="text-primary">free transfers and more </span>
              when you sign up on the Blue app.
            </p>
          </div>
          <button
            type="button"
            onClick={() => router.replace("/")}
            className="laptop mx-auto hover:bg-primary/95 bg-primary w-full text-sm font-medium leading-[21px] py-3 px-4 laptop:text-[1rem] text-white rounded-lg md:w-auto laptop:leading-[1.5rem]"
          >
            Download the app
          </button>
        </div>
      </div>
    </div>
  );
};

export default Success;
