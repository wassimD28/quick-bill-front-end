import React from "react";
import {
  Document,
  Page,
  View,
  Text,
  StyleSheet,
  Image,
} from "@react-pdf/renderer";
import { format } from "date-fns";
import numeral from "numeral";
import { AccountRole, AmountType } from "@/types/enum/common.enum";
import {
  convertAmountToWords,
  setCurrencySymbol,
  CurrencyCode,
} from "@/lib/utils";
import { calculateTax } from "@/lib/formela";
import { InvoiceContextData } from "@/types/interfaces/common.interface";
import testLogo from "../../../assets/quick-bill-logo.svg";


// Create styles
const styles = StyleSheet.create({
  page: {
    padding: 40,
    fontFamily: "Helvetica", // Changed to a system font
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 30,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 700,
    color: "#4B5563",
  },
  logo: {
    backgroundColor: "#4B5563",
    width: 40,
    height: 40,
    objectFit: "contain",
  },
  infoSection: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 30,
  },
  infoBlock: {
    gap: 5,
    flex: 1,
  },
  infoTitle: {
    width: 110,
    backgroundColor: "#fce8ec",
    borderLeftWidth: 2,
    borderLeftColor: "#e11d48",
    borderLeftStyle: "solid",
    paddingVertical: 2,
    paddingHorizontal: 4,
    fontSize: 10,
    fontWeight: 600,
    color: "#6B7280",
    marginBottom: 8,
  },
  infoContent: {
    paddingLeft: 12,
  },
  boldText: {
    fontSize: 12,
    fontWeight: 600,
    color: "#4B5563",
  },
  normalText: {
    fontSize: 10,
    color: "#6B7280",
  },
  table: {
    width: "100%",
    marginBottom: 20,
  },
  tableHeader: {
    flexDirection: "row",
    backgroundColor: "#fce8ec",
    padding: 8,
  },
  tableHeaderCell: {
    color: "#4B5563",
    fontSize: 10,
    fontWeight: 600,
  },
  tableRow: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: "#E5E7EB",
    padding: 8,
  },
  tableCell: {
    fontSize: 10,
    color: "#6B7280",
  },
  totalsSection: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
  },
  totalWords: {
    flex: 1,
    paddingRight: 20,
  },
  calculations: {
    width: 200,
  },
  calculationRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 4,
  },
  footer: {
    marginTop: 20,
    padding: 12,
    backgroundColor: "#F3F4F6",
  },
  footerTitle: {
    fontSize: 12,
    fontWeight: 600,
    color: "#4B5563",
    marginBottom: 4,
  },
  footerText: {
    fontSize: 10,
    color: "#6B7280",
    marginBottom: 8,
  },
  flexRow: {
    flexDirection: "row",
  },
  gap4: {
    gap: 4,
  },
});

interface InvoicePDFProps {
  invoiceData: InvoiceContextData;
}

export const InvoicePDF: React.FC<InvoicePDFProps> = ({ invoiceData }) => {
  const { accounts, invoiceDetails, items, paymentInfo } =
    invoiceData.detailsPanelData;
  const { tax, discount, shipping } = invoiceDetails;
  const currency = invoiceDetails.currency as CurrencyCode;
  const currencySymbol = setCurrencySymbol(currency);

  const sender = accounts.find(
    (account) => account.role === AccountRole.SENDER,
  );
  const recipient = accounts.find(
    (account) => account.role === AccountRole.RECIPIENT,
  );

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
  const calculatedTax = calculateTax(tax.amount, tax.amountType, taxableAmount);
  const calculatedShipping = calculateTax(
    shipping.amount,
    shipping.amountType,
    taxableAmount,
  );
  const total = taxableAmount - calculatedTax - calculatedShipping;

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Make sure all text is wrapped in Text components */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Invoice</Text>
          {invoiceDetails.invoiceLogo && (
            <Image style={styles.logo} source={testLogo} />
          )}
        </View>

        <View style={styles.infoSection}>
          <View style={styles.infoBlock}>
            <Text style={styles.infoTitle}>Billed to</Text>
            <View style={styles.infoContent}>
              <Text style={styles.boldText}>{recipient?.name || ""}</Text>
              <Text style={styles.normalText}>
                {recipient ? `${recipient.address}, ${recipient.zipCode}` : ""}
              </Text>
              <Text style={styles.normalText}>
                {recipient ? `${recipient.city}, ${recipient.country}` : ""}
              </Text>
            </View>
          </View>

          <View style={styles.infoBlock}>
            <Text style={styles.infoTitle}>Invoice Details</Text>
            <View style={styles.infoContent}>
              <View style={[styles.flexRow, styles.gap4]}>
                <Text style={styles.boldText}>Invoice #:</Text>
                <Text style={styles.normalText}>
                  {invoiceDetails.invoiceNumber}
                </Text>
              </View>
              <View style={[styles.flexRow, styles.gap4]}>
                <Text style={styles.boldText}>Issue Date:</Text>
                <Text style={styles.normalText}>
                  {invoiceDetails.issueDate
                    ? format(
                        invoiceDetails.issueDate,
                        "MMM d, yyyy",
                      ).toUpperCase()
                    : ""}
                </Text>
              </View>
              <View style={[styles.flexRow, styles.gap4]}>
                <Text style={styles.boldText}>Due Date:</Text>
                <Text style={styles.normalText}>
                  {invoiceDetails.dueDate
                    ? format(
                        invoiceDetails.dueDate,
                        "MMM d, yyyy",
                      ).toUpperCase()
                    : ""}
                </Text>
              </View>
            </View>
          </View>

          <View style={styles.infoBlock}>
            <Text style={styles.infoTitle}>Payment Record</Text>
            <View style={styles.infoContent}>
              <View style={[styles.flexRow, styles.gap4]}>
                <Text style={styles.boldText}>Paid Amount:</Text>
                <Text style={styles.normalText}>
                  {`${currencySymbol} ${numeral(invoiceDetails.paidAmount).format("0,0.00")}`}
                </Text>
              </View>
              <View style={[styles.flexRow, styles.gap4]}>
                <Text style={styles.boldText}>Due Amount:</Text>
                <Text style={[styles.boldText, { color: "#e11d48" }]}>
                  {`${currencySymbol} ${numeral(total).format("0,0.00")}`}
                </Text>
              </View>
            </View>
          </View>
        </View>

        <View style={styles.table}>
          <View style={styles.tableHeader}>
            <Text style={[styles.tableHeaderCell, { flex: 3 }]}>ITEM</Text>
            <Text
              style={[styles.tableHeaderCell, { flex: 1, textAlign: "right" }]}
            >
              QTY
            </Text>
            <Text
              style={[styles.tableHeaderCell, { flex: 1, textAlign: "right" }]}
            >
              RATE
            </Text>
            <Text
              style={[styles.tableHeaderCell, { flex: 1, textAlign: "right" }]}
            >
              AMOUNT
            </Text>
          </View>

          {items.map((item, index) => (
            <View
              key={index}
              style={[
                styles.tableRow,
                { backgroundColor: index % 2 === 0 ? "#F9FAFB" : "white" },
              ]}
            >
              <Text style={[styles.tableCell, { flex: 3, fontWeight: "bold" }]}>
                {item.name}
              </Text>
              <Text style={[styles.tableCell, { flex: 1, textAlign: "right" }]}>
                {item.quantity.toString()}
              </Text>
              <Text style={[styles.tableCell, { flex: 1, textAlign: "right" }]}>
                {`${currencySymbol} ${item.price}`}
              </Text>
              <Text
                style={[
                  styles.tableCell,
                  { flex: 1, textAlign: "right", fontWeight: "bold" },
                ]}
              >
                {`${currencySymbol} ${numeral(item.quantity * item.price).format("0,0.00")}`}
              </Text>
            </View>
          ))}
        </View>

        <View style={styles.totalsSection}>
          <View style={styles.totalWords}>
            <Text style={styles.boldText}>Total amount in words:</Text>
            <Text
              style={[styles.normalText, { color: "#e11d48", marginTop: 4 }]}
            >
              {convertAmountToWords(total, currency)}
            </Text>

            <View style={{ marginTop: 20 }}>
              <Text style={styles.infoTitle}>Payment Information</Text>
              <View style={{ marginLeft: 8, marginTop: 8 }}>
                <View style={[styles.flexRow, styles.gap4]}>
                  <Text style={styles.boldText}>Account Name:</Text>
                  <Text style={styles.normalText}>
                    {paymentInfo.accountName}
                  </Text>
                </View>
                <View style={[styles.flexRow, styles.gap4]}>
                  <Text style={styles.boldText}>Account Number:</Text>
                  <Text style={styles.normalText}>
                    {paymentInfo.accountNumber}
                  </Text>
                </View>
                <View style={[styles.flexRow, styles.gap4]}>
                  <Text style={styles.boldText}>Bank Name:</Text>
                  <Text style={styles.normalText}>{paymentInfo.bankName}</Text>
                </View>
              </View>
            </View>
          </View>

          <View style={styles.calculations}>
            <View style={styles.calculationRow}>
              <Text style={styles.normalText}>Sub Total</Text>
              <Text style={styles.boldText}>
                {`${currencySymbol} ${numeral(subTotal).format("0,0.00")}`}
              </Text>
            </View>

            {discount.isExist && (
              <View style={styles.calculationRow}>
                <Text style={styles.normalText}>
                  {`Discount ${discount.amountType === AmountType.PERCENTAGE ? `(${discount.amount}%)` : ""}`}
                </Text>
                <Text style={styles.boldText}>
                  {`${currencySymbol} ${numeral(calculatedDiscount).format("0,0.00")}`}
                </Text>
              </View>
            )}

            {tax.isExist && (
              <View style={styles.calculationRow}>
                <Text style={styles.normalText}>
                  {`Tax ${tax.amountType === AmountType.PERCENTAGE ? `(${tax.amount}%)` : ""}`}
                </Text>
                <Text style={styles.boldText}>
                  {`${currencySymbol} ${numeral(calculatedTax).format("0,0.00")}`}
                </Text>
              </View>
            )}

            {shipping.isExist && (
              <View style={styles.calculationRow}>
                <Text style={styles.normalText}>
                  {`Shipping ${shipping.amountType === AmountType.PERCENTAGE ? `(${shipping.amount}%)` : ""}`}
                </Text>
                <Text style={styles.boldText}>
                  {`${currencySymbol} ${numeral(calculatedShipping).format("0,0.00")}`}
                </Text>
              </View>
            )}

            <View
              style={[
                styles.calculationRow,
                {
                  marginTop: 8,
                  borderTopWidth: 1,
                  borderTopColor: "#E5E7EB",
                  paddingTop: 8,
                },
              ]}
            >
              <Text style={styles.boldText}>Total</Text>
              <Text style={styles.boldText}>
                {`${currencySymbol} ${numeral(total).format("0,0.00")}`}
              </Text>
            </View>
          </View>
        </View>

        <View style={styles.footer}>
          <View>
            <Text style={styles.footerTitle}>Additional Notes</Text>
            <Text style={styles.footerText}>
              {invoiceDetails.additionalNotes || ""}
            </Text>
          </View>

          <View>
            <Text style={styles.footerTitle}>Payment Terms</Text>
            <Text style={styles.footerText}>
              {invoiceDetails.paymentTerms || ""}
            </Text>
          </View>

          {sender?.email && sender.phone && (
            <Text style={styles.footerText}>
              {`For any enquiries, email us on ${sender.email} or call us on ${sender.phone}`}
            </Text>
          )}
        </View>
      </Page>
    </Document>
  );
};
