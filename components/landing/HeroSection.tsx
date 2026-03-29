"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import { Shield, Lock, Globe, Clock } from "lucide-react";
import { AnimateOnScroll } from "@/components/ui/AnimateOnScroll";
import { CounterAnimation } from "@/components/ui/CounterAnimation";

const trustItems = [
  { icon: Shield, key: "trustVerified" },
  { icon: Lock, key: "trustSecure" },
  { icon: Globe, key: "trustGlobal" },
  { icon: Clock, key: "trustResponse" },
] as const;

const stats = [
  { labelKey: "statIndustries", valueKey: "statIndustriesValue" },
  { labelKey: "statCountries", valueKey: "statCountriesValue" },
  { labelKey: "statLanguages", valueKey: "statLanguagesValue" },
  { labelKey: "statFees", valueKey: "statFeesValue" },
] as const;

export function HeroSection() {
  const t = useTranslations("hero");

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-navy-600 via-navy-700 to-navy-500">
      {/* Subtle radial glow behind content */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-1/3 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-brand-500/10 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-[1200px] px-6 pb-16 pt-32 sm:pb-20 sm:pt-36 lg:pb-24 lg:pt-44">
        {/* Badge */}
        <AnimateOnScroll className="flex justify-center" delay={0}>
          <span className="inline-flex items-center rounded-pill bg-white/10 px-4 py-1.5 text-sm font-semibold text-white/90 ring-1 ring-white/20 backdrop-blur-sm">
            {t("badge")}
          </span>
        </AnimateOnScroll>

        {/* Heading */}
        <AnimateOnScroll className="mt-8 text-center" delay={0.1}>
          <h1 className="text-4xl font-extrabold leading-tight tracking-tight text-white sm:text-5xl lg:text-6xl xl:text-[4rem]">
            {t("titleLine1")}
            <br />
            <span className="text-brand-500">{t("titleLine2")}</span>
          </h1>
        </AnimateOnScroll>

        {/* Subtitle */}
        <AnimateOnScroll className="mt-6 text-center" delay={0.2}>
          <p className="mx-auto max-w-2xl text-lg leading-relaxed text-white/70 sm:text-xl">
            {t("subtitle")}
          </p>
        </AnimateOnScroll>

        {/* CTAs */}
        <AnimateOnScroll className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row" delay={0.3}>
          <a
            href="#get-started"
            className="inline-flex h-12 items-center justify-center rounded-md bg-brand-500 px-8 text-base font-semibold text-white shadow-lg shadow-brand-500/30 transition-all hover:bg-brand-600 hover:shadow-xl hover:shadow-brand-500/40 active:scale-[0.98]"
          >
            {t("ctaBuyer")}
          </a>
          <a
            href="#for-suppliers"
            className="inline-flex h-12 items-center justify-center rounded-md border border-white/30 px-8 text-base font-semibold text-white backdrop-blur-sm transition-all hover:border-white/50 hover:bg-white/10 active:scale-[0.98]"
          >
            {t("ctaSupplier")}
          </a>
        </AnimateOnScroll>

        {/* Trust items */}
        <AnimateOnScroll className="mt-12" delay={0.4}>
          <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-8">
            {trustItems.map(({ icon: Icon, key }) => (
              <div key={key} className="flex items-center gap-2 text-sm text-white/60">
                <Icon className="h-4 w-4 text-brand-400" />
                <span>{t(key)}</span>
              </div>
            ))}
          </div>
        </AnimateOnScroll>

        {/* Hero image */}
        <AnimateOnScroll className="mt-16 flex justify-center" delay={0.5}>
          <Image
            src="/assets/hero-image.webp"
            alt="Sultana mobile apps showing categories, product details, and supplier listings"
            width={800}
            height={600}
            priority
            className="w-full max-w-3xl drop-shadow-2xl"
          />
        </AnimateOnScroll>

        {/* Stats */}
        <AnimateOnScroll className="mt-16" delay={0.6}>
          <div className="grid grid-cols-2 gap-6 sm:gap-8 lg:grid-cols-4">
            {stats.map(({ labelKey, valueKey }) => (
              <div
                key={labelKey}
                className="flex flex-col items-center rounded-lg border border-white/10 bg-white/5 px-4 py-6 text-center backdrop-blur-sm"
              >
                <span className="text-3xl font-bold text-white sm:text-4xl">
                  <CounterAnimation
                    value={t(valueKey)}
                    className="text-3xl font-bold text-white sm:text-4xl"
                  />
                </span>
                <span className="mt-1 text-sm text-white/50">{t(labelKey)}</span>
              </div>
            ))}
          </div>
        </AnimateOnScroll>
      </div>
    </section>
  );
}
