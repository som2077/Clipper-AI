"use client";

import * as React from "react";
import Link from "next/link";
import { useTheme } from "next-themes";
import {
  Sparkles,
  Scissors,
  Video,
  Layers,
  Share2,
  BookOpen,
  FileCode2,
  Github,
  LogOut,
  LayoutDashboard,
  Settings,
  Menu,
  X,
  ArrowRight,
  Sun,
  Moon,
  Monitor,
  Flame,
  Radio,
  Sliders,
} from "lucide-react";

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { useSession, signOut } from "@/lib/auth-client";
import { GITHUB_URL } from "@/lib/site";
import { cn } from "@/lib/utils";

// ─── DATA FOR NAVIGATION MEGA-MENUS ───
const FEATURES = [
  {
    title: "AI Viral Clipper",
    href: "#how-it-works",
    icon: Scissors,
    description: "Converts long podcasts & YouTube videos into 10+ viral shorts automatically.",
    tag: "Popular",
  },
  {
    title: "Smart Face Tracking",
    href: "#how-it-works",
    icon: Video,
    description: "Dynamic active speaker framing & dual-speaker split screen for vertical 9:16.",
  },
  {
    title: "Animated Dynamic Captions",
    href: "#how-it-works",
    icon: Sparkles,
    description: "Hormozi-style animated word-by-word subtitles with high speech accuracy.",
    tag: "AI",
  },
  {
    title: "1-Click Multi-Publishing",
    href: "#how-it-works",
    icon: Share2,
    description: "Direct scheduled auto-publishing to YouTube Shorts, TikTok, and Instagram.",
  },
];

const SOLUTIONS = [
  {
    title: "Podcasters & Shows",
    href: "#how-it-works",
    icon: Radio,
    description: "Turn 2-hour conversational episodes into high-engagement bite-sized clips.",
  },
  {
    title: "Creators & Influencers",
    href: "#how-it-works",
    icon: Flame,
    description: "Scale your daily short-form content output across TikTok, Reels, and Shorts.",
  },
  {
    title: "Marketing Agencies",
    href: "#how-it-works",
    icon: Sliders,
    description: "Automate clip editing and delivery for multiple brands effortlessly.",
  },
  {
    title: "Self-Hosted & Open Source",
    href: GITHUB_URL,
    icon: FileCode2,
    description: "Full Docker Compose setup. Deploy on your own VPS with complete control.",
    external: true,
  },
];

const RESOURCES = [
  {
    title: "Changelog",
    href: "/changelog",
    icon: BookOpen,
    description: "See newly shipped models, features, updates, and improvements.",
  },
  {
    title: "How It Works",
    href: "#how-it-works",
    icon: Layers,
    description: "Deep dive into our audio transcription, reframing, and rendering pipeline.",
  },
  {
    title: "GitHub Repository",
    href: GITHUB_URL,
    icon: Github,
    description: "Star us on GitHub, explore the codebase, report issues, or contribute.",
    external: true,
  },
];

export interface VercelNavbarProps {
  authEnabled?: boolean;
  className?: string;
}

export function VercelNavbar({ authEnabled = true, className }: VercelNavbarProps) {
  const [scrolled, setScrolled] = React.useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);
  const { data: session } = useSession();

  React.useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleSmoothScroll = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (href.startsWith("#")) {
      e.preventDefault();
      const targetId = href.replace("#", "");
      const elem = document.getElementById(targetId);
      if (elem) {
        elem.scrollIntoView({ behavior: "smooth" });
        setMobileMenuOpen(false);
      }
    }
  };

  return (
    <header
      className={cn(
        "dark sticky top-0 z-50 w-full transition-all duration-300",
        scrolled
          ? "border-b border-zinc-900/80 bg-black/85 backdrop-blur-xl shadow-[0_4px_30px_rgba(0,0,0,0.8)]"
          : "border-b border-transparent bg-transparent",
        className
      )}
    >
      <div className="mx-auto flex h-16 w-full max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* ─── 1. LOGO & BRANDING ─── */}
        <div className="flex items-center gap-6 lg:gap-8">
          <Link href="/" className="group flex items-center gap-2.5 focus:outline-none">
            {/* Glowing Brand Mark */}
            <div className="relative flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-white to-zinc-400 p-0.5 shadow-[0_0_15px_rgba(255,255,255,0.2)] transition-transform duration-300 group-hover:scale-105">
              <div className="flex h-full w-full items-center justify-center rounded-[7px] bg-black">
                <Scissors className="h-4 w-4 text-white transition-transform group-hover:-rotate-12" />
              </div>
            </div>

            <div className="flex items-center gap-1.5">
              <span className="font-sans text-base font-bold tracking-tight text-white">
                Clipper
              </span>
              <span className="rounded-md bg-white/[0.08] px-1.5 py-0.5 text-[10px] font-semibold tracking-wide text-zinc-300 border border-white/[0.08]">
                AI
              </span>
            </div>
          </Link>

          {/* ─── 2. DESKTOP NAVIGATION MENU (VERCEL STYLE) ─── */}
          <NavigationMenu className="hidden lg:flex" viewport={true}>
            <NavigationMenuList className="gap-1">
              {/* Features Menu */}
              <NavigationMenuItem>
                <NavigationMenuTrigger
                  className={cn(
                    navigationMenuTriggerStyle(),
                    "h-8 rounded-full bg-transparent px-3.5 text-xs font-medium text-zinc-300 transition-colors hover:bg-white/[0.08] hover:text-white focus:bg-white/[0.08] focus:text-white data-[active]:bg-white/[0.08] data-[state=open]:bg-white/[0.08] data-[state=open]:text-white"
                  )}
                >
                  Features
                </NavigationMenuTrigger>
                <NavigationMenuContent className="p-3 md:w-[620px]">
                  <div className="grid grid-cols-2 gap-2">
                    {FEATURES.map((item) => (
                      <ListItem
                        key={item.title}
                        title={item.title}
                        icon={<item.icon className="h-4 w-4 text-white" />}
                        href={item.href}
                        tag={item.tag}
                        onClick={(e) => handleSmoothScroll(e, item.href)}
                      >
                        {item.description}
                      </ListItem>
                    ))}
                  </div>
                </NavigationMenuContent>
              </NavigationMenuItem>

              {/* Solutions Menu */}
              <NavigationMenuItem>
                <NavigationMenuTrigger
                  className={cn(
                    navigationMenuTriggerStyle(),
                    "h-8 rounded-full bg-transparent px-3.5 text-xs font-medium text-zinc-300 transition-colors hover:bg-white/[0.08] hover:text-white focus:bg-white/[0.08] focus:text-white data-[active]:bg-white/[0.08] data-[state=open]:bg-white/[0.08] data-[state=open]:text-white"
                  )}
                >
                  Solutions
                </NavigationMenuTrigger>
                <NavigationMenuContent className="p-3 md:w-[620px]">
                  <div className="grid grid-cols-2 gap-2">
                    {SOLUTIONS.map((item) => (
                      <ListItem
                        key={item.title}
                        title={item.title}
                        icon={<item.icon className="h-4 w-4 text-white" />}
                        href={item.href}
                        external={item.external}
                        onClick={(e) => handleSmoothScroll(e, item.href)}
                      >
                        {item.description}
                      </ListItem>
                    ))}
                  </div>
                </NavigationMenuContent>
              </NavigationMenuItem>

              {/* Resources Menu */}
              <NavigationMenuItem>
                <NavigationMenuTrigger
                  className={cn(
                    navigationMenuTriggerStyle(),
                    "h-8 rounded-full bg-transparent px-3.5 text-xs font-medium text-zinc-300 transition-colors hover:bg-white/[0.08] hover:text-white focus:bg-white/[0.08] focus:text-white data-[active]:bg-white/[0.08] data-[state=open]:bg-white/[0.08] data-[state=open]:text-white"
                  )}
                >
                  Resources
                </NavigationMenuTrigger>
                <NavigationMenuContent className="p-3 md:w-[480px]">
                  <div className="flex flex-col gap-1.5">
                    {RESOURCES.map((item) => (
                      <ListItem
                        key={item.title}
                        title={item.title}
                        icon={<item.icon className="h-4 w-4 text-white" />}
                        href={item.href}
                        external={item.external}
                        onClick={(e) => handleSmoothScroll(e, item.href)}
                      >
                        {item.description}
                      </ListItem>
                    ))}
                  </div>
                </NavigationMenuContent>
              </NavigationMenuItem>

              {/* Direct Links */}
              <NavigationMenuItem>
                <NavigationMenuLink asChild>
                  <Link
                    href="#how-it-works"
                    onClick={(e) => handleSmoothScroll(e, "#how-it-works")}
                    className={cn(
                      navigationMenuTriggerStyle(),
                      "h-8 rounded-full bg-transparent px-3.5 text-xs font-medium text-zinc-300 transition-colors hover:bg-white/[0.08] hover:text-white"
                    )}
                  >
                    How It Works
                  </Link>
                </NavigationMenuLink>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <NavigationMenuLink asChild>
                  <Link
                    href="#pricing"
                    onClick={(e) => handleSmoothScroll(e, "#pricing")}
                    className={cn(
                      navigationMenuTriggerStyle(),
                      "h-8 rounded-full bg-transparent px-3.5 text-xs font-medium text-zinc-300 transition-colors hover:bg-white/[0.08] hover:text-white"
                    )}
                  >
                    Pricing
                  </Link>
                </NavigationMenuLink>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <NavigationMenuLink asChild>
                  <Link
                    href="/changelog"
                    className={cn(
                      navigationMenuTriggerStyle(),
                      "h-8 rounded-full bg-transparent px-3.5 text-xs font-medium text-zinc-300 transition-colors hover:bg-white/[0.08] hover:text-white"
                    )}
                  >
                    Changelog
                  </Link>
                </NavigationMenuLink>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        </div>

        {/* ─── 3. RIGHT ACTIONS ─── */}
        <div className="flex items-center gap-2.5 sm:gap-3">
          {/* GitHub Star Link */}
          <a
            href={GITHUB_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden items-center gap-1.5 rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-xs font-medium text-zinc-300 transition-all hover:border-white/20 hover:bg-white/[0.08] hover:text-white sm:inline-flex"
          >
            <Github className="h-3.5 w-3.5" />
            <span>GitHub</span>
          </a>

          {/* Logged In vs Logged Out State */}
          {authEnabled && (
            <>
              {session?.user ? (
                /* Authenticated User Menu */
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <button className="flex items-center gap-2 rounded-full p-0.5 outline-none ring-1 ring-white/15 transition hover:ring-white/30">
                      <Avatar className="h-7 w-7 border border-white/10">
                        {session.user.image && (
                          <AvatarImage src={session.user.image} alt={session.user.name || "User"} />
                        )}
                        <AvatarFallback className="bg-zinc-800 text-[11px] font-semibold text-white">
                          {(session.user.name || session.user.email || "U").slice(0, 2).toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                    </button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent
                    className="w-56 rounded-2xl border border-white/10 bg-zinc-950/95 p-2 shadow-2xl backdrop-blur-2xl"
                    align="end"
                  >
                    <div className="px-2 py-1.5">
                      <p className="text-xs font-semibold text-white truncate">
                        {session.user.name || "User"}
                      </p>
                      <p className="text-[11px] text-zinc-400 truncate">
                        {session.user.email}
                      </p>
                    </div>
                    <DropdownMenuSeparator className="-mx-2 my-1.5 bg-white/10" />
                    <DropdownMenuGroup>
                      <DropdownMenuItem asChild className="rounded-lg text-xs hover:bg-white/10 focus:bg-white/10 cursor-pointer">
                        <Link href="/" className="flex items-center gap-2">
                          <LayoutDashboard className="h-3.5 w-3.5 text-zinc-400" />
                          Dashboard
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem asChild className="rounded-lg text-xs hover:bg-white/10 focus:bg-white/10 cursor-pointer">
                        <Link href="/settings" className="flex items-center gap-2">
                          <Settings className="h-3.5 w-3.5 text-zinc-400" />
                          Settings
                        </Link>
                      </DropdownMenuItem>
                    </DropdownMenuGroup>
                    <DropdownMenuSeparator className="-mx-2 my-1.5 bg-white/10" />
                    <DropdownMenuGroup>
                      <div className="flex items-center justify-between px-2 py-1">
                        <span className="text-[11px] text-zinc-400">Theme</span>
                        <ThemeSwitcher />
                      </div>
                    </DropdownMenuGroup>
                    <DropdownMenuSeparator className="-mx-2 my-1.5 bg-white/10" />
                    <DropdownMenuItem
                      onClick={() => signOut()}
                      className="rounded-lg text-xs text-rose-400 hover:bg-rose-500/10 focus:bg-rose-500/10 cursor-pointer flex items-center justify-between"
                    >
                      Logout
                      <LogOut className="h-3.5 w-3.5" />
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                /* Unauthenticated Auth Buttons */
                <div className="flex items-center gap-2">
                  <Link
                    href="/sign-in"
                    className="rounded-full px-3 py-1.5 text-xs font-medium text-zinc-300 transition-colors hover:text-white"
                  >
                    Sign In
                  </Link>

                  <Button
                    asChild
                    size="sm"
                    className="h-8 rounded-full bg-white px-3.5 text-xs font-semibold text-black shadow-[0_0_20px_rgba(255,255,255,0.15)] transition-all hover:bg-zinc-200 hover:shadow-[0_0_25px_rgba(255,255,255,0.25)]"
                  >
                    <Link href="/sign-up" className="flex items-center gap-1">
                      <span>Get Started</span>
                      <ArrowRight className="h-3 w-3" />
                    </Link>
                  </Button>
                </div>
              )}
            </>
          )}

          {/* Mobile Hamburger Toggle */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            aria-label="Toggle navigation menu"
            className="flex h-8 w-8 items-center justify-center rounded-lg border border-white/10 bg-white/[0.04] text-zinc-300 transition-colors hover:bg-white/[0.08] hover:text-white lg:hidden"
          >
            {mobileMenuOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
        </div>
      </div>

      {/* ─── 4. MOBILE SLIDE-OUT / COLLAPSIBLE DRAWER ─── */}
      {mobileMenuOpen && (
        <div className="border-b border-white/10 bg-black/95 px-5 py-6 backdrop-blur-2xl lg:hidden">
          <nav className="flex flex-col gap-4 text-sm font-medium">
            <div className="flex flex-col gap-2">
              <span className="text-[11px] font-semibold uppercase tracking-wider text-zinc-500">
                Product
              </span>
              <div className="grid grid-cols-1 gap-2 pl-2">
                {FEATURES.map((item) => (
                  <Link
                    key={item.title}
                    href={item.href}
                    onClick={(e) => handleSmoothScroll(e, item.href)}
                    className="flex items-center gap-2.5 rounded-lg py-1.5 text-zinc-300 hover:text-white"
                  >
                    <item.icon className="h-4 w-4 text-zinc-400" />
                    <span>{item.title}</span>
                  </Link>
                ))}
              </div>
            </div>

            <div className="h-px w-full bg-white/10" />

            <div className="flex flex-col gap-2">
              <span className="text-[11px] font-semibold uppercase tracking-wider text-zinc-500">
                Explore
              </span>
              <div className="flex flex-col gap-2 pl-2">
                <Link
                  href="#how-it-works"
                  onClick={(e) => handleSmoothScroll(e, "#how-it-works")}
                  className="text-zinc-300 hover:text-white"
                >
                  How It Works
                </Link>
                <Link
                  href="#pricing"
                  onClick={(e) => handleSmoothScroll(e, "#pricing")}
                  className="text-zinc-300 hover:text-white"
                >
                  Pricing
                </Link>
                <Link
                  href="/changelog"
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-zinc-300 hover:text-white"
                >
                  Changelog
                </Link>
                <a
                  href={GITHUB_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 text-zinc-300 hover:text-white"
                >
                  <Github className="h-4 w-4" />
                  GitHub Repository
                </a>
              </div>
            </div>

            {authEnabled && !session?.user && (
              <>
                <div className="h-px w-full bg-white/10" />
                <div className="flex flex-col gap-2 pt-2">
                  <Button asChild className="w-full rounded-full bg-white text-black font-semibold hover:bg-zinc-200">
                    <Link href="/sign-up" onClick={() => setMobileMenuOpen(false)}>
                      Get Started Free
                    </Link>
                  </Button>
                  <Button asChild variant="outline" className="w-full rounded-full border-white/20 bg-transparent text-white hover:bg-white/10">
                    <Link href="/sign-in" onClick={() => setMobileMenuOpen(false)}>
                      Sign In
                    </Link>
                  </Button>
                </div>
              </>
            )}
          </nav>
        </div>
      )}
    </header>
  );
}

// ─── LIST ITEM COMPONENT FOR MEGA-MENUS ───
interface ListItemProps extends React.ComponentPropsWithoutRef<"a"> {
  title: string;
  icon: React.ReactNode;
  tag?: string;
  external?: boolean;
}

function ListItem({ title, icon, tag, external, children, href = "#", ...props }: ListItemProps) {
  const content = (
    <div className="group/item flex items-start gap-3 rounded-xl p-2.5 transition-all duration-200 hover:bg-white/[0.06]">
      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-white/10 bg-white/[0.04] transition-all duration-200 group-hover/item:border-white/25 group-hover/item:bg-white/[0.08] group-hover/item:scale-105">
        {icon}
      </div>
      <div className="flex flex-col text-left">
        <div className="flex items-center gap-1.5">
          <span className="text-xs font-semibold text-zinc-100 transition-colors group-hover/item:text-white">
            {title}
          </span>
          {tag && (
            <span className="rounded-full bg-gradient-to-r from-violet-500/20 to-fuchsia-500/20 px-1.5 py-0.2 text-[9px] font-semibold text-violet-300 border border-violet-500/30">
              {tag}
            </span>
          )}
        </div>
        <p className="line-clamp-2 text-[11px] leading-relaxed text-zinc-400 group-hover/item:text-zinc-300">
          {children}
        </p>
      </div>
    </div>
  );

  return (
    <NavigationMenuLink asChild>
      {external ? (
        <a href={href} target="_blank" rel="noopener noreferrer" {...props}>
          {content}
        </a>
      ) : (
        <Link href={href} {...props}>
          {content}
        </Link>
      )}
    </NavigationMenuLink>
  );
}

// ─── THEME SWITCHER ───
const THEMES = [
  { key: "system", icon: Monitor, label: "System theme" },
  { key: "light", icon: Sun, label: "Light theme" },
  { key: "dark", icon: Moon, label: "Dark theme" },
];

function ThemeSwitcher() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="flex items-center rounded-full bg-zinc-900 p-0.5 ring-1 ring-white/10">
      {THEMES.map(({ key, icon: Icon, label }) => {
        const isActive = theme === key;
        return (
          <button
            key={key}
            type="button"
            aria-label={label}
            onClick={() => setTheme(key)}
            className={cn(
              "flex h-5 w-5 items-center justify-center rounded-full transition-all",
              isActive ? "bg-white text-black" : "text-zinc-400 hover:text-white"
            )}
          >
            <Icon className="h-3 w-3" />
          </button>
        );
      })}
    </div>
  );
}

// Backward compatibility alias for the demo or direct imports
export const Header = VercelNavbar;
