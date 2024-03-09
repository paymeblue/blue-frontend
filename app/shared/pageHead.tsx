import { Typography } from "antd";
import Container from "./container";

const { Title, Paragraph } = Typography;
type IProps = {
  mainText: string;
  subText?: string;
};

const PageHead = ({ mainText, subText }: IProps) => {
  return (
    <main className="mb-16 flex h-[320px] flex-col items-center justify-center bg-primary">
      <Container className="text-center">
        <Paragraph className="mb-2 text-[0.9375rem] text-body-text-1/75 laptop:text-[1.5rem] laptop:tracking-[-1%] leading-[2.25rem]">
          {subText}
        </Paragraph>
        <Title
          level={1}
          className="m-0 text-[1.3rem] font-medium tracking-[-1%] text-white laptop:text-[40px] laptop:leading-[54px]"
        >
          {mainText}
        </Title>
      </Container>
    </main>
  );
};

export default PageHead;
