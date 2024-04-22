import Image from "next/image";
import vector from "public/vector.png";
import Container from "./container";

type IProps = {
  title: string;
  subTitle: string;
};

const PageHead = ({ title, subTitle }: IProps) => {
  return (
    <section className="text-white relative bg-txt h-[321px]">
      <Container className="absolute max-w-[1440px] justify-center flex gap-8 flex-col my-0 top-1/2 -translate-y-1/2 translate-x-0">
        <div className="w-full">
          <h1 className="text-[35px] leading-[38px] lg:text-[45px] lg:leading-[47px] mb-2 font-bold lg:tracking-title">
            {title}
          </h1>
          <p className="text-base m-0 lg:leading-4 tracking-text">{subTitle}</p>
        </div>
      </Container>
      <Image
        src={vector}
        alt="blue branding"
        className="absolute right-0 lg:right-10 opacity-10 bottom-0 w-1/2 lg:w-[15%]"
      />
    </section>
  );
};

export default PageHead;
