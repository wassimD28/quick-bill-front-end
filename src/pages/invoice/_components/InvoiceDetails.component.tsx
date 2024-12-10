import { CardTitle } from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AccountFrom } from "./senderForm.component";

export const InvoiceDetails = () => {
  return (
    <div className="flex w-[400px] flex-col rounded-md p-3 dark:bg-card">
      <CardTitle className="mb-2">Details</CardTitle>
      <hr />
      <div className="scrollbar-none flex flex-col overflow-y-scroll">
        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="item-1">
            <AccordionTrigger>Sender Details</AccordionTrigger>
            <AccordionContent>
              <div className="flex flex-col gap-2 pl-5 pr-2 pt-2">
                <Tabs defaultValue="sender">
                  <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="sender">Sender</TabsTrigger>
                    <TabsTrigger value="receiver">Receiver</TabsTrigger>
                  </TabsList>
                  <TabsContent value="sender">
                    <AccountFrom role={"Sender"}/>
                  </TabsContent>
                  <TabsContent value="receiver">
                    <AccountFrom role={"Client"}/>
                  </TabsContent>
                </Tabs>
              </div>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-2">
            <AccordionTrigger>Is it styled?</AccordionTrigger>
            <AccordionContent>
              Yes. It comes with default styles that matches the other
              components' aesthetic.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-3">
            <AccordionTrigger>Is it animated?</AccordionTrigger>
            <AccordionContent>
              Yes. It's animated by default, but you can disable it if you
              prefer.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </div>
  );
};
