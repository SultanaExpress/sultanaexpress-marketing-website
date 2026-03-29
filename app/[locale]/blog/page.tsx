import { getTranslations } from "next-intl/server";
import type { Metadata } from "next";
import { PageHero } from "@/components/ui/PageHero";
import { BlogPostGrid } from "./BlogPostGrid";

interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  readTime: number;
  date: string;
  author: string;
}

interface Categories {
  all: string;
  sourcingGuides: string;
  industryTrends: string;
  platformTips: string;
  certifications: string;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "blogPage" });

  return {
    title: t("metaTitle"),
    description: t("metaDescription"),
    alternates: {
      canonical: `https://sultana.express/${locale}/blog`,
      languages: {
        en: "https://sultana.express/en/blog",
        tr: "https://sultana.express/tr/blog",
      },
    },
    openGraph: {
      title: t("metaTitle"),
      description: t("metaDescription"),
      url: `https://sultana.express/${locale}/blog`,
      locale: locale === "tr" ? "tr_TR" : "en_US",
    },
  };
}

export default async function BlogPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "blogPage" });

  const posts = JSON.parse(JSON.stringify(t.raw("posts"))) as BlogPost[];
  const categories = JSON.parse(
    JSON.stringify(t.raw("categories"))
  ) as Categories;

  return (
    <>
      <PageHero
        badge={t("badge")}
        title={t("title")}
        subtitle={t("subtitle")}
      />
      <BlogPostGrid
        posts={posts}
        categories={categories}
        readMoreLabel={t("readMore")}
        minReadLabel={t("minRead")}
        locale={locale}
      />
    </>
  );
}
