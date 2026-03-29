"use client";

import { useTranslations } from "next-intl";
import { AnimateOnScroll } from "@/components/ui/AnimateOnScroll";
import { SectionWrapper } from "@/components/ui/SectionWrapper";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { CounterAnimation } from "@/components/ui/CounterAnimation";

const statCards = [
  { valueKey: "tariffValue", titleKey: "tariffTitle", descKey: "tariffDesc" },
  { valueKey: "deliveryValue", titleKey: "deliveryTitle", descKey: "deliveryDesc" },
  { valueKey: "factoriesValue", titleKey: "factoriesTitle", descKey: "factoriesDesc" },
] as const;

export function WhyTurkeySection() {
  const t = useTranslations("whyTurkey");

  return (
    <SectionWrapper variant="white">
      <SectionHeader
        badge={t("badge")}
        title={t("title")}
        subtitle={t("subtitle")}
      />

      <div className="grid gap-6 sm:gap-8 md:grid-cols-3">
        {statCards.map(({ valueKey, titleKey, descKey }, index) => (
          <AnimateOnScroll key={titleKey} delay={index * 0.15}>
            <div className="flex h-full flex-col items-center rounded-md border border-brand-100 bg-brand-50 p-8 text-center sm:p-10">
              <span className="text-4xl font-extrabold text-brand-500 sm:text-5xl">
                <CounterAnimation value={t(valueKey)} />
              </span>
              <h3 className="mt-3 text-lg font-bold text-text-primary">
                {t(titleKey)}
              </h3>
              <p className="mt-2 text-base leading-relaxed text-text-secondary">
                {t(descKey)}
              </p>
            </div>
          </AnimateOnScroll>
        ))}
      </div>
    </SectionWrapper>
  );
}
