import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { Section } from "@/components/Reveal";

export function NotFound() {
  return (
    <Section className="border-t-0 pt-24">
      <p className="readout flex items-center gap-2 text-sm text-electric">
        <span className="size-1.5 rounded-full bg-destructive" />
        fault · 404
      </p>
      <h1 className="mt-4 text-5xl font-extrabold tracking-tight sm:text-6xl">null reference.</h1>
      <p className="mt-4 max-w-md text-muted-foreground">
        That route dereferences nothing. Returning to the last known good state.
      </p>
      <Link
        to="/"
        className="mt-8 inline-flex items-center gap-2 rounded-md border border-border px-4 py-2 font-mono text-sm transition-colors hover:border-electric/50 hover:text-electric"
      >
        <ArrowLeft className="size-4" /> back to dashboard
      </Link>
    </Section>
  );
}
