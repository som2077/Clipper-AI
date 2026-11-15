"use client";

import { useTranslations } from "next-intl";
import Link from "next/link";
import { getLandingFaqs } from "@/lib/landing-faq";
import { FaqSection as UiFaqSection } from "@/components/ui/faq-section";

export function FaqSection() {
  const t = useTranslations("marketing");
  const faqs = getLandingFaqs(t);

  const items = faqs.map((faq) => ({
    question: faq.question,
    answer: (
      <div>
        <p>{faq.answer}</p>
        {faq.key === "languages" && (
          <Link
            href="/faq#languages"
            className="mt-3 inline-block font-medium text-white underline underline-offset-4 hover:text-zinc-200 transition-colors"
          >
            {t("faqPage.viewLanguages")}
          </Link>
        )}
      </div>
    ),
  }));

  return (
    <UiFaqSection
      id="faq"
      className="scroll-mt-24 border-t border-white/[0.08]"
      title={t("faq.title")}
      description={t("faq.body")}
      items={items}
    />
  );
}
