"use client";

import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { cn } from "@/lib/utils";

interface BackButtonProps {
  /** Extra classes for positioning/spacing (e.g. "mb-6"). */
  className?: string;
  /** Button label. Defaults to "Back". */
  label?: string;
  /** Explicit destination. Omit to go to the previous page (browser back). */
  href?: string;
}

/**
 * The single, shared "Back" control used across every standalone page so the
 * icon, label, style, and behaviour stay consistent. Defaults to browser back;
 * pass `href` to navigate to a fixed route instead.
 */
export function BackButton({ className, label = "Back", href }: BackButtonProps) {
  const router = useRouter();

  return (
    <button
      type="button"
      onClick={() => (href ? router.push(href) : router.back())}
      className={cn(
        "inline-flex items-center gap-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground",
        className
      )}
      data-testid="button-back"
    >
      <ArrowLeft className="h-4 w-4" />
      {label}
    </button>
  );
}
