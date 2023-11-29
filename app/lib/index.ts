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
export const sleep = (ms: number) => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

export const detectOS = () => {
  const platform = navigator.userAgent.toLowerCase();

  if (platform.includes("ios") || platform.includes("mac")) {
    return "iOS";
  } else {
    return "Android";
  }
};
export const formatCurrency = (amount: number | null) => {
  if (!amount) {
    return "0.00";
  }
  const newFormat = new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
  }).format(amount);
  return newFormat;
};

export const convertISOToDateAndFormat = (isoString: string) => {
  const options: Intl.DateTimeFormatOptions = {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: true,
  };
  const dateObject = new Date(isoString);
  const formattedDate = new Intl.DateTimeFormat("en-US", options).format(
    dateObject
  );
  return formattedDate;
};
