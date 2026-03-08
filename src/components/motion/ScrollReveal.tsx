import { useEffect, useRef, type ReactNode, type HTMLAttributes } from "react";

interface ScrollRevealProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  /** "up" (default) | "left" | "right" | "scale" */
  direction?: "up" | "left" | "right" | "scale";
  /** Delay in ms */
  delay?: number;
  /** Use stagger class for children instead of reveal on self */
  stagger?: boolean;
  className?: string;
}

/**
 * Wrapper that fades/slides children into view on scroll.
 * Uses IntersectionObserver internally — zero dependencies.
 *
 * Usage:
 *   <SR>content</SR>                          → fade up
 *   <SR direction="left">content</SR>        → slide from left
 *   <SR stagger>cards...</SR>                → stagger children
 *   <SR delay={200}>content</SR>             → delayed
 */
export function SR({ children, direction = "up", delay, stagger, className = "", ...rest }: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { el.classList.add("visible"); io.unobserve(el); } },
      { threshold: 0.08, rootMargin: "0px 0px -30px 0px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const cls = stagger
    ? "stagger"
    : direction === "left" ? "reveal-left"
      : direction === "scale" ? "reveal-scale"
        : "reveal";

  const style = delay ? { transitionDelay: `${delay}ms` } : undefined;

  return (
    <div ref={ref} className={`${cls} ${className}`} style={style} {...rest}>
      {children}
    </div>
  );
}
