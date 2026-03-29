import { getTranslations } from "next-intl/server";
import type { Metadata } from "next";
import { HeroSection } from "@/components/landing/HeroSection";
import { ProblemSection } from "@/components/landing/ProblemSection";
import { FeaturesSection } from "@/components/landing/FeaturesSection";
import { WhyTurkeySection } from "@/components/landing/WhyTurkeySection";
import { ForBuyersSection } from "@/components/landing/ForBuyersSection";
import { ForSuppliersSection } from "@/components/landing/ForSuppliersSection";
import { HowItWorksSection } from "@/components/landing/HowItWorksSection";
import { MobileAppSection } from "@/components/landing/MobileAppSection";
import { TrustSection } from "@/components/landing/TrustSection";
import { TestimonialsSection } from "@/components/landing/TestimonialsSection";
import { PricingSection } from "@/components/landing/PricingSection";
import { FAQSection } from "@/components/landing/FAQSection";
import { BottomCTASection } from "@/components/landing/BottomCTASection";
import { organizationJsonLd, websiteJsonLd, faqJsonLd } from "@/lib/jsonld";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "metadata" });

  return {
    title: t("title"),
    description: t("description"),
    alternates: {
      canonical: `https://sultana.express/${locale}`,
      languages: {
        en: "https://sultana.express/en",
        tr: "https://sultana.express/tr",
      },
    },
    openGraph: {
      title: t("title"),
      description: t("description"),
      url: `https://sultana.express/${locale}`,
      locale: locale === "tr" ? "tr_TR" : "en_US",
    },
  };
}

export default async function LandingPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "faq" });
  const faqItems = JSON.parse(JSON.stringify(t.raw("items"))) as Array<{
    question: string;
    answer: string;
  }>;

  return (
    <>
      {/* Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(organizationJsonLd()),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(websiteJsonLd()),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(faqJsonLd(faqItems)),
        }}
      />

      {/* Landing Page Sections */}
      <HeroSection />
      <ProblemSection />
      <WhyTurkeySection />
      <ForBuyersSection />
      <ForSuppliersSection />
      <HowItWorksSection />
      <MobileAppSection />
      <TrustSection />
      <TestimonialsSection />
      <PricingSection />
      <FAQSection />
      <BottomCTASection />
    </>
  );
}
