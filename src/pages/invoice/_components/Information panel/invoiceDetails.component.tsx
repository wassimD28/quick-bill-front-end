import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useInvoiceContext } from "@/context/invoice.context";
import { cn } from "@/lib/utils";
import { InvoiceDetailsInterface } from "@/types/interfaces/common.interface";
import { CalendarIcon } from "lucide-react";
import { ChangeEvent } from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { SubUnit } from "@/constant/currencySubUnits.constant";

export const InvoiceDetails = () => {
  const { invoiceData, updateInvoiceData } = useInvoiceContext();
  const invoiceDetails = invoiceData.detailsPanelData.invoiceDetails;
  const currencyArray = Object.keys(SubUnit);

  const handleInputChange =
    (field: keyof InvoiceDetailsInterface) =>
    (event: ChangeEvent<HTMLInputElement>) => {
      updateInvoiceData({
        detailsPanelData: {
          ...invoiceData.detailsPanelData,
          invoiceDetails: {
            ...invoiceData.detailsPanelData.invoiceDetails,
            [field]: event.target.value,
          },
        },
      });
    };
  const handleSelectChange = (value: string) => {
    updateInvoiceData({
      detailsPanelData: {
        ...invoiceData.detailsPanelData,
        invoiceDetails: {
          ...invoiceData.detailsPanelData.invoiceDetails,
          currency: value,
        },
      },
    });
  };

  const handleDateChange =
    (field: keyof InvoiceDetailsInterface) => (date: Date | undefined) => {
      if (!date) return;
      updateInvoiceData({
        detailsPanelData: {
          ...invoiceData.detailsPanelData,
          invoiceDetails: {
            ...invoiceData.detailsPanelData.invoiceDetails,
            [field]: date,
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
            Invoice Number
          </Label>
          <Input
            className="h-8 max-w-[280px] text-xs"
            value={invoiceDetails.invoiceNumber}
            onChange={handleInputChange("invoiceNumber")}
            placeholder="0"
          />
        </div>
        {/* currency */}
        <div className="flex flex-col gap-2">
          <Label className="text-xs text-white/70 first-letter:uppercase">
            Currency
          </Label>
          <Select
            onValueChange={handleSelectChange}
            value={invoiceDetails.currency}
          >
            <SelectTrigger className="h-8 w-[180px]">
              <SelectValue placeholder="Select currency" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                {currencyArray.map((currency, index) => (
                  <SelectItem key={index} value={currency}>
                    {currency}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
        {/* issue date */}
        <div className="flex flex-col gap-2">
          <Label className="text-xs text-white/70 first-letter:uppercase">
            Issue Date
          </Label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant={"outline"}
                className={cn(
                  "h-8 max-w-[280px] justify-start text-left font-normal",
                  !invoiceDetails.issueDate && "text-muted-foreground",
                )}
              >
                <CalendarIcon />
                {invoiceDetails.issueDate ? (
                  format(invoiceDetails.issueDate, "PPP")
                ) : (
                  <span>Pick a date</span>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
              <Calendar
                mode="single"
                selected={invoiceDetails.issueDate ?? undefined}
                onSelect={handleDateChange("issueDate")}
                initialFocus
              />
            </PopoverContent>
          </Popover>
        </div>
        {/* due date */}
        <div className="flex flex-col gap-2">
          <Label className="text-xs text-white/70 first-letter:uppercase">
            Due Date
          </Label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant={"outline"}
                className={cn(
                  "h-8 max-w-[280px] justify-start text-left font-normal",
                  !invoiceDetails.dueDate && "text-muted-foreground",
                )}
              >
                <CalendarIcon />
                {invoiceDetails.dueDate ? (
                  format(invoiceDetails.dueDate, "PPP")
                ) : (
                  <span>Pick a date</span>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
              <Calendar
                mode="single"
                selected={invoiceDetails.dueDate ?? undefined}
                onSelect={handleDateChange("dueDate")}
                initialFocus
              />
            </PopoverContent>
          </Popover>
        </div>
        {/* paid amount */}
        <div className="flex flex-col gap-2">
          <Label className="text-xs text-white/70 first-letter:uppercase">
            Paid Amount
          </Label>
          <Input
            className="h-8 max-w-[280px] text-xs"
            value={invoiceDetails.paidAmount}
            onChange={handleInputChange("paidAmount")}
            placeholder="0"
          />
        </div>
      </div>
    </>
  );
};
