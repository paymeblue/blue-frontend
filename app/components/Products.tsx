import { Segmented, Typography } from "antd";
import { useSectionRef } from "app/context/section-scroll-context";
import { Fragment, useEffect, useState } from "react";
import BusinessSegment from "./BusinessSegment";
import PersonalSection from "./PersonalSection";

const { Paragraph, Title } = Typography;

const OurProducts = () => {
  const { sectionRef, value } = useSectionRef();
  const [segment, setSegment] = useState(value);
  useEffect(() => {
    setSegment(value);
  }, [value]);
  return (
    <Fragment>
      <Typography ref={sectionRef} className="mt-12 text-center">
        <Title
          level={2}
          className="text-txt font-bold tracking-title text-[1.5rem] leading-[1.995rem] laptop:text-[38px]"
        >
          Our Products
        </Title>
        <Paragraph className="max-w-[37rem] w-full m-auto text-body-text-2 laptop:text-[1.125rem] text-[.9375rem] leading-[1.3125rem] laptop:leading-[1.6875rem]">
          Streamline your business operations with simplicity and efficiency
          with all-in-one business manager tools
        </Paragraph>
      </Typography>
      <Segmented
        options={[
          { label: "BLUEPERSONAL", value: "personal" },
          { label: "BLUEBUSINESS", value: "business" },
        ]}
        onChange={(value) => {
          setSegment(value);
        }}
        value={segment}
        className="border mt-6 mb-12 text-[.7206rem] leading-[1.0813rem] laptop:text-base"
      />
      {segment === "personal" ? <PersonalSection /> : <BusinessSegment />}
    </Fragment>
  );
};

export default OurProducts;
