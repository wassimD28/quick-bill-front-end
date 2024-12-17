// invoice/_components/accountForm.component.tsx
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useInvoiceContext } from "@/context/invoice.context";
import { updateAccountField } from "@/lib/utils";
import { Account, AccountFromProps } from "@/types/interfaces/common.interface";
import { ChangeEvent } from "react";

export const AccountFrom: React.FC<AccountFromProps> = ({ role }) => {
  const { invoiceData, updateInvoiceData } = useInvoiceContext();

  // Find the account data for this form
  const accounts = invoiceData.detailsPanelData.accounts;
  const accountData =
    accounts.find((account) => account.role === role) || accounts[0];

  // Handler for all input changes
  const handleInputChange =
    (field: keyof Account) => (e: ChangeEvent<HTMLInputElement>) => {
      const newValue = e.target.value;
      const updatedInvoiceData = updateAccountField(
        invoiceData,
        role,
        field,
        newValue,
      );
      updateInvoiceData(updatedInvoiceData);
    };
    

  return (
    <div className="flex flex-col gap-2">
      {/* account name */}
      <div className="flex flex-col gap-2">
        <Label className="text-xs first-letter:uppercase" htmlFor="accountName">
          {accountData.role + " Name"}
        </Label>
        <Input
          className="h-9 text-xs max-w-[280px]"
          value={accountData.name}
          onChange={handleInputChange("name")}
          placeholder="John Doe"
        />
      </div>
      {/* account email */}
      <div className="flex flex-col gap-2">
        <Label
          className="text-xs first-letter:uppercase"
          htmlFor="accountEmail"
        >
          {accountData.role + " Email"}
        </Label>
        <Input
          className="h-9 text-xs max-w-[280px]"
          value={accountData.email}
          onChange={handleInputChange("email")}
          id="accountEmail"
          placeholder="john.doe@example.com"
        />
      </div>
      {/* account address */}
      <div className="flex flex-col gap-2">
        <Label
          className="text-xs first-letter:uppercase"
          htmlFor="accountAddress"
        >
          {accountData.role + " Address"}
        </Label>
        <Input
          className="h-9 text-xs max-w-[280px]"
          value={accountData.address}
          onChange={handleInputChange("address")}
          id="accountAddress"
          placeholder="123 Main St, Anytown, USA"
        />
      </div>
      <div className="grid grid-cols-2 gap-2">
        {/* account zip code */}
        <div className="flex flex-col gap-2">
          <Label
            className="text-xs first-letter:uppercase"
            htmlFor="accountZipCode"
          >
            {accountData.role + " Zip"}
          </Label>
          <Input
            className="h-9 text-xs max-w-[280px]"
            value={accountData.zipCode}
            onChange={handleInputChange("zipCode")}
            id="accountZipCode"
            placeholder="12345"
          />
        </div>
        {/* account city */}
        <div className="flex flex-col gap-2">
          <Label className="text-xs first-letter:uppercase" htmlFor="accountCity">
            {accountData.role + " City"}
          </Label>
          <Input
            className="h-9 text-xs max-w-[280px]"
            value={accountData.city}
            onChange={handleInputChange("city")}
            id="accountCity"
            placeholder="Anytown"
          />
        </div>
        {/* account country */}
        <div className="flex flex-col gap-2">
          <Label
            className="text-xs first-letter:uppercase"
            htmlFor="accountCountry"
          >
            {accountData.role + " Country"}
          </Label>
          <Input
            className="h-9 text-xs max-w-[280px]"
            value={accountData.country}
            onChange={handleInputChange("country")}
            id="accountCountry"
            placeholder="USA"
          />
        </div>
        {/* account phone */}
        <div className="flex flex-col gap-2">
          <Label
            className="text-xs first-letter:uppercase"
            htmlFor="accountPhone"
          >
            {accountData.role + " Phone"}
          </Label>
          <Input
            className="h-9 text-xs max-w-[280px]"
            value={accountData.phone}
            onChange={handleInputChange("phone")}
            id="accountPhone"
            placeholder="123-456-7890"
          />
        </div>
      </div>
    </div>
  );
};
