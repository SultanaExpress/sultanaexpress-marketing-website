import type { ReactNode } from "react";

type Variant = "white" | "light" | "dark";

interface SectionWrapperProps {
  id?: string;
  className?: string;
  children: ReactNode;
  variant?: Variant;
}

const variantStyles: Record<Variant, string> = {
  white: "bg-surface-50",
  light: "bg-surface-100",
  dark: "bg-navy-600 text-white bg-gradient-to-b from-navy-700 via-navy-600 to-navy-600",
};

export function SectionWrapper({
  id,
  className,
  children,
  variant = "white",
}: SectionWrapperProps) {
  return (
    <section
      id={id}
      className={`py-[100px] max-lg:py-16 max-md:py-12 ${variantStyles[variant]}${className ? ` ${className}` : ""}`}
    >
      <div className="max-w-[1200px] mx-auto px-6">{children}</div>
    </section>
  );
}
