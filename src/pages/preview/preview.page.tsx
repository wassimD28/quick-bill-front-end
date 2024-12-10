import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  PDFViewer,
} from "@react-pdf/renderer";

const styles = StyleSheet.create({
  page: {
    padding: "40px",
    backgroundColor: "#ffffff",
    fontFamily: "Helvetica",
  },
  title: {
    fontSize: 20,
    marginBottom: 20,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  details: {
    marginBottom: 30,
  },
  detailRow: {
    flexDirection: "row",
    marginBottom: 4,
  },
  label: {
    fontSize: 10,
    color: "#666666",
    width: 80,
  },
  value: {
    fontSize: 10,
    flex: 1,
  },
  table: {
    marginTop: 20,
    marginBottom: 30,
    borderWidth: 1,
    borderRadius: 5,
  },
  tableHeader: {
    backgroundColor: "#e6e6e6",
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: "#666666",
    paddingBottom: 8,
    marginBottom: 8,
    paddingHorizontal: 10,
    paddingTop: 10,
  },
  tableRow: {
    flexDirection: "row",
    paddingVertical: 4,
    paddingHorizontal: 10,
  },
  itemColumn: {
    flex: 2,
    fontSize: 10,
  },
  qtyColumn: {
    flex: 1,
    fontSize: 10,
    textAlign: "center",
  },
  rateColumn: {
    flex: 1,
    fontSize: 10,
    textAlign: "right",
  },
  amountColumn: {
    flex: 1,
    fontSize: 10,
    textAlign: "right",
  },
  totals: {
    borderTopWidth: 1,
    borderTopColor: "#666666",
    paddingTop: 8,
  },
  totalRow: {
    flexDirection: "row",
    justifyContent: "flex-end",
    marginBottom: 4,
  },
  totalLabel: {
    fontSize: 10,
    marginRight: 50,
  },
  totalValue: {
    fontSize: 10,
    width: 100,
    textAlign: "right",
  },
  footer: {
    marginTop: 40,
    borderTopWidth: 1,
    borderTopColor: "#666666",
    paddingTop: 20,
  },
  notes: {
    fontSize: 10,
    color: "#666666",
    marginBottom: 20,
  },
});

export const PreviewPage = ({ data = {} }) => (
  <>
    <div className="h-[850px] w-[603px]">
      <PDFViewer width="100%" height="100%" showToolbar={false}>
        <Document>
          <Page size="A4" style={styles.page}>
            {/* Header */}
            <View style={styles.header}>
              <Text style={styles.title}>Invoice #</Text>
              <View>
                <Text style={styles.label}>Invoice date: Invalid Date</Text>
                <Text style={styles.label}>Due date: Invalid Date</Text>
              </View>
            </View>

            {/* Bill To Section */}
            <View style={styles.details}>
              <Text style={styles.label}>Bill to:</Text>
              <View style={styles.detailRow}>
                <Text style={styles.value}>{data.billTo?.name || ""}</Text>
              </View>
            </View>

            {/* Items Table */}
            <View style={styles.table}>
              <View style={styles.tableHeader}>
                <Text style={styles.itemColumn}>ITEM</Text>
                <Text style={styles.qtyColumn}>QTY</Text>
                <Text style={styles.rateColumn}>RATE</Text>
                <Text style={styles.amountColumn}>AMOUNT</Text>
              </View>

              <View style={styles.tableRow}>
                <Text style={styles.itemColumn}>-</Text>
                <Text style={styles.qtyColumn}>0</Text>
                <Text style={styles.rateColumn}>0 USD</Text>
                <Text style={styles.amountColumn}>0 USD</Text>
              </View>
            </View>

            {/* Totals */}
            <View style={styles.totals}>
              <View style={styles.totalRow}>
                <Text style={styles.totalLabel}>Subtotal:</Text>
                <Text style={styles.totalValue}>0.00 USD</Text>
              </View>
              <View style={styles.totalRow}>
                <Text style={styles.totalLabel}>Total:</Text>
                <Text style={styles.totalValue}>0.00 USD</Text>
              </View>
              <View style={styles.totalRow}>
                <Text style={styles.totalLabel}>Total in words:</Text>
                <Text style={styles.totalValue}>Zero USD</Text>
              </View>
            </View>

            {/* Footer */}
            <View style={styles.footer}>
              <Text style={styles.notes}>Additional notes:</Text>
              <Text style={styles.notes}>Payment terms:</Text>
              <Text style={styles.notes}>
                Please send the payment to this address
              </Text>
              <Text style={styles.notes}>Bank:</Text>
              <Text style={styles.notes}>Account name:</Text>
              <Text style={styles.notes}>Account no:</Text>
              <Text style={styles.notes}>
                If you have any questions concerning this invoice, use the
                following contact information:
              </Text>
            </View>
          </Page>
        </Document>
      </PDFViewer>
    </div>
  </>
);
