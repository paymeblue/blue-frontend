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
import { useEffect, useState, useRef } from "react";
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
import useVerifyLiveness from "@hooks/useVerifyLiveness";

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
  const [verificationId, setVerificationId] = useState<string | null>(null);
  const [showTimeoutModal, setShowTimeoutModal] = useState(false);
  const [timeoutError, setTimeoutError] = useState<string>("");
  const livenessTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const {
    error,
    loading: loadingUserKycDetails,
    userKycDetails,
  } = useUserKycDetailsGet({
    token,
    isLocal: false,
  });

  console.log("userKycDetails", userKycDetails);

  const {
    verifyLiveness,
    loading: loadingVerifyLiveness,
    error: errorVerifyLiveness,
    message: messageVerifyLiveness,
  } = useVerifyLiveness({ isLocal: false });

  console.log("messageVerifyLiveness", messageVerifyLiveness);

  const form = useForm<VerificationFormValidation>({
    resolver: zodResolver(VerificationFormSchema),
    defaultValues: {
      documentType: "bvn",
      dateOfBirth: new Date(),
    },
  });

  const {
    verifyBvn,
    // loading: isVerifyingBvn,
    error: isErrorVerifyingBvn,
    message: bvnMessage,
  } = useVerifyBvn({ isLocal: false });

  console.log("bvnMessage", bvnMessage);

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
    if (errorVerifyLiveness) {
      setCurrentStep({
        step: "error",
        error:
          messageVerifyLiveness ||
          "An error occurred verifying your liveness. Please try again.",
      });
    }
  }, [errorVerifyLiveness]);

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

      console.log("=== BVN Verification Response ===");
      console.log("Full response:", res);
      console.log("Response status:", res?.status);
      console.log("Response message:", res?.message);
      console.log("Response data object:", res?.data);
      console.log("Verification ID:", res?.data?.verificationId);
      console.log("================================");

      // Validate that we have a valid verification ID before proceeding
      if (res && res.data?.verificationId) {
        console.log("✅ Verification ID received:", res.data.verificationId);
        // Store verification ID in state
        setVerificationId(res.data.verificationId);
        // Proceed to liveness test
        setCurrentStep({ step: "liveness", data });
        startLivenessTest(data, res.data.verificationId);
      } else {
        console.error("❌ BVN verification failed - no verification ID received");
        console.error("Response structure:", JSON.stringify(res, null, 2));
        setCurrentStep({
          step: "error",
          error: "Failed to verify document. No verification ID received. Please check your BVN and try again.",
        });
      }
    } catch (error) {
      console.error("BVN verification error:", error);
      setCurrentStep({
        step: "error",
        error: "Failed to verify document. Please try again.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const startLivenessTest = (
    formData: VerificationFormValidation,
    verificationId: string
  ) => {
    initializeLivenessTest(formData, verificationId);
  };

  const initializeLivenessTest = (
    formData: VerificationFormValidation,
    verificationId: string
  ) => {
    try {
      // Store verification ID in closure scope to ensure it's not lost
      // Don't rely on SDK to preserve metadata
      const capturedVerificationId = verificationId;

      console.log("Initializing liveness test with verification ID:", capturedVerificationId);

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
          verification_id: verificationId,
        },
        onSuccess: async (data) => {
          clearLivenessTimeout(); // Clear timeout on success
          try {
            console.log("Liveness test onSuccess callback data:", data);
            console.log("Metadata from SDK:", data.metadata);
            console.log("Captured verification ID from closure:", capturedVerificationId);

            // Use the captured verification ID from closure instead of relying on SDK metadata
            // This ensures we always have the verification ID even if SDK doesn't preserve metadata
            const finalVerificationId = capturedVerificationId || data.metadata?.verification_id;

            if (!finalVerificationId) {
              console.error("Verification ID is missing from both closure and metadata");
              setCurrentStep({
                step: "error",
                error: "Verification ID is missing. Please try again.",
              });
              return;
            }

            console.log("Using verification ID:", finalVerificationId);

            // Call verifyLiveness API
            const result = await verifyLiveness({
              verification_id: finalVerificationId,
              token: token || "",
            });

            console.log("verifyLiveness API result:", result);

            // Only redirect to success if verifyLiveness call succeeded
            // verifyLiveness returns the response data on success, null on error
            if (result) {
              console.log("Verification successful, redirecting to success page");
              router.push(`/verification/?token=${token}&status=success`);
            } else {
              console.error("verifyLiveness API call failed");
              // Use the actual error message from the API hook if available
              const apiErrorMessage = messageVerifyLiveness || "Failed to verify liveness. Please try again.";
              setCurrentStep({
                step: "error",
                error: apiErrorMessage,
              });
            }
          } catch (error: any) {
            console.error("Error in liveness onSuccess callback:", error);
            // Extract error message from various possible error formats
            const errorMessage = 
              error?.response?.data?.message || 
              error?.message || 
              messageVerifyLiveness ||
              "Liveness test failed. Please try again.";
            setCurrentStep({
              step: "error",
              error: errorMessage,
            });
          }
        },
        onFailure: (error: any) => {
          clearLivenessTimeout(); // Clear timeout on failure
          console.error("Liveness test failed:", error);
          // Extract YouVerify SDK error message from various possible formats
          const errorMessage = 
            error?.message || 
            error?.error?.message || 
            error?.error || 
            error?.description ||
            (typeof error === 'string' ? error : null) ||
            "Liveness test failed. Please try again.";
          setCurrentStep({
            step: "error",
            error: errorMessage,
          });
        },
        onClose: () => {
          clearLivenessTimeout(); // Clear timeout on close
          setCurrentStep({ step: "form" });
        },
      });

      // livenessModule.initialize();
      livenessModule.start();
      
      // Start timeout to detect if YouVerify doesn't respond
      startLivenessTimeout();
    } catch (error) {
      clearLivenessTimeout();
      setCurrentStep({
        step: "error",
        error: "Failed to initialize liveness test. Please try again.",
      });
    }
  };

  const resetForm = () => {
    setCurrentStep({ step: "form" });
    setVerificationId(null);
  };

  const closeWebview = () => {
    window.postMessage("closeWebView", "*");
    window?.Close.postMessage("closeWebView", "*");
  };

  const closeWebViewOnError = () => {
    window.postMessage("closeWebViewError", "*");
    window?.Close.postMessage("closeWebViewError", "*");
  };

  // Clear liveness timeout
  const clearLivenessTimeout = () => {
    if (livenessTimeoutRef.current) {
      clearTimeout(livenessTimeoutRef.current);
      livenessTimeoutRef.current = null;
    }
  };

  // Start liveness timeout (8 seconds)
  const startLivenessTimeout = () => {
    clearLivenessTimeout();
    livenessTimeoutRef.current = setTimeout(() => {
      setTimeoutError(
        "The verification process is taking longer than expected. This could be due to network issues or the verification service being unavailable. Please check your connection and try again."
      );
      setShowTimeoutModal(true);
    }, 8000); // 8 seconds timeout
  };

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      clearLivenessTimeout();
    };
  }, []);

  if (loadingUserKycDetails || loadingVerifyLiveness) {
    return (
      <div className="flex items-center justify-center w-screen h-screen">
        <Spin size="large" indicator={antIcon} />
      </div>
    );
  }

  if (error || !userKycDetails) {
    return (
      <div className="flex items-center justify-center w-screen h-screen">
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
      <div className="flex items-center justify-center min-h-screen p-4 bg-gray-50">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <div className="flex items-center justify-center w-16 h-16 mx-auto mb-4 bg-green-100 rounded-full">
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
              Your identity has been successfully verified. You can now close
              this window and return to the app.
            </CardDescription>
          </CardHeader>
          <CardContent className="text-center">
            <Button
              onClick={closeWebview}
              variant="outline"
              className="w-full"
            >
              Back to app
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (currentStep.step === "error") {
    return (
      <div className="flex items-center justify-center min-h-screen p-4 bg-gray-50">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <div className="flex items-center justify-center w-16 h-16 mx-auto mb-4 bg-red-100 rounded-full">
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
          <CardContent className="space-y-3">
            <Button onClick={resetForm} className="w-full">
              Try Again
            </Button>
            <Button 
              onClick={closeWebViewOnError} 
              variant="outline" 
              className="w-full"
            >
              Back to App
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (currentStep.step === "liveness") {
    return (
      <div className="flex items-center justify-center min-h-screen p-4 bg-gray-50">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <div className="flex items-center justify-center w-16 h-16 mx-auto mb-4 bg-blue-100 rounded-full animate-pulse">
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
            {verificationId && (
              <div className="flex items-center justify-center gap-2 px-4 py-2 mt-4 border border-green-200 rounded-lg bg-green-50">
                <svg
                  className="w-5 h-5 text-green-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <div className="text-sm">
                  <span className="font-semibold text-green-800">Verification ID Confirmed</span>
                  <p className="text-green-600 text-xs mt-0.5">ID: {verificationId.slice(0, 8)}...{verificationId.slice(-4)}</p>
                </div>
              </div>
            )}
          </CardHeader>
        </Card>
        
        {/* Timeout Error Modal */}
        {showTimeoutModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50">
            <Card className="w-full max-w-md">
              <CardHeader className="text-center">
                <div className="flex items-center justify-center w-16 h-16 mx-auto mb-4 bg-orange-100 rounded-full">
                  <svg
                    className="w-8 h-8 text-orange-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <CardTitle className="text-orange-600">Verification Timeout</CardTitle>
                <CardDescription className="mt-4 text-left">
                  {timeoutError}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button
                  onClick={closeWebViewOnError}
                  variant="destructive"
                  className="w-full"
                >
                  Back to App
                </Button>
                <Button
                  onClick={() => {
                    setShowTimeoutModal(false);
                    setCurrentStep({ step: "form" });
                    clearLivenessTimeout();
                  }}
                  variant="outline"
                  className="w-full"
                >
                  Try Again
                </Button>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    );
  }

  return (
    <Form {...form}>
      <div className="flex items-center justify-center min-h-screen p-4 bg-gray-50">
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

              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <div className="flex flex-col space-y-2">
                  <Label htmlFor="dateOfBirth">Date of Birth</Label>
                  <Controller
                    control={form.control}
                    name="dateOfBirth"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input
                            type="date"
                            id="dateOfBirth"
                            max={format(new Date(), "yyyy-MM-dd")}
                            min="1900-01-01"
                            value={
                              field.value
                                ? format(field.value, "yyyy-MM-dd")
                                : ""
                            }
                            onChange={(e) => {
                              const dateValue = e.target.value
                                ? new Date(e.target.value)
                                : undefined;
                              field.onChange(dateValue);
                            }}
                            className={cn(
                              form.formState.errors.dateOfBirth &&
                                "border-red-500"
                            )}
                          />
                        </FormControl>
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

            <div className="mt-6 text-sm text-center text-gray-500">
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
