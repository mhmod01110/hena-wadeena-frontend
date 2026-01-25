import { Link } from "react-router-dom";
import { Truck, BarChart3, TrendingUp, Compass, ArrowLeft } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const missions = [
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
    id: "tourism",
    title: "السياحة والمجتمع",
    description: "المعالم الأثرية، المرشدين السياحيين، السكن للطلاب، وقصص الوادي.",
    icon: Compass,
    href: "/tourism",
    gradient: "from-chart-4 to-primary",
  },
];

export function MissionCards() {
  return (
    <section className="py-20 bg-muted/30">
      <div className="container px-4">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            أربع مهام لخدمة وادينا
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            نربط أهل الوادي بالخدمات الأساسية ونفتح أبواب الفرص للجميع
          </p>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {missions.map((mission) => {
            const Icon = mission.icon;
            return (
              <Link key={mission.id} to={mission.href}>
                <Card className="group h-full border-border/50 hover:border-primary/50 hover:shadow-lg transition-all duration-300 overflow-hidden">
                  <CardContent className="p-6 flex flex-col h-full">
                    <div className={`inline-flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br ${mission.gradient} mb-4`}>
                      <Icon className="h-7 w-7 text-primary-foreground" />
                    </div>
                    <h3 className="text-xl font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
                      {mission.title}
                    </h3>
                    <p className="text-muted-foreground flex-1 mb-4">
                      {mission.description}
                    </p>
                    <div className="flex items-center text-primary font-medium">
                      استكشف
                      <ArrowLeft className="h-4 w-4 mr-2 group-hover:-translate-x-1 transition-transform" />
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
