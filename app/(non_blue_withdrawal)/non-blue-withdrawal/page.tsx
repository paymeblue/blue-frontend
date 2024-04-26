"use client";
import { formatCurrency, sleep } from "@lib/index";
import html2canvas from "html2canvas";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import bank from "public/bank.png";
import blueWhite from "public/blue-white.png";
import blue from "public/blue.png";
import success from "public/done.png";
import { ChangeEvent, FormEvent, Fragment, useState } from "react";

const items = [
  {
    id: "1",
    value: "send",
    icon: (
      <Image
        src={bank}
        alt="send to blue"
        width={40}
        height={40}
        className="w-[40px] h-[40px] object-contain"
      />
    ),
    title: "Send to My Bank Account",
    desc: "Enter your bank account details to withdraw the funds directly to your bank.",
    showCharge: true,
  },
  {
    id: "2",
    value: "signup",
    icon: (
      <Image
        src={blue}
        alt="signup to blue"
        width={40}
        height={40}
        className="w-[40px] h-[40px] object-contain"
      />
    ),
    title: "Sign up on Blue Personal",
    desc: "Download and Sign up on Blue Personal to access your funds.",
  },
];
const NonBlueWithdrawal = () => {
  const [selected, setSelected] = useState("send");
  const router = useRouter();
  const searchParams = useSearchParams();
  const handleRadioChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSelected(e.target.value);
  };
  const submitHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (selected === "send") {
      router.replace("?step=success");
    } else if (selected === "signup") {
      router.replace("/");
    }
  };
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
    <Fragment>
      {searchParams.get("step") === "success" ? (
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
      ) : (
        <section className="max-w-[470px] p-6 w-full m-auto">
          <div className="w-full flex flex-col gap-2 md:gap-4 mt-20 mb-8 mx-auto text-center">
            <Image
              src={blue}
              alt="blue"
              width={70}
              height={70}
              priority
              className="w-[70px] h-[70px] m-auto object-contain"
            />
            <h2 className="text-body-text-2 text-2xl  font-medium laptop:text-[2rem] laptop:leading-[40px] ">
              You just received
              <br /> {formatCurrency(10000)}!
            </h2>
            <p className="text-body-text-2 text-[15px] lg:text-base leading-[21px] m-0">
              <span className="text-primary capitalize">
                Semira Yesufu&nbsp;
              </span>
              has sent you {formatCurrency(10000)}. via BluePay.
              <br /> How would you like to withdraw it?&nbsp;
            </p>
          </div>
          <form className="w-full space-y-6" onSubmit={submitHandler}>
            {items.map((item) => (
              <div
                key={item.id}
                className="relative h-[100px] w-full mx-auto mb-6"
              >
                <input
                  type="radio"
                  name={item.value}
                  value={item.value}
                  id={item.value}
                  checked={selected === item.value}
                  onChange={handleRadioChange}
                  className="w-full h-full relative  appearance-none checked:border-primary bg-input-field hover:border-primary border-transparent rounded border"
                />
                <label
                  htmlFor={item.value}
                  className="absolute w-full m-auto flex items-center justify-start gap-4 p-4 laptop-md:p-6 h-full top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
                >
                  {item.icon}
                  <div>
                    <h3 className="font-medium leading-[21px] m-0 lg:mb-1 text-[15px] text-txt">
                      {item.title}
                    </h3>
                    <p className="leading-[19px] text-[13.5px] m-0 laptop-md:text-[15px] text-txt2">
                      {item.desc}
                    </p>
                  </div>
                </label>
              </div>
            ))}
            <button
              type="submit"
              className="mx-auto !mt-10 disabled:text-gray-900 disabled:cursor-not-allowed bg-primary w-full rounded-lg disabled:bg-gray-200 disabled:border-none text-[0.9375rem] font-medium text-white p-4 leading-[21px]"
            >
              Proceed
            </button>
          </form>
        </section>
      )}
    </Fragment>
  );
};

export default NonBlueWithdrawal;
