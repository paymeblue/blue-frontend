"use client";
import { CheckCircleOutlined } from "@ant-design/icons";
import { Input } from "@components/FormInput";
import { zodResolver } from "@hookform/resolvers/zod";
import countrycodes from "@lib/countryCodes";
import { TSchema, schema } from "@lib/index";
import Container from "@shared/container";
import PageHead from "@shared/pageHead";
import { Button, message } from "antd";
import { Fragment, useEffect } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

const Contact = () => {
  const defaultValues = {
    firstname: "",
    lastname: "",
    email: "",
    code: "+234",
    number: "+234",
    message: "",
  };
  const { formState, handleSubmit, register, setValue, reset } = useForm({
    mode: "onBlur",
    defaultValues,
    resolver: zodResolver(schema),
  });
  const { errors, isSubmitting, isSubmitted } = formState;

  const [messageApi, contextHolder] = message.useMessage();
  useEffect(() => {
    if (isSubmitted) reset();
  }, [isSubmitted, reset]);

  const onSubmit: SubmitHandler<TSchema> = async (_, e): Promise<void> => {
    const formData = new FormData(e?.target);

    try {
      const res = await fetch("/api/contact-us", {
        method: "POST",
        body: formData,
      });
      const result = await res.json();
      if (!res.ok) {
        throw new Error(result.message ? result.message : result);
      }
      messageApi.open({
        content: result.message,
        className: "[&>div]:bg-[#17B472] [&>div]:text-white",
        icon: <CheckCircleOutlined />,
      });
    } catch (error: any) {
      messageApi.open({
        content: `${error}`,
        className: "[&>div]:bg-red-800 [&>div]:text-white",
      });
    }
  };

  return (
    <Fragment>
      {contextHolder}
      <PageHead
        title="We're here to help."
        subTitle="Got questions, feedback, or need assistance? We're here to help! Feel free to reach out to our dedicated support team via the contact form below."
      />
      <Container className="my-12 lg:mt-16 lg:mb-20">
        <form
          autoComplete="off"
          onSubmit={handleSubmit(onSubmit)}
          noValidate
          className="max-w-4xl mx-auto space-y-4 lg:space-y-6 grid"
        >
          <div className="flex flex-col lg:flex-row gap-4 lg:gap-6">
            <Input
              inputProps={{
                label: "First name",
                name: "firstname",
                id: "firstname",
                placeholder: "Enter your first name",
                type: "text",
                register: { ...register("firstname") },
                error: errors.firstname?.message,
              }}
            />
            <Input
              inputProps={{
                label: "Last name",
                name: "lastname",
                id: "lastname",
                placeholder: "Enter your last name",
                type: "text",
                register: { ...register("lastname") },
                error: errors.lastname?.message,
              }}
            />
          </div>
          <div className="flex flex-col lg:flex-row gap-4 lg:gap-6">
            <div className="flex flex-col items-start justify-start w-full">
              <label
                htmlFor="number"
                className="text-[0.9375rem] mb-[2px] font-medium w-full leading-[1.3125rem]"
              >
                Phone number
              </label>
              <Fragment>
                <div className="bg-input-field items-center p-0.5 h-[51px] outline-0 border-[0.5px] border-transparent hover:border-primary w-full rounded flex">
                  <select
                    className="w-16 py-1 px-3 h-8 rounded cursor-pointer ml-1 border-none outline-none bg-white"
                    {...register("code", {
                      onChange: (e) => {
                        setValue("number", e.target.value);
                      },
                    })}
                  >
                    {countrycodes.map((country) => (
                      <option value={country.code} key={country.flag}>
                        {country.flag}
                      </option>
                    ))}
                  </select>
                  <input
                    id="number"
                    placeholder="Enter your phone number"
                    type="tel"
                    {...register("number")}
                    className="rounded w-full bg-input-field border-none py-2 px-4 outline-none placeholder:text-[#555] placeholder:text-sm placeholder:font-light placeholder:leading-[1.3125rem]"
                  />
                </div>
                {errors.number && (
                  <small className="text-[red]/80 text-xs tablet:text-[13px] mt-1 tablet:mt-1.5 text-start">
                    {errors.number?.message}
                  </small>
                )}
              </Fragment>
            </div>
            <Input
              inputProps={{
                label: "Email address",
                name: "email",
                id: "email",
                placeholder: "Enter your email address",
                type: "email",
                register: { ...register("email") },
                error: errors.email?.message,
              }}
            />
          </div>
          <Input
            inputProps={{
              label: "Message",
              name: "message",
              id: "message",
              placeholder: "Leave us a message...",
              type: "text",
              register: { ...register("message") },
              error: errors.message?.message,
            }}
          />
          <div
            className="cf-turnstile hidden"
            data-sitekey="0x4AAAAAAAL2hsshtDAYjQxx"
            data-theme="light"
            data-retry-interval={3000}
          />
          <Button
            type="primary"
            htmlType="submit"
            className="text-sm leading-[14px] !tracking-text font-medium w-auto rounded-lg p-4 flex items-center justify-center justify-self-end"
            loading={isSubmitting}
            disabled={isSubmitting}
            size="large"
          >
            {isSubmitting ? "Sending..." : "Submit"}
          </Button>
        </form>
      </Container>
    </Fragment>
  );
};

export default Contact;
