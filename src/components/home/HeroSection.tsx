import { useEffect, useState, useRef, useCallback } from "react";
import { ArrowLeft, MapPin, Search, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useNavigate } from "react-router-dom";
import heroImage from "@/assets/hero-desert-oasis.jpg";

/* Animated counter — counts from 0 to `target` on mount */
function Counter({ target, label, delay }: { target: number; label: string; delay: number }) {
  const [val, setVal] = useState(0);
  const [show, setShow] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setShow(true), delay);
    return () => clearTimeout(t);
  }, [delay]);

  useEffect(() => {
    if (!show) return;
    let start = 0;
    const dur = 1800;
    const t0 = performance.now();
    const tick = (now: number) => {
      const p = Math.min((now - t0) / dur, 1);
      const eased = 1 - Math.pow(1 - p, 4);
      setVal(Math.floor(eased * target));
      if (p < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [show, target]);

  return (
    <div className={`transition-all duration-700 ${show ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"}`}>
      <div className="text-4xl md:text-5xl font-bold text-card tabular-nums">+{val}</div>
      <div className="text-sm text-card/70 mt-1">{label}</div>
    </div>
  );
}

export function HeroSection() {
  const navigate = useNavigate();
  const [query, setQuery] = useState("");
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const onScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const go = () => { if (query.trim()) navigate(`/search?q=${encodeURIComponent(query)}`); };

  return (
    <section className="relative min-h-[95vh] flex items-center overflow-hidden">
      {/* Parallax Background */}
      <div className="absolute inset-0 will-change-transform" style={{ transform: `translateY(${scrollY * 0.25}px)` }}>
        <img src={heroImage} alt="الوادي الجديد" className="w-full h-[130%] object-cover" />
        <div className="absolute inset-0 bg-gradient-to-l from-foreground/85 via-foreground/65 to-foreground/40" />
      </div>

      {/* Floating Particles */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[
          "top-[18%] right-[12%] h-2 w-2 bg-accent/30 particle-1",
          "top-[38%] right-[28%] h-3 w-3 bg-primary/20 particle-2",
          "top-[58%] right-[8%] h-1.5 w-1.5 bg-card/25 particle-3",
          "top-[28%] right-[42%] h-2.5 w-2.5 bg-accent/20 particle-4",
          "top-[68%] right-[55%] h-2 w-2 bg-primary/15 particle-1",
          "top-[12%] right-[68%] h-3 w-3 bg-card/15 particle-3",
        ].map((cls, i) => (
          <div key={i} className={`particle absolute rounded-full ${cls}`} />
        ))}
      </div>

      {/* Content */}
      <div className="container relative z-10 px-4 py-20">
        <div className="max-w-2xl">
          {/* Badge */}
          <div className="hero-reveal hero-d1 inline-flex items-center gap-2 px-5 py-2.5 rounded-full glass mb-8">
            <Sparkles className="h-5 w-5 text-accent animate-pulse" />
            <span className="text-sm font-semibold text-card">البوابة الرقمية الرسمية</span>
          </div>

          {/* Heading */}
          <h1 className="hero-reveal hero-d2 text-5xl md:text-6xl lg:text-7xl font-bold text-card mb-6 leading-tight">
            هنا وادينا
            <span className="block text-accent mt-3 text-3xl md:text-4xl lg:text-5xl">
              اكتشف. تواصل. استثمر.
            </span>
          </h1>

          {/* Description */}
          <p className="hero-reveal hero-d3 text-lg md:text-xl text-card/90 mb-10 leading-relaxed max-w-xl">
            بوابتك الشاملة للوادي الجديد — من المواصلات والأسعار إلى فرص الاستثمار والسياحة. كل ما تحتاجه في مكان واحد.
          </p>

          {/* Search Bar */}
          <div className="hero-reveal hero-d4 flex flex-col sm:flex-row gap-3 mb-12">
            <div className="relative flex-1">
              <Search className="absolute right-4 top-1/2 -translate-y-1/2 h-6 w-6 text-muted-foreground" />
              <Input
                placeholder="ابحث عن مواصلات، أسعار، فرص استثمارية..."
                className="pr-14 h-16 bg-card/95 border-0 text-lg rounded-2xl shadow-xl focus:ring-2 focus:ring-primary/40"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && go()}
              />
            </div>
            <Button size="lg" className="h-16 px-10 text-lg rounded-2xl shadow-xl hover:scale-[1.03] transition-transform" onClick={go}>
              ابحث
              <ArrowLeft className="h-5 w-5 mr-2" />
            </Button>
          </div>

          {/* Animated Stats */}
          <div className="hero-reveal hero-d5 flex flex-wrap gap-12">
            <Counter target={50} label="خط مواصلات" delay={900} />
            <Counter target={200} label="منتج محلي" delay={1200} />
            <Counter target={30} label="فرصة استثمارية" delay={1500} />
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 scroll-indicator">
        <div className="w-7 h-11 rounded-full border-2 border-card/30 flex items-start justify-center p-1.5">
          <div className="w-1.5 h-2.5 rounded-full bg-card/50" />
        </div>
      </div>
    </section>
  );
}
