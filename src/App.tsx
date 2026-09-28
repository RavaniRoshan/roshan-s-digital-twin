import { Route, Routes } from "react-router-dom";
import { NotFound } from "@/pages/NotFound";
import { Home } from "@/pages/Home";
import { PrefsProvider } from "@/hooks/usePrefs";

export default function App() {
  return (
    <PrefsProvider>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </PrefsProvider>
  );
}
