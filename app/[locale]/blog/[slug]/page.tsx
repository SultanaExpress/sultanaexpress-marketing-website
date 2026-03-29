import { getTranslations } from "next-intl/server";
import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, Clock, FileText } from "lucide-react";

interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  readTime: number;
  date: string;
  author: string;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const t = await getTranslations({ locale, namespace: "blogPage" });
  const posts = JSON.parse(JSON.stringify(t.raw("posts"))) as BlogPost[];
  const post = posts.find((p) => p.slug === slug);

  const title = post ? `${post.title} — SultanaExpress Blog` : "Blog — SultanaExpress";
  const description = post?.excerpt || t("metaDescription");

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: `https://sultana.express/${locale}/blog/${slug}`,
      locale: locale === "tr" ? "tr_TR" : "en_US",
    },
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  const t = await getTranslations({ locale, namespace: "blogPage" });
  const posts = JSON.parse(JSON.stringify(t.raw("posts"))) as BlogPost[];
  const post = posts.find((p) => p.slug === slug);

  const categories = JSON.parse(
    JSON.stringify(t.raw("categories"))
  ) as Record<string, string>;

  if (!post) {
    return (
      <section className="bg-gradient-to-b from-surface-100 to-surface-50 pt-36 pb-16 max-md:pt-28 max-md:pb-12">
        <div className="max-w-[800px] mx-auto px-6 text-center">
          <h1 className="text-3xl font-bold text-text-primary">
            Post not found
          </h1>
          <Link
            href={`/${locale}/blog`}
            className="inline-flex items-center gap-2 mt-6 text-brand-500 hover:text-brand-600 font-medium transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Blog
          </Link>
        </div>
      </section>
    );
  }

  const formattedDate = new Date(post.date).toLocaleDateString(locale, {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const categoryLabel = categories[post.category] || post.category;

  const categoryColors: Record<string, string> = {
    sourcingGuides: "bg-brand-100 text-brand-700",
    industryTrends: "bg-blue-100 text-blue-700",
    platformTips: "bg-green-100 text-green-700",
    certifications: "bg-purple-100 text-purple-700",
  };

  const badgeColor =
    categoryColors[post.category] || "bg-surface-100 text-text-secondary";

  return (
    <>
      {/* Hero */}
      <section className="bg-gradient-to-b from-surface-100 to-surface-50 pt-36 pb-16 max-md:pt-28 max-md:pb-12">
        <div className="max-w-[800px] mx-auto px-6">
          <Link
            href={`/${locale}/blog`}
            className="inline-flex items-center gap-2 text-sm text-text-secondary hover:text-brand-500 font-medium transition-colors mb-8"
          >
            <ArrowLeft className="w-4 h-4" />
            {t("badge")}
          </Link>

          <span
            className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${badgeColor}`}
          >
            {categoryLabel}
          </span>

          <h1 className="mt-4 text-4xl max-md:text-2xl font-bold text-text-primary tracking-tight leading-tight">
            {post.title}
          </h1>

          <div className="mt-4 flex items-center gap-4 text-sm text-text-secondary">
            <span>{post.author}</span>
            <span>·</span>
            <span>{formattedDate}</span>
            <span>·</span>
            <span className="flex items-center gap-1">
              <Clock className="w-3.5 h-3.5" />
              {post.readTime} {t("minRead")}
            </span>
          </div>
        </div>
      </section>

      {/* Coming Soon body */}
      <section className="bg-surface-50 py-16 max-md:py-12">
        <div className="max-w-[800px] mx-auto px-6">
          <div className="bg-white rounded-2xl shadow-sm p-8 md:p-12 text-center">
            <div className="flex justify-center mb-6">
              <div className="w-16 h-16 rounded-2xl bg-brand-50 flex items-center justify-center">
                <FileText className="w-8 h-8 text-brand-500" />
              </div>
            </div>

            <p className="text-lg text-text-secondary leading-relaxed max-w-lg mx-auto mb-4">
              {post.excerpt}
            </p>

            <div className="mt-8 py-4 px-6 bg-surface-100 rounded-xl inline-block">
              <p className="text-sm text-text-tertiary font-medium">
                {locale === "tr"
                  ? "Bu makalenin tam versiyonu hazirlanmaktadir. Yakin zamanda yayinlanacak."
                  : "The full version of this article is currently being written. It will be published soon."}
              </p>
            </div>

            <div className="mt-8">
              <Link
                href={`/${locale}/blog`}
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
