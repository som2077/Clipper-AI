"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import Link from "next/link";
import {
  ArrowRight,
  Check,
  Clock,
  ExternalLink,
  Github,
  Info,
} from "lucide-react";

import { BillingIntervalToggle, ComingSoonTag, useBillingPlanText } from "@/components/billing/upgrade-prompt";
import { FaqSection } from "@/components/landing/faq-section";
import { EditorSection } from "@/components/landing/editor-section";
import { FeatureBento } from "@/components/landing/feature-bento";
import { OpusHero } from "@/components/landing/opus-hero";
import { ProductFilm } from "@/components/landing/product-film";
import { PublishSection } from "@/components/landing/publish-section";
import { Reveal, SectionHeading } from "@/components/landing/reveal";
import { CreatorOfferBanner } from "@/components/marketing/creator-offer-banner";
import { SiteFooter } from "@/components/marketing/site-footer";
import { Button } from "@/components/ui/button";
import { Cta69 } from "@/components/ui/cta69";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { catalogKey } from "@/i18n/config";
import { isLandingOnlyModeEnabled } from "@/lib/app-flags";
import {
  annualFullPrice,
  annualMonthlyEquivalent,
  annualMonthsFree,
  billingPlanMessageKey,
  getPublicBillingPlans,
  planPrice,
  socialPublishingStage,
  type BillingInterval,
} from "@/lib/billing-plans";
import {
  SELF_HOSTING_GUIDE_HREF,
} from "@/lib/marketing-links";
import { GITHUB_URL, HOSTED_APP_URL } from "@/lib/site";
import { cn } from "@/lib/utils";

type Translate = (key: string, values?: Record<string, string | number>) => string;

const PRICING_EXAMPLE_VIDEO_MINUTES = 30;

function getPlans(
  t: Translate,
  tCommon: Translate,
  interval: BillingInterval,
  planText: ReturnType<typeof useBillingPlanText>,
) {
  // The landing page states which platforms scheduling reaches, so it swaps the
  // generic billing line for YouTube + TikTok (live) and Instagram (soon).
  const showScheduling = socialPublishingStage() !== "off";
  const genericScheduling = planText.t("highlights.scheduling");
  return [
    {
      id: "selfHost",
      name: tCommon("plans.selfHost"),
      price: "$0",
      originalPrice: null as string | null,
      period: t("pricing.period.forever"),
      note: null as string | null,
      soon: null as string | null,
      usageExample: null as string | null,
      description: t("pricing.selfHost.description"),
      features: [
        t("pricing.selfHost.features.crop"),
        t("pricing.selfHost.features.subtitles"),
        t("pricing.selfHost.features.virality"),
        t("pricing.selfHost.features.exports"),
        t("pricing.selfHost.features.source"),
      ],
      cta: t("pricing.selfHost.cta"),
      ctaHref: GITHUB_URL,
      highlighted: false,
    },
    ...getPublicBillingPlans().map((plan) => {
      const exampleVideos = Math.floor(plan.minuteLimit / PRICING_EXAMPLE_VIDEO_MINUTES);
      const scheduling = plan.scheduling && showScheduling;
      return {
        id: plan.id,
        name: tCommon(`plans.${billingPlanMessageKey(plan.id)}`),
        price: `$${planPrice(plan, interval)}`,
        originalPrice: interval === "year" && annualMonthsFree(plan) > 0 ? `$${annualFullPrice(plan)}` : null,
        period: interval === "year" ? t("pricing.period.year") : t("pricing.period.month"),
        note: interval === "year" ? t("pricing.billedYearly", { price: annualMonthlyEquivalent(plan) }) : null,
        soon: scheduling ? t("pricing.schedulingSoon") : null,
        usageExample:
          exampleVideos > 0
            ? t("pricing.usageExample.videos", { count: exampleVideos })
            : null,
        description: t(`pricing.${plan.id}.description`),
        features: [
          ...planText.highlights(plan).filter((line) => line !== genericScheduling),
          // Creator schedules; plans without scheduling can still post right away.
          ...(scheduling ? [t("pricing.schedulingPlatforms")] : showScheduling ? [t("pricing.publishPlatforms")] : []),
          t("pricing.hosted.tracking"),
          t("pricing.hosted.exports"),
        ],
        cta: t(`pricing.${plan.id}.cta`),
        ctaHref: "",
        highlighted: plan.highlighted,
      };
    }),
  ];
}

export default function LandingPage() {
  const t = useTranslations("marketing");
  const tCommon = useTranslations("common");
  const planText = useBillingPlanText();
  const [billingInterval, setBillingInterval] = useState<BillingInterval>("month");
  const plans = getPlans(t, tCommon, billingInterval, planText);
  const authEnabled = !isLandingOnlyModeEnabled;

  return (
    <div className="dark min-h-screen bg-[#000000] text-foreground selection:bg-white/20 selection:text-white">
      {authEnabled && <CreatorOfferBanner />}
      <OpusHero authEnabled={authEnabled} />

      {/* ─── HOW IT WORKS ─── */}
      <section id="how-it-works" className="scroll-mt-24 border-y bg-canvas py-24 md:py-32">
        <div className="mx-auto max-w-6xl px-6">
          <SectionHeading eyebrow={t("steps.eyebrow")} title={t("steps.title")} align="left" />
          <Reveal className="mt-14">
            <ProductFilm />
          </Reveal>
        </div>
      </section>

      <FeatureBento />

      <EditorSection />

      <PublishSection />

      {/* ─── PRICING ─── */}
      <section id="pricing" className="scroll-mt-24 py-24 md:py-32">
        <div className="mx-auto max-w-6xl px-6">
          <SectionHeading
            eyebrow={t("nav.pricing")}
            title={t("pricing.title")}
            body={t("pricing.body", { price: getPublicBillingPlans()[0]?.priceMonthly ?? "9.99" })}
          />
          <Reveal className="mt-8 flex justify-center">
            <BillingIntervalToggle
              className="rounded-full bg-background [&_button]:rounded-full"
              value={billingInterval}
              onChange={setBillingInterval}
              plan={getPublicBillingPlans()[0]}
            />
          </Reveal>

          <div className="mx-auto mt-14 grid max-w-5xl items-stretch gap-4 md:grid-cols-3">
            {plans.map((plan, i) => (
              <Reveal key={plan.id} delay={i * 0.08} className="h-full">
                <div
                  className={cn(
                    "relative flex h-full flex-col rounded-[26px] border p-7",
                    plan.highlighted
                      ? "dark bg-background text-foreground shadow-2xl"
                      : "bg-card",
                  )}
                >
                  <div className="flex items-center justify-between gap-3">
                    <h3 className="font-display text-xl font-bold tracking-tight">{plan.name}</h3>
                    {plan.highlighted && (
                      <span className="rounded-full border px-2.5 py-0.5 text-[11px] font-medium text-muted-foreground">
                        {t("pricing.popular")}
                      </span>
                    )}
                  </div>
                  <p className="mt-1.5 min-h-10 text-sm text-muted-foreground">{plan.description}</p>

                  <div className="mt-7 @container">
                    <div className="flex flex-wrap items-baseline gap-x-2 gap-y-1">
                      {plan.originalPrice && (
                        <span className="text-lg text-muted-foreground line-through">{plan.originalPrice}</span>
                      )}
                      <span className="font-display max-w-full whitespace-nowrap text-[clamp(1.75rem,16cqi,3rem)] font-bold tracking-tight">
                        {plan.price}
                      </span>
                      <span className="shrink-0 whitespace-nowrap text-sm text-muted-foreground">{plan.period}</span>
                    </div>
                    {plan.note && <p className="mt-1 text-xs text-muted-foreground">{plan.note}</p>}
                  </div>

                  <ul className="mt-7 flex-1 space-y-3 border-t pt-7">
                    {plan.features.map((feature, index) => (
                      <li key={feature} className="flex items-start gap-3 text-sm">
                        <Check className="mt-0.5 size-4 shrink-0 text-muted-foreground" />
                        {/* The first line is the minute allowance; translate it into videos right there. */}
                        {index === 0 && plan.usageExample ? (
                          <span>
                            {feature}
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <button
                                  type="button"
                                  aria-label={plan.usageExample}
                                  className="ml-1 inline-flex translate-y-[2px] rounded-full p-0.5 text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                                >
                                  <Info className="size-3.5" />
                                </button>
                              </TooltipTrigger>
                              <TooltipContent
                                side="top"
                                sideOffset={6}
                                // Light so it stands out on the dark Pro card too.
                                className="max-w-60 bg-background text-foreground shadow-lg ring-1 ring-border [&_svg]:bg-background [&_svg]:fill-background"
                              >
                                {plan.usageExample}
                              </TooltipContent>
                            </Tooltip>
                          </span>
                        ) : (
                          feature
                        )}
                      </li>
                    ))}
                    {plan.soon && (
                      <li className="flex items-start gap-3 text-sm text-muted-foreground">
                        <Clock className="mt-0.5 size-4 shrink-0" />
                        <span>
                          {plan.soon} <ComingSoonTag />
                        </span>
                      </li>
                    )}
                  </ul>

                  <div className="mt-6">
                    {plan.ctaHref ? (
                      <div className="flex flex-col gap-3">
                        <p className="text-xs leading-relaxed text-muted-foreground">{t("pricing.selfHost.setup")}</p>
                        <Button asChild variant="outline" size="lg" className="h-11 w-full rounded-full text-sm">
                          <Link href={SELF_HOSTING_GUIDE_HREF}>
                            {t(`links.${catalogKey(SELF_HOSTING_GUIDE_HREF)}.label`)}
                            <ArrowRight className="size-4" />
                          </Link>
                        </Button>
                        <a
                          href={plan.ctaHref}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center justify-center gap-2 text-xs text-muted-foreground underline underline-offset-4 hover:text-foreground"
                        >
                          <Github className="size-3.5" />
                          {plan.cta}
                        </a>
                      </div>
                    ) : authEnabled ? (
                      <Button asChild size="lg" variant={plan.highlighted ? "default" : "outline"} className="h-11 w-full rounded-full text-sm">
                        <Link href="/sign-up">
                          {plan.cta}
                          <ArrowRight className="size-4" />
                        </Link>
                      </Button>
                    ) : (
                      <Button asChild size="lg" variant={plan.highlighted ? "default" : "outline"} className="h-11 w-full rounded-full text-sm">
                        <a href={HOSTED_APP_URL} target="_blank" rel="noopener noreferrer">
                          {t("hero.useHosted")}
                          <ExternalLink className="size-4" />
                        </a>
                      </Button>
                    )}
                  </div>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal>
            <p className="mx-auto mt-10 max-w-md text-center text-sm text-muted-foreground">{t("pricing.clipsNote")}</p>
            <p className="mx-auto mt-2 max-w-md text-center text-xs text-muted-foreground">
              {t("pricing.selfHostNote")}{" "}
              <Link href={SELF_HOSTING_GUIDE_HREF} className="underline underline-offset-2 transition-colors hover:text-foreground">
                {t("pricing.selfHostGuide")}
              </Link>
              .
            </p>
          </Reveal>
        </div>
      </section>

      <FaqSection />

      {/* ─── FINAL CTA ─── */}
      <Cta69
        badge={{ label: "Start Clipping Now" }}
        heading={t("cta.title")}
        button={{
          label: authEnabled ? t("nav.getStarted") : t("nav.openHosted"),
          href: authEnabled ? "/sign-up" : HOSTED_APP_URL,
        }}
        labels={{
          marqueePhrase: "Viral Shorts",
          note: t("cta.body"),
          footnote: "Free plan available · No credit card required to start",
        }}
      />

      <SiteFooter />
    </div>
  );
}
