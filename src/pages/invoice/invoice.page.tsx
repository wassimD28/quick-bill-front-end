// invoice/invoice.page.tsx
import { CardTitle } from "@/components/ui/card";
import { InvoicePreview } from "./_components/InvoicePreview.component";
import { InvoiceInformation } from "./_components/invoiceInformation.component";
import { InvoiceProvider } from "@/context/invoice.context";

export const InvoicePage = () => {
  return (
    <>
      <div className="flex h-full w-full flex-row justify-between px-3 pb-1 pt-14 dark:bg-[#0e0c0b] dark:text-white 2xl:pt-20">
        <InvoiceProvider>
          {/* Invoice details */}
          <InvoiceInformation />
          {/* Invoice live preview */}
          <InvoicePreview />
          {/* Invoice Style */}

          <div className="flex flex-col rounded bg-card p-3">
              <CardTitle className="mb-2">Design</CardTitle>
            <div className="flex h-[80%] w-[280px] items-center justify-center gap-4 text-sm text-white/60 2xl:w-[400px]">
              This part is still under development.
            </div>
          </div>
        </InvoiceProvider>
      </div>
    </>
  );
};
