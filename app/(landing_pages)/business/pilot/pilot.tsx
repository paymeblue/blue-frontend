"use client";

import { useState, Fragment } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { ChevronDown } from "@components/assets/icons";
import Container from "@shared/container";
import PageHead from "@shared/pageHead";
import { message } from "antd";
import { CheckCircleOutlined } from "@ant-design/icons";
import countrycodes from "@lib/countryCodes";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@components/ui/accordion";
import { Button } from "@components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@components/ui/form";
import { Input } from "@components/ui/input";
import { RadioGroup, RadioGroupItem } from "@components/ui/radio-group";
import { Checkbox } from "@components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@components/ui/select";

// Define the validation schema for the form
const BusinessPilotSchema = z.object({
  // Business Information
  businessName: z.string().min(2, "Business name is required"),
  businessType: z.string().min(1, "Please select a business type"),
  businessCategory: z.string().min(1, "Please select a business category"),
  businessAddress: z.string().min(5, "Business address is required"),
  state: z.string().min(1, "State is required"),
  branchCount: z.string().min(1, "Please select branch count"),
  businessWebsite: z.string().optional(),

  // Contact Person
  fullName: z.string().min(2, "Full name is required"),
  role: z.string().min(1, "Please select your role"),
  phoneNumber: z.string().min(10, "Valid phone number is required"),
  phoneCode: z.string().min(1, "Country code is required"),
  email: z.string().email("Invalid email address").optional().or(z.literal("")),

  // Business Operations
  acceptsDigitalPayments: z.string().min(1, "Please select yes or no"),
  currentPaymentTools: z
    .array(z.string())
    .min(1, "Please select at least one payment tool"),
  monthlyTransactions: z.string().min(1, "Please select a range"),
  employeeCount: z.string().optional().or(z.literal("")),

  // Blue Setup Needs
  setupNeeds: z.array(z.string()).optional(),
});

// Data for select options
const businessTypes = [
  "Retail",
  "Food & Drink",
  "Hospitality (Hotels, Shortlets)",
  "Beauty & Wellness",
  "Fashion & Lifestyle",
  "Health & Medical",
  "Entertainment",
  "Services",
  "Agency / Consultant",
  "Education / Training",
  "Religious Institution",
  "Other",
];

const businessCategories = [
  "Supermarket / Grocery",
  "Boutique / Clothing Store",
  "Restaurant / Eatery",
  "Bar / Lounge",
  "Bakery / Café",
  "Spa / Salon / Barbing",
  "Hotel / Guesthouse / Shortlet",
  "Pharmacy / Health Store",
  "Events / Wedding Services",
  "Repair & Maintenance Services",
  "Logistics / Delivery",
  "Content Creator / Skitmaker",
  "Freelancer / Consultant",
  "Tech / Startup",
  "Education / Tutorial Center",
  "Religious / NGO",
  "Other",
];

const branchCounts = [
  { value: "1", label: "1 (Single Location)" },
  { value: "2-5", label: "2–5 Branches" },
  { value: "6-10", label: "6–10 Branches" },
  { value: "11-20", label: "11–20 Branches" },
  { value: "21+", label: "21 and above" },
];

const roles = [
  { value: "Owner / Founder", label: "Owner / Founder" },
  { value: "Manager", label: "Manager" },
  { value: "Supervisor", label: "Supervisor" },
  { value: "Marketing Lead", label: "Marketing Lead" },
];

const paymentToolOptions = [
  "Bank Transfer",
  "POS Terminal (Any Brand)",
  "USSD Payments",
  "QR Code",
  "Mobile Banking App",
  "Cash Only",
  "Paylink / Payment Page",
  "Online Storefront / E-commerce",
  "Others",
];

const transactionRanges = [
  { value: "Less than ₦100,000", label: "Less than ₦100,000" },
  { value: "₦100,000 – ₦500,000", label: "₦100,000 – ₦500,000" },
  { value: "₦500,001 – ₦1,000,000", label: "₦500,001 – ₦1,000,000" },
  { value: "₦1,000,001 – ₦5,000,000", label: "₦1,000,001 – ₦5,000,000" },
  { value: "Over ₦5,000,000", label: "Over ₦5,000,000" },
];

const employeeCounts = [
  { value: "1–3 Staff", label: "1–3 Staff" },
  { value: "4–10 Staff", label: "4–10 Staff" },
  { value: "11–20 Staff", label: "11–20 Staff" },
  { value: "21–50 Staff", label: "21–50 Staff" },
  { value: "51–100 Staff", label: "51–100 Staff" },
  { value: "Over 100 Staff", label: "Over 100 Staff" },
];

const setupNeedOptions = [
  "Branch-specific QR codes",
  "Business Dashboard Access",
  "Auto Withdrawals Setup",
  "Help with staff training",
  "Customer-facing signages or materials",
];

const BusinessPilot = () => {
  const form = useForm<z.infer<typeof BusinessPilotSchema>>({
    resolver: zodResolver(BusinessPilotSchema),
    defaultValues: {
      businessName: "",
      businessType: "",
      businessCategory: "",
      businessAddress: "",
      state: "",
      branchCount: "",
      businessWebsite: "",
      fullName: "",
      role: "",
      phoneNumber: "",
      phoneCode: "+234",
      email: "",
      acceptsDigitalPayments: "",
      currentPaymentTools: [],
      monthlyTransactions: "",
      employeeCount: "",
      setupNeeds: [],
    },
  });

  const [messageApi, contextHolder] = message.useMessage();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const onSubmit = async (data: z.infer<typeof BusinessPilotSchema>) => {
    setIsSubmitting(true);
    try {
      // Submit form data
      const res = await fetch("/api/business-pilot", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const result = await res.json();

      if (!res.ok) {
        throw new Error(result.message || "Something went wrong");
      }

      messageApi.open({
        content: "Thank you for your interest! We'll be in touch soon.",
        className: "[&>div]:bg-[#17B472] [&>div]:text-white",
        icon: <CheckCircleOutlined />,
      });

      form.reset();
    } catch (error: any) {
      messageApi.open({
        content: error.message || "An error occurred. Please try again.",
        className: "[&>div]:bg-red-800 [&>div]:text-white",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Fragment>
      {contextHolder}
      <PageHead
        title="Join the Blue Business Network"
        subTitle="Power your payments. Delight your customers. Simplify your business."
      />

      <Container className="py-6 laptop:my-20">
        <div className="flex-1 flex items-center justify-center flex-col lg:flex-row">
          <div className="flex flex-col w-full lg:w-[55%]">
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-6"
              >
                <p className="text-center lg:hidden mb-6">
                  Fill this quick form to get your business onboarded onto Blue
                  Business — Nigeria's new way to receive payments, manage cash
                  flow, and grow smarter.
                </p>

                <Accordion
                  type="single"
                  collapsible
                  defaultValue="business-info"
                  className="w-full"
                >
                  {/* Business Information Section */}
                  <AccordionItem value="business-info">
                    <AccordionTrigger className="text-lg font-semibold">
                      📌 Business Information
                    </AccordionTrigger>
                    <AccordionContent className="space-y-4 pt-4">
                      <FormField
                        control={form.control}
                        name="businessName"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Business Name</FormLabel>
                            <FormControl>
                              <Input
                                placeholder="Enter business name"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="businessType"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Business Type</FormLabel>
                            <Select
                              onValueChange={field.onChange}
                              defaultValue={field.value}
                            >
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select business type" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                {businessTypes.map((type) => (
                                  <SelectItem key={type} value={type}>
                                    {type}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="businessCategory"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Business Category</FormLabel>
                            <Select
                              onValueChange={field.onChange}
                              defaultValue={field.value}
                            >
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select business category" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                {businessCategories.map((category) => (
                                  <SelectItem key={category} value={category}>
                                    {category}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="businessAddress"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Business Address</FormLabel>
                            <FormControl>
                              <Input
                                placeholder="Enter business address"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="state"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>State</FormLabel>
                            <FormControl>
                              <Input placeholder="Enter state" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="branchCount"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Branch Count</FormLabel>
                            <Select
                              onValueChange={field.onChange}
                              defaultValue={field.value}
                            >
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select branch count" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                {branchCounts.map((item) => (
                                  <SelectItem
                                    key={item.value}
                                    value={item.value}
                                  >
                                    {item.label}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="businessWebsite"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>
                              Business Website or Social Handle (Optional)
                            </FormLabel>
                            <FormControl>
                              <Input
                                placeholder="Enter website or social handle"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </AccordionContent>
                  </AccordionItem>

                  {/* Contact Person Section */}
                  <AccordionItem value="contact-person">
                    <AccordionTrigger className="text-lg font-semibold">
                      🧍 Contact Person
                    </AccordionTrigger>
                    <AccordionContent className="space-y-4 pt-4">
                      <FormField
                        control={form.control}
                        name="fullName"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Full Name</FormLabel>
                            <FormControl>
                              <Input
                                placeholder="Enter your full name"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="role"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Role/Position in Business</FormLabel>
                            <Select
                              onValueChange={field.onChange}
                              defaultValue={field.value}
                            >
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select your role" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                {roles.map((role) => (
                                  <SelectItem
                                    key={role.value}
                                    value={role.value}
                                  >
                                    {role.label}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <div className="flex flex-col items-start justify-start w-full">
                        <label
                          htmlFor="number"
                          className="text-[0.9375rem] mb-[2px] font-medium w-full leading-[1.3125rem]"
                        >
                          Phone Number (WhatsApp preferred)
                        </label>
                        <div className="bg-input-field items-center p-0.5 h-[51px] outline-0 border-[0.5px] border-transparent hover:border-primary w-full rounded flex">
                          <div className="w-28 flex items-center justify-center gap-1 py-1 px-3 h-8 rounded appearance-none cursor-pointer ml-1 border-none outline-none bg-white">
                            <select
                              className="w-16 rounded appearance-none cursor-pointer border-none outline-none focus:right-0"
                              {...form.register("phoneCode")}
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
                            id="phoneNumber"
                            placeholder="Enter your phone number"
                            type="tel"
                            {...form.register("phoneNumber")}
                            className="rounded w-full bg-input-field border-none py-2 px-4 outline-none placeholder:text-[#555] placeholder:text-sm placeholder:font-light placeholder:leading-[1.3125rem]"
                          />
                        </div>
                        {form.formState.errors.phoneNumber && (
                          <small className="text-[red]/80 text-xs tablet:text-[13px] mt-1 tablet:mt-1.5 text-start">
                            {form.formState.errors.phoneNumber?.message}
                          </small>
                        )}
                      </div>

                      <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>
                              Email Address (optional but useful)
                            </FormLabel>
                            <FormControl>
                              <Input
                                placeholder="Enter your email address"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </AccordionContent>
                  </AccordionItem>

                  {/* Business Operations Section */}
                  <AccordionItem value="business-operations">
                    <AccordionTrigger className="text-lg font-semibold">
                      💼 Business Operations
                    </AccordionTrigger>
                    <AccordionContent className="space-y-4 pt-4">
                      <FormField
                        control={form.control}
                        name="acceptsDigitalPayments"
                        render={({ field }) => (
                          <FormItem className="space-y-3">
                            <FormLabel>
                              Do you currently accept digital payments?
                            </FormLabel>
                            <FormControl>
                              <RadioGroup
                                onValueChange={field.onChange}
                                defaultValue={field.value}
                                className="flex space-x-4"
                              >
                                <div className="flex items-center space-x-2">
                                  <RadioGroupItem
                                    value="Yes"
                                    id="digital-yes"
                                  />
                                  <label
                                    htmlFor="digital-yes"
                                    className="text-sm font-normal cursor-pointer"
                                  >
                                    Yes
                                  </label>
                                </div>
                                <div className="flex items-center space-x-2">
                                  <RadioGroupItem value="No" id="digital-no" />
                                  <label
                                    htmlFor="digital-no"
                                    className="text-sm font-normal cursor-pointer"
                                  >
                                    No
                                  </label>
                                </div>
                              </RadioGroup>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="currentPaymentTools"
                        render={() => (
                          <FormItem>
                            <div className="mb-2">
                              <FormLabel>
                                What payment tools are you currently using?
                              </FormLabel>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                              {paymentToolOptions.map((tool) => (
                                <FormField
                                  key={tool}
                                  control={form.control}
                                  name="currentPaymentTools"
                                  render={({ field }) => {
                                    return (
                                      <FormItem
                                        key={tool}
                                        className="flex flex-row items-start space-x-2 space-y-0"
                                      >
                                        <FormControl>
                                          <Checkbox
                                            checked={field.value?.includes(
                                              tool
                                            )}
                                            onCheckedChange={(checked) => {
                                              return checked
                                                ? field.onChange([
                                                    ...(field.value || []),
                                                    tool,
                                                  ])
                                                : field.onChange(
                                                    field.value?.filter(
                                                      (value) => value !== tool
                                                    ) || []
                                                  );
                                            }}
                                          />
                                        </FormControl>
                                        <FormLabel className="text-sm font-normal cursor-pointer">
                                          {tool}
                                        </FormLabel>
                                      </FormItem>
                                    );
                                  }}
                                />
                              ))}
                            </div>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="monthlyTransactions"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>
                              Estimated Monthly Transactions (₦)
                            </FormLabel>
                            <Select
                              onValueChange={field.onChange}
                              defaultValue={field.value}
                            >
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select transaction range" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                {transactionRanges.map((item) => (
                                  <SelectItem
                                    key={item.value}
                                    value={item.value}
                                  >
                                    {item.label}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="employeeCount"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>
                              Number of Employees (Optional)
                            </FormLabel>
                            <Select
                              onValueChange={field.onChange}
                              defaultValue={field.value}
                            >
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select employee count" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                {employeeCounts.map((item) => (
                                  <SelectItem
                                    key={item.value}
                                    value={item.value}
                                  >
                                    {item.label}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </AccordionContent>
                  </AccordionItem>

                  {/* Blue Setup Needs Section */}
                  <AccordionItem value="setup-needs">
                    <AccordionTrigger className="text-lg font-semibold">
                      🟦 Blue Setup Needs
                    </AccordionTrigger>
                    <AccordionContent className="space-y-4 pt-4">
                      <FormField
                        control={form.control}
                        name="setupNeeds"
                        render={() => (
                          <FormItem>
                            <div className="mb-2">
                              <FormLabel>Interested in:</FormLabel>
                            </div>
                            <div className="flex flex-col space-y-2">
                              {setupNeedOptions.map((need) => (
                                <FormField
                                  key={need}
                                  control={form.control}
                                  name="setupNeeds"
                                  render={({ field }) => {
                                    return (
                                      <FormItem
                                        key={need}
                                        className="flex flex-row items-start space-x-2 space-y-0"
                                      >
                                        <FormControl>
                                          <Checkbox
                                            checked={field.value?.includes(
                                              need
                                            )}
                                            onCheckedChange={(checked) => {
                                              return checked
                                                ? field.onChange([
                                                    ...(field.value || []),
                                                    need,
                                                  ])
                                                : field.onChange(
                                                    field.value?.filter(
                                                      (value) => value !== need
                                                    ) || []
                                                  );
                                            }}
                                          />
                                        </FormControl>
                                        <FormLabel className="text-sm font-normal cursor-pointer">
                                          {need}
                                        </FormLabel>
                                      </FormItem>
                                    );
                                  }}
                                />
                              ))}
                            </div>
                          </FormItem>
                        )}
                      />
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>

                <div
                  className="cf-turnstile"
                  data-sitekey="0x4AAAAAAAL2hsshtDAYjQxx"
                  data-theme="light"
                  data-retry-interval={3000}
                />

                <Button
                  type="submit"
                  className="text-sm leading-[14px] tracking-text font-medium ml-auto mt-10 rounded-lg p-4 flex items-center justify-center justify-self-end w-[120px]"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Sending..." : "Submit"}
                </Button>
              </form>
            </Form>
          </div>
        </div>
      </Container>
    </Fragment>
  );
};

export default BusinessPilot;
