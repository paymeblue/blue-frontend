import { z } from "zod";

export const SelectBankSchema = z.object({
  bank: z.string().min(1, "Required"),
  accountNumber: z.string().min(1, "Required"),
});

export type SelectBankValidation = z.infer<typeof SelectBankSchema>;

// YouVerify Verification Form Validation
export const VerificationFormSchema = z.object({
  documentType: z.enum(["nin", "bvn"], {
    required_error: "Please select a document type",
  }),
  documentNumber: z
    .string()
    .min(1, "Document number is required")
    .refine((value) => {
      // Remove any non-digit characters for validation
      const cleanValue = value.replace(/\D/g, "");
      return cleanValue.length === 11; // Both BVN and NIN are 11 digits
    }, "Document number must be 11 digits"),
  firstName: z
    .string()
    .min(2, "First name must be at least 2 characters")
    .max(50, "First name must not exceed 50 characters"),
  lastName: z
    .string()
    .min(2, "Last name must be at least 2 characters")
    .max(50, "Last name must not exceed 50 characters"),
});

export type VerificationFormValidation = z.infer<typeof VerificationFormSchema>;
