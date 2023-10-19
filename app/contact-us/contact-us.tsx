"use client";
import { CheckCircleOutlined } from "@ant-design/icons";
import { Input } from "@components/FormInput";
import { DevTool } from "@hookform/devtools";
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
    surname: "",
    email: "",
    code: "+234",
    number: "+234",
    message: "",
  };
  const { formState, handleSubmit, register, setValue, control, reset } =
    useForm({
      mode: "onTouched",
      defaultValues,
      resolver: zodResolver(schema),
    });
  const { errors, isSubmitting, isDirty, isValid, isSubmitted } = formState;

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
      <PageHead mainText="Get in touch" subText="Contact us" />
      <Container>
        <form
          autoComplete="off"
          onSubmit={handleSubmit(onSubmit)}
          noValidate
          className="max-w-lg mx-auto"
        >
          <Input
            inputProps={{
              label: "First name",
              name: "firstname",
              id: "firstname",
              placeholder: "Enter your firstname",
              type: "text",
              register: { ...register("firstname") },
              error: errors.firstname?.message,
            }}
          />
          <Input
            inputProps={{
              label: "Surname",
              name: "surname",
              id: "surname",
              placeholder: "Yesufu",
              type: "text",
              register: { ...register("surname") },
              error: errors.surname?.message,
            }}
          />
          <Input
            inputProps={{
              label: "Email Address",
              name: "email",
              id: "email",
              placeholder: "ysemiraefe@gmail.com",
              type: "email",
              register: { ...register("email") },
              error: errors.email?.message,
            }}
          />
          <div className="flex flex-col items-start mb-6 justify-start w-full">
            <label
              htmlFor="message"
              className="text-[0.9375rem] ms-4 mb-[2px] w-full font-semibold leading-[1.3125rem]"
            >
              Phone number
              <span className="text-[#ff4d4f] font-normal text-[1.125rem] font-sans ms-1">
                *
              </span>
            </label>
            <Fragment>
              <div className="bg-input-field items-center w-full rounded flex gap-1">
                <select
                  className="w-16 ms-4 py-1 px-3 rounded outline-primary bg-white"
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
                  id="message"
                  placeholder="Enter your phone number"
                  type="tel"
                  {...register("number")}
                  className="rounded w-full bg-input-field py-2 px-4 outline-primary placeholder:text-[#555] placeholder:text-sm placeholder:font-light placeholder:leading-[1.3125rem]"
                />
              </div>
              {errors.number && (
                <small className="text-[#b22222e6] text-xs tablet:text-sm mt-1 tablet:mt-2 text-start">
                  {errors.number?.message}
                </small>
              )}
            </Fragment>
          </div>
          <Input
            inputProps={{
              label: "Message",
              name: "message",
              id: "message",
              placeholder: "",
              type: "text",
              register: { ...register("message") },
              error: errors.message?.message,
            }}
          />
          <div
            className="cf-turnstile"
            data-sitekey="0x4AAAAAAAL2hsshtDAYjQxx"
            data-theme="light"
            data-retry-interval={3000}
          />
          <Button
            type="primary"
            htmlType="submit"
            className="laptopfont-semibold mx-auto mt-6 flex items-center justify-center disabled:text-gray-900 disabled:bg-gray-200 disabled:border-none text-[0.9375rem] font-medium leading-[1.39663rem] text-white laptop:p-6 laptop:text-[1rem] laptop:leading-[1.5rem] "
            loading={isSubmitting}
            disabled={!isValid || !isDirty || isSubmitting}
            block
          >
            {isSubmitting ? "Sending..." : "Submit message"}
          </Button>
          <DevTool control={control} />
        </form>
      </Container>
    </Fragment>
  );
};

export default Contact;
