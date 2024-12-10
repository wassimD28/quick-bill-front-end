import { BrowserRouter, Route, Routes } from "react-router-dom";
import { LoginPage } from "./pages/login/login.page";
import { RegisterPage } from "./pages/register/register.page";
import { HomePage } from "./pages/home/home.page";
import { NavBarWrapper } from "./components/navBar";
import { PreviewPage } from "./pages/preview/preview.page";
import { InvoicePage } from "./pages/invoice/invoice.page";

function App() {
  
  return (
    <>
      <BrowserRouter>
        <div className="dark h-full w-full">
          <NavBarWrapper />

          <Routes>
            <Route path="/" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/home" element={<HomePage />} />
            <Route path="/preview" element={<PreviewPage />} />
            <Route path="/Invoice" element={<InvoicePage />} />
          </Routes>
        </div>
      </BrowserRouter>
    </>
  );
}

export default App;
