// invoice/_components/invoicDetails.component.tsx
import { CardTitle } from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AccountFrom } from "./accountForm.component";
import { AccountRole } from "@/types/enum/common.enum";
import { Input } from "@/components/ui/input";
import { ChevronDown, ChevronUp, Plus, Trash } from "lucide-react";
import { Button } from "@/components/ui/button";

export const InvoiceDetails = () => {
  return (
    <div className="flex w-[400px] flex-col rounded-md p-3 dark:bg-card">
      <CardTitle className="mb-2">Details</CardTitle>
      <hr />
      <div className="flex flex-col overflow-y-scroll scrollbar-none">
        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="item-1">
            <AccordionTrigger className="pl-2 hover:bg-accent hover:no-underline">
              Sender & Receiver
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
            <AccordionTrigger className="pl-2 hover:bg-accent hover:no-underline">
              Invoice Details
            </AccordionTrigger>
            <AccordionContent>
              Yes. It comes with default styles that matches the other
              components' aesthetic.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-3">
            <AccordionTrigger className="pl-2 hover:bg-accent hover:no-underline">
              Item Table
            </AccordionTrigger>
            <AccordionContent>
              <table className="mb-2 mt-2 w-full">
                <thead className="px-2">
                  <tr className="py-1">
                    <th className="w-8 bg-card"></th>
                    <th className="rounded-l-md bg-accent py-1 pl-2 text-start">
                      Item
                    </th>
                    <th className="bg-accent py-1 pl-2 text-start">QTY</th>
                    <th className="rounded-r-md bg-accent py-1 pl-2 text-start">
                      Rate
                    </th>
                    <th className="w-8 bg-card"></th>
                  </tr>
                </thead>
                <tbody className="px-2">
                  {/* start line item  */}
                  <tr className="border-t-4 border-card text-center">
                    <td className="">
                      <Trash className="mr-1 h-8 w-8 rounded bg-destructive p-2 hover:bg-red-600 cursor-pointer" />
                    </td>
                    {/* product name  */}
                    <td className="rounded-l-md bg-background py-1 pl-1">
                      <Input
                        type="text"
                        className="h-8 w-36 bg-transparent focus:border-white focus:ring-0 focus-visible:ring-transparent focus-visible:ring-offset-0"
                        placeholder="product"
                      />
                    </td>
                    {/* quantity  */}
                    <td className="bg-background py-1">
                      <Input
                        className="h-8 w-14 bg-transparent [appearance:textfield] focus:border-white focus:ring-0 focus-visible:ring-transparent focus-visible:ring-offset-0 [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
                        type="number"
                        placeholder="0"
                      />
                    </td>
                    {/* rate  */}
                    <td className="rounded-r-md bg-background py-1">
                      <Input
                        className="h-8 w-20 bg-transparent pr-1 [appearance:textfield] focus:border-white focus:ring-0 focus-visible:ring-transparent focus-visible:ring-offset-0 [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
                        type="number"
                        placeholder="0"
                      />
                    </td>
                    {/* edit item order  */}
                    <td className="">
                      <ChevronUp className="mb-1 ml-1 h-4 w-8 rounded bg-accent px-2 hover:bg-accent-foreground hover:text-accent cursor-pointer" />
                      <ChevronDown className="ml-1 h-4 w-8 rounded bg-accent px-2 hover:bg-accent-foreground hover:text-accent cursor-pointer" />
                    </td>
                  </tr>
                  {/* end line item  */}
                </tbody>
              </table>
              {/* add item button */}
              <Button className="w-full"><Plus /> Add Item</Button>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </div>
  );
};
