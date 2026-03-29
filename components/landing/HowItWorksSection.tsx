"use client";

import { useTranslations } from "next-intl";
import { AnimateOnScroll } from "@/components/ui/AnimateOnScroll";
import { SectionWrapper } from "@/components/ui/SectionWrapper";
import { SectionHeader } from "@/components/ui/SectionHeader";

interface Step {
  title: string;
  desc: string;
}

export function HowItWorksSection() {
  const t = useTranslations("howItWorks");
  const steps = t.raw("steps") as Step[];

  return (
    <SectionWrapper variant="light" id="how-it-works">
      <SectionHeader
        badge={t("badge")}
        title={t("title")}
        subtitle={t("subtitle")}
      />

      <div className="relative">
        {/* Connecting line (visible lg+) */}
        <div
          className="pointer-events-none absolute left-0 right-0 top-8 hidden h-0.5 bg-surface-300 lg:block"
          aria-hidden="true"
        />

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((step, index) => (
            <AnimateOnScroll key={index} delay={index * 0.15}>
              <div className="relative flex flex-col items-center text-center">
                {/* Step number */}
                <div className="relative z-10 mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-brand-500 text-2xl font-bold text-white shadow-md">
                  {index + 1}
                </div>

                <h3 className="mb-2 text-lg font-bold text-text-primary">
                  {step.title}
                </h3>
                <p className="text-base leading-relaxed text-text-secondary">
                  {step.desc}
                </p>
              </div>
            </AnimateOnScroll>
          ))}
        </div>
      </div>
    </SectionWrapper>
  );
}
