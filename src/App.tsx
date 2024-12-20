import { BrowserRouter, Route, Routes } from "react-router-dom";
import { LoginPage } from "./pages/login/login.page";
import { RegisterPage } from "./pages/register/register.page";
import { HomePage } from "./pages/home/home.page";
import { NavBarWrapper } from "./components/navBar";
import { InvoicePage } from "./pages/invoice/invoice.page";
import { InvoicePreview } from "./pages/preview/InvoicePeviewPDF.page";
import { InvoiceProvider } from "./context/invoice.context";
import PDFTestPage from "./pages/test/pdfTestPage";

function App() {
  return (
    <>
      <BrowserRouter>
        <InvoiceProvider>
          <div className="dark h-full w-full">
            <NavBarWrapper />

            <Routes>
              <Route path="/" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />
              <Route path="/home" element={<HomePage />} />
              <Route path="/preview" element={<InvoicePreview />} />
              <Route path="/pdfTest" element={<PDFTestPage />} />
              <Route path="/Invoice" element={<InvoicePage />} />
            </Routes>
          </div>
        </InvoiceProvider>
      </BrowserRouter>
    </>
  );
}

export default App;
