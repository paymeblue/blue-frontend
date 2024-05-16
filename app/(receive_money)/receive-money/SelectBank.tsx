import { Button } from "@components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@components/ui/dialog";
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
import useAccountVerify from "@hooks/useAccountVerify";
import useGetBanks, { Bank } from "@hooks/useGetBanks";
import useWithdrawFund from "@hooks/useWithdrawFund";
import { SelectBankSchema, SelectBankValidation } from "@lib/validations";
import { message } from "antd";
import { ChevronDown, Search } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

interface IBankList {
  onChange: (x: string) => void;
  onClose: () => void;
  banks: Bank[] | null;
  setBankId: (x: string) => void;
}

const BankList = ({ onChange, onClose, banks, setBankId }: IBankList) => {
  const [searchQuery, setSearchQuery] = useState("");

  // Function to handle search query change
  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  // Filter banks based on search query
  const filteredBanks = banks
    ? banks.filter((bank) =>
        bank.name.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : [];

  return (
    <div className="flex flex-col w-full">
      <h4 className="text-center mb-4">Select Bank</h4>
      <InputWithIcon
        placeholder="Search Bank"
        className="rounded-full bg-transparent border border-[#E5E6E8]"
        icon={<Search size={14} color="#00000079" />}
        iconPosition="right"
        value={searchQuery}
        onChange={handleSearchChange}
      />
      <div className="mt-4 flex w-full flex-col space-y-4 overflow-y-scroll h-[45vh]">
        {filteredBanks.map((bank) => {
          const { id, name } = bank;
          return (
            <div
              key={String(id)}
              className="w-full flex items-center justify-between cursor-pointer"
              onClick={() => {
                onChange(name);
                onClose();
                setBankId(String(id));
              }}
            >
              <div className="flex w-full space-x-3 items-center">
                <span className="text-[#32374E] font-[300] text-sm">
                  {name}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

const SelectBank = ({
  linkId,
  sendReceipt,
}: {
  linkId?: string;
  sendReceipt: (data: any) => void;
}) => {
  const [open, setOpen] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const router = useRouter();
  const { banks, loading } = useGetBanks();
  const [bankId, setBankId] = useState("");
  const {
    account,
    verifyAccount,
    loading: verifying,
    error: isErrorVerifying,
  } = useAccountVerify();
  const [messageApi, contextHolder] = message.useMessage();
  const { handleWithdraw, loading: withdrawing } = useWithdrawFund({
    messageApi,
    onSuccess: (response) => {
      sendReceipt(response.data);
      router.push("?step=success");
    },
  });

  console.log({ banks, loading });

  const form = useForm<SelectBankValidation>({
    resolver: zodResolver(SelectBankSchema),
    defaultValues: {
      accountNumber: "",
      bank: "",
    },
  });

  const onSubmit = async (values: SelectBankValidation) => {
    console.log({ values });
    if (!account) return;
    await handleWithdraw(linkId);
    // router.push("?step=success");
  };

  const handleAccountVerify = (accountNumber: string) => {
    if (!linkId || !accountNumber || !bankId) return;

    verifyAccount(linkId, accountNumber, bankId);
  };

  useEffect(() => {
    const accountNumber = form.watch("accountNumber");
    if (accountNumber.length === 10 && /^\d+$/.test(accountNumber)) {
      handleAccountVerify(accountNumber);
    }
  }, [form.watch("accountNumber")]);

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col flex-1"
      >
        {contextHolder}
        <FormField
          control={form.control}
          name="bank"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Bank name</FormLabel>
              <FormControl>
                <>
                  <div className="lg:hidden">
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
                          banks={banks}
                          setBankId={setBankId}
                        />
                      </SheetContent>
                    </Sheet>
                  </div>

                  <div className="max-lg:hidden">
                    <Dialog open={openDialog} onOpenChange={setOpenDialog}>
                      <DialogTrigger asChild>
                        <InputWithIcon
                          placeholder="Select"
                          value={field.value || "Select"}
                          // className="pointer-events-none"
                          icon={<ChevronDown size={16} color="#77758E" />}
                          iconPosition="right"
                        />
                      </DialogTrigger>

                      <DialogContent className="sm:max-w-[425px]">
                        <BankList
                          onChange={field.onChange}
                          onClose={() => setOpenDialog(false)}
                          banks={banks}
                          setBankId={setBankId}
                        />
                      </DialogContent>
                    </Dialog>
                  </div>
                </>
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
                <Input
                  placeholder="Account number"
                  // type="number"
                  inputMode="numeric"
                  {...field}
                  onChange={(e) => {
                    field.onChange(e.target.value.replace(/\D/g, ""));
                  }}
                  // onBlur={() => handleAccountVerify(field.value)}
                />
              </FormControl>
              <FormMessage />
              {account && (
                <span className="text-sm text-primary">
                  {account.account_name}
                </span>
              )}
              {verifying && (
                <span className="text-sm text-primary">
                  Verifying account number...
                </span>
              )}
              {isErrorVerifying && (
                <span className="text-sm text-red-500">
                  An error occurred verifying. Please try a different account
                  number
                </span>
              )}
            </FormItem>
          )}
        />

        <div className="w-full flex flex-col mt-10">
          <Button type="submit" disabled={!account} loading={withdrawing}>
            Withdraw to bank
          </Button>
          <Button variant="link" type="submit" className="text-[#32374E]">
            Or, Sign up to access your funds
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default SelectBank;
