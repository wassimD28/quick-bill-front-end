import { AmountType } from "@/types/enum/common.enum";

export const calculateTax = (
  amount: number,
  amountType: AmountType,
  subTotal?: number,
) => {
  if (amountType === AmountType.PERCENTAGE && subTotal) {
    return (amount / 100) * subTotal;
  } else {
    return amount;
  }
};
