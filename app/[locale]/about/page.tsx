import { getTranslations } from "next-intl/server";
import type { Metadata } from "next";
import {
  Search,
  FileText,
  BarChart3,
  MessageCircle,
  Package,
  Truck,
  Eye,
  Shield,
  Unlock,
  Award,
  Shirt,
  Wrench,
  Cpu,
  Wheat,
  Mail,
} from "lucide-react";
import { PageHero } from "@/components/ui/PageHero";
import { SectionWrapper } from "@/components/ui/SectionWrapper";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { AnimateOnScroll } from "@/components/ui/AnimateOnScroll";
import { breadcrumbJsonLd } from "@/lib/jsonld";
import type { LucideIcon } from "lucide-react";

const WHAT_WE_DO_ICONS: LucideIcon[] = [Search, FileText, BarChart3, MessageCircle, Package, Truck];
const VALUE_ICONS: LucideIcon[] = [Eye, Shield, Unlock, Award];
const INDUSTRY_ICONS: LucideIcon[] = [Shirt, Wrench, Cpu, Wheat];

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "aboutPage" });

  return {
    title: t("metaTitle"),
    description: t("metaDescription"),
    alternates: {
      canonical: `https://sultana.express/${locale}/about`,
      languages: {
        en: "https://sultana.express/en/about",
        tr: "https://sultana.express/tr/about",
      },
    },
    openGraph: {
      title: t("metaTitle"),
      description: t("metaDescription"),
      url: `https://sultana.express/${locale}/about`,
      locale: locale === "tr" ? "tr_TR" : "en_US",
    },
  };
}

export default async function AboutPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "aboutPage" });

  const whatWeDoItems = JSON.parse(JSON.stringify(t.raw("whatWeDoItems"))) as Array<{
    title: string;
    desc: string;
  }>;
  const values = JSON.parse(JSON.stringify(t.raw("values"))) as Array<{
    title: string;
    desc: string;
  }>;
  const industries = JSON.parse(JSON.stringify(t.raw("industries"))) as Array<{
    title: string;
    desc: string;
  }>;

  const breadcrumbs = breadcrumbJsonLd([
    { name: "Home", url: `https://sultana.express/${locale}` },
    { name: "About", url: `https://sultana.express/${locale}/about` },
  ]);

  const aboutJsonLd = {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    name: t("metaTitle"),
    description: t("metaDescription"),
    url: `https://sultana.express/${locale}/about`,
    mainEntity: {
      "@type": "Organization",
      name: "SultanaExpress",
      url: "https://sultana.express",
      description: t("missionP1"),
      address: {
        "@type": "PostalAddress",
        addressLocality: "Istanbul",
        addressCountry: "TR",
      },
      contactPoint: {
        "@type": "ContactPoint",
        email: "sc@sultana.express",
        contactType: "customer service",
      },
    },
  };

  return (
    <>
      {/* Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(aboutJsonLd) }}
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

      {/* Mission Section */}
      <SectionWrapper variant="white">
        <SectionHeader title={t("missionTitle")} />

        <AnimateOnScroll delay={0.1} className="mx-auto max-w-[800px]">
          <div className="space-y-6">
            <p className="text-lg leading-relaxed text-text-secondary">
              {t("missionP1")}
            </p>
            <p className="text-lg leading-relaxed text-text-secondary">
              {t("missionP2")}
            </p>
            <p className="text-2xl font-bold text-brand-600">
              {t("missionP3")}
            </p>
          </div>
        </AnimateOnScroll>
      </SectionWrapper>

      {/* What We Do Section */}
      <SectionWrapper variant="light">
        <SectionHeader title={t("whatWeDoTitle")} subtitle={t("whatWeDoIntro")} />

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {whatWeDoItems.map((item, index) => {
            const Icon = WHAT_WE_DO_ICONS[index];
            return (
              <AnimateOnScroll key={index} delay={0.1 + index * 0.08}>
                <div className="flex h-full flex-col rounded-2xl border border-surface-300 bg-surface-50 p-6 shadow-sm transition-shadow hover:shadow-md">
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-brand-50">
                    <Icon className="h-6 w-6 text-brand-600" />
                  </div>
                  <h3 className="mb-2 text-lg font-semibold text-text-primary">
                    {item.title}
                  </h3>
                  <p className="text-sm leading-relaxed text-text-secondary">
                    {item.desc}
                  </p>
                </div>
              </AnimateOnScroll>
            );
          })}
        </div>
      </SectionWrapper>

      {/* Values Section */}
      <SectionWrapper variant="white">
        <SectionHeader title={t("valuesTitle")} />

        <div className="mx-auto grid max-w-[900px] gap-6 sm:grid-cols-2">
          {values.map((value, index) => {
            const Icon = VALUE_ICONS[index];
            return (
              <AnimateOnScroll key={index} delay={0.1 + index * 0.1}>
                <div className="flex h-full flex-col rounded-2xl border border-surface-300 bg-surface-50 p-6 shadow-sm transition-shadow hover:shadow-md">
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-brand-50">
                    <Icon className="h-6 w-6 text-brand-600" />
                  </div>
                  <h3 className="mb-2 text-lg font-semibold text-text-primary">
                    {value.title}
                  </h3>
                  <p className="text-sm leading-relaxed text-text-secondary">
                    {value.desc}
                  </p>
                </div>
              </AnimateOnScroll>
            );
          })}
        </div>
      </SectionWrapper>

      {/* Industries Section */}
      <SectionWrapper variant="light">
        <SectionHeader title={t("industriesTitle")} subtitle={t("industriesIntro")} />

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {industries.map((industry, index) => {
            const Icon = INDUSTRY_ICONS[index];
            return (
              <AnimateOnScroll key={index} delay={0.1 + index * 0.1}>
                <div className="flex h-full flex-col items-center rounded-2xl border border-surface-300 bg-surface-50 p-6 text-center shadow-sm transition-shadow hover:shadow-md">
                  <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-brand-50">
                    <Icon className="h-7 w-7 text-brand-600" />
                  </div>
                  <h3 className="mb-2 text-lg font-semibold text-text-primary">
                    {industry.title}
                  </h3>
                  <p className="text-sm leading-relaxed text-text-secondary">
                    {industry.desc}
                  </p>
                </div>
              </AnimateOnScroll>
            );
          })}
        </div>
      </SectionWrapper>

      {/* Contact CTA Section */}
      <SectionWrapper variant="white">
        <AnimateOnScroll delay={0.1}>
          <div className="mx-auto max-w-[700px] text-center">
            <h2 className="mb-4 text-3xl font-bold tracking-tight text-text-primary max-md:text-2xl">
              {t("contactTitle")}
            </h2>
            <p className="mb-8 text-lg leading-relaxed text-text-secondary">
              {t("contactText")}
            </p>
            <a
              href="mailto:sc@sultana.express"
              className="inline-flex items-center gap-2 rounded-xl bg-brand-500 px-8 py-4 font-semibold text-white transition-colors hover:bg-brand-600 focus:outline-none focus:ring-2 focus:ring-brand-400 focus:ring-offset-2"
            >
              <Mail className="h-5 w-5" />
              {t("contactCta")}
            </a>
          </div>
        </AnimateOnScroll>
      </SectionWrapper>
    </>
  );
}
