"use client";

import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

export interface Button12Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  asChild?: boolean;
  label?: string;
}

export const Button12 = React.forwardRef<HTMLButtonElement, Button12Props>(
  ({ className, asChild = false, label, children, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";

    return (
      <Comp
        ref={ref}
        className={cn(
          "group relative inline-flex items-center justify-center gap-2 rounded-full bg-white px-7 py-3.5 text-sm font-semibold text-black transition-all duration-300 hover:bg-zinc-200 hover:shadow-[0_0_30px_rgba(255,255,255,0.25)]",
          className
        )}
        {...props}
      >
        {asChild && React.isValidElement(children) ? (
          React.cloneElement(children as React.ReactElement<{ children?: React.ReactNode; className?: string }>, {
            className: cn("inline-flex items-center gap-2", (children.props as { className?: string })?.className),
            children: (
              <>
                <span>{label || (children.props as { children?: React.ReactNode })?.children}</span>
                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </>
            ),
          })
        ) : (
          <>
            <span>{label || children}</span>
            <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
          </>
        )}
      </Comp>
    );
  }
);
Button12.displayName = "Button12";

export default Button12;
