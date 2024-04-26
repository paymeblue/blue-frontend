import AccessBankLogo from "@components/assets/icons/banks/access-bank";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@components/ui/form";
import { Input } from "@components/ui/input";
import { Input as InputWithIcon } from "@components/ui/input-with-icon";
import { Sheet, SheetContent, SheetTrigger } from "@components/ui/sheet";
import { zodResolver } from "@hookform/resolvers/zod";
import { SelectBankSchema, SelectBankValidation } from "@lib/validations";
import { ChevronDown, Search } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";

interface IBankList {
  onChange: (x: string) => void;
  onClose: () => void;
}

const BankList = ({ onChange, onClose }: IBankList) => {
  return (
    <div className="flex flex-col w-full">
      <h4 className="text-center mb-4">Select Bank</h4>
      <InputWithIcon
        placeholder="Search Bank"
        className="rounded-full bg-transparent border border-[#E5E6E8]"
        icon={<Search size={14} color="#00000079" />}
        iconPosition="right"
      />
      <div className="mt-4 flex w-full flex-col space-y-4">
        <div
          className="w-full flex items-center justify-between"
          onClick={() => {
            onChange("Access Bank");
            onClose();
          }}
        >
          <div className="flex w-full space-x-3 items-center">
            <div className="w-8 aspect-square flex items-center justify-center bg-[#FFF0DE] rounded-full">
              <AccessBankLogo className="w-5" />
            </div>
            <span className="text-[#32374E] font-[300] text-sm">
              Access Bank
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

const SelectBank = () => {
  const [open, setOpen] = useState(false);
  const router = useRouter();

  const form = useForm<SelectBankValidation>({
    resolver: zodResolver(SelectBankSchema),
    defaultValues: {
      accountNumber: "",
      bank: "",
    },
  });

  const onSubmit = (values: SelectBankValidation) => {
    console.log({ values });
    router.push("?step=success");
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col">
        <FormField
          control={form.control}
          name="bank"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Bank name</FormLabel>
              <FormControl>
                <Sheet open={open} onOpenChange={setOpen}>
                  <SheetTrigger asChild>
                    <InputWithIcon
                      placeholder="Select"
                      value={field.value || "Select"}
                      // className="pointer-events-none"
                      icon={<ChevronDown size={16} color="#77758E" />}
                      iconPosition="right"
                    />
                  </SheetTrigger>
                  <SheetContent side="bottom" className="min-h-[60vh]">
                    <BankList
                      onChange={field.onChange}
                      onClose={() => setOpen(false)}
                    />
                  </SheetContent>
                </Sheet>
              </FormControl>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="accountNumber"
          render={({ field }) => (
            <FormItem className="mt-4">
              <FormLabel>Account Number</FormLabel>
              <FormControl>
                <Input placeholder="Account number" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <button
          type="submit"
          className="mx-auto !mt-10 disabled:text-gray-900 disabled:cursor-not-allowed bg-primary w-full rounded-lg disabled:bg-gray-200 disabled:border-none text-[0.9375rem] font-medium text-white p-4 leading-[21px]"
        >
          Proceed
        </button>
      </form>
    </Form>
  );
};

export default SelectBank;
