import {
  Github,
  Linkedin,
  Twitter,
  Instagram,
  Mail,
  Brain,
  Sparkles,
  GraduationCap,
} from "lucide-react";
import { cn } from "@/lib/utils";

const socialIconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  github: Github,
  linkedin: Linkedin,
  x: Twitter,
  instagram: Instagram,
  email: Mail,
};

const certIconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  anthropic: Brain,
  google: Sparkles,
  "deeplearning.ai": GraduationCap,
};

interface SocialIconProps {
  label: string;
  size?: number;
  className?: string;
}

export const SocialIcon = ({ label, size = 18, className }: SocialIconProps) => {
  const key = label.toLowerCase();
  const Icon = socialIconMap[key];

  if (!Icon) {
    return (
      <span className={cn("text-xs font-semibold uppercase tracking-[0.18em] text-foreground/70", className)}>
        {label.slice(0, 2).toUpperCase()}
      </span>
    );
  }

  return <Icon className={cn("text-foreground/70", className)} style={{ width: size, height: size }} />;
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
