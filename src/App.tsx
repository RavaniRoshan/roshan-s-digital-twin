import { AnimatePresence, motion } from "motion/react";
import { Route, Routes, useLocation } from "react-router-dom";
import { SiteShell } from "@/components/SiteShell";
import { Home } from "@/pages/Home";
import { Log } from "@/pages/Log";
import { NotFound } from "@/pages/NotFound";
import { Resume } from "@/pages/Resume";
import { WorkCase } from "@/pages/WorkCase";
import { Works } from "@/pages/Works";

export default function App() {
  const location = useLocation();

  return (
    <SiteShell>
      <AnimatePresence mode="wait">
        <motion.main
          key={location.pathname}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -12 }}
          transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
        >
          <Routes location={location}>
            <Route path="/" element={<Home />} />
            <Route path="/works" element={<Works />} />
            <Route path="/works/:slug" element={<WorkCase />} />
            <Route path="/log" element={<Log />} />
            <Route path="/resume" element={<Resume />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </motion.main>
      </AnimatePresence>
    </SiteShell>
  );
}
