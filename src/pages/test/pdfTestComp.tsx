
import { PDFViewer } from "@react-pdf/renderer";
import { Document, Page, Text, View, StyleSheet } from "@react-pdf/renderer";

// Create styles
const styles = StyleSheet.create({
  page: {
    backgroundColor: "white",
    padding: 30,
  },
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
  text: {
    fontSize: 12,
    marginBottom: 10,
  },
});

// Simple Test Document Component
const TestDocument = () => (
  <Document>
    <Page size="A4" style={styles.page}>
      <View style={styles.section}>
        <Text style={styles.title}>Test PDF Document</Text>
        <Text style={styles.text}>
          This is a test paragraph to check PDF rendering.
        </Text>
        <Text style={styles.text}>
          If you can see this text, the PDF viewer is working correctly.
        </Text>
        <Text style={styles.text}>
          Current Date: {new Date().toLocaleDateString()}
        </Text>
      </View>
    </Page>
  </Document>
);

// PDF Preview Component
export const PDFTest = () => {
  return (
    <div className="h-screen w-full p-4">
      <div className="h-full w-full overflow-hidden rounded-lg border">
        <PDFViewer width="100%" height="100%">
          <TestDocument />
        </PDFViewer>
      </div>
    </div>
  );
};
