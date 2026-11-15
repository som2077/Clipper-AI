"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

export interface Badge7Props {
  label: string;
  className?: string;
}

export function Badge7({ label, className }: Badge7Props) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.05] px-3.5 py-1 text-xs font-medium text-zinc-200 backdrop-blur-md shadow-sm",
        className
      )}
    >
      <span className="h-1.5 w-1.5 rounded-full bg-white animate-pulse" />
      {label}
    </span>
  );
}

export default Badge7;
