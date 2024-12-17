// First, let's define our types
import { AccountRole, AmountType } from "@/types/enum/common.enum";
import {
  Account,
  InvoiceContextData,
} from "@/types/interfaces/common.interface";
import { createContext, useContext, useState, ReactNode } from "react";

// Type definition for the context value
type InvoiceContextType = {
  invoiceData: InvoiceContextData;
  updateInvoiceData: (newData: InvoiceContextData) => void;
};
const defaultAccounts: Account[] = [
  {
    role: AccountRole.SENDER,
    name: "",
    email: "",
    address: "",
    phone: "",
    zipCode: "",
    city: "",
    country: "",
  },
  {
    role: AccountRole.RECIPIENT,
    name: "",
    email: "",
    address: "",
    phone: "",
    zipCode: "",
    city: "",
    country: "",
  },
];

const defaultInvoiceData: InvoiceContextData = {
  detailsPanelData: {
    accounts: defaultAccounts,
    invoiceDetails: {
      invoiceLogo: "",
      invoiceNumber: "",
      issueDate: null,
      dueDate: null,
      currency: "USD",
      paidAmount: "",
      subTotal: 0,
      tax: {
        isExist: false,
        amountType: AmountType.AMOUNT,
        amount: 0,
      },
      discount: {
        isExist: false,
        amountType: AmountType.AMOUNT,
        amount: 0,
      },
      shipping: {
        isExist: false,
        amountType: AmountType.AMOUNT,
        amount: 0,
      },
      totalAmount: 0,
      includeWords: false,
      additionalNotes: "",
      paymentTerms: "",
    },
    items: [
      { name: "Laptop", quantity: 2, price: 1500 },
      { name: "Keyboard", quantity: 5, price: 100 },
      { name: "Mouse", quantity: 10, price: 50 },
      { name: "Monitor", quantity: 3, price: 300 },
      { name: "Headphones", quantity: 4, price: 200 },
    ],
    paymentInfo: {
      bankName: "",
      accountNumber: "",
      accountName: "",
    },
  },
};
// Create the context with an initial undefined value
// We use null as initial value and handle it in the useInvoiceContext hook
const InvoiceContext = createContext<InvoiceContextType | null>(null);

// Props type for our provider component
type InvoiceProviderProps = {
  children: ReactNode; // ReactNode allows any valid JSX content
};

// Create the provider component
export function InvoiceProvider({ children }: InvoiceProviderProps) {
  // Initialize state with defaultInvoiceData
  const [invoiceData, setInvoiceData] =
    useState<InvoiceContextData>(defaultInvoiceData);

  // Function to update invoice data
  const updateInvoiceData = (newData: InvoiceContextData) => {
    setInvoiceData(newData);
  };

  // Create the value object that will be passed to consuming components
  const value = {
    invoiceData,
    updateInvoiceData,
  };

  // Wrap children with the context provider
  return (
    <InvoiceContext.Provider value={value}>{children}</InvoiceContext.Provider>
  );
}

// Custom hook to use the invoice context
export function useInvoiceContext() {
  // Get the context value
  const context = useContext(InvoiceContext);

  // Throw an error if trying to use context outside of provider
  if (context === null) {
    throw new Error("useInvoiceContext must be used within an InvoiceProvider");
  }

  return context;
}
