import type { ReactNode } from "react";
import { motion, useReducedMotion } from "motion/react";
import { cn } from "@/lib/utils";

const EASE = [0.22, 1, 0.36, 1] as const;

export function Fade({
  children,
  delay = 0,
  className,
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  const reduce = useReducedMotion();
  if (reduce) return <div className={className}>{children}</div>;
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 14 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.55, delay, ease: EASE }}
    >
      {children}
    </motion.div>
  );
}

/** Standard instrument-panel section: label, rule, heading, optional meta. */
export function SectionHead({
  label,
  title,
  meta,
  className,
}: {
  label: string;
  title: string;
  meta?: ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("mb-6", className)}>
      <div className="flex items-center gap-3">
        <span className="label text-electric">{label}</span>
        <span className="h-px flex-1 accent-rule opacity-50" />
        {meta && <span className="label">{meta}</span>}
      </div>
      <h2 className="mt-3 text-2xl font-bold tracking-tight sm:text-3xl">{title}</h2>
    </div>
  );
}

export function Section({
  id,
  children,
  className,
}: {
  id?: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <section id={id} className={cn("border-t px-5 py-12 sm:px-8 sm:py-16", className)}>
      <div className="mx-auto max-w-5xl">{children}</div>
    </section>
  );
}

/** Small status pip used for system + telemetry states. */
export function Pip({
  tone,
  className,
}: {
  tone: "active" | "nominal" | "standby" | "research" | "archived" | "stable";
  className?: string;
}) {
  const color =
    tone === "active"
      ? "bg-electric"
      : tone === "research"
        ? "bg-info"
        : tone === "standby"
          ? "bg-warning"
          : tone === "archived"
            ? "bg-muted-foreground/50"
            : tone === "stable"
              ? "bg-success"
              : "bg-success";
  return (
    <span
      className={cn("inline-block size-1.5 shrink-0 rounded-full", color, tone === "active" && "animate-pulse-glow", className)}
    />
  );
}
