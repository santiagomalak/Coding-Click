import { Link } from "react-router-dom";
import type { ReactNode } from "react";

type Variant = "primary" | "secondary" | "ghost";

type ButtonProps = {
  children: ReactNode;
  href?: string;
  to?: string;
  variant?: Variant;
  external?: boolean;
};

const base = "inline-flex items-center gap-2 text-sm uppercase tracking-wide transition-colors duration-150";
const variants: Record<Variant, string> = {
  primary: "border border-accent px-5 py-3 text-accent hover:bg-accent hover:text-bg",
  secondary: "border border-line px-5 py-3 text-ink hover:border-accent hover:text-accent",
  ghost: "text-ink hover:text-accent underline underline-offset-4",
};

export default function Button({ children, href, to, variant = "primary", external }: ButtonProps) {
  const className = `${base} ${variants[variant]}`;
  if (href) {
    return (
      <a href={href} className={className} target={external ? "_blank" : undefined} rel={external ? "noopener noreferrer" : undefined}>
        {children}
      </a>
    );
  }
  return (
    <Link to={to ?? "/"} className={className}>
      {children}
    </Link>
  );
}
