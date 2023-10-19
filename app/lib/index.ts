import { z } from "zod";

export type TSchema = z.infer<typeof schema>;
export const schema = z.object({
  firstname: z.string().min(3, "Please enter your first name"),
  surname: z.string().min(3, "Please enter your surname"),
  email: z.string().email("Email is invalid!"),
  code: z.string(),
  number: z
    .string()
    .min(11, "Phone number should not be lesser than 11 digits")
    .max(14, "Phone number should not exceed 14 digits"),
  message: z.string().min(3, "Please leave your message here!"),
});

export const capitalizeFirstLetter = (words: string): string => {
  const separateWord = words.toLowerCase().split(" ");
  for (let i = 0; i < separateWord.length; i++) {
    separateWord[i] =
      separateWord[i].charAt(0).toUpperCase() + separateWord[i].substring(1);
  }
  return separateWord.join(" ");
};
