"use client";

import { useState, useCallback } from "react";
import { AnimateOnScroll } from "@/components/ui/AnimateOnScroll";
import { SectionHeader } from "@/components/ui/SectionHeader";

interface CalculatorTranslations {
  calculatorTitle: string;
  calculatorDescription: string;
  calculatorMonthlyVolume: string;
  calculatorPlanLabel: string;
  calculatorCommission: string;
  calculatorSubscription: string;
  calculatorTotal: string;
  calculatorSavings: string;
}

const PLANS = [
  { name: "Free", commission: 0.05, subscription: 0, featured: false },
  { name: "Silver", commission: 0.03, subscription: 49, featured: true },
  { name: "Gold", commission: 0.01, subscription: 149, featured: false },
] as const;

const MIN_VOLUME = 1000;
const MAX_VOLUME = 500000;
const STEP = 1000;

function formatCurrency(amount: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}

export function CommissionCalculator({
  translations: t,
}: {
  translations: CalculatorTranslations;
}) {
  const [volume, setVolume] = useState(25000);

  const handleSliderChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setVolume(Number(e.target.value));
    },
    []
  );

  const freeTotalCost = volume * PLANS[0].commission + PLANS[0].subscription;

  // Calculate percentage for slider gradient
  const sliderPercent = ((volume - MIN_VOLUME) / (MAX_VOLUME - MIN_VOLUME)) * 100;

  return (
    <>
      <SectionHeader
        title={t.calculatorTitle}
        subtitle={t.calculatorDescription}
      />

      <AnimateOnScroll delay={0.1} className="mx-auto max-w-[900px]">
        {/* Volume Slider */}
        <div className="mb-10 rounded-2xl border border-surface-300 bg-surface-50 p-6 shadow-sm sm:p-8">
          <label className="mb-4 block text-sm font-semibold text-text-primary">
            {t.calculatorMonthlyVolume}
          </label>
          <div className="mb-2 text-center text-3xl font-extrabold tracking-tight text-text-primary">
            {formatCurrency(volume)}
          </div>
          <input
            type="range"
            min={MIN_VOLUME}
            max={MAX_VOLUME}
            step={STEP}
            value={volume}
            onChange={handleSliderChange}
            className="w-full cursor-pointer accent-brand-500"
            style={{
              background: `linear-gradient(to right, var(--color-brand-500) ${sliderPercent}%, var(--color-surface-300) ${sliderPercent}%)`,
              height: "6px",
              borderRadius: "3px",
            }}
          />
          <div className="mt-2 flex justify-between text-xs text-text-muted">
            <span>{formatCurrency(MIN_VOLUME)}</span>
            <span>{formatCurrency(MAX_VOLUME)}</span>
          </div>
        </div>

        {/* Plan Comparison Cards */}
        <div className="grid gap-6 md:grid-cols-3">
          {PLANS.map((plan) => {
            const commissionCost = volume * plan.commission;
            const totalCost = commissionCost + plan.subscription;
            const savings = freeTotalCost - totalCost;

            return (
              <div
                key={plan.name}
                className={`rounded-2xl border p-6 transition-shadow ${
                  plan.featured
                    ? "border-brand-500 shadow-lg"
                    : "border-surface-300 bg-surface-50 shadow-sm"
                }`}
              >
                <h3
                  className={`mb-4 text-lg font-semibold ${
                    plan.featured ? "text-brand-600" : "text-text-primary"
                  }`}
                >
                  {plan.name}
                </h3>

                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-text-muted">
                      {t.calculatorCommission} ({(plan.commission * 100).toFixed(0)}%)
                    </span>
                    <span className="text-sm font-medium text-text-secondary">
                      {formatCurrency(commissionCost)}
                    </span>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-sm text-text-muted">
                      {t.calculatorSubscription}
                    </span>
                    <span className="text-sm font-medium text-text-secondary">
                      {formatCurrency(plan.subscription)}
                    </span>
                  </div>

                  <div className="h-px bg-surface-300" />

                  <div className="flex items-center justify-between">
                    <span className="text-sm font-semibold text-text-primary">
                      {t.calculatorTotal}
                    </span>
                    <span
                      className={`text-lg font-extrabold ${
                        plan.featured ? "text-brand-600" : "text-text-primary"
                      }`}
                    >
                      {formatCurrency(totalCost)}
                    </span>
                  </div>

                  {savings > 0 && (
                    <div className="mt-2 rounded-lg bg-success-100 px-3 py-2 text-center text-sm font-medium text-success-500">
                      {t.calculatorSavings.replace("{amount}", formatCurrency(savings))}
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </AnimateOnScroll>
    </>
  );
}
