import { AccountRole, AmountType } from "../enum/common.enum";

export interface MyLink {
  path: string;
  active: boolean;
  label: string;
}

export interface Account {
  role: AccountRole;
  name: string;
  email: string;
  address: string;
  phone: string;
  zipCode: string;
  city: string;
  country: string;
}

export interface AccountFromProps {
  role: AccountRole;
}

export interface AccountContextType {
  accounts: Account[];
  updateAccount: (role: AccountRole, updates: Partial<Account>) => void;
}

export interface Item {
  name: string;
  quantity: number;
  price: number;
}

export interface PaymentInfoInterface {
  bankName: string;
  accountName: string;
  accountNumber: string;
}

export interface InvoiceContextData {
  detailsPanelData: {
    accounts: Account[];
    invoiceDetails: InvoiceDetailsInterface;
    items: Item[];
    paymentInfo: PaymentInfoInterface;
  };
}

export interface AmountDetails {
  isExist: boolean;
  amountType: AmountType;
  amount: number;
}

export interface InvoiceDetailsInterface {
  invoiceLogo: string;
  invoiceNumber: string;
  issueDate: Date | null;
  dueDate: Date | null;
  currency: string;
  paidAmount: string;
  subTotal: number;
  totalAmount: number;
  tax: AmountDetails;
  shipping: AmountDetails;
  discount: AmountDetails;
  includeWords: boolean;
  additionalNotes: string;
  paymentTerms: string;
}


