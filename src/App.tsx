import { Route, Routes } from "react-router-dom";
import { Home } from "@/pages/Home";
import { NotFound } from "@/pages/NotFound";
import { SystemPage } from "@/pages/SystemPage";
import { PrefsProvider } from "@/hooks/usePrefs";
import { Seo } from "@/components/Seo";

export default function App() {
  return (
    <PrefsProvider>
      <Seo />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/s/:slug" element={<SystemPage />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </PrefsProvider>
  );
}
