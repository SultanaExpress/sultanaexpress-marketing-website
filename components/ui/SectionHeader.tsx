import type { ReactNode } from "react";

interface SectionHeaderProps {
  badge?: string;
  title: ReactNode;
  subtitle?: string;
  light?: boolean;
  className?: string;
}

export function SectionHeader({
  badge,
  title,
  subtitle,
  light = false,
  className,
}: SectionHeaderProps) {
  return (
    <div
      className={`text-center max-w-2xl mx-auto mb-16 max-md:mb-10${className ? ` ${className}` : ""}`}
    >
      {badge && (
        <span
          className={`inline-block px-4 py-1.5 rounded-full text-sm font-semibold tracking-wide mb-4 ${
            light
              ? "bg-white/10 text-brand-300"
              : "bg-brand-50 text-brand-600"
          }`}
        >
          {badge}
        </span>
      )}
      <h2
        className={`text-4xl max-lg:text-3xl max-md:text-2xl font-bold tracking-tight leading-tight ${
          light ? "text-white" : "text-text-primary"
        }`}
      >
        {title}
      </h2>
      {subtitle && (
        <p
          className={`mt-4 text-lg max-md:text-base leading-relaxed ${
            light ? "text-white/70" : "text-text-secondary"
          }`}
        >
          {subtitle}
        </p>
      )}
    </div>
  );
}
