import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { Truck, BarChart3, TrendingUp, Compass, ArrowLeft, Users, Search } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const missions = [
  {
    id: "tourism",
    title: "السياحة والمجتمع",
    description: "المعالم الأثرية، المرشدين السياحيين، السكن للطلاب، وقصص الوادي.",
    icon: Compass,
    href: "/tourism",
    gradient: "from-chart-4 to-primary",
  },
  {
    id: "guides",
    title: "المرشدين السياحيين",
    description: "احجز مرشد سياحي معتمد، استعرض الباقات والتقييمات، واحجز رحلتك.",
    icon: Users,
    href: "/guides",
    gradient: "from-purple-500 to-purple-700",
  },
  {
    id: "logistics",
    title: "اللوجستيات والتنقل",
    description: "خطوط المواصلات، المحطات، ومشاركة الرحلات للتنقل بسهولة داخل وخارج الوادي.",
    icon: Truck,
    href: "/logistics",
    gradient: "from-primary to-primary/80",
  },
  {
    id: "marketplace",
    title: "البورصة والأسعار",
    description: "أسعار المنتجات الزراعية والمحلية، دليل الموردين، والتواصل المباشر.",
    icon: BarChart3,
    href: "/marketplace",
    gradient: "from-accent to-accent/80",
  },
  {
    id: "investment",
    title: "فرص الاستثمار",
    description: "اكتشف الفرص الاستثمارية، تواصل مع الشركات الناشئة، وابدأ مشروعك.",
    icon: TrendingUp,
    href: "/investment",
    gradient: "from-chart-3 to-chart-5",
  },
  {
    id: "search",
    title: "البحث والمساعد الذكي",
    description: "ابحث عبر المنصة بالكامل أو اسأل المساعد الذكي عن أي شيء يخص الوادي الجديد.",
    icon: Search,
    href: "/search",
    gradient: "from-sky-500 to-blue-600",
  },
];

export function MissionCards() {
  const headerRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) e.target.classList.add("visible"); }),
      { threshold: 0.1, rootMargin: "0px 0px -40px 0px" }
    );
    if (headerRef.current) io.observe(headerRef.current);
    if (gridRef.current) io.observe(gridRef.current);
    return () => io.disconnect();
  }, []);

  return (
    <section className="py-24 bg-muted/30 relative overflow-hidden">
      {/* Soft background blobs */}
      <div className="absolute top-0 left-0 w-80 h-80 bg-primary/5 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2 pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-accent/5 rounded-full blur-3xl translate-x-1/3 translate-y-1/3 pointer-events-none" />

      <div className="container px-4 relative">
        {/* Section Header */}
        <div ref={headerRef} className="reveal text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-5">
            <span className="text-sm font-semibold text-primary">✨ خدماتنا</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            خدماتنا لأهل الوادي
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            نربط أهل الوادي بالخدمات الأساسية ونفتح أبواب الفرص للجميع
          </p>
        </div>

        {/* Cards Grid — staggered reveal */}
        <div ref={gridRef} className="stagger grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
          {missions.map((mission) => {
            const Icon = mission.icon;
            return (
              <Link key={mission.id} to={mission.href}>
                <Card className="group h-full border-border/50 hover:border-primary/40 hover-lift overflow-hidden hover:shadow-xl rounded-2xl">
                  <CardContent className="p-8 flex flex-col h-full">
                    {/* Large Icon */}
                    <div className={`inline-flex h-18 w-18 items-center justify-center rounded-2xl bg-gradient-to-br ${mission.gradient} mb-6 shadow-lg group-hover:scale-110 group-hover:shadow-xl transition-all duration-300`}
                      style={{ width: 72, height: 72 }}>
                      <Icon className="h-9 w-9 text-primary-foreground" strokeWidth={1.8} />
                    </div>
                    <h3 className="text-xl font-bold text-foreground mb-3 group-hover:text-primary transition-colors duration-250">
                      {mission.title}
                    </h3>
                    <p className="text-muted-foreground flex-1 mb-6 leading-relaxed">
                      {mission.description}
                    </p>
                    <div className="flex items-center text-primary font-semibold">
                      استكشف
                      <ArrowLeft className="h-5 w-5 mr-2 group-hover:-translate-x-2 transition-transform duration-300" />
                    </div>
                  </CardContent>
                </Card>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
