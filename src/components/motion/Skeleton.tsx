import { type HTMLAttributes } from "react";

interface SkeletonProps extends HTMLAttributes<HTMLDivElement> {
  /** Width class like "w-full" or "w-40" */
  w?: string;
  /** Height class like "h-4" or "h-48" */
  h?: string;
  /** Shape: "rect" (default) | "circle" | "text" */
  shape?: "rect" | "circle" | "text";
  /** Number of text lines to generate */
  lines?: number;
}

/**
 * Skeleton loader with shimmer effect.
 *
 * Usage:
 *   <Skeleton w="w-full" h="h-48" />           → image placeholder
 *   <Skeleton shape="circle" w="w-16" h="h-16" /> → avatar
 *   <Skeleton shape="text" lines={3} />         → text block
 */
export function Skeleton({ w = "w-full", h = "h-4", shape = "rect", lines = 3, className = "", ...rest }: SkeletonProps) {
  if (shape === "text") {
    return (
      <div className={`space-y-3 ${className}`} {...rest}>
        {Array.from({ length: lines }, (_, i) => (
          <div
            key={i}
            className={`${h} rounded-lg bg-muted animate-pulse`}
            style={{ width: i === lines - 1 ? "70%" : "100%" }}
          />
        ))}
      </div>
    );
  }

  return (
    <div
      className={`${w} ${h} ${shape === "circle" ? "rounded-full" : "rounded-xl"} bg-muted animate-pulse ${className}`}
      {...rest}
    />
  );
}

/** Full card skeleton — image + text */
export function CardSkeleton({ className = "" }: { className?: string }) {
  return (
    <div className={`rounded-2xl border border-border/50 overflow-hidden ${className}`}>
      <Skeleton w="w-full" h="h-48" />
      <div className="p-6 space-y-3">
        <Skeleton w="w-3/4" h="h-5" />
        <Skeleton shape="text" lines={2} h="h-3" />
        <div className="flex justify-between pt-2">
          <Skeleton w="w-20" h="h-4" />
          <Skeleton w="w-16" h="h-4" />
        </div>
      </div>
    </div>
  );
}
