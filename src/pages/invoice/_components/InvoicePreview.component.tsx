import { useInvoiceContext } from "@/context/invoice.context";
import { calculateTax } from "@/lib/formela";
import {
  cn,
  convertAmountToWords,
  CurrencyCode,
  setCurrencySymbol,
} from "@/lib/utils";
import { AccountRole, AmountType } from "@/types/enum/common.enum";
import { format } from "date-fns";
import { Expand, ZoomIn, ZoomOut } from "lucide-react";
import numeral from "numeral";
import { useState } from "react";
import {
  TransformComponent,
  TransformWrapper,
  useControls,
} from "react-zoom-pan-pinch";

const Controls = () => {
  const { zoomIn, zoomOut, resetTransform } = useControls();

  return (
    <div className="absolute bottom-3 left-2 z-10 flex cursor-auto select-none flex-col gap-1 rounded-lg border border-white/20 bg-card p-1 opacity-40 duration-200 ease-in-out hover:opacity-90">
      <Expand
        onClick={() => resetTransform()}
        className="h-8 w-8 cursor-pointer rounded-sm p-1 duration-150 ease-in-out hover:bg-accent"
      />
      <hr className="border-white/20" />
      <ZoomIn
        onClick={() => zoomIn()}
        className="h-8 w-8 cursor-pointer rounded-sm p-1 duration-150 ease-in-out hover:bg-accent"
      />
      <hr className="border-white/20" />
      <ZoomOut
        onClick={() => zoomOut()}
        className="h-8 w-8 cursor-pointer rounded-sm p-1 duration-150 ease-in-out hover:bg-accent"
      />
    </div>
  );
};

// invoice/_components/invoicePreview.component.tsx
export const InvoicePreview = () => {
  const { invoiceData } = useInvoiceContext();
  const accounts = invoiceData.detailsPanelData.accounts;
  const invoiceDetails = invoiceData.detailsPanelData.invoiceDetails;
  const { tax, discount, shipping } = invoiceDetails;
  const paimentInfo = invoiceData.detailsPanelData.paymentInfo;
  const currency = invoiceDetails.currency as CurrencyCode;
  const currencySymbol = setCurrencySymbol(currency);
  const items = invoiceData.detailsPanelData.items;
  const subTotal = items.reduce(
    (total, item) => total + item.quantity * item.price,
    0,
  );
  const calculatedDiscount = calculateTax(
    discount.amount,
    discount.amountType,
    subTotal,
  );
  const taxableAmount = subTotal - calculatedDiscount;
  const calculatedTax = calculateTax(
    tax.amount,
    tax.amountType,
    taxableAmount,
  );
  const calculatedShipping = calculateTax(
    shipping.amount,
    shipping.amountType,
    taxableAmount,
  );
  const total = taxableAmount + calculatedTax + calculatedShipping;
  const sender = accounts.find(
    (account) => account.role === AccountRole.SENDER,
  );
  const recipient = accounts.find(
    (account) => account.role === AccountRole.RECIPIENT,
  );
  // to know if the user grab the preview
  const [isGrabbing, setIsGrabbing] = useState(false);
  return (
    <div
      onMouseDown={() => setIsGrabbing(true)}
      onMouseUp={() => setIsGrabbing(false)}
      onMouseLeave={() => setIsGrabbing(false)} // Reset on mouse leave
      className={cn(
        "relative mx-3 h-full w-[600px] rounded-lg bg-secondary 2xl:w-[1000px] overflow-hidden",
        isGrabbing && "cursor-grabbing",
        !isGrabbing && "cursor-grab",
      )}
    >
      <TransformWrapper initialScale={1}>
        <Controls />
        <TransformComponent>
          <div className="flex h-[582px] w-[600px] justify-center 2xl:h-[874px] 2xl:w-[1000px] 2xl:mt-[148px]">
            {/* start invoice design  */}
            <div className="aspect-[1/1.414] h-[582px] overflow-hidden rounded border border-gray-300 bg-white p-6 shadow-lg 2xl:scale-150">
              {/* Header with invoice number */}
              <div className="mb-6 flex justify-between">
                <h1 className="text-3xl font-semibold text-gray-600">
                  Invoice
                </h1>
                <img
                  className="h-10"
                  src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/63/Databricks_Logo.png/640px-Databricks_Logo.png"
                  alt=""
                />
              </div>
              {/* Invoice header  */}
              <div className="mb-6 flex w-full justify-between">
                {/* BilledTo information */}
                <div className="flex flex-col">
                  <h4 className="w-fit rounded-r border-l-2 border-primary bg-primary/10 px-1 py-0.5 text-prevBase font-semibold text-gray-500">
                    Billed to
                  </h4>
                  <div className="pl-3">
                    {/* receiver name  */}
                    <h3 className="h-4 text-prevLg font-semibold text-gray-600">
                      {recipient?.name}
                    </h3>
                    {/* receiver address & zip code */}
                    <h4 className="text-prevBase text-gray-500">{`${recipient?.address}, ${recipient?.zipCode}`}</h4>
                    {/* receiver city & country */}
                    <h4 className="text-prevBase text-gray-500">{`${recipient?.city}, ${recipient?.country}`}</h4>
                  </div>
                </div>
                {/* Invoice details */}
                <div className="flex flex-col">
                  <h4 className="w-fit rounded-r border-l-2 border-primary bg-primary/10 px-1 py-0.5 text-prevBase font-semibold text-gray-500">
                    Invoice Details
                  </h4>
                  <div className="pl-2">
                    {/* invoice number  */}
                    <div className="flex flex-row items-center gap-1">
                      <h3 className="justify-between text-prevBase font-semibold text-gray-600">
                        Invoice #
                      </h3>
                      <h4 className="mt-0.5 text-prevSm font-semibold text-gray-400">
                        {invoiceDetails.invoiceNumber}
                      </h4>
                    </div>
                    {/* invoice issue date  */}
                    <div className="flex flex-row items-center gap-1">
                      <h3 className="text-prevBase font-semibold text-gray-600">
                        Issue Date
                      </h3>
                      <h4 className="mt-0.5 text-prevSm font-semibold text-gray-400">
                        {invoiceDetails.issueDate
                          ? format(
                              invoiceDetails.issueDate,
                              "MMM d, yyyy",
                            ).toUpperCase()
                          : ""}
                      </h4>
                    </div>
                    {/* invoice due date  */}
                    <div className="flex flex-row items-center gap-1">
                      <h3 className="text-prevBase font-semibold text-gray-600">
                        Due Date
                      </h3>
                      <h4 className="mt-0.5 text-prevSm font-semibold text-gray-400">
                        {invoiceDetails.dueDate
                          ? format(
                              invoiceDetails.dueDate,
                              "MMM d, yyyy",
                            ).toUpperCase()
                          : ""}
                      </h4>
                    </div>
                  </div>
                </div>
                {/* payment record */}
                <div className="flex w-fit flex-col">
                  <h4 className="w-fit rounded-r border-l-2 border-primary bg-primary/10 px-1 py-0.5 text-prevBase font-semibold text-gray-500">
                    Payment Record
                  </h4>
                  <div className="pl-2">
                    {/* paid amount  */}
                    <div className="flex flex-row items-center gap-1">
                      <h3 className="justify-between text-prevBase font-semibold text-gray-600">
                        Paid Amount
                      </h3>
                      <h4 className="text-prevBase font-semibold text-gray-400">
                        {`${currencySymbol} ${numeral(invoiceDetails.paidAmount).format("0,0.00")}`}
                      </h4>
                    </div>
                    {/* due amount  */}
                    <div className="flex flex-row items-center gap-1">
                      <h3 className="text-prevBase font-semibold text-gray-600">
                        Due Amount
                      </h3>
                      <h4 className="mt-0.5 text-prevXl font-semibold text-primary/70">
                        {`${currencySymbol} ${numeral(total).format("0,0.00")}`}
                      </h4>
                    </div>
                  </div>
                </div>
              </div>
              {/* Invoice items table + footer container */}
              <div className="flex h-[390px] flex-col justify-between">
                <div className="flex flex-col">
                  {/* Invoice items table */}
                  <div className="rounded border border-gray-200">
                    <table className="w-full px-2">
                      <thead>
                        <tr className="border-b border-gray-200 py-4 text-prevBase">
                          <th className="rounded-tl-sm bg-primary/20 px-2 py-1 text-left text-gray-600">
                            ITEM
                          </th>
                          <th className="bg-primary/20 px-2 text-right text-gray-600">
                            QTY
                          </th>
                          <th className="bg-primary/20 px-2 text-right text-gray-600">
                            RATE
                          </th>
                          <th className="rounded-tr-sm bg-primary/20 px-2 text-right text-gray-600">
                            AMOUNT
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {items.map((item, index) => {
                          return (
                            <tr
                              className={cn(
                                "border-gray-200 text-prevBase",
                                index % 2 === 0 && "bg-gray-100",
                              )}
                              key={index}
                            >
                              <td className="px-2 py-1 font-bold text-gray-500">
                                {item.name}
                              </td>
                              <td className="px-2 py-1 text-right text-gray-500">
                                {item.quantity}
                              </td>
                              <td className="px-2 py-1 text-right text-gray-500">
                                {`${currencySymbol} ${item.price}`}
                              </td>
                              <td className="px-2 py-1 text-right font-bold text-gray-500">
                                {`${currencySymbol} ${numeral(item.quantity * item.price).format("0,0.00")}`}
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>

                  {/* Totals section */}
                  <div className="mb-8 flex w-full justify-between">
                    <div className="mt-4 flex flex-col pr-5">
                      <h3 className="text-prevBase font-semibold text-gray-600">
                        Total amount in words :
                      </h3>
                      <h3 className="text-prevBase font-bold capitalize text-primary/80">
                        {convertAmountToWords(total, currency)}
                      </h3>
                      {/* payment Inforamtion */}
                      <div className="mt-3 flex flex-col">
                        <h4 className="w-fit rounded-r border-l-2 border-primary bg-primary/10 px-1 py-0.5 text-prevBase font-semibold text-gray-500">
                          Paiment Inforamtion
                        </h4>
                        <div className="pl-2">
                          {/*  account name  */}
                          <div className="flex flex-row items-center gap-1">
                            <h3 className="justify-between text-prevBase font-semibold text-gray-600">
                              Account Name
                            </h3>
                            <h4 className="mt-0.5 text-prevBase font-semibold text-gray-500">
                              {paimentInfo.accountName}
                            </h4>
                          </div>
                          {/* account number  */}
                          <div className="flex flex-row items-center gap-1">
                            <h3 className="text-prevBase font-semibold text-gray-600">
                              Account Number
                            </h3>
                            <h4 className="mt-0.5 text-prevBase font-semibold text-gray-500">
                              {paimentInfo.accountNumber}
                            </h4>
                          </div>
                          {/* bank name  */}
                          <div className="flex flex-row items-center gap-1">
                            <h3 className="text-prevBase font-semibold text-gray-600">
                              Bank Name
                            </h3>
                            <h4 className="mt-0.5 text-prevBase font-semibold text-gray-500">
                              {paimentInfo.bankName}
                            </h4>
                          </div>
                        </div>
                      </div>
                    </div>
                    {/* calculate total */}
                    <div className="flex flex-col">
                      <div className="grid w-[140px] grid-cols-2 items-center justify-between gap-y-1 py-2 pr-2 text-end">
                        {/* Sub Total  */}
                        <h3 className="text-start text-prevBase font-semibold text-gray-500">
                          Sub Total
                        </h3>
                        <h4 className="text-prevBase font-bold text-gray-500">{`${currencySymbol} ${numeral(subTotal).format("0,0.00")}`}</h4>
                        {/* Discount  */}
                        {discount.isExist &&
                          discount.amountType === AmountType.AMOUNT && (
                            <>
                              <h3 className="text-start text-prevBase font-semibold text-gray-500">
                                Discount
                              </h3>
                              <h4 className="text-prevBase font-bold text-gray-500">{`${currencySymbol} ${numeral(discount.amount).format("0,0.00")}`}</h4>
                            </>
                          )}
                        {discount.isExist &&
                          discount.amountType === AmountType.PERCENTAGE && (
                            <>
                              <h3 className="text-start text-prevBase font-semibold text-gray-500">
                                Discount {`(${discount.amount}%)`}
                              </h3>
                              <h4 className="text-prevBase font-bold text-gray-500">{`${currencySymbol} ${numeral(calculatedDiscount).format("0,0.00")}`}</h4>
                            </>
                          )}
                        {/* Taxable amount */}
                        {discount.isExist &&
                          (tax.isExist || shipping.isExist) && (
                            <>
                              <h3 className="text-start text-prevBase font-semibold text-gray-500">
                                Taxable Amount
                              </h3>
                              <h4 className="text-prevBase font-bold text-gray-500">{`${currencySymbol} ${numeral(taxableAmount).format("0,0.00")}`}</h4>
                            </>
                          )}
                        {/* Tax */}
                        {tax.isExist &&
                          tax.amountType === AmountType.AMOUNT && (
                            <>
                              <h3 className="text-start text-prevBase font-semibold text-gray-500">
                                Tax
                              </h3>
                              <h4 className="text-prevBase font-bold text-gray-500">{`${currencySymbol} ${numeral(tax.amount).format("0,0.00")}`}</h4>
                            </>
                          )}
                        {tax.isExist &&
                          tax.amountType === AmountType.PERCENTAGE && (
                            <>
                              <h3 className="text-start text-prevBase font-semibold text-gray-500">
                                Tax {`(${tax.amount}%)`}
                              </h3>
                              <h4 className="text-prevBase font-bold text-gray-500">{`${currencySymbol} ${numeral(calculatedTax).format("0,0.00")}`}</h4>
                            </>
                          )}
                        {/* shipping */}
                        {shipping.isExist &&
                          shipping.amountType === AmountType.AMOUNT && (
                            <>
                              <h3 className="text-start text-prevBase font-semibold text-gray-500">
                                Shipping
                              </h3>
                              <h4 className="text-prevBase font-bold text-gray-500">{`${currencySymbol} ${numeral(shipping.amount).format("0,0.00")}`}</h4>
                            </>
                          )}
                        {shipping.isExist &&
                          shipping.amountType === AmountType.PERCENTAGE && (
                            <>
                              <h3 className="text-start text-prevBase font-semibold text-gray-500">
                                Shipping {`(${shipping.amount}%)`}
                              </h3>
                              <h4 className="text-prevBase font-bold text-gray-500">{`${currencySymbol} ${numeral(calculatedShipping).format("0,0.00")}`}</h4>
                            </>
                          )}
                      </div>
                      {/* total */}
                      <div className="grid w-[140px] grid-cols-2 items-center justify-between gap-y-2 border-t border-gray-300 py-2 pr-2 text-end">
                        <h3 className="text-start text-prevBase font-semibold text-gray-500">
                          Total
                        </h3>
                        <h4 className="text-prevBase font-bold text-gray-500">{`${currencySymbol} ${numeral(total).format("0,0.00")}`}</h4>
                      </div>
                    </div>
                  </div>
                </div>
                {/* invoice footer  */}
                {/* Additional notes and payment terms */}
                <div className="flex flex-col gap-2 bg-gray-200/90 p-2">
                  {/* notes */}
                  <div className="flex flex-col gap-1">
                    <h3 className="text-prevBase font-bold text-gray-600">
                      Additional Notes
                    </h3>
                    <p className="whitespace-pre-wrap pl-2 text-prevBase text-gray-500">
                      {invoiceDetails.additionalNotes}
                    </p>
                  </div>
                  {/* notes */}
                  <div className="flex flex-col gap-1">
                    <h3 className="text-prevBase font-bold text-gray-600">
                      Payment Terms
                    </h3>
                    <p className="whitespace-pre-wrap pl-2 text-prevBase text-gray-500">
                      {invoiceDetails.paymentTerms}
                    </p>
                  </div>
                  {/* contact */}
                  {sender?.email && sender.phone ? (
                    <p className="min-w-[200px] text-prevBase font-semibold text-gray-500">
                      {" "}
                      For any enquiries, email us on{" "}
                      <span className="text text-gray-700">
                        {" "}
                        {sender.email}{" "}
                      </span>{" "}
                      or call us on <span> {sender?.phone} </span>{" "}
                    </p>
                  ) : (
                    ""
                  )}
                </div>
              </div>
            </div>
            {/* end invoice design */}
          </div>
        </TransformComponent>
      </TransformWrapper>
    </div>
  );
};
