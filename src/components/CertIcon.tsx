import { Brain, Sparkles, GraduationCap } from "lucide-react";
import { cn } from "@/lib/utils";

const certIconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  anthropic: Brain,
  google: Sparkles,
  "deeplearning.ai": GraduationCap,
};

interface CertIconProps {
  issuer: string;
  size?: number;
  className?: string;
}

export const CertIcon = ({ issuer, size = 18, className }: CertIconProps) => {
  const key = issuer.toLowerCase();
  const Icon = certIconMap[key];

  if (!Icon) {
    return (
      <span className={cn("text-xs font-semibold uppercase tracking-[0.18em] text-foreground/70", className)}>
        {issuer.slice(0, 2).toUpperCase()}
      </span>
    );
  }

  return <Icon className={cn("text-foreground/70", className)} style={{ width: size, height: size }} />;
};
