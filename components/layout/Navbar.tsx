"use client";

import { useCallback, useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { Link, useRouter, usePathname } from "@/i18n/navigation";
import { Menu, X, Globe } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";

const NAV_LINKS = [
  { key: "howItWorks", href: "/#how-it-works", isPage: false },
  { key: "forBuyers", href: "/#for-buyers", isPage: false },
  { key: "forSuppliers", href: "/#for-suppliers", isPage: false },
  { key: "pricing", href: "/pricing", isPage: true },
  { key: "about", href: "/about", isPage: true },
  { key: "blog", href: "/blog", isPage: true },
] as const;

export function Navbar() {
  const t = useTranslations("nav");
  const router = useRouter();
  const pathname = usePathname();

  // On non-landing pages, navbar should use dark text (no dark hero behind it)
  const isLandingPage = pathname === "/" || pathname === "";
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const useDarkText = !isLandingPage || scrolled;

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 32);
    };

    // Check initial position in case the page is already scrolled on mount
    handleScroll();

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  const toggleLocale = useCallback(() => {
    // Determine current locale from the pathname prefix
    const isCurrentlyTr =
      typeof window !== "undefined" &&
      window.location.pathname.startsWith("/tr");
    const nextLocale = isCurrentlyTr ? "en" : "tr";
    router.replace(pathname, { locale: nextLocale });
  }, [router, pathname]);

  const closeMobile = useCallback(() => setMobileOpen(false), []);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 h-[72px] transition-all duration-300 ${
          useDarkText
            ? "bg-white/95 backdrop-blur-md shadow-sm"
            : "bg-transparent"
        }`}
      >
        <nav
          className="max-w-[1200px] mx-auto px-6 h-full flex items-center justify-between"
          aria-label="Main navigation"
        >
          {/* Logo */}
          <Link href="/" className="relative shrink-0" aria-label="SultanaExpress home">
            <Image
              src="/logos/logo-white.svg"
              alt="SultanaExpress"
              width={160}
              height={36}
              priority
              className={`h-9 w-auto transition-opacity duration-300 ${
                useDarkText ? "opacity-0" : "opacity-100"
              }`}
            />
            <Image
              src="/logos/logo-dark.svg"
              alt="SultanaExpress"
              width={160}
              height={36}
              priority
              className={`absolute inset-0 h-9 w-auto transition-opacity duration-300 ${
                useDarkText ? "opacity-100" : "opacity-0"
              }`}
            />
          </Link>

          {/* Desktop nav links */}
          <ul className="hidden lg:flex items-center gap-8">
            {NAV_LINKS.map(({ key, href, isPage }) => (
              <li key={key}>
                {isPage ? (
                  <Link
                    href={href}
                    className={`text-sm font-medium transition-colors hover:text-brand-500 ${
                      useDarkText ? "text-text-primary" : "text-white"
                    }`}
                  >
                    {t(key)}
                  </Link>
                ) : (
                  <a
                    href={href}
                    className={`text-sm font-medium transition-colors hover:text-brand-500 ${
                      useDarkText ? "text-text-primary" : "text-white"
                    }`}
                  >
                    {t(key)}
                  </a>
                )}
              </li>
            ))}
          </ul>

          {/* Desktop right actions */}
          <div className="hidden lg:flex items-center gap-3">
            {/* Language toggle */}
            <button
              onClick={toggleLocale}
              className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                useDarkText
                  ? "text-text-secondary hover:text-text-primary hover:bg-surface-100"
                  : "text-white/80 hover:text-white hover:bg-white/10"
              }`}
              aria-label="Switch language"
            >
              <Globe className="w-4 h-4" aria-hidden="true" />
              {t("switchLang")}
            </button>

            {/* CTA */}
            <Link
              href="/pricing"
              className="inline-flex items-center px-5 py-2.5 rounded-lg bg-brand-500 text-white text-sm font-semibold transition-all hover:bg-brand-600 active:bg-brand-700 shadow-sm hover:shadow-md"
            >
              {t("getStarted")}
            </Link>
          </div>

          {/* Mobile hamburger - 44px touch target */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className={`lg:hidden p-2.5 -mr-2.5 rounded-lg transition-colors min-w-[44px] min-h-[44px] flex items-center justify-center ${
              useDarkText
                ? "text-text-primary hover:bg-surface-100"
                : "text-white hover:bg-white/10"
            }`}
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileOpen}
          >
            {mobileOpen ? (
              <X className="w-6 h-6" aria-hidden="true" />
            ) : (
              <Menu className="w-6 h-6" aria-hidden="true" />
            )}
          </button>
        </nav>
      </header>

      {/* Mobile drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm lg:hidden"
              onClick={closeMobile}
              aria-hidden="true"
            />

            {/* Drawer panel */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 30, stiffness: 300 }}
              className="fixed top-0 right-0 bottom-0 z-50 w-[min(320px,85vw)] bg-white shadow-xl lg:hidden"
            >
              <div className="flex flex-col h-full">
                {/* Drawer header */}
                <div className="flex items-center justify-between h-[72px] px-6 border-b border-surface-200">
                  <Image
                    src="/logos/logo-dark.svg"
                    alt="SultanaExpress"
                    width={140}
                    height={32}
                    className="h-8 w-auto"
                  />
                  <button
                    onClick={closeMobile}
                    className="p-2 -mr-2 rounded-lg text-text-primary hover:bg-surface-100 transition-colors"
                    aria-label="Close menu"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                {/* Drawer links */}
                <nav className="flex-1 px-6 py-6 overflow-y-auto" aria-label="Mobile navigation">
                  <ul className="space-y-1">
                    {NAV_LINKS.map(({ key, href, isPage }) => (
                      <li key={key}>
                        {isPage ? (
                          <Link
                            href={href}
                            onClick={closeMobile}
                            className="block px-3 py-3 rounded-lg text-base font-medium text-text-primary hover:bg-surface-100 transition-colors"
                          >
                            {t(key)}
                          </Link>
                        ) : (
                          <a
                            href={href}
                            onClick={closeMobile}
                            className="block px-3 py-3 rounded-lg text-base font-medium text-text-primary hover:bg-surface-100 transition-colors"
                          >
                            {t(key)}
                          </a>
                        )}
                      </li>
                    ))}
                  </ul>
                </nav>

                {/* Drawer footer */}
                <div className="px-6 py-6 border-t border-surface-200 space-y-3">
                  <button
                    onClick={() => {
                      toggleLocale();
                      closeMobile();
                    }}
                    className="flex items-center gap-2 w-full px-3 py-3 rounded-lg text-sm font-medium text-text-secondary hover:bg-surface-100 transition-colors"
                  >
                    <Globe className="w-4 h-4" />
                    {t("switchLang")}
                  </button>
                  <Link
                    href="/pricing"
                    onClick={closeMobile}
                    className="flex items-center justify-center w-full px-5 py-3 rounded-lg bg-brand-500 text-white text-sm font-semibold transition-all hover:bg-brand-600 active:bg-brand-700"
                  >
                    {t("getStarted")}
                  </Link>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
