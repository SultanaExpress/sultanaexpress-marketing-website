"use client";

import { useState, type FormEvent } from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { Check, Smartphone, Mail, ArrowRight, Loader2 } from "lucide-react";
import { AnimateOnScroll } from "@/components/ui/AnimateOnScroll";

export function MobileAppSection() {
  const t = useTranslations("mobileApp");

  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const buyerFeatures = t.raw("buyerFeatures") as string[];
  const supplierFeatures = t.raw("supplierFeatures") as string[];

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!email.trim()) return;

    setStatus("loading");
    setErrorMessage("");

    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || "Something went wrong. Please try again.");
      }

      setStatus("success");
      setEmail("");
    } catch (err) {
      setStatus("error");
      setErrorMessage(
        err instanceof Error ? err.message : "Something went wrong. Please try again."
      );
    }
  }

  return (
    <section
      id="mobile-app"
      className="relative overflow-hidden bg-gradient-to-br from-navy-600 via-navy-700 to-navy-500 py-[100px] max-lg:py-16 max-md:py-12"
    >
      {/* Decorative background elements */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -right-32 -top-32 h-96 w-96 rounded-full bg-brand-500/10 blur-3xl" />
        <div className="absolute -bottom-24 -left-24 h-80 w-80 rounded-full bg-brand-500/5 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-[1200px] px-6">
        {/* Section header */}
        <AnimateOnScroll className="mx-auto mb-12 max-w-3xl text-center lg:mb-16">
          <span className="mb-4 inline-block rounded-full bg-white/10 px-4 py-1.5 text-sm font-semibold text-brand-300">
            {t("badge")}
          </span>
          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl">
            {t("title")}
          </h2>
          <p className="mt-4 text-lg text-white/70 lg:text-xl">
            {t("subtitle")}
          </p>
        </AnimateOnScroll>

        {/* Two-column layout */}
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Left column: feature lists */}
          <div className="space-y-10">
            {/* Buyer App */}
            <AnimateOnScroll delay={0.1} direction="left">
              <div>
                <div className="mb-4 flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-brand-500/20">
                    <Smartphone className="h-5 w-5 text-brand-400" />
                  </div>
                  <h3 className="text-xl font-bold text-white">
                    {t("buyerTitle")}
                  </h3>
                </div>
                <ul className="space-y-3">
                  {buyerFeatures.map((feature, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <Check className="mt-0.5 h-5 w-5 shrink-0 text-brand-400" />
                      <span className="text-white/70">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </AnimateOnScroll>

            {/* Supplier App */}
            <AnimateOnScroll delay={0.2} direction="left">
              <div>
                <div className="mb-4 flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-brand-500/20">
                    <Smartphone className="h-5 w-5 text-brand-400" />
                  </div>
                  <h3 className="text-xl font-bold text-white">
                    {t("supplierTitle")}
                  </h3>
                </div>
                <ul className="space-y-3">
                  {supplierFeatures.map((feature, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <Check className="mt-0.5 h-5 w-5 shrink-0 text-brand-400" />
                      <span className="text-white/70">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </AnimateOnScroll>
          </div>

          {/* Right column: app screenshots */}
          <AnimateOnScroll delay={0.2} direction="right">
            <div className="relative mx-auto flex max-w-sm flex-col items-center gap-8 lg:max-w-none lg:gap-10">
              <Image
                src="/assets/sultana-buyer-app.webp"
                alt="Sultana buyer app on a phone showing product categories and featured items"
                width={480}
                height={320}
                className="w-full rounded-2xl shadow-2xl"
              />
              <Image
                src="/assets/sultana-supplier-app.webp"
                alt="Sultana supplier app showing product management and product detail screens"
                width={480}
                height={320}
                className="w-full rounded-2xl shadow-2xl"
              />
            </div>
          </AnimateOnScroll>
        </div>

        {/* Email notify form */}
        <AnimateOnScroll delay={0.3} className="mt-16">
          <div className="mx-auto max-w-xl text-center">
            <div className="mb-4 flex items-center justify-center gap-2">
              <Mail className="h-5 w-5 text-brand-400" />
              <p className="text-white/70">{t("notifyText")}</p>
            </div>

            {status === "success" ? (
              <div className="rounded-xl border border-green-400/30 bg-green-500/10 px-6 py-4">
                <div className="flex items-center justify-center gap-2">
                  <Check className="h-5 w-5 text-green-400" />
                  <p className="font-medium text-green-300">
                    You&apos;re on the list! We&apos;ll notify you when the apps launch.
                  </p>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-3 sm:flex-row">
                <div className="relative flex-1">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder={t("notifyPlaceholder")}
                    required
                    aria-label={t("notifyPlaceholder")}
                    className="w-full rounded-xl border border-white/20 bg-white/10 px-5 py-3.5 text-white placeholder:text-white/40 focus:border-brand-400 focus:outline-none focus:ring-2 focus:ring-brand-400/30"
                  />
                </div>
                <button
                  type="submit"
                  disabled={status === "loading"}
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-brand-500 px-6 py-3.5 font-semibold text-white transition-all hover:bg-brand-600 focus:outline-none focus:ring-2 focus:ring-brand-400 focus:ring-offset-2 focus:ring-offset-navy-700 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {status === "loading" ? (
                    <Loader2 className="h-5 w-5 animate-spin" />
                  ) : (
                    <>
                      {t("notifyButton")}
                      <ArrowRight className="h-4 w-4" />
                    </>
                  )}
                </button>
              </form>
            )}

            {status === "error" && (
              <p className="mt-3 text-sm text-red-400" role="alert">
                {errorMessage}
              </p>
            )}
          </div>
        </AnimateOnScroll>
      </div>
    </section>
  );
}
