import Container from "@shared/container";
import Image from "next/image";
import heroBg from "public/businessHeroBg.jpg";
import img7 from "public/img-7.png";
import img8 from "public/img-8.png";
import img9 from "public/img-9.png";
import HeroSection from "./heroSection";

const Business = () => {
  return (
    <div>
      <HeroSection
        title="Streamline your financial operations effortlessly"
        subTitle="Seamlessly manage incoming payments and track your finances with Blue's all-in-one business manager tools, ensuring efficiency and simplicity for your business operations."
        heroBg={heroBg}
        hasTag
        tag="Discover BlueBusiness"
        imgClassName="h-[720px]"
        className="max-w-[1045px]"
      />
      <Container className="py-8 lg:py-16 max-w-[1400px]">
        <div className="bg-purple flex flex-col lg:flex-row mb-12 items- justify-between p-5 lg:p-20 lg:pb-0 pb-0 gap-8 rounded-3xl">
          <div className="w-full mt-5 lg:mt-20 max-w-[650px]">
            <h4 className="tracking-title text-[30px] leading-[35px] lg:text-[38px] font-bold m-0 lg:leading-[47px]">
              Boost your business sales with
              <i className="font-fraunces text-primary">
                {" "}
                data driven insights &nbsp;
              </i>
            </h4>
            <p className="text-base leading-[25px] tracking-text mt-3 lg:text-lg text-txt">
              Enhance your revenue-generating strategies with clear
              visualisations tracking your sales and expenses.
            </p>
          </div>
          <div>
            <Image
              src={img7}
              alt="img 7"
              width={449}
              height={455}
              className="object-contain m-auto w-auto"
              priority
            />
          </div>
        </div>
        <div className="flex flex-col lg:flex-row items-center justify-center w-full gap-12 laptop-mdgap-8">
          <div className="bg-primary text-white w-full flex flex-col rounded-3xl gap-6 justify-between p-5 lg:p-12 lg:pb-0 h-auto lg:h-[758px] pb-0">
            <div className="w-full m-auto mt-5 lg:m-auto">
              <h4 className="tracking-title text-[30px] leading-[35px] lg:text-[38px] font-bold m-0 lg:leading-[47px]">
                Add and&nbsp;
                <span className="font-fraunces inline italic">
                  manage your team&nbsp;
                </span>
                <br />
                seamlessly
              </h4>
              <p className="text-base leading-[25px] tracking-text mt-3 lg:text-lg">
                Easily add and manage your team members as an admin, overseeing
                their operations to ensure accountability.
              </p>
            </div>
            <div>
              <Image
                src={img8}
                alt="img 8"
                width={332}
                height={251}
                className="object-contain m-auto w-[90%] md:w-1/2 laptop-md:w-[revert-layer]"
                priority
              />
            </div>
          </div>
          <div className="bg-txt text-white flex flex-col rounded-3xl gap-6 w-full justify-between h-auto lg:h-[758px] lg:p-4 pb-0 lg:pb-0">
            <div className="w-full m-auto mt-5 lg:m-auto max-w-[650px] px-5 lg:px-6 pt-8 lg:pt-0 pb-0">
              <h4 className="tracking-title text-[30px] leading-[35px] lg:text-[38px] font-bold m-0 lg:leading-[47px]">
                <i className="font-fraunces">
                  &nbsp;Integrate BlueBusiness&nbsp;
                </i>
                with your Point-of-Sale system
              </h4>
              <p className="text-base leading-[25px] tracking-text mt-3 lg:text-lg">
                BlueBusiness Desktop allows for seamless integration into your
                Point of Sale system, facilitating swift customer payments via
                barcode scan.
              </p>
            </div>
            <div>
              <Image
                src={img9}
                alt="img 9"
                width={566}
                height={408}
                className="object-contain m-auto w-[90%] lg:w-auto lg:rounded-sm"
                priority
              />
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Business;
