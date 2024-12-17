import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { useInvoiceContext } from "@/context/invoice.context";
import { cn, setCurrencySymbol } from "@/lib/utils";
import { AmountType } from "@/types/enum/common.enum";
import { Percent } from "lucide-react";

export const InvoiceAdjustment = () => {
  const { invoiceData, updateInvoiceData } = useInvoiceContext();
  const invoiceDetails = invoiceData.detailsPanelData.invoiceDetails;
  const { tax, discount, shipping } = invoiceDetails;
  const currency = invoiceDetails.currency;

  const handleSwitchChange = (
    type: "tax" | "discount" | "shipping",
    checked: boolean,
  ) => {
    updateInvoiceData({
      detailsPanelData: {
        ...invoiceData.detailsPanelData,
        invoiceDetails: {
          ...invoiceData.detailsPanelData.invoiceDetails,
          [type]: {
            ...invoiceData.detailsPanelData.invoiceDetails[type],
            isExist: checked,
          },
        },
      },
    });
  };

  const handleAmountChange = (
    type: "tax" | "discount" | "shipping",
    value: string,
  ) => {
    const numValue = parseFloat(value);
    let finalValue = numValue;

    // Apply max constraints for discount
    if (type) {
      const maxValue =
        invoiceDetails[type].amountType === AmountType.PERCENTAGE
          ? 99
          : 100000000;
      finalValue = numValue > maxValue ? maxValue : numValue;
    }

    updateInvoiceData({
      detailsPanelData: {
        ...invoiceData.detailsPanelData,
        invoiceDetails: {
          ...invoiceData.detailsPanelData.invoiceDetails,
          [type]: {
            ...invoiceData.detailsPanelData.invoiceDetails[type],
            amount: finalValue,
          },
        },
      },
    });
  };

  const handleAmountTypeChange = (
    type: "tax" | "discount" | "shipping",
    newAmountType: AmountType,
  ) => {
    let newAmount = invoiceDetails[type].amount;

    // If switching to percentage and value is greater than 99, cap it at 99
    if (newAmountType === AmountType.PERCENTAGE && newAmount > 99) {
      newAmount = 99;
    }

    updateInvoiceData({
      detailsPanelData: {
        ...invoiceData.detailsPanelData,
        invoiceDetails: {
          ...invoiceData.detailsPanelData.invoiceDetails,
          [type]: {
            ...invoiceData.detailsPanelData.invoiceDetails[type],
            amountType: newAmountType,
            amount: newAmount,
          },
        },
      },
    });
  };

  return (
    <div className="flex w-full flex-col gap-3 px-6">
      <div className="flex items-center justify-between pt-2">
        {/* tax */}
        <div className="flex items-center gap-2">
          <Label htmlFor="tax">Tax</Label>
          <Switch
            checked={tax.isExist}
            onCheckedChange={(checked) => handleSwitchChange("tax", checked)}
            id="tax"
          />
        </div>
        {/* discount */}
        <div className="flex items-center gap-2">
          <Label htmlFor="discount">Discount</Label>
          <Switch
            checked={discount.isExist}
            onCheckedChange={(checked) =>
              handleSwitchChange("discount", checked)
            }
            id="discount"
          />
        </div>
        {/* shipping */}
        <div className="flex items-center gap-2">
          <Label htmlFor="shipping">Shipping</Label>
          <Switch
            checked={shipping.isExist}
            onCheckedChange={(checked) =>
              handleSwitchChange("shipping", checked)
            }
            id="shipping"
          />
        </div>
      </div>
      {/* Grid layout for inputs */}
      <div className="grid grid-cols-[auto,1fr] items-center gap-2 pl-3">
        {/* Tax input */}
        <Label
          className={cn("text-white/80", !tax.isExist && "opacity-50")}
          htmlFor="taxRate"
        >
          Tax
        </Label>
        <div className="flex items-center gap-2">
          <Input
            className="h-9 w-28 text-xs [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
            disabled={!tax.isExist}
            type="number"
            value={tax.amount}
            onChange={(e) => handleAmountChange("tax", e.target.value)}
            id="taxRate"
          />
          {tax.amountType === AmountType.AMOUNT && tax.isExist && (
            <div
              onClick={() => {
                handleAmountTypeChange("tax", AmountType.PERCENTAGE);
              }}
              className={cn(
                "flex h-7 cursor-pointer select-none items-center justify-center rounded bg-accent px-2 py-1.5 text-lg font-semibold duration-200 ease-in-out hover:bg-black/60 hover:text-primary",
                !tax.isExist && "opacity-50",
                tax.isExist && "hover:bg-black/60 hover:text-primary",
              )}
            >
              {setCurrencySymbol(currency)}
            </div>
          )}
          {tax.amountType === AmountType.PERCENTAGE && tax.isExist && (
            <Percent
              onClick={() => {
                handleAmountTypeChange("tax", AmountType.AMOUNT);
              }}
              className={cn(
                "h-7 w-7 cursor-pointer select-none rounded bg-accent p-1.5 duration-200 ease-in-out",
                !tax.isExist && "opacity-50",
                tax.isExist && "hover:bg-black/60 hover:text-primary",
              )}
            />
          )}
        </div>

        {/* Discount input */}
        <Label
          className={cn("text-white/80", !discount.isExist && "opacity-50")}
          htmlFor="discountRate"
        >
          Discount
        </Label>
        <div className="flex items-center gap-2">
          <Input
            className="h-9 w-28 text-xs [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
            disabled={!discount.isExist}
            type="number"
            value={discount.amount}
            onChange={(e) => handleAmountChange("discount", e.target.value)}
            id="discountRate"
          />
          {discount.amountType === AmountType.AMOUNT && discount.isExist && (
            <div
              onClick={() =>
                handleAmountTypeChange("discount", AmountType.PERCENTAGE)
              }
              className={cn(
                "flex h-7 cursor-pointer select-none items-center justify-center rounded bg-accent px-2 py-1.5 text-lg font-semibold duration-200 ease-in-out hover:bg-black/60 hover:text-primary",
                !discount.isExist && "opacity-50",
                discount.isExist && "hover:bg-black/60 hover:text-primary",
              )}
            >
              {setCurrencySymbol(currency)}
            </div>
          )}
          {discount.amountType === AmountType.PERCENTAGE &&
            discount.isExist && (
              <Percent
                onClick={() =>
                  handleAmountTypeChange("discount", AmountType.AMOUNT)
                }
                className={cn(
                  "h-7 w-7 cursor-pointer select-none rounded bg-accent p-1.5 duration-200 ease-in-out",
                  !discount.isExist && "opacity-50",
                  discount.isExist && "hover:bg-black/60 hover:text-primary",
                )}
              />
            )}
        </div>

        {/* Shipping input */}
        <Label
          className={cn("text-white/80", !shipping.isExist && "opacity-50")}
          htmlFor="shippingRate"
        >
          Shipping
        </Label>
        <div className="flex items-center gap-2">
          <Input
            className="h-9 w-28 text-xs [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
            disabled={!shipping.isExist}
            type="number"
            value={shipping.amount}
            onChange={(e) => handleAmountChange("shipping", e.target.value)}
            id="shippingRate"
          />
          {shipping.amountType === AmountType.AMOUNT && shipping.isExist && (
            <div
              onClick={() => {
                handleAmountTypeChange("shipping", AmountType.PERCENTAGE);
              }}
              className={cn(
                "flex h-7 cursor-pointer select-none items-center justify-center rounded bg-accent px-2 py-1.5 text-lg font-semibold duration-200 ease-in-out hover:bg-black/60 hover:text-primary",
                !shipping.isExist && "opacity-50",
                shipping.isExist && "hover:bg-black/60 hover:text-primary",
              )}
            >
              {setCurrencySymbol(currency)}
            </div>
          )}
          {shipping.amountType === AmountType.PERCENTAGE &&
            shipping.isExist && (
              <Percent
                onClick={() => {
                  handleAmountTypeChange("shipping", AmountType.AMOUNT);
                }}
                className={cn(
                  "h-7 w-7 cursor-pointer select-none rounded bg-accent p-1.5 duration-200 ease-in-out",
                  !shipping.isExist && "opacity-50",
                  shipping.isExist && "hover:bg-black/60 hover:text-primary",
                )}
              />
            )}
        </div>
      </div>
    </div>
  );
};

export default InvoiceAdjustment;
