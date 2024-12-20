// invoice/_components/invoicDetails.component.tsx
import { CardTitle } from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AccountFrom } from "./Information panel/accountForm.component";
import { AccountRole } from "@/types/enum/common.enum";
import { ItemTable } from "./Information panel/itemTable.component";
import { InvoiceDetails } from "./Information panel/invoiceDetails.component";
import { PaymentInfo } from "./Information panel/paymentInfo.component";
import { NotesAndTerms } from "./Information panel/notesAndTerms.component";
import { Calculator, CreditCard, FileUp, Grid3X3, Handshake, ReceiptText, Users } from "lucide-react";
import { InvoiceAdjustment } from "./Information panel/invoiceAdjustment.component";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export const InvoiceInformation = () => {
  return (
    <div className="flex w-[420px] flex-col rounded-md p-3 dark:bg-card">
      <CardTitle className="mb-2 flex justify-between items-center">Details
        <Link to={"/preview"}>
          <Button variant={"outline"} className="h-9 2xl:h-10">
            Export
            <FileUp/>
          </Button>
        </Link>
      </CardTitle>
      <hr />
      <div className="flex flex-col overflow-y-scroll scrollbar-none">
        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="item-1">
            <AccordionTrigger className="h-9 px-2 text-white/80 hover:bg-accent hover:no-underline">
              <div className="flex gap-2">
                <Users /> Sender & Receiver
              </div>
            </AccordionTrigger>
            <AccordionContent>
              <div className="flex flex-col gap-2 pl-5 pr-2 pt-2">
                <Tabs defaultValue="sender">
                  <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="sender">Sender</TabsTrigger>
                    <TabsTrigger value="receiver">Receiver</TabsTrigger>
                  </TabsList>
                  <TabsContent value="sender">
                    <AccountFrom role={AccountRole.SENDER} />
                  </TabsContent>
                  <TabsContent value="receiver">
                    <AccountFrom role={AccountRole.RECIPIENT} />
                  </TabsContent>
                </Tabs>
              </div>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-2">
            <AccordionTrigger className="h-9 px-2 text-white/80 hover:bg-accent hover:no-underline">
              <div className="flex gap-2">
                <ReceiptText />
                Invoice Details
              </div>
            </AccordionTrigger>
            <AccordionContent>
              <InvoiceDetails />
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-3">
            <AccordionTrigger className="h-9 px-2 text-white/80 hover:bg-accent hover:no-underline">
              <div className="flex gap-2">
                <Grid3X3 />
                Item Table
              </div>
            </AccordionTrigger>
            <AccordionContent>
              <ItemTable />
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-6">
            <AccordionTrigger className="h-9 px-2 text-white/80 hover:bg-accent hover:no-underline">
              <div className="flex gap-2">
                <Calculator />
                Invoice Adjustment
              </div>
            </AccordionTrigger>
            <AccordionContent>
              <InvoiceAdjustment />
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-4">
            <AccordionTrigger className="h-9 px-2 text-white/80 hover:bg-accent hover:no-underline">
              <div className="flex gap-2">
                <CreditCard />
                Payment Information
              </div>
            </AccordionTrigger>
            <AccordionContent>
              <PaymentInfo />
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-5">
            <AccordionTrigger className="h-9 px-2 text-white/80 hover:bg-accent hover:no-underline">
              <div className="flex gap-2">
                <Handshake />
                Notes & Payment terms
              </div>
            </AccordionTrigger>
            <AccordionContent>
              <NotesAndTerms />
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </div>
  );
};
