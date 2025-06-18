"use client";
import { Button } from "@components/ui/button";
import { Input } from "@components/ui/input";
import { Label } from "@components/ui/label";
import YouverifyLiveness from "youverify-liveness-web";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@components/ui/select";
import { cn } from "@lib/utils";
import {
  VerificationFormSchema,
  type VerificationFormValidation,
} from "@lib/validations";
import { YOUVERIFY_PUBLIC_MERCHANT_KEY } from "@lib/constants";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@components/ui/card";
import useVerifyBvn from "@hooks/useVerifyBvn";
import useUserKycDetailsGet from "@hooks/kyc/useUserKycDetailsFetch";
import { useSearchParams } from "next/navigation";
import EmptyState from "app/(receive_money)/components/empty-state";
import { Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@components/ui/popover";
import { Form, FormControl, FormItem } from "@components/ui/form";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { Calendar } from "@components/ui/calendar";
import { useRouter } from "next/navigation";

// YouVerify SDK types
interface YouVerifyLivenessOptions {
  publicMerchantKey: string;
  sandboxEnvironment: boolean;
  personalInformation: {
    firstName: string;
    lastName: string;
  };
  appearance: {
    greeting: string;
    actionText: string;
    buttonBackgroundColor: string;
    buttonTextColor: string;
    primaryColor: string;
  };
  metadata: Record<string, any>;
  onSuccess: () => void;
  onFailure: (error: any) => void;
  onClose: () => void;
}

interface YouVerifyLivenessModule {
  initialize: () => void;
  start: () => void;
}

declare global {
  interface Window {
    YouverifySDK: {
      liveness: (options: YouVerifyLivenessOptions) => YouVerifyLivenessModule;
    };
  }
}

interface VerificationStep {
  step: "form" | "liveness" | "success" | "error";
  data?: any;
  error?: string;
}

const antIcon = (
  <LoadingOutlined
    style={{
      fontSize: 32,
      display: "flex",
      alignItems: "center",
      minHeight: "10rem",
      color: "#4341CD",
    }}
    spin
  />
);

const VerificationPortal = () => {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState<VerificationStep>({
    step: "form",
  });
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  const status = searchParams.get("status");
  const [isLoading, setIsLoading] = useState(false);

  const {
    error,
    loading: loadingUserKycDetails,
    userKycDetails,
  } = useUserKycDetailsGet({
    token,
    isLocal: false,
  });

  const form = useForm<VerificationFormValidation>({
    resolver: zodResolver(VerificationFormSchema),
    defaultValues: {
      documentType: "bvn",
    },
  });

  const {
    verifyBvn,
    // loading: isVerifyingBvn,
    error: isErrorVerifyingBvn,
    message: bvnMessage,
  } = useVerifyBvn({ isLocal: false });

  const documentType = form.watch("documentType");

  useEffect(() => {
    if (isErrorVerifyingBvn) {
      setCurrentStep({
        step: "error",
        error:
          bvnMessage ||
          "An error occurred verifying your BVN. Please try again.",
      });
    }
  }, [isErrorVerifyingBvn]);

  useEffect(() => {
    if (status === "success") {
      setCurrentStep({ step: "success" });
    }
  }, [status]);

  useEffect(() => {
    if (userKycDetails) {
      form.setValue("firstName", userKycDetails.first_name);
      form.setValue("lastName", userKycDetails.last_name);
    }
  }, [userKycDetails]);

  const formatDocumentNumber = (value: string) => {
    // Remove all non-digit characters
    const cleanValue = value.replace(/\D/g, "");
    // Limit to 11 digits
    return cleanValue.slice(0, 11);
  };

  const handleDocumentNumberChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const formatted = formatDocumentNumber(e.target.value);
    form.setValue("documentNumber", formatted);
  };

  const onSubmit = async (data: VerificationFormValidation) => {
    setIsLoading(true);

    try {
      // Simulate document verification (in production, you'd verify with your backend)
      // await new Promise((resolve) => setTimeout(resolve, 2000));
      const res = await verifyBvn({
        bvn: data.documentNumber,
        dateOfBirth: format(data.dateOfBirth, "yyyy-MM-dd"),
        token: token || "",
      });

      if (res) {
        // Proceed to liveness test
        setCurrentStep({ step: "liveness", data });
        startLivenessTest(data);
      }
    } catch (error) {
      setCurrentStep({
        step: "error",
        error: "Failed to verify document. Please try again.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const startLivenessTest = (formData: VerificationFormValidation) => {
    initializeLivenessTest(formData);
  };

  const initializeLivenessTest = (formData: VerificationFormValidation) => {
    try {
      const livenessModule = new YouverifyLiveness({
        presentation: "modal",
        publicKey: YOUVERIFY_PUBLIC_MERCHANT_KEY,
        sandboxEnvironment: false,
        user: {
          firstName: formData.firstName,
          lastName: formData.lastName,
        },
        tasks: [
          {
            id: "complete-the-circle",
            difficulty: "easy",
          },
        ],
        // appearance: {
        //   greeting:
        //     "We need to perform a liveness test to verify your identity.",
        //   actionText: "Start Liveness Test",
        //   buttonBackgroundColor: "#4341CD",
        //   buttonTextColor: "#ffffff",
        //   primaryColor: "#4341CD",
        // },
        branding: {
          color: "#4341CD",
          logo: "/logo.png",
        },
        metadata: {
          documentType: formData.documentType,
          documentNumber: formData.documentNumber,
          timestamp: new Date().toISOString(),
          wallet_code: userKycDetails?.wallet_code,
        },
        onSuccess: (data) => {
          console.log("success", data);
          router.push(`/verification/?token=${token}&status=success`);
        },
        onFailure: (error: any) => {
          setCurrentStep({
            step: "error",
            error: "Liveness test failed. Please try again.",
          });
        },
        onClose: () => {
          setCurrentStep({ step: "form" });
        },
      });

      // livenessModule.initialize();
      livenessModule.start();
    } catch (error) {
      setCurrentStep({
        step: "error",
        error: "Failed to initialize liveness test. Please try again.",
      });
    }
  };

  const resetForm = () => {
    setCurrentStep({ step: "form" });
  };

  const closeWebview = () => {
    window.postMessage("closeWebView", "*");
    window?.Close.postMessage("closeWebView", "*");
  };

  const closeWebViewOnError = () => {
    window.postMessage("closeWebViewError", "*");
    window?.Close.postMessage("closeWebViewError", "*");
  };

  if (loadingUserKycDetails) {
    return (
      <div className="flex w-screen h-screen items-center justify-center">
        <Spin size="large" indicator={antIcon} />
      </div>
    );
  }

  if (error || !userKycDetails) {
    return (
      <div className="flex w-screen h-screen items-center justify-center">
        <EmptyState
          title="Invalid credentials"
          description="We could not verify your identity. Please return to the Blue app and try again."
          btnText="Return to app"
          btnOnClick={() => {
            closeWebViewOnError();
          }}
        />
      </div>
    );
  }

  if (currentStep.step === "success") {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
              <svg
                className="w-8 h-8 text-green-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>
            <CardTitle className="text-green-600">
              Verification Complete!
            </CardTitle>
            <CardDescription>
              Your identity has been successfully verified.
            </CardDescription>
          </CardHeader>
          <CardContent className="text-center">
            <Button onClick={closeWebview} variant="outline" className="w-full">
              Back to app
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (currentStep.step === "error") {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <div className="mx-auto w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mb-4">
              <svg
                className="w-8 h-8 text-red-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </div>
            <CardTitle className="text-red-600">Verification Failed</CardTitle>
            <CardDescription>
              {currentStep.error || "An error occurred during verification."}
            </CardDescription>
          </CardHeader>
          <CardContent className="text-center">
            <Button onClick={resetForm} className="w-full">
              Try Again
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (currentStep.step === "liveness") {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <div className="mx-auto w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4 animate-pulse">
              <svg
                className="w-8 h-8 text-blue-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                />
              </svg>
            </div>
            <CardTitle>Liveness Test in Progress</CardTitle>
            <CardDescription>
              Please follow the instructions in the popup window to complete
              your liveness verification.
            </CardDescription>
          </CardHeader>
        </Card>
      </div>
    );
  }

  return (
    <Form {...form}>
      <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <CardTitle>Identity Verification Portal</CardTitle>
            <CardDescription>
              Enter your BVN to verify your identity
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="documentType">Document Type</Label>
                <Select
                  value={documentType}
                  onValueChange={(value) =>
                    form.setValue("documentType", value as "nin" | "bvn")
                  }
                >
                  <SelectTrigger
                    className={cn(
                      form.formState.errors.documentType && "border-red-500"
                    )}
                  >
                    <SelectValue placeholder="Select document type" />
                  </SelectTrigger>
                  <SelectContent>
                    {/* <SelectItem value="nin">
                      National Identification Number (NIN)
                    </SelectItem> */}
                    <SelectItem value="bvn">
                      Bank Verification Number (BVN)
                    </SelectItem>
                  </SelectContent>
                </Select>
                {form.formState.errors.documentType && (
                  <p className="text-sm text-red-500">
                    {form.formState.errors.documentType.message}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="documentNumber">
                  {documentType === "nin"
                    ? "NIN"
                    : documentType === "bvn"
                      ? "BVN"
                      : "Document Number"}
                </Label>
                <Input
                  id="documentNumber"
                  type="text"
                  inputMode="numeric"
                  placeholder={`Enter your ${documentType?.toUpperCase() || "document number"}`}
                  {...form.register("documentNumber")}
                  onChange={handleDocumentNumberChange}
                  className={cn(
                    form.formState.errors.documentNumber && "border-red-500"
                  )}
                  maxLength={11}
                />
                {form.formState.errors.documentNumber && (
                  <p className="text-sm text-red-500">
                    {form.formState.errors.documentNumber.message}
                  </p>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2 flex flex-col ">
                  <Label htmlFor="dateOfBirth">Date of Birth</Label>
                  <Controller
                    control={form.control}
                    name="dateOfBirth"
                    render={({ field }) => (
                      <FormItem>
                        <Popover>
                          <PopoverTrigger asChild>
                            <FormControl>
                              <Button
                                variant={"outline"}
                                className={cn(
                                  "w-full pl-3 text-left font-normal",
                                  !field.value && "text-muted-foreground"
                                )}
                              >
                                {field.value ? (
                                  format(field.value, "PPP")
                                ) : (
                                  <span>Pick a date</span>
                                )}
                                <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                              </Button>
                            </FormControl>
                          </PopoverTrigger>
                          <PopoverContent className="p-0" align="start">
                            <Calendar
                              mode="single"
                              selected={field.value}
                              onSelect={field.onChange}
                              disabled={(date) =>
                                date > new Date() ||
                                date < new Date("1900-01-01")
                              }
                              captionLayout="dropdown"
                              classNames={{
                                root: "w-full",
                              }}
                            />
                          </PopoverContent>
                        </Popover>
                      </FormItem>
                    )}
                  />

                  {form.formState.errors.dateOfBirth && (
                    <p className="text-sm text-red-500">
                      {form.formState.errors.dateOfBirth.message}
                    </p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="firstName">First Name</Label>
                  <Input
                    id="firstName"
                    disabled
                    type="text"
                    placeholder="Enter your first name"
                    {...form.register("firstName")}
                    className={cn(
                      form.formState.errors.firstName && "border-red-500"
                    )}
                  />
                  {form.formState.errors.firstName && (
                    <p className="text-sm text-red-500">
                      {form.formState.errors.firstName.message}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="lastName">Last Name</Label>
                  <Input
                    id="lastName"
                    disabled
                    type="text"
                    placeholder="Enter your last name"
                    {...form.register("lastName")}
                    className={cn(
                      form.formState.errors.lastName && "border-red-500"
                    )}
                  />
                  {form.formState.errors.lastName && (
                    <p className="text-sm text-red-500">
                      {form.formState.errors.lastName.message}
                    </p>
                  )}
                </div>
              </div>

              <Button type="submit" className="w-full" loading={isLoading}>
                {isLoading ? "Verifying..." : "Proceed to Liveness Test"}
              </Button>
            </form>

            <div className="mt-6 text-center text-sm text-gray-500">
              <p>
                Your data is secure and will be processed according to our
                privacy policy.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </Form>
  );
};

export default VerificationPortal;
