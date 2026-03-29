import { SectionHeader } from "@/components/ui/SectionHeader";

interface PageHeroProps {
  badge?: string;
  title: string;
  subtitle?: string;
}

export function PageHero({ badge, title, subtitle }: PageHeroProps) {
  return (
    <section className="bg-gradient-to-b from-surface-100 to-surface-50 pt-36 pb-16 max-md:pt-28 max-md:pb-12">
      <div className="max-w-[1200px] mx-auto px-6">
        <SectionHeader badge={badge} title={title} subtitle={subtitle} />
      </div>
    </section>
  );
}
