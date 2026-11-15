"use client";

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, Mail } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

export interface FaqItemData {
  question: string;
  answer: string | React.ReactNode;
}

export interface FaqSectionProps extends React.HTMLAttributes<HTMLElement> {
  title: string;
  description?: string;
  items: FaqItemData[];
  contactInfo?: {
    title: string;
    description: string;
    buttonText: string;
    onContact?: () => void;
  };
}

const FaqSection = React.forwardRef<HTMLElement, FaqSectionProps>(
  ({ className, title, description, items, contactInfo, ...props }, ref) => {
    return (
      <section
        ref={ref}
        className={cn(
          "w-full py-20 md:py-28 bg-transparent text-foreground",
          className
        )}
        {...props}
      >
        <div className="mx-auto max-w-4xl px-4 sm:px-6">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mx-auto max-w-2xl text-center mb-14"
          >
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white mb-3">
              {title}
            </h2>
            {description && (
              <p className="text-sm sm:text-base text-zinc-400 leading-relaxed">
                {description}
              </p>
            )}
          </motion.div>

          {/* FAQ Items */}
          <div className="space-y-3">
            {items.map((item, index) => (
              <FaqItem
                key={index}
                question={item.question}
                answer={item.answer}
                index={index}
              />
            ))}
          </div>

          {/* Contact Section */}
          {contactInfo && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="mx-auto mt-16 max-w-md rounded-2xl border border-white/10 bg-zinc-950/80 p-8 text-center backdrop-blur-xl shadow-xl"
            >
              <div className="inline-flex size-10 items-center justify-center rounded-xl border border-white/10 bg-white/[0.05] text-white mb-4">
                <Mail className="h-5 w-5" />
              </div>
              <p className="text-sm font-semibold text-white mb-1">
                {contactInfo.title}
              </p>
              <p className="text-xs text-zinc-400 mb-5">
                {contactInfo.description}
              </p>
              <Button
                size="sm"
                onClick={contactInfo.onContact}
                className="rounded-full bg-white text-black font-semibold hover:bg-zinc-200 px-5"
              >
                {contactInfo.buttonText}
              </Button>
            </motion.div>
          )}
        </div>
      </section>
    );
  }
);
FaqSection.displayName = "FaqSection";

// Internal FaqItem component
const FaqItem = React.forwardRef<
  HTMLDivElement,
  {
    question: string;
    answer: string | React.ReactNode;
    index: number;
  }
>((props, ref) => {
  const [isOpen, setIsOpen] = React.useState(false);
  const { question, answer, index } = props;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.3, delay: Math.min(index * 0.05, 0.4) }}
      className={cn(
        "group rounded-2xl border transition-all duration-300 overflow-hidden",
        isOpen
          ? "border-white/20 bg-zinc-900/70 shadow-[0_8px_30px_rgba(0,0,0,0.6)]"
          : "border-white/[0.08] bg-zinc-950/50 hover:border-white/15 hover:bg-zinc-900/40"
      )}
    >
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="flex w-full items-center justify-between px-6 py-5 text-left focus:outline-none"
      >
        <span
          className={cn(
            "text-base font-semibold tracking-tight transition-colors duration-200 pr-4",
            isOpen ? "text-white" : "text-zinc-300 group-hover:text-white"
          )}
        >
          {question}
        </span>
        <div
          className={cn(
            "flex size-7 shrink-0 items-center justify-center rounded-full border transition-all duration-300",
            isOpen
              ? "rotate-180 border-white bg-white text-black"
              : "border-white/10 bg-white/[0.04] text-zinc-400 group-hover:text-white group-hover:border-white/20"
          )}
        >
          <ChevronDown className="h-4 w-4 transition-transform duration-300" />
        </div>
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{
              height: "auto",
              opacity: 1,
              transition: { duration: 0.25, ease: [0.04, 0.62, 0.23, 0.98] },
            }}
            exit={{
              height: 0,
              opacity: 0,
              transition: { duration: 0.2, ease: "easeInOut" },
            }}
          >
            <div className="px-6 pb-6 pt-1">
              {typeof answer === "string" ? (
                <p className="text-sm leading-relaxed text-zinc-400">
                  {answer}
                </p>
              ) : (
                <div className="text-sm leading-relaxed text-zinc-400">
                  {answer}
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
});
FaqItem.displayName = "FaqItem";

export { FaqSection };
