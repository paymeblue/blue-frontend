"use client";
import Container from "@shared/container";
import { Typography } from "antd";
import { ChangeEvent, useState } from "react";
import CloseIcon from "./assets/svg/close";

const { Title } = Typography;

const ReceiveMoney = () => {
  const [selected, setSelected] = useState("send");
  const handleRadioChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSelected(e.target.value);
  };
  console.log(selected);
  return (
    <Container className="mt-20">
      <button>
        <CloseIcon className="w-12 h-12" />
      </button>
      <div className="flex flex-col items-center justify-between">
        <div className="max-w-2xl mx-auto mt-20 text-center mb-10">
          <Title
            level={2}
            className="text-[#232949] font-semibold text-4xl leading-[2.9925rem]"
          >
            You just received ₦50,000.00!&nbsp;
          </Title>
          <div className="text-body-text-2 max-w-[500px] mx-auto leading-9 text-[1.375rem] font-medium">
            <p className="text-primary font-semibold inline">
              Semira Yesufu&nbsp;
            </p>
            has sent you&nbsp;
            <strong className="text-primary">₦50,000.00&nbsp;</strong>
            How would you like to withdraw it?
          </div>
        </div>
        <form>
          <div className="relative h-[100px] w-[450px] mb-6">
            <input
              type="radio"
              name="send"
              value="send"
              id="send"
              checked={selected === "send"}
              onChange={handleRadioChange}
              className="w-full h-full relative appearance-none checked:border-primary bg-input-field hover:border-primary border-transparent rounded border"
            />
            <label
              htmlFor="send"
              className="absolute w-full p-4 h-full top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
            >
              Lorem ipsum dolor sit amet Lorem ipsum dolor sit amet consectetur
              adipisicing elit. Perferendis illum consectetur sed dicta, libero,
              et laborum repudiandae
            </label>
          </div>
          <div className="relative h-[100px] w-[450px] mb-6">
            <input
              type="radio"
              name="signup"
              value="signup"
              id="signup"
              checked={selected === "signup"}
              onChange={handleRadioChange}
              className="w-full h-full relative appearance-none checked:border-primary bg-input-field hover:border-primary border-transparent rounded border"
            />
            <label
              htmlFor="signup"
              className="absolute w-full p-4 h-full top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
            >
              Lorem ipsum dolor sit amet Lorem ipsum dolor sit amet consectetur
              adipisicing elit. Perferendis illum consectetur sed dicta, libero,
              et laborum repudiandae
            </label>
          </div>
        </form>
      </div>
    </Container>
  );
};

export default ReceiveMoney;
