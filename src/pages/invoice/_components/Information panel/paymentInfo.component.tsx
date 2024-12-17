import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useInvoiceContext } from "@/context/invoice.context";
import { PaymentInfoInterface } from "@/types/interfaces/common.interface";
import { ChangeEvent } from "react";

export const PaymentInfo = () =>{
    const { invoiceData, updateInvoiceData } = useInvoiceContext();
    const paymentInfo = invoiceData.detailsPanelData.paymentInfo;
    const handleInputChange =
      (field: keyof PaymentInfoInterface) =>
      (event: ChangeEvent<HTMLInputElement>) => {
        updateInvoiceData({
          detailsPanelData: {
            ...invoiceData.detailsPanelData,
            paymentInfo: {
              ...invoiceData.detailsPanelData.paymentInfo,
              [field]: event.target.value,
            },
          },
        });
      };
    return (
      <>
        <div className="mt-2 grid w-full grid-cols-2 gap-2 pl-4 pr-2">
          {/* invoice number */}
          <div className="flex flex-col gap-2">
            <Label className="text-xs text-white/70 first-letter:uppercase">
              Account Name
            </Label>
            <Input
              className="h-8 max-w-[280px] text-xs"
              value={paymentInfo.accountName}
              onChange={handleInputChange("accountName")}
              placeholder="John Doe"
            />
          </div>
          
          {/* account number */}
          <div className="flex flex-col gap-2">
            <Label className="text-xs text-white/70 first-letter:uppercase">
              Account Number
            </Label>
            <Input
              className="h-8 max-w-[280px] text-xs"
              value={paymentInfo.accountNumber}
              onChange={handleInputChange("accountNumber")}
              placeholder="account number"
            />
          </div>
          {/* account number */}
          <div className="flex flex-col gap-2">
            <Label className="text-xs text-white/70 first-letter:uppercase">
              Bank Name
            </Label>
            <Input
              className="h-8 max-w-[280px] text-xs"
              value={paymentInfo.bankName}
              onChange={handleInputChange("bankName")}
              placeholder="bank name"
            />
          </div>
        </div>
      </>
    );
}