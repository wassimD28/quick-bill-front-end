import { AccountRole } from "@/types/enum/common.enum";
import { SubUnit } from "@/constant/currencySubUnits.constant";
import { Account, InvoiceContextData } from "@/types/interfaces/common.interface";
import { clsx, type ClassValue } from "clsx"
import getSymbolFromCurrency from "currency-symbol-map";
import { toWords } from "number-to-words";
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Helper function to update a specific account in the accounts array
export const updateAccountField = (
  currentData: InvoiceContextData,
  role: AccountRole,
  field: keyof Account,
  value: string,
): InvoiceContextData => {
  // Create a new accounts array with the updated account
  const updatedAccounts = currentData.detailsPanelData.accounts.map(
    (account) => {
      // Only update the account that matches the role
      if (account.role === role) {
        return {
          ...account,
          [field]: value,
        };
      }
      return account;
    },
  );

  // Return new invoice data with updated accounts
  return {
    ...currentData,
    detailsPanelData: {
      ...currentData.detailsPanelData,
      accounts: updatedAccounts,
    },
  };
};

export const setCurrencySymbol = (currencyName: string)=>{
  if (currencyName!==null){
    const currencySymbol = getSymbolFromCurrency(currencyName);
    if (currencySymbol !== undefined)
      return currencySymbol;
    else
      return '$';
  }
}


export type CurrencyCode = keyof typeof SubUnit;

export function convertAmountToWords(amount: number, currencyCode: CurrencyCode = 'USD'): string {
    // Get currency details
    const currencyName = currencyCode as CurrencyCode;
    if (!currencyName) {
        currencyCode = 'USD';
    }

    // Split the number into integer and decimal parts
    const [integer, decimal] = amount.toString().split('.');
    
    // Convert integer part
    const integerWords = toWords(parseInt(integer));
    
    // Capitalize first letter
    const capitalizedIntegerWords = integerWords.charAt(0).toUpperCase() + integerWords.slice(1);
    
    // If no decimal, return just the integer part with currency
    if (!decimal) {
        return `${capitalizedIntegerWords} ${currencyName}`;
    }
    
    // Handle decimal part
    // Pad with zeros if needed to ensure 2 decimal places
    const paddedDecimal = decimal.padEnd(2, '0').slice(0, 2);
    const decimalWords = toWords(parseInt(paddedDecimal));
    
    // Get the subunit name (cents for USD, pence for GBP, etc.)
    const subunitName = SubUnit[currencyCode] || "cent";
    
    return `${capitalizedIntegerWords} ${currencyName} and ${decimalWords} ${subunitName}`;
}

