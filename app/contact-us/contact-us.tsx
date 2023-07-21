"use client";
import { CheckCircleOutlined } from "@ant-design/icons";
import useFunctions from "@hooks/useFunctions";
import countrycodes from "@lib/countryCodes";
import Container from "@shared/container";
import PageHead from "@shared/pageHead";
import { Button, Form, Input, Select, message } from "antd";
import type { FormInstance } from "antd/es/form";
import { Fragment, useRef, useState } from "react";

type State = {
  code: string;
  firstName: string;
  surname: string;
  email: string;
  phone: string;
  msg: string;
};
const { Item, useForm } = Form;
const { Option } = Select;
const { TextArea } = Input;

const Contact = ({ url }: { url: string }) => {
  const [form] = useForm();
  const formRef = useRef<FormInstance>(null);

  const onCodeChange = (value: string) => {
    formRef.current?.setFieldsValue({ phone: value });
  };
  const selectBefore = () => {
    return (
      <Item name="code" noStyle>
        <Select
          className="-mx-[10px] w-20 rounded bg-white"
          onChange={onCodeChange}
        >
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
  const { capitalizeFirstLetter } = useFunctions();
  const onFinish = async (values: State): Promise<void> => {
    setIsLoading(true);
    const { firstName, surname, email, phone, msg } = values;
    const rawName = `${firstName} ${surname}`;
    const name = capitalizeFirstLetter(rawName);
    const data = {
      name,
      email,
      phone,
      message: msg,
    };
    try {
      const res = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(data),
      });
      const result = await res.json();
      if (!res.ok) {
        throw new Error(result.message);
      }
      form.resetFields();
      messageApi.open({
        content: result.message,
        className: "[&>div]:bg-[#17B472] [&>div]:text-white",
        icon: <CheckCircleOutlined />,
      });
    } catch (error: any) {
      messageApi.open({
        content: error.toString(),
        className: "[&>div]:bg-red-800 [&>div]:text-white",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const onFinishFailed = (errorInfo: any) => {
    messageApi.open({
      content: "Please fill all input field!",
      className: "[&>div]:bg-red-800 [&>div]:text-white",
    });
  };
  return (
    <Fragment>
      {contextHolder}
      <PageHead mainText="Get in touch" subText="Contact us" />
      <Container className="">
        <Form
          form={form}
          ref={formRef}
          name="contact_form"
          layout="vertical"
          className="m-auto max-w-lg"
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          initialValues={{
            code: "+234",
            phone: "+234",
          }}
        >
          <Item
            name="firstName"
            label="First name"
            className="[&>div>div.ant-form-item-label>label]:flex-row-reverse [&>div>div.ant-form-item-label>label]:gap-1 [&>div>div.ant-form-item-label>label]:text-[0.9375rem] [&>div>div.ant-form-item-label>label]:font-semibold [&>div>div.ant-form-item-label>label]:leading-[1.3125rem] [&>div>div.ant-form-item-label]:p-0 [&>div>div>div>div>.ant-form-item-explain-error]:mt-2 [&>div>div>div>div>.ant-form-item-explain-error]:text-[9.23px] [&>div>div>div>div>.ant-form-item-explain-error]:leading-[11.63px] laptop:[&>div>div>div>div>.ant-form-item-explain-error]:text-[11px] laptop:[&>div>div>div>div>.ant-form-item-explain-error]:leading-[13.86px]"
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
              className="rounded border-2 bg-input-field py-2 capitalize outline-none [&>input]:bg-inherit [&>input]:placeholder-[#555] placeholder:[&>input]:text-[0.9375rem] placeholder:[&>input]:font-medium placeholder:[&>input]:leading-[1.3125rem]"
            />
          </Item>
          <Item
            name="surname"
            label="Surname"
            className="[&>div>div.ant-form-item-label>label]:flex-row-reverse [&>div>div.ant-form-item-label>label]:gap-1 [&>div>div.ant-form-item-label>label]:text-[0.9375rem] [&>div>div.ant-form-item-label>label]:font-semibold [&>div>div.ant-form-item-label>label]:leading-[1.3125rem] [&>div>div.ant-form-item-label]:p-0 [&>div>div>div>div>.ant-form-item-explain-error]:mt-2 [&>div>div>div>div>.ant-form-item-explain-error]:text-[9.23px] [&>div>div>div>div>.ant-form-item-explain-error]:leading-[11.63px] laptop:[&>div>div>div>div>.ant-form-item-explain-error]:text-[11px] laptop:[&>div>div>div>div>.ant-form-item-explain-error]:leading-[13.86px]"
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
              className="rounded border-2 bg-input-field py-2 outline-none [&>input]:bg-inherit [&>input]:placeholder-[#555] placeholder:[&>input]:text-[0.9375rem] placeholder:[&>input]:font-medium placeholder:[&>input]:leading-[1.3125rem]"
            />
          </Item>
          <Item
            name="email"
            label="Email address"
            className="[&>div>div.ant-form-item-label>label]:flex-row-reverse [&>div>div.ant-form-item-label>label]:gap-1 [&>div>div.ant-form-item-label>label]:text-[0.9375rem] [&>div>div.ant-form-item-label>label]:font-semibold [&>div>div.ant-form-item-label>label]:leading-[1.3125rem] [&>div>div.ant-form-item-label]:p-0 [&>div>div>div>div>.ant-form-item-explain-error]:mt-2 [&>div>div>div>div>.ant-form-item-explain-error]:text-[9.23px] [&>div>div>div>div>.ant-form-item-explain-error]:leading-[11.63px] laptop:[&>div>div>div>div>.ant-form-item-explain-error]:text-[11px] laptop:[&>div>div>div>div>.ant-form-item-explain-error]:leading-[13.86px]"
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
              className="rounded border-2 bg-input-field py-2 outline-none [&>input]:bg-inherit [&>input]:placeholder-[#555] placeholder:[&>input]:text-[0.9375rem] placeholder:[&>input]:font-medium placeholder:[&>input]:leading-[1.3125rem]"
            />
          </Item>
          <Item
            name="phone"
            className="[&>div>div.ant-form-item-label>label]:flex-row-reverse [&>div>div.ant-form-item-label>label]:gap-1 [&>div>div.ant-form-item-label>label]:text-[0.9375rem] [&>div>div.ant-form-item-label>label]:font-semibold [&>div>div.ant-form-item-label>label]:leading-[1.3125rem] [&>div>div.ant-form-item-label]:p-0 [&>div>div>div>div>.ant-form-item-explain-error]:mt-2 [&>div>div>div>div>.ant-form-item-explain-error]:text-[9.23px] [&>div>div>div>div>.ant-form-item-explain-error]:leading-[11.63px] laptop:[&>div>div>div>div>.ant-form-item-explain-error]:text-[11px] laptop:[&>div>div>div>div>.ant-form-item-explain-error]:leading-[13.86px]"
            label="Phone number"
            rules={[
              {
                required: true,
                message: "Please enter your phone number!",
              },
            ]}
          >
            <Input
              addonBefore={selectBefore()}
              type="tel"
              required
              className="rounded border-2 border-transparent bg-input-field [&>span>.ant-input-affix-wrapper]:bg-input-field [&>span>input]:rounded-r [&>span>input]:border-none [&>span>input]:py-2 [&>span>input]:outline-none [&>span>span>div>div.ant-select-selector]:rounded-e [&>span>span>div>div.ant-select-selector]:border-none [&>span>span>input]:bg-inherit placeholder:[&>span>span>input]:text-[0.9375rem] placeholder:[&>span>span>input]:font-medium placeholder:[&>span>span>input]:leading-[1.3125rem] placeholder:[&>span>span>input]:text-[#555] [&>span>span]:py-2"
              placeholder="Enter your phone number"
            />
          </Item>
          <Item
            name="msg"
            className="[&>div>div.ant-form-item-label>label]:flex-row-reverse [&>div>div.ant-form-item-label>label]:gap-1 [&>div>div.ant-form-item-label>label]:text-[0.9375rem] [&>div>div.ant-form-item-label>label]:font-semibold [&>div>div.ant-form-item-label>label]:leading-[1.3125rem] [&>div>div.ant-form-item-label]:p-0 [&>div>div>div>div>.ant-form-item-explain-error]:mt-2 [&>div>div>div>div>.ant-form-item-explain-error]:text-[9.23px] [&>div>div>div>div>.ant-form-item-explain-error]:leading-[11.63px] laptop:[&>div>div>div>div>.ant-form-item-explain-error]:text-[11px] laptop:[&>div>div>div>div>.ant-form-item-explain-error]:leading-[13.86px]"
            label="Message"
            rules={[
              {
                required: true,
                message: "Please enter your message!",
              },
            ]}
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
              className="laptopfont-semibold mx-auto mt-6 flex items-center justify-center text-[0.9375rem] font-medium leading-[1.39663rem] text-white laptop:p-6 laptop:text-[1rem] laptop:leading-[1.5rem] "
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
