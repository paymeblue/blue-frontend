import { sleep } from "@lib/index";
import { Button, Typography } from "antd";
import Image from "next/image";
import { useRouter } from "next/navigation";
import success from "public/success.png";
import { Fragment } from "react";
import generatePDF from "react-to-pdf";

const { Title, Paragraph } = Typography;

const Success = ({ refElem }: { refElem: any }) => {
  const router = useRouter();

  const handleClick = async () => {
    router.push("?step=receipt");
    await sleep(2000);
    if (refElem.current) {
      generatePDF(refElem, {
        filename: `receipt-${Date.now()}.pdf`,
      });
    }
    await sleep(2000);
    router.back();
  };
  return (
    <Fragment>
      <div className="flex flex-col text-center items-center max-w-md mx-auto justify-center gap-4">
        <div className="mb-6 laptop:mb-10 mt-8 laptop:mt-20">
          <Image
            src={success}
            alt="success icon"
            className="object-contain w-1/2 laptop:w-3/4 mx-auto"
          />
        </div>
        <div>
          <Title
            level={5}
            className="laptop:leading-[2.74313rem] leading-[1.82875rem] text-[1.375rem] laptop:tracking-[-0.02063rem] font-semibold laptop:text-[2.0625rem]"
          >
            Transfer Successful!
          </Title>
          <Paragraph className="tracking-[-0.025rem] max-w-xs mx-auto text-base leading-6 laptop:leading-[2.00244rem] text-txt2 font-medium laptop:text-xl">
            You sent&nbsp;
            <strong className="font-semibold text-txt">₦50,000.00</strong>
            &nbsp;to 2210123339
            <br />
            (Semira Yesufu)
          </Paragraph>
        </div>
        <div className="flex items-center w-full flex-col justify-center">
          <Button
            type="primary"
            size="large"
            block
            onClick={handleClick}
            className="laptop mx-auto mt-6 flex items-center justify-center disabled:text-gray-900 disabled:bg-gray-200 disabled:border-none text-[0.9375rem] font-medium leading-[1.
            39663rem] text-white laptop:p-6 laptop:text-[1rem] laptop:leading-[1.5rem] "
          >
            Download Receipt
          </Button>

          <Button
            onClick={() => router.push("?step=empty")}
            className="laptop mx-auto mt-6 flex items-center justify-center hover:bg-white/80 text-[0.9375rem] font-medium leading-[1.
            39663rem] laptop:p-6 laptop:text-[1rem] border-primary text-primary laptop:leading-[1.5rem]"
            block
            size="large"
          >
            Done
          </Button>
        </div>
      </div>
    </Fragment>
  );
};

export default Success;
