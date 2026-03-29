"use client";

import { useTranslations } from "next-intl";
import { Check } from "lucide-react";
import { AnimateOnScroll } from "@/components/ui/AnimateOnScroll";
import { SectionWrapper } from "@/components/ui/SectionWrapper";
import { SectionHeader } from "@/components/ui/SectionHeader";

interface PricingTier {
  name: string;
  price: string;
  period: string;
  subtitle: string;
  popular?: string;
  features: string[];
  cta: string;
  featured: boolean;
}

function PricingCard({
  tier,
  delay,
}: {
  tier: PricingTier;
  delay: number;
}) {
  return (
    <AnimateOnScroll delay={delay}>
      <div
        className={`relative flex h-full flex-col rounded-2xl border p-8 transition-shadow ${
          tier.featured
            ? "border-brand-500 shadow-lg animate-pulse-glow"
            : "border-surface-300 bg-surface-50 shadow-sm hover:shadow-md"
        }`}
      >
        {/* Popular badge */}
        {tier.popular && (
          <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
            <span className="inline-block rounded-full bg-brand-500 px-4 py-1 text-xs font-bold text-white shadow-md">
              {tier.popular}
            </span>
          </div>
        )}

        {/* Tier header */}
        <div className="mb-6">
          <h3 className="mb-1 text-lg font-semibold text-text-primary">
            {tier.name}
          </h3>
          <div className="flex items-baseline gap-1">
            <span className="text-4xl font-extrabold tracking-tight text-text-primary">
              {tier.price}
            </span>
            <span className="text-text-muted">{tier.period}</span>
          </div>
          <p className="mt-2 text-sm text-text-secondary">{tier.subtitle}</p>
        </div>

        {/* Divider */}
        <div className="mb-6 h-px bg-surface-300" />

        {/* Feature list */}
        <ul className="mb-8 flex-1 space-y-3">
          {tier.features.map((feature, i) => (
            <li key={i} className="flex items-start gap-3">
              <Check
                className={`mt-0.5 h-5 w-5 shrink-0 ${
                  tier.featured ? "text-brand-500" : "text-success-500"
                }`}
              />
              <span className="text-sm text-text-secondary">{feature}</span>
            </li>
          ))}
        </ul>

        {/* CTA button */}
        {tier.featured ? (
          <a
            href="#get-started"
            className="inline-flex items-center justify-center rounded-xl bg-brand-500 px-6 py-3.5 text-center font-semibold text-white transition-colors hover:bg-brand-600 focus:outline-none focus:ring-2 focus:ring-brand-400 focus:ring-offset-2"
          >
            {tier.cta}
          </a>
        ) : (
          <a
            href="#get-started"
            className="inline-flex items-center justify-center rounded-xl border-2 border-surface-400 px-6 py-3.5 text-center font-semibold text-text-primary transition-colors hover:border-brand-500 hover:text-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-400 focus:ring-offset-2"
          >
            {tier.cta}
          </a>
        )}
      </div>
    </AnimateOnScroll>
  );
}

export function PricingSection() {
  const t = useTranslations("pricing");

  const tiers = t.raw("tiers") as PricingTier[];

  return (
    <SectionWrapper variant="light" id="pricing">
      <SectionHeader
        badge={t("badge")}
        title={t("title")}
        subtitle={t("subtitle")}
      />

      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {tiers.map((tier, index) => (
          <PricingCard key={index} tier={tier} delay={0.1 + index * 0.1} />
        ))}
      </div>
    </SectionWrapper>
  );
}
