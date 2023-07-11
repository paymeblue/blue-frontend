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
        <Paragraph className="mb-2 text-[0.9375rem] font-normal leading-normal text-body-text-1 laptop:text-[1.3125rem] laptop:font-semibold laptop:leading-[133%]">
          {subText}
        </Paragraph>
        <Title
          level={1}
          className="m-0 text-[1.3rem] font-semibold leading-[133%] text-white laptop:text-[2.3rem] laptop:font-bold laptop:leading-normal"
        >
          {mainText}
        </Title>
      </Container>
    </main>
  );
};

export default PageHead;
