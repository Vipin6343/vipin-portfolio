import { useEffect } from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { Glow, WhatsAppButton } from "./components/ui";
import Home from "./pages/Home";
import System from "./pages/System";

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Glow />
      <WhatsAppButton />
      <div className="layer mx-auto px-6 md:px-10" style={{ maxWidth: 1180 }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/systems/:slug" element={<System />} />
          <Route path="*" element={<Home />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}
