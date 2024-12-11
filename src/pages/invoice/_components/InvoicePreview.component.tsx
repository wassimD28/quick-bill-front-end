import { useAccountContext } from "@/context/account.context";
import { cn } from "@/lib/utils";
import { AccountRole } from "@/types/enum/common.enum";
import { Expand, ZoomIn, ZoomOut } from "lucide-react";
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
  const { accounts } = useAccountContext();
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
        "relative mx-3 h-full w-[600px] 2xl:w-[900px] lg:bg-red-400 xl:bg-green-500 2xl:bg-blue-400 rounded-lg bg-secondary",
        isGrabbing && "cursor-grabbing",
        !isGrabbing && "cursor-grab",
      )}
    >
      <TransformWrapper initialScale={1}>
        <Controls />
        <TransformComponent>
          <div className="flex h-[582px] w-[600px] 2xl:w-[900px] 2xl:h-[874px] justify-center">
            <div className="aspect-[1/1.414] h-full rounded border border-gray-300 bg-white p-10 shadow-lg">
              {/* Header with invoice number */}
              <div className="mb-8 flex justify-between">
                <div className="text-xl font-semibold text-gray-600">
                  Invoice #
                </div>
                <div className="text-sm text-gray-600">{` ${sender?.name}`}</div>
              </div>

              {/* Billing information and dates */}
              <div className="mb-8 flex justify-between">
                <div>
                  <div className="mb-1 text-sm font-semibold text-gray-600">
                    Bill to:{` ${recipient?.name}`}
                  </div>
                  <div className="text-sm text-gray-500">{` ${recipient?.address}`}</div>
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
                      <th className="px-2 py-2 text-left text-gray-600">
                        ITEM
                      </th>
                      <th className="px-2 py-2 text-right text-gray-600">
                        QTY
                      </th>
                      <th className="px-2 py-2 text-right text-gray-600">
                        RATE
                      </th>
                      <th className="px-2 py-2 text-right text-gray-600">
                        AMOUNT
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-gray-200 text-xs">
                      <td className="px-2 py-2 text-gray-500">.</td>
                      <td className="px-2 py-2 text-right text-gray-500">0</td>
                      <td className="px-2 py-2 text-right text-gray-500">
                        0 USD
                      </td>
                      <td className="px-2 py-2 text-right text-gray-500">
                        0.00 USD
                      </td>
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
          </div>
        </TransformComponent>
      </TransformWrapper>
    </div>
  );
};
