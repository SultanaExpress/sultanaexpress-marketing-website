import { useTranslations } from "next-intl";
import Image from "next/image";
import { Link } from "@/i18n/navigation";
import { MapPin, Mail } from "lucide-react";

const platformLinks = [
  { key: "browseProducts", href: "#" },
  { key: "browseSuppliers", href: "#" },
  { key: "postRFQ", href: "#" },
  { key: "compareQuotes", href: "#" },
] as const;

const resourceLinks = [
  { key: "howItWorks", href: "/#how-it-works" },
  { key: "pricing", href: "/pricing" },
  { key: "faq", href: "/#faq" },
  { key: "helpCenter", href: "/#faq" },
] as const;

const companyLinks = [
  { key: "about", href: "/about" },
  { key: "contact", href: "/about" },
] as const;

export function Footer() {
  const t = useTranslations("footer");

  return (
    <footer className="bg-navy-600 text-white">
      <div className="max-w-[1200px] mx-auto px-6 pt-16 pb-8 max-md:pt-12">
        {/* Grid */}
        <div className="grid grid-cols-2 gap-8 lg:grid-cols-5 md:grid-cols-3">
          {/* Brand column */}
          <div className="col-span-2 md:col-span-3 lg:col-span-1 mb-4 lg:mb-0">
            <Link href="/" aria-label="SultanaExpress home">
              <Image
                src="/logos/logo-white.svg"
                alt="SultanaExpress"
                width={160}
                height={36}
                className="h-9 w-auto mb-4"
              />
            </Link>
            <p className="text-sm text-white/60 leading-relaxed max-w-xs">
              {t("tagline")}
            </p>
          </div>

          {/* Platform */}
          <div>
            <h3 className="text-sm font-semibold tracking-wide text-white/90 mb-4">
              {t("platform")}
            </h3>
            <ul className="space-y-2.5">
              {platformLinks.map(({ key, href }) => (
                <li key={key}>
                  <a
                    href={href}
                    className="text-sm text-white/60 hover:text-white transition-colors"
                  >
                    {t(`platformLinks.${key}`)}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="text-sm font-semibold tracking-wide text-white/90 mb-4">
              {t("resources")}
            </h3>
            <ul className="space-y-2.5">
              {resourceLinks.map(({ key, href }) => (
                <li key={key}>
                  <Link
                    href={href}
                    className="text-sm text-white/60 hover:text-white transition-colors"
                  >
                    {t(`resourceLinks.${key}`)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-sm font-semibold tracking-wide text-white/90 mb-4">
              {t("company")}
            </h3>
            <ul className="space-y-2.5">
              {companyLinks.map(({ key, href }) => (
                <li key={key}>
                  <Link
                    href={href}
                    className="text-sm text-white/60 hover:text-white transition-colors"
                  >
                    {t(`companyLinks.${key}`)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-sm font-semibold tracking-wide text-white/90 mb-4">
              {t("contact")}
            </h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-2 text-sm text-white/60">
                <MapPin className="w-4 h-4 mt-0.5 shrink-0 text-white/40" />
                {t("location")}
              </li>
              <li>
                <a
                  href={`mailto:${t("email")}`}
                  className="flex items-start gap-2 text-sm text-white/60 hover:text-white transition-colors"
                >
                  <Mail className="w-4 h-4 mt-0.5 shrink-0 text-white/40" />
                  {t("email")}
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="mt-12 pt-8 border-t border-white/10">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-xs text-white/40">{t("copyright")}</p>
            <div className="flex items-center gap-6">
              <Link
                href="/legal/privacy"
                className="text-xs text-white/40 hover:text-white/70 transition-colors"
              >
                {t("privacy")}
              </Link>
              <Link
                href="/legal/terms"
                className="text-xs text-white/40 hover:text-white/70 transition-colors"
              >
                {t("terms")}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
