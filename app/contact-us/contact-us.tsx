"use client";
import { CheckCircleOutlined } from "@ant-design/icons";
import countrycodes from "@lib/countryCodes";
import Container from "@shared/container";
import { Button, Form, Input, Select, Typography, message } from "antd";
import { Fragment, useState } from "react";

type State = {
  name: string;
  email: string;
  code: any;
  phoneNum: string;
  msg: string;
};
const { Item, useForm } = Form;
const { Option } = Select;
const { TextArea } = Input;

const { Title, Paragraph } = Typography;

const Contact = () => {
  const [form] = useForm();
  const selectBefore = () => {
    return (
      <Item name="code" noStyle>
        <Select style={{ width: 80 }}>
          {countrycodes.map((country) => (
            <Option value={country.code} key={country.flag}>
              {country.flag}
            </Option>
          ))}
        </Select>
      </Item>
    );
  };

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [messageApi, contextHolder] = message.useMessage();

  const onFinish = async (values: State): Promise<void> => {
    setIsLoading(true);
    console.log("Form data: ", values);
    await new Promise((resolve) => setTimeout(resolve, 2500)); // Simulating an asynchronous operation
    form.resetFields();
    setIsLoading(false);
    messageApi.open({
      content: `Subimssion successful!`,
      className: "[&>div]:bg-[#17B472] [&>div]:text-white",
      icon: <CheckCircleOutlined />,
    });
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
    messageApi.open({
      content: "Form submission failed!",
      className: "[&>div]:bg-red-800 [&>div]:text-white",
    });
  };
  return (
    <Fragment>
      <main className="mb-16 flex h-[320px] flex-col items-center justify-center bg-primary">
        {contextHolder}
        <Container className="text-center">
          <Paragraph className="mb-2 max-w-xl font-semibold text-body-text-1 laptop:text-[22px] laptop:leading-[133%]">
            Contact us
          </Paragraph>
          <Title
            level={1}
            className="m-0 font-bold text-white laptop:text-[40px]"
          >
            Get in touch
          </Title>
        </Container>
      </main>
      <Container className="">
        <Form
          form={form}
          name="contact_form"
          layout="vertical"
          className="m-auto max-w-lg"
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          initialValues={{
            code: "+234",
          }}
        >
          <Item
            name="firstName"
            label="First name"
            className="[&>div>div.ant-form-item-label>label]:flex-row-reverse [&>div>div.ant-form-item-label>label]:gap-1 [&>div>div.ant-form-item-label>label]:text-[12px] [&>div>div.ant-form-item-label>label]:font-semibold [&>div>div.ant-form-item-label>label]:leading-[15.12px] [&>div>div.ant-form-item-label>label]:laptop:text-[15px] [&>div>div.ant-form-item-label>label]:laptop:leading-[21px] [&>div>div.ant-form-item-label]:p-0 [&>div>div>div>div>.ant-form-item-explain-error]:mt-2 [&>div>div>div>div>.ant-form-item-explain-error]:text-[9.23px] [&>div>div>div>div>.ant-form-item-explain-error]:leading-[11.63px] laptop:[&>div>div>div>div>.ant-form-item-explain-error]:text-[11px] laptop:[&>div>div>div>div>.ant-form-item-explain-error]:leading-[13.86px]"
            rules={[
              { required: true, message: "Please enter your firstname!" },
              {
                min: 3,
                message: "Atleast 3 characters",
              },
            ]}
            hasFeedback
          >
            <Input
              placeholder="Enter your firstname"
              type="text"
              required
              className="rounded bg-input-field py-2 outline-none [&>input]:bg-inherit [&>input]:placeholder-[#555] placeholder:[&>input]:text-[12px] placeholder:[&>input]:font-medium placeholder:[&>input]:leading-[15.62px] laptop:placeholder:[&>input]:text-[15px] laptop:placeholder:[&>input]:leading-[21px]"
            />
          </Item>
          <Item
            name="surname"
            label="Surname"
            className="[&>div>div.ant-form-item-label>label]:flex-row-reverse [&>div>div.ant-form-item-label>label]:gap-1 [&>div>div.ant-form-item-label>label]:text-[12px] [&>div>div.ant-form-item-label>label]:font-semibold [&>div>div.ant-form-item-label>label]:leading-[15.12px] [&>div>div.ant-form-item-label>label]:laptop:text-[15px] [&>div>div.ant-form-item-label>label]:laptop:leading-[21px] [&>div>div.ant-form-item-label]:p-0 [&>div>div>div>div>.ant-form-item-explain-error]:mt-2 [&>div>div>div>div>.ant-form-item-explain-error]:text-[9.23px] [&>div>div>div>div>.ant-form-item-explain-error]:leading-[11.63px] laptop:[&>div>div>div>div>.ant-form-item-explain-error]:text-[11px] laptop:[&>div>div>div>div>.ant-form-item-explain-error]:leading-[13.86px]"
            rules={[
              { required: true, message: "Please enter your Surname!" },
              {
                min: 3,
                message: "Atleast 3 characters",
              },
            ]}
            hasFeedback
          >
            <Input
              placeholder="Yesufu"
              type="text"
              required
              className="rounded bg-input-field py-2 outline-none [&>input]:bg-inherit [&>input]:placeholder-[#555] placeholder:[&>input]:text-[12px] placeholder:[&>input]:font-medium placeholder:[&>input]:leading-[15.62px] laptop:placeholder:[&>input]:text-[15px] laptop:placeholder:[&>input]:leading-[21px]"
            />
          </Item>
          <Item
            name="email"
            label="Email address"
            className="[&>div>div.ant-form-item-label>label]:flex-row-reverse [&>div>div.ant-form-item-label>label]:gap-1 [&>div>div.ant-form-item-label>label]:text-[12px] [&>div>div.ant-form-item-label>label]:font-semibold [&>div>div.ant-form-item-label>label]:leading-[15.12px] [&>div>div.ant-form-item-label>label]:laptop:text-[15px] [&>div>div.ant-form-item-label>label]:laptop:leading-[21px] [&>div>div.ant-form-item-label]:p-0 [&>div>div>div>div>.ant-form-item-explain-error]:mt-2 [&>div>div>div>div>.ant-form-item-explain-error]:text-[9.23px] [&>div>div>div>div>.ant-form-item-explain-error]:leading-[11.63px] laptop:[&>div>div>div>div>.ant-form-item-explain-error]:text-[11px] laptop:[&>div>div>div>div>.ant-form-item-explain-error]:leading-[13.86px]"
            rules={[
              {
                type: "email",
                message: "Email is not valid!",
              },
              {
                required: true,
                message: "Please enter your email!",
              },
            ]}
            hasFeedback
          >
            <Input
              placeholder="ysemiraefe@gmail.com"
              type="email"
              required
              className="rounded bg-input-field py-2 outline-none [&>input]:bg-inherit [&>input]:placeholder-[#555] placeholder:[&>input]:text-[12px] placeholder:[&>input]:font-medium placeholder:[&>input]:leading-[15.62px] laptop:placeholder:[&>input]:text-[15px] laptop:placeholder:[&>input]:leading-[21px]"
            />
          </Item>
          <Item
            name="phone"
            className="[&>div>div.ant-form-item-label>label]:flex-row-reverse [&>div>div.ant-form-item-label>label]:gap-1 [&>div>div.ant-form-item-label>label]:text-[12px] [&>div>div.ant-form-item-label>label]:font-semibold [&>div>div.ant-form-item-label>label]:leading-[15.12px] [&>div>div.ant-form-item-label>label]:laptop:text-[15px] [&>div>div.ant-form-item-label>label]:laptop:leading-[21px] [&>div>div.ant-form-item-label]:p-0 [&>div>div>div>div>.ant-form-item-explain-error]:mt-2 [&>div>div>div>div>.ant-form-item-explain-error]:text-[9.23px] [&>div>div>div>div>.ant-form-item-explain-error]:leading-[11.63px] laptop:[&>div>div>div>div>.ant-form-item-explain-error]:text-[11px] laptop:[&>div>div>div>div>.ant-form-item-explain-error]:leading-[13.86px]"
            label="Phone number"
            rules={[
              {
                required: true,
                message: "Please enter your phone number!",
              },
              {
                min: 11,
                message: "A minimum of 11 digits",
              },
              {
                max: 14,
                message: "Phone number should not exceed 14 digits",
              },
            ]}
            hasFeedback
          >
            <Input
              addonBefore={selectBefore()}
              type="tel"
              required
              className="bg-input-field [&>span>.ant-input-affix-wrapper]:bg-input-field [&>span>input]:rounded-r [&>span>input]:border-none [&>span>input]:py-2 [&>span>input]:outline-none [&>span>span>div>div.ant-select-selector]:border-none [&>span>span>input]:bg-inherit placeholder:[&>span>span>input]:text-[12px] placeholder:[&>span>span>input]:font-medium placeholder:[&>span>span>input]:leading-[15.62px] placeholder:[&>span>span>input]:text-[#555] laptop:placeholder:[&>span>span>input]:text-[14px] laptop:placeholder:[&>span>span>input]:leading-[17.64px] [&>span>span]:bg-[#d9d9d9] [&>span>span]:py-2"
              placeholder="Enter your phone number"
            />
          </Item>
          <Item
            name="msg"
            className="[&>div>div.ant-form-item-label>label]:flex-row-reverse [&>div>div.ant-form-item-label>label]:gap-1 [&>div>div.ant-form-item-label>label]:text-[12px] [&>div>div.ant-form-item-label>label]:font-semibold [&>div>div.ant-form-item-label>label]:leading-[15.12px] [&>div>div.ant-form-item-label>label]:laptop:text-[15px] [&>div>div.ant-form-item-label>label]:laptop:leading-[21px] [&>div>div.ant-form-item-label]:p-0 [&>div>div>div>div>.ant-form-item-explain-error]:mt-2 [&>div>div>div>div>.ant-form-item-explain-error]:text-[9.23px] [&>div>div>div>div>.ant-form-item-explain-error]:leading-[11.63px] laptop:[&>div>div>div>div>.ant-form-item-explain-error]:text-[11px] laptop:[&>div>div>div>div>.ant-form-item-explain-error]:leading-[13.86px]"
            label="Message"
          >
            <TextArea
              style={{ height: 120, resize: "none" }}
              className="rounded bg-input-field outline-none"
            />
          </Item>
          <Item>
            <Button
              type="primary"
              htmlType="submit"
              className="mx-auto mt-6 flex items-center justify-center font-semibold text-white laptop:p-6 laptop:text-[16px] laptop:leading-[24px] "
              loading={isLoading}
              block
            >
              {isLoading ? "Submitting..." : "Submit message"}
            </Button>
          </Item>
        </Form>
      </Container>
    </Fragment>
  );
};

export default Contact;
