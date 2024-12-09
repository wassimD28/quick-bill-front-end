import { BrowserRouter, Route, Routes } from "react-router-dom";
import { LoginPage } from "./pages/login/login.page";

function App() {
  return (
    <>
      <div className="dark w-full h-full">
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<LoginPage />} />
            {/* <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} /> */}
          </Routes>
        </BrowserRouter>
      </div>
    </>
  );
}

export default App;
