import { getTranslations } from "next-intl/server";
import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/ui/PageHero";
import { AnimateOnScroll } from "@/components/ui/AnimateOnScroll";
import { ArrowRight } from "lucide-react";

interface CaseStudyStat {
  value: string;
  label: string;
}

interface CaseStudy {
  slug: string;
  title: string;
  excerpt: string;
  industry: string;
  stats: CaseStudyStat[];
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "caseStudiesPage" });

  return {
    title: t("metaTitle"),
    description: t("metaDescription"),
    alternates: {
      canonical: `https://sultana.express/${locale}/case-studies`,
      languages: {
        en: "https://sultana.express/en/case-studies",
        tr: "https://sultana.express/tr/case-studies",
      },
    },
    openGraph: {
      title: t("metaTitle"),
      description: t("metaDescription"),
      url: `https://sultana.express/${locale}/case-studies`,
      locale: locale === "tr" ? "tr_TR" : "en_US",
    },
  };
}

export default async function CaseStudiesPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "caseStudiesPage" });

  const studies = JSON.parse(
    JSON.stringify(t.raw("studies"))
  ) as CaseStudy[];

  return (
    <>
      <PageHero
        badge={t("badge")}
        title={t("title")}
        subtitle={t("subtitle")}
      />

      <section className="bg-surface-50 py-16 max-md:py-12">
        <div className="max-w-[1200px] mx-auto px-6">
          {/* Case study cards */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {studies.map((study, index) => (
              <AnimateOnScroll key={study.slug} delay={index * 0.15}>
                <div className="bg-white rounded-2xl shadow-sm hover:shadow-md transition-all overflow-hidden flex flex-col h-full">
                  <div className="p-8 flex flex-col flex-1">
                    {/* Industry badge */}
                    <span className="inline-block self-start px-3 py-1 rounded-full text-xs font-semibold bg-brand-100 text-brand-700">
                      {study.industry}
                    </span>

                    {/* Title */}
                    <h3 className="mt-4 text-xl font-bold text-text-primary leading-snug">
                      {study.title}
                    </h3>

                    {/* Excerpt */}
                    <p className="mt-3 text-sm text-text-secondary leading-relaxed flex-1">
                      {study.excerpt}
                    </p>

                    {/* Key Results label */}
                    <p className="mt-6 text-xs font-semibold text-text-tertiary uppercase tracking-wider">
                      {t("results")}
                    </p>

                    {/* Stats row */}
                    <div className="mt-3 flex gap-3">
                      {study.stats.map((stat, statIndex) => (
                        <div
                          key={statIndex}
                          className="flex-1 bg-brand-50 rounded-xl px-4 py-3 text-center"
                        >
                          <p className="text-xl font-bold text-brand-600">
                            {stat.value}
                          </p>
                          <p className="text-xs text-text-secondary mt-0.5">
                            {stat.label}
                          </p>
                        </div>
                      ))}
                    </div>

                    {/* CTA */}
                    <div className="mt-6">
                      <Link
                        href={`/${locale}/case-studies/${study.slug}`}
                        className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-brand-500 text-white text-sm font-semibold transition-all hover:bg-brand-600 active:bg-brand-700 shadow-sm hover:shadow-md"
                      >
                        {t("viewStudy")}
                        <ArrowRight className="w-4 h-4" />
                      </Link>
                    </div>
                  </div>
                </div>
              </AnimateOnScroll>
            ))}
          </div>

          {/* Coming soon note */}
          <AnimateOnScroll delay={0.3}>
            <div className="mt-12 text-center">
              <p className="text-sm text-text-tertiary italic">
                {t("comingSoon")}
              </p>
            </div>
          </AnimateOnScroll>
        </div>
      </section>
    </>
  );
}
