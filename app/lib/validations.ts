import { z } from "zod";

export const SelectBankSchema = z.object({
  bank: z.string().min(1, "Required"),
  accountNumber: z.string().min(1, "Required"),
});

export type SelectBankValidation = z.infer<typeof SelectBankSchema>;
