"use client";
import { ChevronDown } from "@components/assets/icons";
import { Input } from "@components/FormInput";
import { zodResolver } from "@hookform/resolvers/zod";
import { PilotSchema } from "@lib/index";
import Container from "@shared/container";
import PageHead from "@shared/pageHead";
import { Button, Checkbox, Typography, message } from "antd";
import Image from "next/image";
import { Fragment } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import countrycodes from "@lib/countryCodes";
import { z } from "zod";
import { CheckCircleOutlined } from "@ant-design/icons";

const { Title, Paragraph, Text } = Typography;

const Pilot = () => {
  const { formState, handleSubmit, register, reset, setValue, watch } = useForm<
    z.infer<typeof PilotSchema>
  >({
    mode: "onBlur",
    resolver: zodResolver(PilotSchema),
    defaultValues: {
      email: "",
      firstname: "",
      lastname: "",
      number: "",
      platform: "",
      code: "+234",
    },
  });

  const { errors, isSubmitting } = formState;

  const [messageApi, contextHolder] = message.useMessage();

  const onSubmit: SubmitHandler<z.infer<typeof PilotSchema>> = async (
    data,
    e
  ): Promise<void> => {
    const formData = new FormData(e?.target);

    try {
      const res = await fetch("/api/pilot-testers", {
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
      reset();
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
        title="Sign up for our pilot tests"
        subTitle="Join our list of pilot testers for the Blue app and get early access to our innovative features and exclusive updates."
      />

      <Container className="py-6 laptop:my-20">
        <form autoComplete="off" onSubmit={handleSubmit(onSubmit)} noValidate>
          <div className="flex-1 flex items-center justify-between">
            <div className="hidden lg:flex flex-col items-center gap-4">
              <Image
                src="/pilot-image.png"
                alt="Pilot image"
                width={400}
                height={380}
              />
              <Paragraph className="text-center w-[350px]">
                Secure Payments: With integrated, secure payment solutions, Blue
                ensures safe and easy bill payments, transfers, and online
                purchases.
              </Paragraph>
            </div>

            <div className="flex flex-col w-full lg:w-[50%]">
              <Title level={4}>
                Be among the first to experience seamless payments with Blue!
              </Title>
              <Paragraph>
                Whether you're sending money to friends, receiving money, paying
                bills, or making purchases, Blue empowers you to do it all on
                the go.
              </Paragraph>

              <div className="w-full grid grid-cols-1 lg:grid-cols-2 mt-6 gap-x-4 gap-y-6">
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
                    name: "lastName",
                    id: "lastName",
                    placeholder: "Enter your last name",
                    type: "text",
                    register: { ...register("lastname") },
                    error: errors.lastname?.message,
                  }}
                />
                <Input
                  inputProps={{
                    label: "Email address",
                    name: "email",
                    id: "email",
                    placeholder: "Enter your email address",
                    type: "text",
                    register: { ...register("email") },
                    error: errors.email?.message,
                  }}
                />
                <div className="flex flex-col items-start justify-start w-full">
                  <label
                    htmlFor="number"
                    className="text-[0.9375rem] mb-[2px] font-medium w-full leading-[1.3125rem]"
                  >
                    Phone number
                  </label>
                  <Fragment>
                    <div className="bg-input-field items-center p-0.5 h-[51px] outline-0 border-[0.5px] border-transparent hover:border-primary w-full rounded flex">
                      <div className="w-28 flex items-center justify-center gap-1 py-1 px-3 h-8 rounded appearance-none cursor-pointer ml-1 border-none outline-none bg-white">
                        <select
                          className="w-16 rounded appearance-none cursor-pointer border-none outline-none focus:right-0"
                          {...register("code")}
                        >
                          {countrycodes.map((country) => (
                            <option value={country.code} key={country.flag}>
                              {country.flag}&nbsp; {country.code}
                            </option>
                          ))}
                        </select>
                        <ChevronDown />
                      </div>
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
                <div className="lg:col-span-2">
                  <label className="text-[15px] mb-[.125rem] w-full font-medium leading-[21px]">
                    How did you hear about us?
                  </label>
                  <div className="flex flex-col lg:flex-row lg:items-center gap-6 mt-4">
                    <div className="flex flex-row items-center gap-2">
                      <Checkbox
                        checked={watch("platform") === "social_media"}
                        onChange={(checked) =>
                          checked.target.checked
                            ? setValue("platform", "social_media")
                            : setValue("platform", "")
                        }
                      />
                      <Text>Social media</Text>
                    </div>
                    <div className="flex flex-row items-center gap-2">
                      <Checkbox
                        checked={watch("platform") === "online_search"}
                        onChange={(checked) =>
                          checked.target.checked
                            ? setValue("platform", "online_search")
                            : setValue("platform", "")
                        }
                      />
                      <Text>Online search</Text>
                    </div>
                    <div className="flex flex-row items-center gap-2">
                      <Checkbox
                        checked={watch("platform") === "friend_colleague"}
                        onChange={(checked) =>
                          checked.target.checked
                            ? setValue("platform", "friend_colleague")
                            : setValue("platform", "")
                        }
                      />
                      <Text>Friend/Colleague</Text>
                    </div>
                    <div className="flex flex-row items-center gap-2">
                      <Checkbox
                        checked={watch("platform") === "other"}
                        onChange={(checked) =>
                          checked.target.checked
                            ? setValue("platform", "other")
                            : setValue("platform", "")
                        }
                      />
                      <Text>Other</Text>
                    </div>
                  </div>
                  {errors?.platform?.message && (
                    <small className="text-[red]/80 text-xs tablet:text-[13px] mt-1 tablet:mt-1.5 text-start">
                      {errors?.platform?.message}
                    </small>
                  )}
                </div>

                <div
                  className="cf-turnstile"
                  data-sitekey="0x4AAAAAAAL2hsshtDAYjQxx"
                  data-theme="light"
                  data-retry-interval={3000}
                />
              </div>

              <Button
                type="primary"
                htmlType="submit"
                className="text-sm leading-[14px] !tracking-text font-medium ml-auto mt-10 rounded-lg p-4 flex items-center justify-center justify-self-end w-[100px]"
                loading={isSubmitting}
                disabled={isSubmitting}
                size="large"
              >
                {isSubmitting ? "Sending..." : "Submit"}
              </Button>
            </div>
          </div>
        </form>
      </Container>
    </Fragment>
  );
};

export default Pilot;
