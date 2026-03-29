import { getTranslations } from "next-intl/server";
import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, BarChart3 } from "lucide-react";

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
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const t = await getTranslations({ locale, namespace: "caseStudiesPage" });
  const studies = JSON.parse(
    JSON.stringify(t.raw("studies"))
  ) as CaseStudy[];
  const study = studies.find((s) => s.slug === slug);

  const title = study
    ? `${study.title} — SultanaExpress`
    : t("metaTitle");
  const description = study?.excerpt || t("metaDescription");

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: `https://sultana.express/${locale}/case-studies/${slug}`,
      locale: locale === "tr" ? "tr_TR" : "en_US",
    },
  };
}

export default async function CaseStudyDetailPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  const t = await getTranslations({ locale, namespace: "caseStudiesPage" });
  const studies = JSON.parse(
    JSON.stringify(t.raw("studies"))
  ) as CaseStudy[];
  const study = studies.find((s) => s.slug === slug);

  if (!study) {
    return (
      <section className="bg-gradient-to-b from-surface-100 to-surface-50 pt-36 pb-16 max-md:pt-28 max-md:pb-12">
        <div className="max-w-[800px] mx-auto px-6 text-center">
          <h1 className="text-3xl font-bold text-text-primary">
            Case study not found
          </h1>
          <Link
            href={`/${locale}/case-studies`}
            className="inline-flex items-center gap-2 mt-6 text-brand-500 hover:text-brand-600 font-medium transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            {t("badge")}
          </Link>
        </div>
      </section>
    );
  }

  return (
    <>
      {/* Hero */}
      <section className="bg-gradient-to-b from-surface-100 to-surface-50 pt-36 pb-16 max-md:pt-28 max-md:pb-12">
        <div className="max-w-[800px] mx-auto px-6">
          <Link
            href={`/${locale}/case-studies`}
            className="inline-flex items-center gap-2 text-sm text-text-secondary hover:text-brand-500 font-medium transition-colors mb-8"
          >
            <ArrowLeft className="w-4 h-4" />
            {t("badge")}
          </Link>

          <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold bg-brand-100 text-brand-700">
            {study.industry}
          </span>

          <h1 className="mt-4 text-4xl max-md:text-2xl font-bold text-text-primary tracking-tight leading-tight">
            {study.title}
          </h1>

          <p className="mt-4 text-lg text-text-secondary leading-relaxed">
            {study.excerpt}
          </p>
        </div>
      </section>

      {/* Stats + Coming Soon body */}
      <section className="bg-surface-50 py-16 max-md:py-12">
        <div className="max-w-[800px] mx-auto px-6">
          {/* Stats */}
          <div className="bg-white rounded-2xl shadow-sm p-8 mb-8">
            <p className="text-xs font-semibold text-text-tertiary uppercase tracking-wider mb-4">
              {t("results")}
            </p>
            <div className="flex gap-4 max-sm:flex-col">
              {study.stats.map((stat, index) => (
                <div
                  key={index}
                  className="flex-1 bg-brand-50 rounded-xl px-6 py-5 text-center"
                >
                  <p className="text-3xl font-bold text-brand-600">
                    {stat.value}
                  </p>
                  <p className="text-sm text-text-secondary mt-1">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Coming soon */}
          <div className="bg-white rounded-2xl shadow-sm p-8 md:p-12 text-center">
            <div className="flex justify-center mb-6">
              <div className="w-16 h-16 rounded-2xl bg-brand-50 flex items-center justify-center">
                <BarChart3 className="w-8 h-8 text-brand-500" />
              </div>
            </div>

            <div className="py-4 px-6 bg-surface-100 rounded-xl inline-block">
              <p className="text-sm text-text-tertiary font-medium">
                {locale === "tr"
                  ? "Bu basari hikayesinin tam versiyonu hazirlanmaktadir. Yakin zamanda yayinlanacak."
                  : "The full case study is currently being prepared. It will be published soon."}
              </p>
            </div>

            <div className="mt-8">
              <Link
                href={`/${locale}/case-studies`}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-brand-500 text-white text-sm font-semibold transition-all hover:bg-brand-600 active:bg-brand-700 shadow-sm hover:shadow-md"
              >
                <ArrowLeft className="w-4 h-4" />
                {t("badge")}
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
