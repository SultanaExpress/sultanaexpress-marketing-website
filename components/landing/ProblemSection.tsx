"use client";

import { useTranslations } from "next-intl";
import { SearchX, Globe, LayoutGrid } from "lucide-react";
import { AnimateOnScroll } from "@/components/ui/AnimateOnScroll";
import { SectionWrapper } from "@/components/ui/SectionWrapper";
import { SectionHeader } from "@/components/ui/SectionHeader";

const cards = [
  { icon: SearchX, labelKey: "buyerLabel", titleKey: "buyerTitle", descKey: "buyerDesc" },
  { icon: Globe, labelKey: "supplierLabel", titleKey: "supplierTitle", descKey: "supplierDesc" },
  { icon: LayoutGrid, labelKey: "bothLabel", titleKey: "bothTitle", descKey: "bothDesc" },
] as const;

export function ProblemSection() {
  const t = useTranslations("problem");

  return (
    <SectionWrapper variant="white">
      <SectionHeader
        badge={t("badge")}
        title={t("title")}
        subtitle={t("subtitle")}
      />

      <div className="grid gap-6 sm:gap-8 md:grid-cols-2 lg:grid-cols-3">
        {cards.map(({ icon: Icon, labelKey, titleKey, descKey }, index) => (
          <AnimateOnScroll key={titleKey} delay={index * 0.15}>
            <div className="group flex h-full flex-col rounded-md border border-surface-300 bg-surface-50 p-6 transition-shadow hover:shadow-lg sm:p-8">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-md bg-brand-50">
                <Icon className="h-6 w-6 text-brand-500" />
              </div>
              <span className="mb-2 text-xs font-semibold uppercase tracking-wider text-brand-500">
                {t(labelKey)}
              </span>
              <h3 className="mb-3 text-xl font-bold text-text-primary">
                {t(titleKey)}
              </h3>
              <p className="text-base leading-relaxed text-text-secondary">
                {t(descKey)}
              </p>
            </div>
          </AnimateOnScroll>
        ))}
      </div>
    </SectionWrapper>
  );
}
