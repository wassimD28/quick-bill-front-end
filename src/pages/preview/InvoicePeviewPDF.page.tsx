import { PDFViewer } from "@react-pdf/renderer";
import { InvoicePDF } from "./_components/invoicePDF.component";
import { useInvoiceContext } from "@/context/invoice.context";

export const InvoicePreview = () => {
  const { invoiceData } = useInvoiceContext();

  return (
    <PDFViewer width="100%" height="100%">
      <InvoicePDF invoiceData={invoiceData} />
    </PDFViewer>
  );
};
