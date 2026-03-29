"use client";

import { useTranslations } from "next-intl";
import { Check } from "lucide-react";
import { AnimateOnScroll } from "@/components/ui/AnimateOnScroll";
import { SectionWrapper } from "@/components/ui/SectionWrapper";

export function ForBuyersSection() {
  const t = useTranslations("forBuyers");
  const items = t.raw("items") as string[];

  return (
    <SectionWrapper variant="light" id="for-buyers">
      <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
        {/* Text side */}
        <AnimateOnScroll direction="left">
          <div>
            <span className="mb-4 inline-block rounded-pill bg-brand-50 px-4 py-1.5 text-sm font-semibold text-brand-600">
              {t("badge")}
            </span>
            <h2 className="text-3xl font-bold tracking-tight text-text-primary sm:text-4xl lg:text-[2.75rem] lg:leading-tight">
              {t("title")}
            </h2>
            <p className="mt-4 text-lg leading-relaxed text-text-secondary">
              {t("subtitle")}
            </p>

            <ul className="mt-8 space-y-3">
              {items.map((item, index) => (
                <li key={index} className="flex items-start gap-3">
                  <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-success-100">
                    <Check className="h-3.5 w-3.5 text-success-500" strokeWidth={3} />
                  </span>
                  <span className="text-base text-text-secondary">{item}</span>
                </li>
              ))}
            </ul>

            <div className="mt-10">
              <a
                href="#get-started"
                className="inline-flex h-12 items-center justify-center rounded-md bg-brand-500 px-8 text-base font-semibold text-white shadow-md transition-all hover:bg-brand-600 hover:shadow-lg active:scale-[0.98]"
              >
                {t("cta")}
              </a>
            </div>
          </div>
        </AnimateOnScroll>

        {/* Visual placeholder */}
        <AnimateOnScroll direction="right" delay={0.2}>
          <div className="flex aspect-[4/3] items-center justify-center rounded-lg border-2 border-dashed border-surface-300 bg-surface-50">
            <p className="text-lg font-medium text-text-light">
              Product Catalog Screenshot
            </p>
          </div>
        </AnimateOnScroll>
      </div>
    </SectionWrapper>
  );
}
