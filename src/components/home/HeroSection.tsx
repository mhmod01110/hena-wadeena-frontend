import { useEffect, useState } from "react";
import { ArrowLeft, Sparkles, Mountain, ShoppingBag, Truck, TrendingUp, Users, Compass } from "lucide-react";
import { Link } from "react-router-dom";
import heroImage from "@/assets/hero-desert-oasis.jpg";

function Counter({ target, label, delay }: { target: number; label: string; delay: number }) {
  const [val, setVal] = useState(0);
  const [show, setShow] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setShow(true), delay);
    return () => clearTimeout(t);
  }, [delay]);

  useEffect(() => {
    if (!show) return;
    const dur = 2000;
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
  const [scrollY, setScrollY] = useState(0);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setLoaded(true);
  }, []);

  useEffect(() => {
    let ticking = false;
    const onScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          setScrollY(window.scrollY);
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const parallaxY = scrollY * 0.3;
  const heroOpacity = Math.max(0, 1 - scrollY / 700);

  return (
    <section className="relative min-h-[95vh] flex items-center overflow-hidden">
      {/* Parallax Background */}
      <div
        className="absolute inset-0 will-change-transform transition-transform duration-75"
        style={{ transform: `translateY(${parallaxY}px) scale(${loaded ? 1 : 1.1})`, transition: loaded ? 'transform 0.075s linear' : 'transform 1.2s cubic-bezier(0.16, 1, 0.3, 1)' }}
      >
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
          "top-[78%] right-[35%] h-1.5 w-1.5 bg-accent/25 particle-2",
          "top-[8%] right-[50%] h-2 w-2 bg-card/20 particle-4",
        ].map((cls, i) => (
          <div key={i} className={`particle absolute rounded-full ${cls}`} />
        ))}
      </div>

      {/* Content with fade on scroll */}
      <div className="container relative z-10 px-4 py-20" style={{ opacity: heroOpacity }}>
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

          {/* Quick Navigation Cards */}
          <div className="hero-reveal hero-d4 grid grid-cols-2 sm:grid-cols-3 gap-3 mb-12">
            {[
              { icon: Mountain, label: "السياحة", desc: "اكتشف المعالم", href: "/tourism", delay: "0ms" },
              { icon: ShoppingBag, label: "البورصة", desc: "أسعار اليوم", href: "/marketplace", delay: "50ms" },
              { icon: Truck, label: "المواصلات", desc: "خطوط وحجز", href: "/logistics", delay: "100ms" },
              { icon: TrendingUp, label: "الاستثمار", desc: "فرص واعدة", href: "/investment", delay: "150ms" },
              { icon: Users, label: "المرشدين", desc: "دليلك المحلي", href: "/guides", delay: "200ms" },
              { icon: Compass, label: "المعالم", desc: "أماكن مميزة", href: "/tourism/attractions", delay: "250ms" },
            ].map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.href}
                  to={item.href}
                  className="group relative flex items-center gap-3 p-4 rounded-2xl glass hover:bg-card/20 transition-all duration-300 hover:scale-[1.04] hover:shadow-xl cursor-pointer"
                  style={{ animationDelay: item.delay }}
                >
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-accent/20 group-hover:bg-accent/30 transition-colors duration-300">
                    <Icon className="h-6 w-6 text-accent" strokeWidth={1.8} />
                  </div>
                  <div className="min-w-0">
                    <div className="font-bold text-card text-sm">{item.label}</div>
                    <div className="text-xs text-card/60">{item.desc}</div>
                  </div>
                  <ArrowLeft className="h-4 w-4 text-card/40 mr-auto opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" />
                </Link>
              );
            })}
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
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 scroll-indicator" style={{ opacity: heroOpacity }}>
        <div className="w-7 h-11 rounded-full border-2 border-card/30 flex items-start justify-center p-1.5">
          <div className="w-1.5 h-2.5 rounded-full bg-card/50" />
        </div>
      </div>
    </section>
  );
}
