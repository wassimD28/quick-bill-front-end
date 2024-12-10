import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { InvoicePreview } from "./_components/InvoicePreview.component";
import { InvoiceDetails } from "./_components/InvoiceDetails.component";


export const InvoicePage = () => {
  return (
    <>
      <div className="flex h-full w-full flex-row justify-between px-3 pb-2 pt-10 dark:bg-[#0e0c0b] dark:text-white">
        <InvoiceDetails/>
        {/* Invoice live preview */}
        <InvoicePreview />
        {/* Invoice details */}
        <Card>
          <CardHeader>
            <CardTitle>Styling</CardTitle>
          </CardHeader>
          <div className="grid grid-cols-2 gap-4"></div>
        </Card>
      </div>
    </>
  );
};
