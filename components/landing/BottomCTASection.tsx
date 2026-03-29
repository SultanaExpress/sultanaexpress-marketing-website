"use client";

import { useTranslations } from "next-intl";
import { Check, ArrowRight } from "lucide-react";
import { AnimateOnScroll } from "@/components/ui/AnimateOnScroll";

export function BottomCTASection() {
  const t = useTranslations("bottomCta");

  const trustItems = t.raw("trustItems") as string[];

  return (
    <section
      id="get-started"
      className="relative overflow-hidden bg-gradient-to-br from-navy-600 via-navy-700 to-navy-500 py-[100px] max-lg:py-16 max-md:py-12"
    >
      {/* Decorative background elements */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-0 h-[500px] w-[800px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-brand-500/10 blur-3xl" />
        <div className="absolute bottom-0 left-0 h-72 w-72 rounded-full bg-brand-500/5 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-[1200px] px-6">
        {/* Header */}
        <AnimateOnScroll className="mx-auto mb-12 max-w-3xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl">
            {t("title")}
          </h2>
          <p className="mt-4 text-lg text-white/70 lg:text-xl">
            {t("subtitle")}
          </p>
        </AnimateOnScroll>

        {/* Two CTA columns */}
        <AnimateOnScroll delay={0.15}>
          <div className="mx-auto grid max-w-3xl gap-6 md:grid-cols-2">
            {/* Buyer CTA */}
            <div className="rounded-2xl border border-white/10 bg-white/5 p-8 text-center backdrop-blur-sm">
              <h3 className="mb-2 text-xl font-bold text-white">
                {t("buyerTitle")}
              </h3>
              <p className="mb-6 text-white/60">{t("buyerDesc")}</p>
              <a
                href="#"
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-brand-500 px-6 py-3.5 font-semibold text-white transition-colors hover:bg-brand-600 focus:outline-none focus:ring-2 focus:ring-brand-400 focus:ring-offset-2 focus:ring-offset-navy-700"
              >
                {t("buyerCta")}
                <ArrowRight className="h-4 w-4" />
              </a>
            </div>

            {/* Supplier CTA */}
            <div className="rounded-2xl border border-white/10 bg-white/5 p-8 text-center backdrop-blur-sm">
              <h3 className="mb-2 text-xl font-bold text-white">
                {t("supplierTitle")}
              </h3>
              <p className="mb-6 text-white/60">{t("supplierDesc")}</p>
              <a
                href="#"
                className="inline-flex items-center justify-center gap-2 rounded-xl border-2 border-white/40 px-6 py-3.5 font-semibold text-white transition-colors hover:border-white hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-white/50 focus:ring-offset-2 focus:ring-offset-navy-700"
              >
                {t("supplierCta")}
                <ArrowRight className="h-4 w-4" />
              </a>
            </div>
          </div>
        </AnimateOnScroll>

        {/* Trust line */}
        <AnimateOnScroll delay={0.3}>
          <div className="mt-12 flex flex-wrap items-center justify-center gap-x-8 gap-y-3">
            {trustItems.map((item, index) => (
              <div key={index} className="flex items-center gap-2">
                <Check className="h-4 w-4 text-brand-400" />
                <span className="text-sm text-white/70">{item}</span>
              </div>
            ))}
          </div>
        </AnimateOnScroll>
      </div>
    </section>
  );
}
