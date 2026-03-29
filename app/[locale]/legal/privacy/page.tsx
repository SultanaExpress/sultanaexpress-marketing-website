import { getTranslations } from "next-intl/server";
import type { Metadata } from "next";
import { PageHero } from "@/components/ui/PageHero";
import { SectionWrapper } from "@/components/ui/SectionWrapper";
import { LegalContent } from "@/components/legal/LegalContent";
import { breadcrumbJsonLd } from "@/lib/jsonld";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "privacyPage" });

  return {
    title: t("metaTitle"),
    description: t("metaDescription"),
    alternates: {
      canonical: `https://sultana.express/${locale}/legal/privacy`,
      languages: {
        en: "https://sultana.express/en/legal/privacy",
        tr: "https://sultana.express/tr/legal/privacy",
      },
    },
    openGraph: {
      title: t("metaTitle"),
      description: t("metaDescription"),
      url: `https://sultana.express/${locale}/legal/privacy`,
      locale: locale === "tr" ? "tr_TR" : "en_US",
    },
  };
}

export default async function PrivacyPolicyPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "privacyPage" });

  const sections = JSON.parse(JSON.stringify(t.raw("sections"))) as Array<{
    title: string;
    content: string;
  }>;

  const breadcrumbs = breadcrumbJsonLd([
    { name: "Home", url: `https://sultana.express/${locale}` },
    {
      name: t("title"),
      url: `https://sultana.express/${locale}/legal/privacy`,
    },
  ]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbs) }}
      />

      <PageHero
        badge={t("badge")}
        title={t("title")}
        subtitle={t("subtitle")}
      />

      <SectionWrapper variant="white">
        <LegalContent lastUpdated={t("lastUpdated")} sections={sections} />
      </SectionWrapper>
    </>
  );
}
