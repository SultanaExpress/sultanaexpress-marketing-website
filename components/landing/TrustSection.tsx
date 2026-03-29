"use client";

import { useTranslations } from "next-intl";
import { ShieldCheck, Award, Lock, Truck } from "lucide-react";
import { AnimateOnScroll } from "@/components/ui/AnimateOnScroll";
import { SectionWrapper } from "@/components/ui/SectionWrapper";
import { SectionHeader } from "@/components/ui/SectionHeader";

interface TrustCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  badges: string[];
  delay: number;
}

function TrustCard({ icon, title, description, badges, delay }: TrustCardProps) {
  return (
    <AnimateOnScroll delay={delay}>
      <div className="flex h-full flex-col rounded-2xl border border-surface-300 bg-surface-50 p-8 shadow-sm transition-shadow hover:shadow-md">
        <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-brand-50">
          {icon}
        </div>
        <h3 className="mb-3 text-xl font-bold text-text-primary">{title}</h3>
        <p className="mb-6 flex-1 text-text-secondary">{description}</p>
        <div className="flex flex-wrap gap-2">
          {badges.map((badge) => (
            <span
              key={badge}
              className="inline-block rounded-full bg-brand-50 px-3 py-1 text-xs font-semibold text-brand-500"
            >
              {badge}
            </span>
          ))}
        </div>
      </div>
    </AnimateOnScroll>
  );
}

export function TrustSection() {
  const t = useTranslations("trust");

  const verifiedBadges = t.raw("verifiedBadges") as string[];
  const certBadges = t.raw("certBadges") as string[];
  const secureBadges = t.raw("secureBadges") as string[];

  return (
    <SectionWrapper id="trust">
      <SectionHeader badge={t("badge")} title={t("title")} />

      {/* Trust cards grid */}
      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        <TrustCard
          icon={<ShieldCheck className="h-6 w-6 text-brand-500" />}
          title={t("verifiedTitle")}
          description={t("verifiedDesc")}
          badges={verifiedBadges}
          delay={0.1}
        />
        <TrustCard
          icon={<Award className="h-6 w-6 text-brand-500" />}
          title={t("certTitle")}
          description={t("certDesc")}
          badges={certBadges}
          delay={0.2}
        />
        <TrustCard
          icon={<Lock className="h-6 w-6 text-brand-500" />}
          title={t("secureTitle")}
          description={t("secureDesc")}
          badges={secureBadges}
          delay={0.3}
        />
      </div>

      {/* Logistics banner */}
      <AnimateOnScroll delay={0.4} className="mt-12">
        <div className="rounded-2xl border border-surface-300 bg-gradient-to-r from-brand-50 to-surface-50 p-8 shadow-sm md:p-10">
          <div className="flex flex-col items-start gap-6 md:flex-row md:items-center">
            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-brand-500">
              <Truck className="h-7 w-7 text-white" />
            </div>
            <div>
              <h3 className="mb-2 text-xl font-bold text-text-primary">
                {t("logisticsTitle")}
              </h3>
              <p className="text-text-secondary">{t("logisticsDesc")}</p>
            </div>
          </div>
        </div>
      </AnimateOnScroll>
    </SectionWrapper>
  );
}
