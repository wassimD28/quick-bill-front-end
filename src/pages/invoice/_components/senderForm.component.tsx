import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Account, AccountFromProps } from "@/types/interfaces/common.interface";
import { useState } from "react";

export const AccountFrom : React.FC<AccountFromProps>= ({role})=>{
  const [accountData, setAccountData] = useState<Account>({
    name: "",
    email: "",
    address: "",
    phone: "",
    zipCode: "",
    city: "",
    country: "",
  });
  // Handler for all input changes
  const handleInputChange =
    (field: keyof Account) => (e: React.ChangeEvent<HTMLInputElement>) => {
      const newData = {
        ...accountData,
        [field]: e.target.value,
      };
      setAccountData(newData);
    };

  return (
    <div className="flex flex-col gap-2">
      {/* account name */}
      <div className="flex flex-col gap-2">
        <Label className="text-xs" htmlFor="accountName">
          {role + " Name"}
        </Label>
        <Input
          className="h-9 text-xs"
          value={accountData.name}
          onChange={handleInputChange("name")}
          placeholder="John Doe"
        />
      </div>
      {/* account email */}
      <div className="flex flex-col gap-2">
        <Label className="text-xs" htmlFor="accountEmail">
          {role + " Email"}
        </Label>
        <Input
          className="h-9 text-xs"
          value={accountData.email}
          onChange={handleInputChange("email")}
          id="accountEmail"
          placeholder="john.doe@example.com"
        />
      </div>
      {/* account address */}
      <div className="flex flex-col gap-2">
        <Label className="text-xs" htmlFor="accountAddress">
          {role + " Address"}
        </Label>
        <Input
          className="h-9 text-xs"
          value={accountData.address}
          onChange={handleInputChange("address")}
          id="accountAddress"
          placeholder="123 Main St, Anytown, USA"
        />
      </div>
      {/* account zip code */}
      <div className="flex flex-col gap-2">
        <Label className="text-xs" htmlFor="accountZipCode">
          {role + " Zip"}
        </Label>
        <Input
          className="h-9 text-xs"
          value={accountData.zipCode}
          onChange={handleInputChange("zipCode")}
          id="accountZipCode"
          placeholder="12345"
        />
      </div>
      {/* account city */}
      <div className="flex flex-col gap-2">
        <Label className="text-xs" htmlFor="accountCity">
          {role + " City"}
        </Label>
        <Input
          className="h-9 text-xs"
          value={accountData.city}
          onChange={handleInputChange("city")}
          id="accountCity"
          placeholder="Anytown"
        />
      </div>
      {/* account country */}
      <div className="flex flex-col gap-2">
        <Label className="text-xs" htmlFor="accountCountry">
          {role + " Country"}
        </Label>
        <Input
          className="h-9 text-xs"
          value={accountData.country}
          onChange={handleInputChange("country")}
          id="accountCountry"
          placeholder="USA"
        />
      </div>
      {/* account phone */}
      <div className="flex flex-col gap-2">
        <Label className="text-xs" htmlFor="accountPhone">
          {role + " Phone"}
        </Label>
        <Input
          className="h-9 text-xs"
          value={accountData.phone}
          onChange={handleInputChange("phone")}
          id="accountPhone"
          placeholder="123-456-7890"
        />
      </div>
    </div>
  );
}