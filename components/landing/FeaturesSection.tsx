"use client";

import { useTranslations } from "next-intl";
import {
  ShieldCheck,
  FileText,
  MessageSquare,
  LayoutGrid,
  Truck,
  BarChart3,
} from "lucide-react";
import { AnimateOnScroll } from "@/components/ui/AnimateOnScroll";
import { SectionWrapper } from "@/components/ui/SectionWrapper";
import { SectionHeader } from "@/components/ui/SectionHeader";

const features = [
  { icon: ShieldCheck, titleKey: "verifiedTitle", descKey: "verifiedDesc" },
  { icon: FileText, titleKey: "rfqTitle", descKey: "rfqDesc" },
  { icon: MessageSquare, titleKey: "messagingTitle", descKey: "messagingDesc" },
  { icon: LayoutGrid, titleKey: "comparisonTitle", descKey: "comparisonDesc" },
  { icon: Truck, titleKey: "trackingTitle", descKey: "trackingDesc" },
  { icon: BarChart3, titleKey: "analyticsTitle", descKey: "analyticsDesc" },
] as const;

export function FeaturesSection() {
  const t = useTranslations("features");

  return (
    <SectionWrapper variant="light">
      <SectionHeader
        badge={t("badge")}
        title={t("title")}
        subtitle={t("subtitle")}
      />

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {features.map(({ icon: Icon, titleKey, descKey }, index) => (
          <AnimateOnScroll key={titleKey} delay={index * 0.1}>
            <div className="flex h-full flex-col rounded-md border border-surface-300 bg-surface-50 p-6 transition-shadow hover:shadow-lg sm:p-8">
              <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-md bg-brand-50">
                <Icon className="h-6 w-6 text-brand-500" />
              </div>
              <h3 className="mb-2 text-lg font-bold text-text-primary">
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
