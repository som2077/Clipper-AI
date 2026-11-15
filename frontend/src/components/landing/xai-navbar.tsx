"use client";

import { useState, useRef, useEffect, type ReactNode } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "motion/react";
import { ArrowRight, ChevronDown, Menu, X } from "lucide-react";

type NavItem = {
  label: string;
  href?: string;
  panelId?: "product" | "solution" | "pricing";
};

type ProductCard = {
  title: string;
  description?: string;
  mediaType?: "component" | "image";
  imageSrc?: string;
  component?: ReactNode;
  href?: string;
};

type MenuPanel = {
  id: NonNullable<NavItem["panelId"]>;
  items: ProductCard[];
};

const navItems: NavItem[] = [
  { label: "Product", panelId: "product" },
  { label: "Solution", panelId: "solution" },
  { label: "Developers", href: "#how-it-works" },
  { label: "Company", href: "/blog" },
  { label: "Pricing", panelId: "pricing" },
  { label: "News", href: "/changelog" },
];

function XaiLogo({ className = "" }: { className?: string }) {
  return (
    <svg
      width="38"
      height="38"
      viewBox="0 0 38 38"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      <path
        d="M3.64241 13.8959L19.075 36.4167H25.9348L10.5004 13.8959H3.64241ZM10.4951 26.404L3.63362 36.4167H10.4986L13.9267 31.4113L10.4951 26.404ZM27.5039 1.58337L15.6434 18.8905L19.075 23.8995L34.3689 1.58337H27.5039ZM28.7462 12.2926V36.4167H34.3689V4.08789L28.7462 12.2926Z"
        fill="currentColor"
      />
    </svg>
  );
}

function ChatPreview() {
  return (
    <div className="relative z-10 flex w-full flex-col gap-2 rounded-lg border border-zinc-900/80 bg-zinc-950 p-2 shadow-sm text-left">
      <div className="flex justify-start gap-1.5">
        <span className="mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-zinc-800 text-[8px] font-bold text-zinc-400">
          U
        </span>
        <div className="max-w-[85%] rounded bg-white p-1.5 text-[8px] font-medium leading-normal text-black">
          I am building a block library featuring xai, what kind of ui blocks should i design
        </div>
      </div>
      <div className="flex justify-start gap-1.5">
        <span className="mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-blue-600 text-[8px] font-bold text-white">
          G
        </span>
        <div className="max-w-[85%] rounded bg-blue-600 p-1.5 text-[8px] font-medium leading-normal text-white">
          Design cosmic themes, Grok chat blocks, AI response cards, and sharp truth-seeking components.
        </div>
      </div>
    </div>
  );
}

function BuildPreview() {
  return (
    <div className="relative z-10 w-full space-y-1.5 overflow-hidden rounded-lg border border-zinc-900/80 bg-zinc-950 p-2 font-mono text-[7.5px] leading-normal text-zinc-400 shadow-sm text-left">
      <div className="flex items-center justify-between text-zinc-500">
        <span>Find session references</span>
        <span className="rounded bg-zinc-900 px-1 py-px text-[6.5px] text-zinc-400">explore</span>
      </div>
      <div className="flex items-center gap-1 text-zinc-500">
        <span className="h-1 w-1 rounded-full bg-emerald-500" />
        Thought for 4.1s
      </div>
      <div className="overflow-hidden rounded border border-zinc-900 bg-[#09090b] text-[6.5px]">
        <div className="border-b border-zinc-900/60 bg-[#0c0c0e] px-2 py-0.5 text-zinc-500">
          Edit src/middleware/auth.ts
        </div>
        <div className="space-y-px p-1 font-mono text-zinc-400">
          <p>
            <span className="mr-1 text-zinc-600">42</span> export async function handler(req) &#123;
          </p>
          <p className="bg-red-950/20 text-red-300">
            <span className="mr-1 text-zinc-600">43</span> - const token = extract(req);
          </p>
          <p className="bg-emerald-950/30 text-emerald-300">
            <span className="mr-1 text-zinc-600">44</span> + const token = extractRequest(req);
          </p>
          <p className="text-zinc-300">
            <span className="mr-1 text-zinc-600">45</span> if (!token) return unauthorized();
          </p>
        </div>
      </div>
    </div>
  );
}

const menuPanels: MenuPanel[] = [
  {
    id: "product",
    items: [
      { title: "Chat", mediaType: "component", component: <ChatPreview />, href: "#features" },
      { title: "Build", mediaType: "component", component: <BuildPreview />, href: "#how-it-works" },
      { title: "Imagine", description: "Generate and edit images and videos from text", href: "#features" },
      { title: "Voice", description: "Build voice agents with sub-second latency", href: "#features" },
    ],
  },
  {
    id: "solution",
    items: [
      {
        title: "Research",
        description: "Explore, compare, and synthesize complex work with long-context reasoning.",
        href: "#features",
      },
      {
        title: "Engineering",
        description: "Move from issue to tested patch with agents that understand your codebase.",
        href: "#features",
      },
      {
        title: "Operations",
        description: "Turn messy requests, documents, and workflows into structured execution.",
        href: "#features",
      },
    ],
  },
  {
    id: "pricing",
    items: [
      {
        title: "Free",
        description: "Start experimenting with core models, chat, and lightweight automation.",
        href: "#pricing",
      },
      {
        title: "Pro",
        description: "Higher limits, faster responses, and advanced tools for serious builders.",
        href: "#pricing",
      },
      {
        title: "Enterprise",
        description: "Security, admin controls, dedicated support, and custom deployment paths.",
        href: "#pricing",
      },
    ],
  },
];

function getPanel(panelId: string | null) {
  return menuPanels.find((panel) => panel.id === panelId);
}

function PanelCard({
  item,
  compact = false,
  onSelect,
}: {
  item: ProductCard;
  compact?: boolean;
  onSelect?: () => void;
}) {
  if (item.component || item.imageSrc) {
    return (
      <Link
        href={item.href || "#"}
        onClick={onSelect}
        className="group relative flex h-[180px] flex-col justify-between overflow-hidden rounded-xl border border-zinc-900 bg-zinc-950/40 p-3 transition-all duration-300 hover:border-zinc-800 hover:bg-zinc-900/15"
      >
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(59,130,246,0.045),transparent_50%)] opacity-0 transition-opacity group-hover:opacity-100" />
        {item.component}
        <span className="relative z-10 mt-auto block text-center text-xs font-medium text-zinc-400 transition-colors group-hover:text-white">
          {item.title}
        </span>
      </Link>
    );
  }

  return (
    <Link
      href={item.href || "#"}
      onClick={onSelect}
      className={
        compact
          ? "group relative flex h-[86px] flex-col justify-center overflow-hidden rounded-xl border border-zinc-900 bg-zinc-950/40 p-3 text-left transition-all hover:border-zinc-800 hover:bg-zinc-900/15"
          : "group relative flex min-h-[132px] flex-col justify-between overflow-hidden rounded-xl border border-zinc-900 bg-zinc-950/40 p-4 text-left transition-all hover:border-zinc-800 hover:bg-zinc-900/15"
      }
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(59,130,246,0.025),transparent_50%)] opacity-0 transition-opacity group-hover:opacity-100" />
      <div className="relative z-10">
        <h4 className={compact ? "text-sm font-medium text-white" : "text-base font-medium text-white"}>
          {item.title}
        </h4>
        <p className="mt-1 text-[10px] leading-normal text-zinc-500 transition-colors group-hover:text-zinc-400">
          {item.description}
        </p>
      </div>
      {!compact && (
        <span className="relative z-10 mt-5 text-[10px] font-medium text-zinc-500">
          Explore <ArrowRight className="ml-1 inline size-3" />
        </span>
      )}
    </Link>
  );
}

function DropdownPanel({
  panel,
  onSelect,
}: {
  panel: MenuPanel;
  onSelect?: () => void;
}) {
  if (panel.id === "product") {
    const [chat, build, imagine, voice] = panel.items;
    return (
      <div className="grid grid-cols-[1.2fr_1.2fr_1fr] gap-4 bg-black p-4">
        <PanelCard item={chat} onSelect={onSelect} />
        <PanelCard item={build} onSelect={onSelect} />
        <div className="flex flex-col gap-2">
          <PanelCard item={imagine} compact onSelect={onSelect} />
          <PanelCard item={voice} compact onSelect={onSelect} />
        </div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-3 gap-4 bg-black p-4">
      {panel.items.map((item) => (
        <PanelCard key={item.title} item={item} onSelect={onSelect} />
      ))}
    </div>
  );
}

interface XAINavbarProps {
  authEnabled?: boolean;
}

export function XAINavbar({ authEnabled = true }: XAINavbarProps) {
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileActiveMenu, setMobileActiveMenu] = useState<string | null>(null);
  const navContainerRef = useRef<HTMLDivElement>(null);

  const activePanel = getPanel(activeMenu);
  const toggleMenu = (menuName: string) =>
    setActiveMenu((prev) => (prev === menuName ? null : menuName));

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (navContainerRef.current && !navContainerRef.current.contains(e.target as Node)) {
        setActiveMenu(null);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header className="relative z-50 w-full select-none bg-white">
      <div className="relative mx-auto flex h-14 w-full max-w-7xl items-center justify-between px-6">
        
        {/* ─── 1. LEFT LOGO (Xai Logo + Clipper AI branding) ─── */}
        <Link href="/" className="flex items-center gap-2.5 text-black">
          <XaiLogo className="h-8 w-8" />
          <span className="font-sans text-base font-bold tracking-tight text-black sm:inline-block">
            Clipper AI
          </span>
        </Link>

        {/* ─── 2. CENTER BLACK NOTCH & INTERACTIVE DROPDOWNS (Desktop) ─── */}
        <div
          ref={navContainerRef}
          className="absolute left-1/2 top-0 hidden w-[700px] -translate-x-1/2 lg:block"
          style={{ filter: "drop-shadow(0 12px 20px rgba(0, 0, 0, 0.18))" }}
        >
          {/* Top Left Inverted Concave Fillet */}
          <svg
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="pointer-events-none absolute -left-[18px] top-0 z-10 text-black"
            aria-hidden="true"
          >
            <path d="M 20 20 L 20 0 L 0 0 C 11.046 0 20 11.046 20 20 Z" fill="currentColor" />
          </svg>

          {/* Top Right Inverted Concave Fillet */}
          <svg
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="pointer-events-none absolute -right-[18px] top-0 z-10 text-black"
            aria-hidden="true"
          >
            <path d="M 0 0 L 20 0 C 8.954 0 0 8.954 0 20 Z" fill="currentColor" />
          </svg>

          {/* Black Container (Expands with Spring Animation) */}
          <motion.div
            animate={{ height: activePanel ? 260 : 48 }}
            transition={{ type: "spring", stiffness: 300, damping: 28 }}
            className="relative flex w-full flex-col justify-start overflow-hidden bg-black"
            style={{ borderBottomLeftRadius: "16px", borderBottomRightRadius: "16px" }}
          >
            <div className="z-20 flex h-12 items-center justify-center px-6">
              <nav className="flex w-full items-center justify-center gap-5 text-xs font-medium text-zinc-400">
                {navItems.map((item) =>
                  item.panelId ? (
                    <button
                      key={item.label}
                      type="button"
                      onClick={() => toggleMenu(item.panelId!)}
                      className={`flex cursor-pointer items-center gap-1 rounded-md px-3 py-1 outline-none transition-all hover:text-white ${
                        activeMenu === item.panelId
                          ? "bg-[#18181b] text-white"
                          : "text-zinc-400"
                      }`}
                    >
                      {item.label}
                      <ChevronDown
                        className={`h-3.5 w-3.5 opacity-70 transition-transform duration-300 ${
                          activeMenu === item.panelId ? "rotate-180" : ""
                        }`}
                      />
                    </button>
                  ) : (
                    <Link
                      key={item.label}
                      href={item.href || "#"}
                      onClick={() => setActiveMenu(null)}
                      className="px-2 py-1 text-zinc-400 transition-colors duration-250 hover:text-white"
                    >
                      {item.label}
                    </Link>
                  )
                )}
              </nav>
            </div>

            <AnimatePresence mode="wait">
              {activePanel && (
                <motion.div
                  key={activePanel.id}
                  initial={{ opacity: 0, y: -8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.18 }}
                  className="overflow-hidden border-t border-zinc-900 bg-black"
                >
                  <DropdownPanel panel={activePanel} onSelect={() => setActiveMenu(null)} />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>

        {/* ─── 3. RIGHT CALL-TO-ACTION (Try it now) ─── */}
        <Link
          href={authEnabled ? "/tasks" : "#hero-input"}
          className="group hidden items-center gap-1 rounded-lg bg-blue-600 px-3.5 py-1.5 text-[12px] font-semibold text-white shadow-sm transition-colors hover:bg-blue-700 lg:flex"
        >
          <span>Try it now</span>
          <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-0.5" />
        </Link>

        {/* ─── Mobile Header Controls ─── */}
        <div className="flex items-center gap-2 lg:hidden">
          <Link
            href={authEnabled ? "/tasks" : "#hero-input"}
            className="group flex items-center gap-1 rounded-lg bg-blue-600 px-3 py-1.5 text-xs font-semibold text-white shadow-sm"
          >
            <span>Try it now</span>
            <ArrowRight className="h-3 w-3" />
          </Link>
          <button
            type="button"
            onClick={() => setMobileOpen((open) => !open)}
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            className="grid size-9 place-items-center rounded-lg border border-zinc-200 text-zinc-900"
          >
            {mobileOpen ? <X className="size-4" /> : <Menu className="size-4" />}
          </button>
        </div>
      </div>

      {/* ─── Mobile Accordion Dropdown ─── */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="relative z-20 w-full overflow-hidden bg-black text-white shadow-xl lg:hidden"
          >
            <div className="grid gap-1 p-4">
              {navItems.map((item) => {
                const panel = item.panelId ? getPanel(item.panelId) : null;
                const isOpen = mobileActiveMenu === item.panelId;

                if (!item.panelId) {
                  return (
                    <Link
                      key={item.label}
                      href={item.href || "#"}
                      onClick={() => setMobileOpen(false)}
                      className="flex items-center justify-between rounded-lg px-3 py-2 text-sm text-zinc-300 hover:bg-white/10 hover:text-white"
                    >
                      {item.label}
                    </Link>
                  );
                }

                return (
                  <div key={item.label}>
                    <button
                      type="button"
                      onClick={() => setMobileActiveMenu(isOpen ? null : item.panelId!)}
                      className="flex w-full items-center justify-between rounded-lg px-3 py-2 text-left text-sm text-zinc-300 hover:bg-white/10 hover:text-white"
                    >
                      {item.label}
                      <ChevronDown
                        className={`size-4 transition-transform ${
                          isOpen ? "rotate-180" : ""
                        }`}
                      />
                    </button>
                    <AnimatePresence initial={false}>
                      {isOpen && panel && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.2 }}
                          className="overflow-hidden"
                        >
                          <div className="mx-3 mb-2 grid gap-2 border-l border-white/10 pl-3 pt-1">
                            {panel.items.map((panelItem) => (
                              <Link
                                key={panelItem.title}
                                href={panelItem.href || "#"}
                                onClick={() => setMobileOpen(false)}
                                className="rounded-md px-3 py-2 hover:bg-white/5 block"
                              >
                                <span className="block text-sm font-medium text-white">
                                  {panelItem.title}
                                </span>
                                {panelItem.description && (
                                  <span className="mt-0.5 block text-xs leading-5 text-zinc-500">
                                    {panelItem.description}
                                  </span>
                                )}
                              </Link>
                            ))}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
