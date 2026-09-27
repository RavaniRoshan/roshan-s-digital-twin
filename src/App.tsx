import { Suspense, lazy } from "react";
import { Route, Routes } from "react-router-dom";
import { Shell } from "@/components/Shell";
import { LoadingOrb } from "@/components/orb/loading";
import { Dashboard } from "@/pages/Dashboard";

const Systems = lazy(() => import("@/pages/Systems").then((m) => ({ default: m.Systems })));
const SystemCase = lazy(() => import("@/pages/SystemCase").then((m) => ({ default: m.SystemCase })));
const TimelinePage = lazy(() => import("@/pages/Timeline").then((m) => ({ default: m.TimelinePage })));
const Resume = lazy(() => import("@/pages/Resume").then((m) => ({ default: m.Resume })));
const NotFound = lazy(() => import("@/pages/NotFound").then((m) => ({ default: m.NotFound })));

function Booting() {
  return (
    <div className="flex min-h-[60vh] items-center justify-center">
      <LoadingOrb size={44} className="text-electric" />
    </div>
  );
}

export default function App() {
  return (
    <Shell>
      <Suspense fallback={<Booting />}>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/systems" element={<Systems />} />
          <Route path="/systems/:slug" element={<SystemCase />} />
          <Route path="/timeline" element={<TimelinePage />} />
          <Route path="/resume" element={<Resume />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
    </Shell>
  );
}
