"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import { Github, Smartphone } from "lucide-react";

import { WordmarkRevealFooter, type FooterColumn, type FooterSocial } from "@/components/ui/wordmark-reveal-footer";
import { catalogKey } from "@/i18n/config";
import { getMarketingLinks } from "@/lib/marketing-links";
import { APP_STORE_URL, COMPANY_NAME, GITHUB_URL } from "@/lib/site";

/** High-impact wordmark reveal footer shared across landing, blog, and marketing pages. */
export function SiteFooter() {
  const t = useTranslations("marketing");

  const columns: FooterColumn[] = [
    {
      title: t("footer.columns.guides"),
      links: getMarketingLinks("guide").map((link) => ({
        label: t(`links.${catalogKey(link.href)}.label`),
        href: link.href,
      })),
    },
    {
      title: t("footer.columns.compare"),
      links: [
        ...getMarketingLinks("comparison").map((link) => ({
          label: t(`links.${catalogKey(link.href)}.label`),
          href: link.href,
        })),
        { label: t("links.blog.label"), href: "/blog" },
      ],
    },
    {
      title: t("footer.columns.product"),
      links: [
        { label: t("nav.getStarted"), href: "/sign-up" },
        { label: t("nav.pricing"), href: "/#pricing" },
        { label: t("links.faq.label"), href: "/faq" },
        { label: t("links.changelog.label"), href: "/changelog" },
        { label: t("links.affiliate.label"), href: "/affiliate" },
        { label: t("links.status.label"), href: "/status" },
      ],
    },
  ];

  const socials: FooterSocial[] = [
    {
      label: "GitHub",
      href: GITHUB_URL,
      icon: <Github className="size-4" />,
    },
    {
      label: "iOS App",
      href: APP_STORE_URL,
      icon: <Smartphone className="size-4" />,
    },
    {
      label: "X (Twitter)",
      href: "https://x.com",
      icon: (
        <svg viewBox="0 0 24 24" fill="currentColor" className="size-3.5" aria-hidden="true">
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
        </svg>
      ),
    },
  ];

  const offices = [
    { city: "San Francisco", timeZone: "America/Los_Angeles" },
    { city: "London", timeZone: "Europe/London" },
    { city: "Tokyo", timeZone: "Asia/Tokyo" },
  ];

  const legal = [
    { label: t("links.privacy.label"), href: "/privacy" },
    { label: t("links.terms.label"), href: "/terms" },
    { label: t("links.status.label"), href: "/status" },
  ];

  return (
    <WordmarkRevealFooter
      wordmark="CLIPPER AI"
      brand={{
        name: "Clipper AI",
        mark: (
          <Image
            src="/logo.png"
            alt="Clipper AI"
            width={24}
            height={24}
            className="rounded-md brightness-0 invert"
          />
        ),
        blurb: `${t("footer.tagline")} ${t("footer.operator", { company: COMPANY_NAME })}`,
      }}
      columns={columns}
      status={{
        label: "All systems operational",
        tone: "ok",
      }}
      offices={offices}
      newsletter={{
        placeholder: "you@company.com",
        label: "Subscribe to newsletter",
        buttonLabel: "Subscribe",
        doneLabel: "Subscribed",
        onSubscribe: async () => {
          return new Promise((resolve) => setTimeout(resolve, 600));
        },
      }}
      socials={socials}
      legal={legal}
      reflection={true}
      reveal="inView"
      className="border-t border-border/40"
    />
  );
}
