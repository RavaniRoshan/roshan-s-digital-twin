import { motion, useMotionValue, useReducedMotion, useSpring } from "motion/react";
import { useCallback } from "react";
import { cn } from "@/lib/utils";

export function GridBackdrop({ className }: { className?: string }) {
  const reduce = useReducedMotion();
  const mx = useMotionValue(-600);
  const my = useMotionValue(-600);
  const gx = useSpring(mx, { stiffness: 120, damping: 24, mass: 0.6 });
  const gy = useSpring(my, { stiffness: 120, damping: 24, mass: 0.6 });

  const onMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (reduce) return;
      const rect = e.currentTarget.getBoundingClientRect();
      mx.set(e.clientX - rect.left);
      my.set(e.clientY - rect.top);
    },
    [mx, my, reduce],
  );

  return (
    <div
      aria-hidden
      onMouseMove={onMove}
      className={cn("pointer-events-none absolute inset-0 overflow-hidden", className)}
    >
      <div
        className={cn(
          "absolute inset-0",
          "[background-image:linear-gradient(to_right,var(--color-border)_1px,transparent_1px),linear-gradient(to_bottom,var(--color-border)_1px,transparent_1px)]",
          "[background-size:36px_36px]",
          "[mask-image:radial-gradient(ellipse_90%_70%_at_50%_30%,black_30%,transparent_75%)]",
          !reduce && "animate-grid-pan",
        )}
      />
      {!reduce && (
        <motion.div
          className="absolute size-[560px] rounded-full opacity-25 blur-[120px]"
          style={{
            x: gx,
            y: gy,
            translateX: "-50%",
            translateY: "-50%",
            background:
              "radial-gradient(circle, var(--color-electric) 0%, transparent 65%)",
          }}
        />
      )}
      <div
        className="absolute inset-x-0 top-0 h-px"
        style={{
          background:
            "linear-gradient(to right, transparent, var(--color-electric) 50%, transparent)",
          opacity: 0.5,
        }}
      />
    </div>
  );
}
