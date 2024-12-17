import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useInvoiceContext } from "@/context/invoice.context";
import { InvoiceContextData, Item } from "@/types/interfaces/common.interface";
import { ChevronDown, ChevronUp, Plus, Trash } from "lucide-react";

export const ItemTable = () => {
  const { invoiceData, updateInvoiceData } = useInvoiceContext();
  // get item array from invoice data
  const items = invoiceData.detailsPanelData.items;

  // add item functionality
  const addItem = () => {
    const newItem: Item = {
      name: "",
      quantity: 0,
      price: 0,
    };
    const newInvoiceData: InvoiceContextData = {
      detailsPanelData: {
        accounts: invoiceData.detailsPanelData.accounts,
        invoiceDetails: invoiceData.detailsPanelData.invoiceDetails,
        items: [...invoiceData.detailsPanelData.items, newItem],
        paymentInfo: invoiceData.detailsPanelData.paymentInfo,
      },
    };
    updateInvoiceData(newInvoiceData);
  };

  // remove item functionality
  const removeItem = (index: number) => {
    const newItems = invoiceData.detailsPanelData.items.filter(
      (_, i) => i !== index,
    );
    const newInvoiceData: InvoiceContextData = {
      detailsPanelData: {
        accounts: invoiceData.detailsPanelData.accounts,
        invoiceDetails: invoiceData.detailsPanelData.invoiceDetails,
        items: newItems,
        paymentInfo: invoiceData.detailsPanelData.paymentInfo,
      },
    };
    updateInvoiceData(newInvoiceData);
  };

  const moveItemUp = (index: number) => {
    if (index === 0) return; // Can't move the first item up

    const newItems = [...invoiceData.detailsPanelData.items];
    [newItems[index], newItems[index - 1]] = [
      newItems[index - 1],
      newItems[index],
    ];

    const newInvoiceData: InvoiceContextData = {
      detailsPanelData: {
        accounts: invoiceData.detailsPanelData.accounts,
        invoiceDetails: invoiceData.detailsPanelData.invoiceDetails,
        items: newItems,
        paymentInfo: invoiceData.detailsPanelData.paymentInfo,
      },
    };

    updateInvoiceData(newInvoiceData);
  };

  const moveItemDown = (index: number) => {
    if (index === invoiceData.detailsPanelData.items.length - 1) return; // Can't move the last item down

    const newItems = [...invoiceData.detailsPanelData.items];
    [newItems[index], newItems[index + 1]] = [
      newItems[index + 1],
      newItems[index],
    ];

    const newInvoiceData: InvoiceContextData = {
      detailsPanelData: {
        accounts: invoiceData.detailsPanelData.accounts,
        invoiceDetails: invoiceData.detailsPanelData.invoiceDetails,
        items: newItems,
        paymentInfo: invoiceData.detailsPanelData.paymentInfo,
      },
    };

    updateInvoiceData(newInvoiceData);
  };

  // handle input changes
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleInputChange = (index: number, key: keyof Item, value: any) => {
    const newItems = [...invoiceData.detailsPanelData.items];
    newItems[index] = {
      ...newItems[index],
      [key]: value,
    };

    const newInvoiceData: InvoiceContextData = {
      detailsPanelData: {
        accounts: invoiceData.detailsPanelData.accounts,
        invoiceDetails: invoiceData.detailsPanelData.invoiceDetails,
        items: newItems,
        paymentInfo: invoiceData.detailsPanelData.paymentInfo,
      },
    };

    updateInvoiceData(newInvoiceData);
  };

  return (
    <>
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
          {items.map((item, index) => {
            return (
              <tr key={index} className="border-t-4 border-card text-center">
                <td className="">
                  <Trash
                    onClick={() => removeItem(index)}
                    className="mr-1 h-8 w-8 cursor-pointer rounded bg-destructive p-2 hover:bg-red-600"
                  />
                </td>
                {/* product name  */}
                <td className="rounded-l-md bg-background py-1 pl-1">
                  <Input
                    onChange={(e) =>
                      handleInputChange(index, "name", e.target.value)
                    }
                    value={item.name}
                    type="text"
                    className="h-8 w-36 bg-transparent focus:border-white focus:ring-0 focus-visible:ring-transparent focus-visible:ring-offset-0"
                    placeholder="product"
                  />
                </td>
                {/* quantity  */}
                <td className="bg-background py-1">
                  <Input
                    onChange={(e) =>
                      handleInputChange(
                        index,
                        "quantity",
                        e.target.value,
                      )
                    }
                    value={item.quantity}
                    className="h-8 w-14 bg-transparent [appearance:textfield] focus:border-white focus:ring-0 focus-visible:ring-transparent focus-visible:ring-offset-0 [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
                    type="number"
                    placeholder="0"
                  />
                </td>
                {/* rate  */}
                <td className="rounded-r-md bg-background py-1">
                  <Input
                    onChange={(e) =>
                      handleInputChange(index, "price", e.target.value)
                    }
                    value={item.price}
                    className="h-8 w-20 bg-transparent pr-1 [appearance:textfield] focus:border-white focus:ring-0 focus-visible:ring-transparent focus-visible:ring-offset-0 [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
                    type="number"
                    placeholder="0"
                  />
                </td>
                {/* edit item order  */}
                <td className="">
                  <ChevronUp
                    onClick={() => moveItemUp(index)}
                    className="mb-1 ml-1 h-4 w-8 cursor-pointer rounded bg-accent px-2 hover:bg-accent-foreground hover:text-accent"
                  />
                  <ChevronDown
                    onClick={() => moveItemDown(index)}
                    className="ml-1 h-4 w-8 cursor-pointer rounded bg-accent px-2 hover:bg-accent-foreground hover:text-accent"
                  />
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      {/* add item button */}
      <Button onClick={() => addItem()} className="w-full">
        <Plus /> Add Item
      </Button>
    </>
  );
};
