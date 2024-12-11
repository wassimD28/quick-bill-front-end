import { AccountRole } from "../enum/common.enum";

export interface MyLink{
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