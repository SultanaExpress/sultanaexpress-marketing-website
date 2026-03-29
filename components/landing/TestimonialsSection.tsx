"use client";

import { useTranslations } from "next-intl";
import { AnimateOnScroll } from "@/components/ui/AnimateOnScroll";
import { SectionWrapper } from "@/components/ui/SectionWrapper";
import { SectionHeader } from "@/components/ui/SectionHeader";

interface TestimonialItem {
  quote: string;
  initials: string;
  name: string;
  company: string;
  exp: string;
}

function TestimonialCard({
  item,
  delay,
}: {
  item: TestimonialItem;
  delay: number;
}) {
  return (
    <AnimateOnScroll delay={delay}>
      <div className="flex h-full flex-col rounded-2xl border border-surface-300 bg-surface-50 p-8 shadow-sm transition-shadow hover:shadow-md">
        {/* Quote */}
        <blockquote className="mb-6 flex-1 border-l-4 border-brand-500 pl-5 italic text-text-secondary">
          &ldquo;{item.quote}&rdquo;
        </blockquote>

        {/* Author */}
        <div className="flex items-center gap-4">
          {/* Avatar with initials */}
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-brand-100 text-sm font-bold text-brand-600">
            {item.initials}
          </div>
          <div className="min-w-0">
            <p className="font-semibold text-text-primary">{item.name}</p>
            <p className="text-sm text-text-muted">{item.company}</p>
          </div>
        </div>

        {/* Experience badge */}
        <div className="mt-4">
          <span className="inline-block rounded-full bg-brand-50 px-3 py-1 text-xs font-semibold text-brand-600">
            {item.exp}
          </span>
        </div>
      </div>
    </AnimateOnScroll>
  );
}

export function TestimonialsSection() {
  const t = useTranslations("testimonials");

  const items = t.raw("items") as TestimonialItem[];

  return (
    <SectionWrapper variant="light" id="testimonials">
      <SectionHeader badge={t("badge")} title={t("title")} />

      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {items.map((item, index) => (
          <TestimonialCard
            key={index}
            item={item}
            delay={0.1 + index * 0.1}
          />
        ))}
      </div>
    </SectionWrapper>
  );
}
