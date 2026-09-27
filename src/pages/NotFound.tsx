import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

export function NotFound() {
  return (
    <div className="mx-auto flex max-w-3xl flex-col items-start px-4 py-24 sm:px-6">
      <p className="font-mono text-sm text-electric">404 — route not found</p>
      <h1 className="mt-2 text-5xl font-extrabold tracking-tight">null pointer.</h1>
      <p className="mt-4 max-w-md text-muted-foreground">
        This path dereferences nothing. Head back to something that exists.
      </p>
      <Button className="mt-8" render={<Link to="/" />}>
        <ArrowLeft className="size-4" /> back home
      </Button>
    </div>
  );
}
