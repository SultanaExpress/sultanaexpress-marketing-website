"use client";

import { useState } from "react";
import Link from "next/link";
import { AnimateOnScroll } from "@/components/ui/AnimateOnScroll";

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

interface BlogPostGridProps {
  posts: BlogPost[];
  categories: Categories;
  readMoreLabel: string;
  minReadLabel: string;
  locale: string;
}

const categoryKeys = [
  "all",
  "sourcingGuides",
  "industryTrends",
  "platformTips",
  "certifications",
] as const;

const categoryColors: Record<string, { badge: string; gradient: string }> = {
  sourcingGuides: {
    badge: "bg-brand-100 text-brand-700",
    gradient: "from-brand-400 to-brand-600",
  },
  industryTrends: {
    badge: "bg-blue-100 text-blue-700",
    gradient: "from-blue-400 to-blue-600",
  },
  platformTips: {
    badge: "bg-green-100 text-green-700",
    gradient: "from-green-400 to-green-600",
  },
  certifications: {
    badge: "bg-purple-100 text-purple-700",
    gradient: "from-purple-400 to-purple-600",
  },
};

export function BlogPostGrid({
  posts,
  categories,
  readMoreLabel,
  minReadLabel,
  locale,
}: BlogPostGridProps) {
  const [activeCategory, setActiveCategory] = useState<string>("all");

  const filteredPosts =
    activeCategory === "all"
      ? posts
      : posts.filter((post) => post.category === activeCategory);

  return (
    <section className="bg-surface-50 py-16 max-md:py-12">
      <div className="max-w-[1200px] mx-auto px-6">
        {/* Category filter bar */}
        <div className="flex gap-2 overflow-x-auto pb-4 mb-10 scrollbar-hide -mx-6 px-6 md:mx-0 md:px-0 md:justify-center md:flex-wrap">
          {categoryKeys.map((key) => (
            <button
              key={key}
              onClick={() => setActiveCategory(key)}
              className={`shrink-0 px-4 py-2 rounded-full text-sm font-medium transition-all ${
                activeCategory === key
                  ? "bg-brand-500 text-white shadow-sm"
                  : "bg-white text-text-secondary hover:bg-surface-100 border border-surface-200"
              }`}
            >
              {categories[key as keyof Categories]}
            </button>
          ))}
        </div>

        {/* Blog post cards grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredPosts.map((post, index) => {
            const colors = categoryColors[post.category] || {
              badge: "bg-surface-100 text-text-secondary",
              gradient: "from-surface-300 to-surface-400",
            };

            const formattedDate = new Date(post.date).toLocaleDateString(
              locale,
              {
                year: "numeric",
                month: "long",
                day: "numeric",
              }
            );

            return (
              <AnimateOnScroll key={post.slug} delay={index * 0.1}>
                <Link
                  href={`/${locale}/blog/${post.slug}`}
                  className="group block bg-white rounded-2xl shadow-sm hover:shadow-md transition-all overflow-hidden"
                >
                  {/* Placeholder image area */}
                  <div
                    className={`h-48 bg-gradient-to-br ${colors.gradient} flex items-center justify-center`}
                  >
                    <svg
                      className="w-12 h-12 text-white/30"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={1.5}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25"
                      />
                    </svg>
                  </div>

                  {/* Card content */}
                  <div className="p-6">
                    {/* Category badge */}
                    <span
                      className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${colors.badge}`}
                    >
                      {categories[post.category as keyof Categories]}
                    </span>

                    {/* Title */}
                    <h3 className="mt-3 text-lg font-bold text-text-primary leading-snug group-hover:text-brand-500 transition-colors line-clamp-2">
                      {post.title}
                    </h3>

                    {/* Excerpt */}
                    <p className="mt-2 text-sm text-text-secondary leading-relaxed line-clamp-3">
                      {post.excerpt}
                    </p>

                    {/* Meta line */}
                    <div className="mt-4 flex items-center text-xs text-text-tertiary">
                      <span>{post.author}</span>
                      <span className="mx-2">·</span>
                      <span>{formattedDate}</span>
                      <span className="mx-2">·</span>
                      <span>
                        {post.readTime} {minReadLabel}
                      </span>
                    </div>
                  </div>
                </Link>
              </AnimateOnScroll>
            );
          })}
        </div>

        {/* Empty state */}
        {filteredPosts.length === 0 && (
          <div className="text-center py-16">
            <p className="text-text-secondary">No posts in this category yet.</p>
          </div>
        )}
      </div>
    </section>
  );
}
