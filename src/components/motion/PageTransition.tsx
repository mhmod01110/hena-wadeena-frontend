import { type ReactNode } from "react";

interface PageTransitionProps {
  children: ReactNode;
  className?: string;
}

/**
 * Wraps page content with a smooth fade-slide-in transition on mount.
 * Also adds a subtle animated gradient mesh in the background.
 */
export function PageTransition({ children, className = "" }: PageTransitionProps) {
  return (
    <div className={`animate-pageIn ${className}`}>
      {children}
    </div>
  );
}

/**
 * Animated gradient background mesh — subtle moving gradients.
 * Place behind content with absolute positioning.
 */
export function GradientMesh({ className = "" }: { className?: string }) {
  return (
    <div className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}>
      <div className="absolute -top-1/2 -left-1/4 w-[80%] h-[80%] rounded-full bg-primary/5 blur-3xl animate-meshFloat" />
      <div className="absolute -bottom-1/3 -right-1/4 w-[60%] h-[60%] rounded-full bg-accent/5 blur-3xl animate-meshFloat2" />
      <div className="absolute top-1/3 left-1/3 w-[40%] h-[40%] rounded-full bg-chart-3/3 blur-3xl animate-meshFloat3" />
    </div>
  );
}
