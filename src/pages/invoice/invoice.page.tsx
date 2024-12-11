// invoice/invoice.page.tsx
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { InvoicePreview } from "./_components/InvoicePreview.component";
import { InvoiceDetails } from "./_components/InvoiceDetails.component";
import { AccountProvider } from "@/context/account.context";

export const InvoicePage = () => {
  return (
    <>
      <div className="flex h-full w-full flex-row justify-between px-3 pb-1 pt-14 2xl:pt-20 dark:bg-[#0e0c0b] dark:text-white">
        <AccountProvider>
          {/* Invoice details */}
          <InvoiceDetails />
          {/* Invoice live preview */}
          <InvoicePreview />
          {/* Invoice Style */}
          <Card>
            <CardHeader>
              <CardTitle>Styling</CardTitle>
            </CardHeader>
            <div className="grid grid-cols-2 gap-4 w-[300px]"></div>
          </Card>
        </AccountProvider>
      </div>
    </>
  );
};
