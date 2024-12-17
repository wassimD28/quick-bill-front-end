import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useInvoiceContext } from "@/context/invoice.context";
import { InvoiceDetailsInterface } from "@/types/interfaces/common.interface";
import { ChangeEvent } from "react";

export const NotesAndTerms = () => {
  const { invoiceData, updateInvoiceData } = useInvoiceContext();
  const notes = invoiceData.detailsPanelData.invoiceDetails;

  const handleInputChange =
    (field: keyof InvoiceDetailsInterface) =>
    (event: ChangeEvent<HTMLTextAreaElement>) => {
      updateInvoiceData({
        detailsPanelData: {
          ...invoiceData.detailsPanelData,
          invoiceDetails: {
            ...invoiceData.detailsPanelData.invoiceDetails,
            [field]: event.target.value,
          },
        },
      });
    };

  return (
    <>
      <div className="mt-2 flex w-full flex-col gap-2 rounded pl-2 pr-1">
        {/* Additional Notes */}
        <div className="flex flex-col gap-2">
          <Label
            className="text-xs text-white/60 first-letter:uppercase"
            htmlFor="additionalNotes"
          >
            Additional Notes
          </Label>
          <Textarea
            id="additionalNotes"
            className="min-h-[100px] max-w-full resize-y p-2 text-xs"
            style={{ whiteSpace: "pre-line" }}
            wrap="hard"
            value={notes.additionalNotes}
            onChange={handleInputChange("additionalNotes")}
            placeholder="1 - you can add additional notes here."
          />
        </div>
        {/* Payment Terms */}
        <div className="flex flex-col gap-2">
          <Label
            className="text-xs text-white/60 first-letter:uppercase"
            htmlFor="paymentTerms"
          >
            Payment Terms
          </Label>
          <Textarea
            id="paymentTerms"
            className="min-h-[100px] max-w-full resize-y p-2 text-xs"
            style={{ whiteSpace: "pre-line" }}
            wrap="hard"
            value={notes.paymentTerms}
            onChange={handleInputChange("paymentTerms")}
            placeholder="1 - you can add payment terms here."
          />
        </div>
      </div>
    </>
  );
};
