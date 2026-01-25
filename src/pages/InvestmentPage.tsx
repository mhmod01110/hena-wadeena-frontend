import { Layout } from "@/components/layout/Layout";
import { Search, MapPin, TrendingUp, Building2, Send, ArrowLeft, DollarSign } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const opportunities = [
  {
    id: 1,
    title: "مشروع زراعي متكامل - 100 فدان",
    category: "زراعة",
    location: "الداخلة",
    investment: "5-10 مليون جنيه",
    roi: "18-22%",
    status: "متاح",
    description: "فرصة استثمارية في مشروع زراعي متكامل يشمل زراعة التمور والزيتون مع نظام ري حديث.",
  },
  {
    id: 2,
    title: "منتجع سياحي صحراوي",
    category: "سياحة",
    location: "الفرافرة",
    investment: "15-25 مليون جنيه",
    roi: "15-20%",
    status: "متاح",
    description: "مشروع منتجع سياحي فاخر بالقرب من الصحراء البيضاء مع خدمات سفاري وتخييم.",
  },
  {
    id: 3,
    title: "مصنع تعبئة وتغليف تمور",
    category: "صناعة",
    location: "الخارجة",
    investment: "3-5 مليون جنيه",
    roi: "25-30%",
    status: "متاح",
    description: "مصنع لتعبئة وتغليف التمور للتصدير مع خطوط إنتاج حديثة ومخازن مبردة.",
  },
  {
    id: 4,
    title: "محطة طاقة شمسية",
    category: "طاقة",
    location: "باريس",
    investment: "50-100 مليون جنيه",
    roi: "12-15%",
    status: "قيد الدراسة",
    description: "مشروع محطة طاقة شمسية بقدرة 50 ميجاوات للاستفادة من الإشعاع الشمسي العالي.",
  },
];

const startups = [
  {
    id: 1,
    name: "واحة تك",
    sector: "تكنولوجيا زراعية",
    stage: "مرحلة النمو",
    location: "الخارجة",
    team: 8,
    description: "حلول ذكية للري والمراقبة الزراعية باستخدام إنترنت الأشياء.",
  },
  {
    id: 2,
    name: "صحراء ديليفري",
    sector: "لوجستيات",
    stage: "مرحلة مبكرة",
    location: "الداخلة",
    team: 5,
    description: "منصة توصيل وخدمات لوجستية متخصصة في المناطق الصحراوية.",
  },
  {
    id: 3,
    name: "تمرنا",
    sector: "تجارة إلكترونية",
    stage: "مرحلة النمو",
    location: "الخارجة",
    team: 12,
    description: "منصة لبيع التمور والمنتجات المحلية عبر الإنترنت للسوق المحلي والدولي.",
  },
];

const InvestmentPage = () => {
  return (
    <Layout>
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-chart-3/20 via-background to-background py-16 md:py-24">
        <div className="container px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
              فرص الاستثمار
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground mb-8">
              اكتشف الفرص الاستثمارية في الوادي الجديد وتواصل مع الشركات الناشئة
            </p>
            {/* Search */}
            <div className="relative max-w-xl mx-auto">
              <Search className="absolute right-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input placeholder="ابحث عن فرص استثمارية..." className="pr-12 h-14 text-base" />
            </div>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="py-12">
        <div className="container px-4">
          <Tabs defaultValue="opportunities" className="w-full">
            <TabsList className="grid w-full max-w-md mx-auto grid-cols-2 mb-8">
              <TabsTrigger value="opportunities">الفرص الاستثمارية</TabsTrigger>
              <TabsTrigger value="startups">الشركات الناشئة</TabsTrigger>
            </TabsList>

            {/* Opportunities Tab */}
            <TabsContent value="opportunities" className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {opportunities.map((opp) => (
                  <Card
                    key={opp.id}
                    className="border-border/50 hover:border-primary/50 hover:shadow-lg transition-all"
                  >
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between mb-4">
                        <Badge
                          variant={opp.status === "متاح" ? "default" : "secondary"}
                          className={opp.status === "متاح" ? "bg-primary" : ""}
                        >
                          {opp.status}
                        </Badge>
                        <Badge variant="outline">{opp.category}</Badge>
                      </div>
                      <h3 className="text-xl font-semibold text-foreground mb-2">{opp.title}</h3>
                      <p className="text-muted-foreground mb-4 line-clamp-2">{opp.description}</p>
                      <div className="grid grid-cols-2 gap-4 mb-4">
                        <div className="flex items-center gap-2 text-sm">
                          <MapPin className="h-4 w-4 text-primary" />
                          <span className="text-muted-foreground">{opp.location}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm">
                          <DollarSign className="h-4 w-4 text-primary" />
                          <span className="text-muted-foreground">{opp.investment}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm col-span-2">
                          <TrendingUp className="h-4 w-4 text-primary" />
                          <span className="text-muted-foreground">العائد المتوقع: {opp.roi}</span>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="outline" className="flex-1">
                          التفاصيل
                          <ArrowLeft className="h-4 w-4 mr-2" />
                        </Button>
                        <Button className="flex-1">
                          <Send className="h-4 w-4 ml-2" />
                          استفسار
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            {/* Startups Tab */}
            <TabsContent value="startups" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {startups.map((startup) => (
                  <Card
                    key={startup.id}
                    className="border-border/50 hover:border-primary/50 hover:shadow-lg transition-all"
                  >
                    <CardContent className="p-6">
                      <div className="flex items-center gap-4 mb-4">
                        <div className="h-14 w-14 rounded-xl bg-primary/10 flex items-center justify-center">
                          <Building2 className="h-7 w-7 text-primary" />
                        </div>
                        <div>
                          <h3 className="text-lg font-semibold text-foreground">{startup.name}</h3>
                          <Badge variant="secondary" className="mt-1">
                            {startup.stage}
                          </Badge>
                        </div>
                      </div>
                      <p className="text-muted-foreground mb-4 line-clamp-2">{startup.description}</p>
                      <div className="flex flex-wrap gap-4 text-sm text-muted-foreground mb-4">
                        <div className="flex items-center gap-1">
                          <MapPin className="h-4 w-4" />
                          {startup.location}
                        </div>
                        <div>{startup.sector}</div>
                        <div>{startup.team} أعضاء</div>
                      </div>
                      <Button className="w-full">
                        <Send className="h-4 w-4 ml-2" />
                        تواصل
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>
    </Layout>
  );
};

export default InvestmentPage;
