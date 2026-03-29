import { getTranslations } from "next-intl/server";
import type { Metadata } from "next";
import { Check, X } from "lucide-react";
import { PageHero } from "@/components/ui/PageHero";
import { SectionWrapper } from "@/components/ui/SectionWrapper";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { AnimateOnScroll } from "@/components/ui/AnimateOnScroll";
import { breadcrumbJsonLd } from "@/lib/jsonld";
import { CommissionCalculator } from "./CommissionCalculator";
import { PricingFAQ } from "./PricingFAQ";

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

const FEATURE_KEYS = [
  "productBrowsing",
  "rfqsPerMonth",
  "quoteComparison",
  "messaging",
  "analytics",
  "supplierProfile",
  "accountManager",
  "commission",
  "support",
  "priorityListing",
  "marketIntel",
  "apiAccess",
] as const;

const PLAN_KEYS = ["free", "silver", "gold"] as const;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "pricingPage" });

  return {
    title: t("metaTitle"),
    description: t("metaDescription"),
    alternates: {
      canonical: `https://sultana.express/${locale}/pricing`,
      languages: {
        en: "https://sultana.express/en/pricing",
        tr: "https://sultana.express/tr/pricing",
      },
    },
    openGraph: {
      title: t("metaTitle"),
      description: t("metaDescription"),
      url: `https://sultana.express/${locale}/pricing`,
      locale: locale === "tr" ? "tr_TR" : "en_US",
    },
  };
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
        {tier.popular && (
          <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
            <span className="inline-block rounded-full bg-brand-500 px-4 py-1 text-xs font-bold text-white shadow-md">
              {tier.popular}
            </span>
          </div>
        )}

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

        <div className="mb-6 h-px bg-surface-300" />

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

const YES_VALUES = new Set(["Yes", "Evet"]);
const NO_VALUES = new Set(["No", "Hayır"]);

function FeatureValueCell({ value, featured }: { value: string; featured: boolean }) {
  if (YES_VALUES.has(value)) {
    return (
      <Check className={`mx-auto h-5 w-5 ${featured ? "text-brand-500" : "text-success-500"}`} />
    );
  }
  if (NO_VALUES.has(value)) {
    return <X className="mx-auto h-5 w-5 text-text-light" />;
  }
  return (
    <span className={`text-sm ${featured ? "font-semibold text-brand-600" : "text-text-secondary"}`}>
      {value}
    </span>
  );
}

export default async function PricingPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "pricingPage" });
  const tPricing = await getTranslations({ locale, namespace: "pricing" });

  const tiers = JSON.parse(JSON.stringify(tPricing.raw("tiers"))) as PricingTier[];

  const featureLabels: Record<string, string> = {};
  for (const key of FEATURE_KEYS) {
    featureLabels[key] = t(`features.${key}`);
  }

  const featureValues: Record<string, Record<string, string>> = {};
  for (const plan of PLAN_KEYS) {
    featureValues[plan] = {};
    for (const key of FEATURE_KEYS) {
      featureValues[plan][key] = t(`featureValues.${plan}.${key}`);
    }
  }

  const faqItems = JSON.parse(JSON.stringify(t.raw("pricingFaq.items"))) as Array<{
    question: string;
    answer: string;
  }>;

  const calculatorTranslations = {
    calculatorTitle: t("calculatorTitle"),
    calculatorDescription: t("calculatorDescription"),
    calculatorMonthlyVolume: t("calculatorMonthlyVolume"),
    calculatorPlanLabel: t("calculatorPlanLabel"),
    calculatorCommission: t("calculatorCommission"),
    calculatorSubscription: t("calculatorSubscription"),
    calculatorTotal: t("calculatorTotal"),
    calculatorSavings: t("calculatorSavings"),
  };

  // JSON-LD structured data for pricing tiers
  const pricingJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: t("metaTitle"),
    description: t("metaDescription"),
    url: `https://sultana.express/${locale}/pricing`,
    mainEntity: tiers.map((tier) => ({
      "@type": "Offer",
      name: tier.name,
      price: tier.price.replace("$", ""),
      priceCurrency: "USD",
      description: tier.subtitle,
      eligibleDuration: {
        "@type": "QuantitativeValue",
        value: 1,
        unitCode: "MON",
      },
    })),
  };

  const breadcrumbs = breadcrumbJsonLd([
    { name: "Home", url: `https://sultana.express/${locale}` },
    { name: "Pricing", url: `https://sultana.express/${locale}/pricing` },
  ]);

  const planHeaders = [
    { key: "free", name: tiers[0]?.name ?? "Free", featured: false },
    { key: "silver", name: tiers[1]?.name ?? "Silver", featured: true },
    { key: "gold", name: tiers[2]?.name ?? "Gold", featured: false },
  ];

  return (
    <>
      {/* Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(pricingJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbs) }}
      />

      {/* Hero */}
      <PageHero
        badge={t("badge")}
        title={t("title")}
        subtitle={t("subtitle")}
      />

      {/* Pricing Cards */}
      <SectionWrapper variant="white">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {tiers.map((tier, index) => (
            <PricingCard key={index} tier={tier} delay={0.1 + index * 0.1} />
          ))}
        </div>
      </SectionWrapper>

      {/* Feature Comparison Table */}
      <SectionWrapper variant="light">
        <SectionHeader title={t("comparisonTitle")} />

        <AnimateOnScroll delay={0.1}>
          <div className="overflow-x-auto rounded-2xl border border-surface-300 bg-surface-50 shadow-sm">
            <table className="w-full min-w-[640px] border-collapse text-left">
              <thead>
                <tr className="border-b border-surface-300">
                  <th className="sticky left-0 z-10 bg-surface-100 px-6 py-4 text-sm font-semibold text-text-primary">
                    Feature
                  </th>
                  {planHeaders.map((plan) => (
                    <th
                      key={plan.key}
                      className={`px-6 py-4 text-center text-sm font-semibold ${
                        plan.featured
                          ? "bg-brand-50 text-brand-600"
                          : "bg-surface-100 text-text-primary"
                      }`}
                    >
                      {plan.name}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {FEATURE_KEYS.map((featureKey, rowIndex) => (
                  <tr
                    key={featureKey}
                    className="border-b border-surface-200 last:border-b-0"
                  >
                    <td
                      className={`sticky left-0 z-10 px-6 py-3.5 text-sm font-medium text-text-primary ${
                        rowIndex % 2 === 0 ? "bg-surface-50" : "bg-surface-100"
                      }`}
                    >
                      {featureLabels[featureKey]}
                    </td>
                    {PLAN_KEYS.map((planKey) => (
                      <td
                        key={planKey}
                        className={`px-6 py-3.5 text-center ${
                          planKey === "silver"
                            ? "bg-brand-50/50"
                            : rowIndex % 2 !== 0
                              ? "bg-surface-100/50"
                              : ""
                        }`}
                      >
                        <FeatureValueCell
                          value={featureValues[planKey][featureKey]}
                          featured={planKey === "silver"}
                        />
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </AnimateOnScroll>
      </SectionWrapper>

      {/* Commission Calculator */}
      <SectionWrapper variant="white">
        <CommissionCalculator translations={calculatorTranslations} />
      </SectionWrapper>

      {/* Pricing FAQ */}
      <SectionWrapper variant="light">
        <PricingFAQ title={t("pricingFaq.title")} items={faqItems} />
      </SectionWrapper>
    </>
  );
}
