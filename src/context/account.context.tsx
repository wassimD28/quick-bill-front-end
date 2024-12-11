// context/account.context.tsx
import { Account } from "@/types/interfaces/common.interface";
import { AccountRole } from "@/types/enum/common.enum";
import { createContext, useContext, useState, ReactNode } from "react";

interface AccountContextType {
  accounts: Account[];
  updateAccount: (role: AccountRole, updates: Partial<Account>) => void;
}

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

export const AccountContext = createContext<AccountContextType | undefined>(
  undefined,
);

export const AccountProvider = ({ children }: { children: ReactNode }) => {
  const [accounts, setAccounts] = useState<Account[]>(defaultAccounts);

  const updateAccount = (role: AccountRole, updates: Partial<Account>) => {
    setAccounts((currentAccounts) =>
      currentAccounts.map((account) =>
        account.role === role ? { ...account, ...updates } : account,
      ),
    );
  };

  return (
    <AccountContext.Provider value={{ accounts, updateAccount }}>
      {children}
    </AccountContext.Provider>
  );
};

export const useAccountContext = () => {
  const context = useContext(AccountContext);
  if (!context) {
    throw new Error("useAccountContext must be used within an AccountProvider");
  }
  return context;
};
