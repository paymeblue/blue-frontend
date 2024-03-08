import { Segmented, Typography } from "antd";
import { useSearchParams } from "next/navigation";
import { Fragment, useEffect, useState } from "react";
import BusinessSegment from "./BusinessSegment";
import PersonalSection from "./PersonalSection";

const { Paragraph, Title } = Typography;

const OurProducts = () => {
  const [segment, setSegment] = useState("personal");
  const searchParam = useSearchParams();
  console.log(searchParam.get("hash"), segment);
  useEffect(() => {
    if (searchParam.get("hash") === "personal") {
      setSegment("personal");
    } else if (searchParam.get("hash") === "business") {
      setSegment("business");
    }
  }, [searchParam]);
  return (
    <Fragment>
      <Typography className="mt-12 text-center">
        <Title
          level={2}
          className="text-txt font-bold tracking-[-2%] text-[38px]"
        >
          Our Products
        </Title>
        <Paragraph className="max-w-[37rem] w-full m-auto text-body-text-2 text-[1.125rem] leading-[1.6875rem]">
          Streamline your business operations with simplicity and efficiency
          with all-in-one business manager tools
        </Paragraph>
      </Typography>
      <Segmented
        id="product"
        options={[
          { label: "BLUEPERSONAL", value: "personal" },
          { label: "BLUEBUSINESS", value: "business" },
        ]}
        onChange={(value) => {
          console.log(value);
          setSegment(value);
        }}
        defaultValue={segment}
        className="border my-8"
      />
      {segment === "personal" ? <PersonalSection /> : <BusinessSegment />}
    </Fragment>
  );
};

export default OurProducts;
