import { useEffect, useState, useRef, useCallback } from "react";
import { ArrowLeft, Sparkles, Mountain, ShoppingBag, Truck, TrendingUp, Users, Compass } from "lucide-react";
import { Link } from "react-router-dom";
import heroImage from "@/assets/hero-desert-oasis.jpg";

const navCards = [
  { icon: Mountain, label: "السياحة", desc: "اكتشف المعالم", href: "/tourism", color: "from-emerald-500 to-teal-600" },
  { icon: ShoppingBag, label: "البورصة", desc: "أسعار اليوم", href: "/marketplace", color: "from-amber-500 to-orange-600" },
  { icon: Truck, label: "المواصلات", desc: "خطوط وحجز", href: "/logistics", color: "from-sky-500 to-blue-600" },
  { icon: TrendingUp, label: "الاستثمار", desc: "فرص واعدة", href: "/investment", color: "from-violet-500 to-purple-600" },
  { icon: Users, label: "المرشدين", desc: "دليلك المحلي", href: "/guides", color: "from-pink-500 to-rose-600" },
  { icon: Compass, label: "المعالم", desc: "أماكن مميزة", href: "/tourism/attractions", color: "from-cyan-500 to-indigo-600" },
];

function CardDeck() {
  const deckRef = useRef<HTMLDivElement>(null);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (!deckRef.current) return;
    const rect = deckRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;  // -0.5 to 0.5
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setMousePos({ x, y });
  }, []);

  const getCardStyle = (index: number, total: number) => {
    const mid = (total - 1) / 2;
    const offset = index - mid;

    if (isHovering) {
      // Fan out like playing cards
      const fanAngle = offset * 8 + mousePos.x * 5;
      const fanX = offset * 65 + mousePos.x * 15;
      const fanY = Math.abs(offset) * 12 - (hoveredIndex === index ? 30 : 0);
      const scale = hoveredIndex === index ? 1.1 : 1;
      const z = hoveredIndex === index ? 50 : total - Math.abs(offset);

      return {
        transform: `translateX(${fanX}px) translateY(${fanY}px) rotate(${fanAngle}deg) scale(${scale})`,
        zIndex: z,
        transition: "all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)",
      };
    }

    // Stacked with slight offset
    const stackY = -index * 3;
    const stackX = index * 2;
    const stackRotate = (index - mid) * 1.5;
    return {
      transform: `translateX(${stackX}px) translateY(${stackY}px) rotate(${stackRotate}deg) scale(${1 - index * 0.015})`,
      zIndex: total - index,
      transition: "all 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)",
    };
  };

  return (
    <div
      ref={deckRef}
      className="relative h-[220px] w-full max-w-[380px] mx-auto sm:mx-0 flex items-center justify-center"
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => { setIsHovering(false); setHoveredIndex(null); }}
    >
      {navCards.map((item, index) => {
        const Icon = item.icon;
        const style = getCardStyle(index, navCards.length);
        return (
          <Link
            key={item.href}
            to={item.href}
            className="absolute w-[160px] h-[190px] cursor-pointer"
            style={style}
            onMouseEnter={() => setHoveredIndex(index)}
          >
            <div className={`w-full h-full rounded-2xl bg-gradient-to-br ${item.color} p-5 flex flex-col items-center justify-center gap-3 shadow-2xl border border-white/20 backdrop-blur-sm hover:shadow-[0_20px_60px_-15px_rgba(0,0,0,0.4)] transition-shadow duration-300`}>
              <div className="h-14 w-14 rounded-xl bg-white/20 flex items-center justify-center backdrop-blur-sm">
                <Icon className="h-7 w-7 text-white" strokeWidth={1.8} />
              </div>
              <div className="text-center">
                <div className="font-bold text-white text-base">{item.label}</div>
                <div className="text-xs text-white/70 mt-0.5">{item.desc}</div>
              </div>
              <ArrowLeft className="h-4 w-4 text-white/50 absolute bottom-3 left-3 opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
          </Link>
        );
      })}
    </div>
  );
}

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

          {/* Card Deck Navigation */}
          <div className="hero-reveal hero-d4 mb-12">
            <CardDeck />
            <p className="text-card/50 text-xs mt-4 text-center sm:text-right">مرّر الماوس على الكروت لاستكشاف الأقسام ✨</p>
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
