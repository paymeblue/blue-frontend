"use client";
import { formatCurrency } from "@lib/index";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import bank from "public/bank.png";
import blue from "public/blue.png";
import { ChangeEvent, FormEvent, Fragment, useState } from "react";
import SelectBank from "./SelectBank";
import Success from "./Success";

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
  const step = searchParams.get("step");

  const handleRadioChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSelected(e.target.value);
  };
  const submitHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (selected === "send") {
      router.replace("?step=select-bank");
    } else if (selected === "signup") {
      router.replace("/");
    }
  };

  return (
    <Fragment>
      {step === "success" && <Success />}
      <section className="max-w-[470px] p-6 w-full m-auto">
        {!step && (
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
        )}
        {step === "select-bank" && (
          <div className="w-full flex flex-col gap-2 md:gap-4 mt-20 mb-8 mx-auto text-center">
            <Image
              src={blue}
              alt="blue"
              width={70}
              height={70}
              priority
              className="w-[70px] h-[70px] m-auto object-contain"
            />
            <p className="text-body-text-2 text-[15px] lg:text-base leading-[21px] m-0">
              <span className="text-primary capitalize">
                Semira Yesufu&nbsp;
              </span>
              has sent you {formatCurrency(10000)}. via BluePay.
              <br /> Enter your bank account details below to withdraw the
              funds&nbsp;
            </p>
          </div>
        )}
        {!step && (
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
        )}

        {step === "select-bank" && <SelectBank />}
      </section>
    </Fragment>
  );
};

export default NonBlueWithdrawal;
