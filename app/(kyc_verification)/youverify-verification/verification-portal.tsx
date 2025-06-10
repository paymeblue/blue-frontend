"use client";
import { Button } from "@components/ui/button";
import { Input } from "@components/ui/input";
import { Label } from "@components/ui/label";
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
import { useState } from "react";
import { useForm } from "react-hook-form";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@components/ui/card";

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

const VerificationPortal = () => {
  const [currentStep, setCurrentStep] = useState<VerificationStep>({
    step: "form",
  });
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<VerificationFormValidation>({
    resolver: zodResolver(VerificationFormSchema),
  });

  const documentType = watch("documentType");

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
    setValue("documentNumber", formatted);
  };

  const onSubmit = async (data: VerificationFormValidation) => {
    setIsLoading(true);

    try {
      // Simulate document verification (in production, you'd verify with your backend)
      await new Promise((resolve) => setTimeout(resolve, 2000));

      // Proceed to liveness test
      setCurrentStep({ step: "liveness", data });
      startLivenessTest(data);
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
    // Load YouVerify SDK if not already loaded
    if (!window.YouverifySDK) {
      const script = document.createElement("script");
      script.src = "https://cdn.youverify.co/web-sdk/js/youverify-web-sdk.js";
      script.onload = () => initializeLivenessTest(formData);
      script.onerror = () => {
        setCurrentStep({
          step: "error",
          error: "Failed to load verification SDK. Please try again.",
        });
      };
      document.head.appendChild(script);
    } else {
      initializeLivenessTest(formData);
    }
  };

  const initializeLivenessTest = (formData: VerificationFormValidation) => {
    try {
      const livenessModule = window.YouverifySDK.liveness({
        publicMerchantKey: YOUVERIFY_PUBLIC_MERCHANT_KEY,
        sandboxEnvironment: process.env.NODE_ENV === "development",
        personalInformation: {
          firstName: formData.firstName,
          lastName: formData.lastName,
        },
        appearance: {
          greeting:
            "We need to perform a liveness test to verify your identity.",
          actionText: "Start Liveness Test",
          buttonBackgroundColor: "#4341CD",
          buttonTextColor: "#ffffff",
          primaryColor: "#4341CD",
        },
        metadata: {
          documentType: formData.documentType,
          documentNumber: formData.documentNumber,
          timestamp: new Date().toISOString(),
        },
        onSuccess: () => {
          setCurrentStep({
            step: "success",
            data: { ...formData, verificationCompleted: true },
          });
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

      livenessModule.initialize();
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
            <Button onClick={resetForm} variant="outline" className="w-full">
              Verify Another Identity
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
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle>Identity Verification Portal</CardTitle>
          <CardDescription>
            Enter your BVN or NIN details to verify your identity
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="documentType">Document Type</Label>
              <Select
                value={documentType}
                onValueChange={(value) =>
                  setValue("documentType", value as "nin" | "bvn")
                }
              >
                <SelectTrigger
                  className={cn(errors.documentType && "border-red-500")}
                >
                  <SelectValue placeholder="Select document type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="nin">
                    National Identification Number (NIN)
                  </SelectItem>
                  <SelectItem value="bvn">
                    Bank Verification Number (BVN)
                  </SelectItem>
                </SelectContent>
              </Select>
              {errors.documentType && (
                <p className="text-sm text-red-500">
                  {errors.documentType.message}
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
                placeholder={`Enter your ${documentType?.toUpperCase() || "document number"}`}
                {...register("documentNumber")}
                onChange={handleDocumentNumberChange}
                className={cn(errors.documentNumber && "border-red-500")}
                maxLength={11}
              />
              {errors.documentNumber && (
                <p className="text-sm text-red-500">
                  {errors.documentNumber.message}
                </p>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="firstName">First Name</Label>
                <Input
                  id="firstName"
                  type="text"
                  placeholder="Enter your first name"
                  {...register("firstName")}
                  className={cn(errors.firstName && "border-red-500")}
                />
                {errors.firstName && (
                  <p className="text-sm text-red-500">
                    {errors.firstName.message}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="lastName">Last Name</Label>
                <Input
                  id="lastName"
                  type="text"
                  placeholder="Enter your last name"
                  {...register("lastName")}
                  className={cn(errors.lastName && "border-red-500")}
                />
                {errors.lastName && (
                  <p className="text-sm text-red-500">
                    {errors.lastName.message}
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
              Your data is secure and will be processed according to our privacy
              policy.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default VerificationPortal;
