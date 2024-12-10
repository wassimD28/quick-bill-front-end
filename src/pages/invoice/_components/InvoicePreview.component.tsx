export const InvoicePreview = () => {
  return (
    <div className="aspect-[1/1.414] h-full rounded border border-gray-300 bg-white p-10 shadow-lg">
      {/* Header with invoice number */}
      <div className="mb-8 flex justify-between">
        <div className="text-xl font-semibold text-gray-600">Invoice #</div>
      </div>

      {/* Billing information and dates */}
      <div className="mb-8 flex justify-between">
        <div>
          <div className="mb-1 text-sm font-semibold text-gray-600">
            Bill to:
          </div>
          <div className="text-sm text-gray-500">.</div>
        </div>
        <div>
          <div className="flex">
            <span className="w-24 text-sm font-semibold text-gray-600">
              Invoice date:
            </span>
            <span className="text-sm text-gray-500">Invalid Date</span>
          </div>
          <div className="flex">
            <span className="w-24 text-sm font-semibold text-gray-600">
              Due date:
            </span>
            <span className="text-sm text-gray-500">Invalid Date</span>
          </div>
        </div>
      </div>

      {/* Invoice items table */}
      <div className="rounded-lg border border-gray-200">
        <table className="w-full px-2">
          <thead>
            <tr className="border-b border-gray-200 text-xs">
              <th className="px-2 py-2 text-left text-gray-600">ITEM</th>
              <th className="px-2 py-2 text-right text-gray-600">QTY</th>
              <th className="px-2 py-2 text-right text-gray-600">RATE</th>
              <th className="px-2 py-2 text-right text-gray-600">AMOUNT</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-gray-200 text-xs">
              <td className="px-2 py-2 text-gray-500">.</td>
              <td className="px-2 py-2 text-right text-gray-500">0</td>
              <td className="px-2 py-2 text-right text-gray-500">0 USD</td>
              <td className="px-2 py-2 text-right text-gray-500">0.00 USD</td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Totals section */}
      <div className="mb-8">
        <div className="flex justify-between border-b border-gray-200 py-2">
          <span className="text-gray-600">Subtotal:</span>
          <span className="text-gray-500">0.00 USD</span>
        </div>
        <div className="flex justify-between border-b border-gray-200 py-2">
          <span className="font-semibold">Total:</span>
          <span className="font-semibold">0.00 USD</span>
        </div>
        <div className="mt-2 text-sm text-gray-500">
          Total in words: Zero USD
        </div>
      </div>

      {/* Additional notes and payment terms */}
      <div className="space-y-4">
        <div>
          <div className="mb-1 text-blue-600">Additional notes:</div>
          <div className="text-sm text-gray-500"></div>
        </div>
        <div>
          <div className="mb-1 text-blue-600">Payment terms:</div>
          <div className="text-sm text-gray-500">
            Please send the payment to this address
          </div>
          <div className="text-sm text-gray-500">Bank:</div>
          <div className="text-sm text-gray-500">Account name:</div>
          <div className="text-sm text-gray-500">Account no:</div>
        </div>
        {/* <div className="mt-4 text-xs text-gray-400">
          If you have any questions concerning this invoice, use the following
          contact information:
        </div> */}
      </div>
    </div>
  );
};
