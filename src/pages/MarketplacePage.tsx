import { useState } from "react";
import { Layout } from "@/components/layout/Layout";
import { Search, TrendingUp, TrendingDown, Minus, MapPin, Star, Phone, Filter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const cities = [
  { id: "kharga", name: "الخارجة" },
  { id: "dakhla", name: "الداخلة" },
  { id: "farafra", name: "الفرافرة" },
  { id: "paris", name: "باريس" },
];

const priceData = [
  { name: "قمح", price: 1250, change: 2.5, unit: "طن", category: "حبوب" },
  { name: "تمر سيوي", price: 45, change: -1.2, unit: "كجم", category: "فواكه" },
  { name: "زيتون", price: 28, change: 0, unit: "كجم", category: "فواكه" },
  { name: "برسيم", price: 800, change: 3.1, unit: "طن", category: "أعلاف" },
  { name: "أرز", price: 22, change: -0.5, unit: "كجم", category: "حبوب" },
  { name: "فول سوداني", price: 55, change: 1.8, unit: "كجم", category: "بقوليات" },
  { name: "عنب", price: 35, change: 4.2, unit: "كجم", category: "فواكه" },
  { name: "طماطم", price: 12, change: -2.1, unit: "كجم", category: "خضروات" },
  { name: "بطاطس", price: 8, change: 0.5, unit: "كجم", category: "خضروات" },
  { name: "بصل", price: 6, change: -1.0, unit: "كجم", category: "خضروات" },
];

const suppliers = [
  {
    id: 1,
    name: "مزارع الوادي الأخضر",
    specialties: ["تمور", "زيتون", "عنب"],
    city: "الخارجة",
    rating: 4.8,
    reviews: 124,
    verified: true,
  },
  {
    id: 2,
    name: "شركة الواحات للمنتجات الزراعية",
    specialties: ["قمح", "أرز", "برسيم"],
    city: "الداخلة",
    rating: 4.6,
    reviews: 89,
    verified: true,
  },
  {
    id: 3,
    name: "مزرعة النخيل الذهبي",
    specialties: ["تمور", "نخيل"],
    city: "الفرافرة",
    rating: 4.9,
    reviews: 156,
    verified: true,
  },
  {
    id: 4,
    name: "جمعية المزارعين التعاونية",
    specialties: ["خضروات", "فواكه"],
    city: "باريس",
    rating: 4.4,
    reviews: 67,
    verified: false,
  },
];

const MarketplacePage = () => {
  const [selectedCity, setSelectedCity] = useState("kharga");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredProducts = priceData.filter((p) =>
    p.name.includes(searchQuery) || p.category.includes(searchQuery)
  );

  return (
    <Layout>
      {/* Hero Section */}
      <section className="bg-gradient-to-bl from-accent/20 via-background to-background py-16 md:py-24">
        <div className="container px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
              البورصة والأسعار
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground mb-8">
              أسعار المنتجات المحلية، دليل الموردين، والتواصل المباشر
            </p>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="py-12">
        <div className="container px-4">
          <Tabs defaultValue="prices" className="w-full">
            <TabsList className="grid w-full max-w-md mx-auto grid-cols-2 mb-8">
              <TabsTrigger value="prices">لوحة الأسعار</TabsTrigger>
              <TabsTrigger value="suppliers">دليل الموردين</TabsTrigger>
            </TabsList>

            {/* Prices Tab */}
            <TabsContent value="prices" className="space-y-6">
              {/* Filters */}
              <div className="flex flex-col md:flex-row gap-4">
                <Select value={selectedCity} onValueChange={setSelectedCity}>
                  <SelectTrigger className="w-full md:w-48">
                    <SelectValue placeholder="اختر المدينة" />
                  </SelectTrigger>
                  <SelectContent>
                    {cities.map((city) => (
                      <SelectItem key={city.id} value={city.id}>
                        {city.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <div className="relative flex-1">
                  <Search className="absolute right-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                  <Input
                    placeholder="ابحث عن منتج..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pr-12"
                  />
                </div>
              </div>

              {/* Price Board */}
              <Card className="border-border/50 overflow-hidden">
                <div className="bg-primary/5 px-6 py-4 border-b border-border">
                  <div className="flex items-center justify-between">
                    <h3 className="font-semibold text-foreground">
                      أسعار {cities.find((c) => c.id === selectedCity)?.name}
                    </h3>
                    <span className="text-sm text-muted-foreground">آخر تحديث: اليوم 10:30 ص</span>
                  </div>
                </div>
                <CardContent className="p-0">
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b border-border bg-muted/30">
                          <th className="text-right py-4 px-6 text-sm font-medium text-muted-foreground">المنتج</th>
                          <th className="text-right py-4 px-6 text-sm font-medium text-muted-foreground">التصنيف</th>
                          <th className="text-right py-4 px-6 text-sm font-medium text-muted-foreground">السعر</th>
                          <th className="text-right py-4 px-6 text-sm font-medium text-muted-foreground">التغير</th>
                        </tr>
                      </thead>
                      <tbody>
                        {filteredProducts.map((item, index) => (
                          <tr
                            key={item.name}
                            className={index !== filteredProducts.length - 1 ? "border-b border-border/50" : ""}
                          >
                            <td className="py-4 px-6">
                              <span className="font-medium text-foreground">{item.name}</span>
                            </td>
                            <td className="py-4 px-6">
                              <Badge variant="outline">{item.category}</Badge>
                            </td>
                            <td className="py-4 px-6">
                              <span className="font-semibold text-foreground">{item.price}</span>
                              <span className="text-sm text-muted-foreground mr-1">جنيه/{item.unit}</span>
                            </td>
                            <td className="py-4 px-6">
                              <div
                                className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-sm font-medium ${
                                  item.change > 0
                                    ? "bg-primary/10 text-primary"
                                    : item.change < 0
                                    ? "bg-destructive/10 text-destructive"
                                    : "bg-muted text-muted-foreground"
                                }`}
                              >
                                {item.change > 0 ? (
                                  <TrendingUp className="h-3.5 w-3.5" />
                                ) : item.change < 0 ? (
                                  <TrendingDown className="h-3.5 w-3.5" />
                                ) : (
                                  <Minus className="h-3.5 w-3.5" />
                                )}
                                {Math.abs(item.change)}%
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Suppliers Tab */}
            <TabsContent value="suppliers" className="space-y-6">
              {/* Search */}
              <div className="relative max-w-md">
                <Search className="absolute right-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input placeholder="ابحث عن مورد..." className="pr-12" />
              </div>

              {/* Suppliers Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {suppliers.map((supplier) => (
                  <Card
                    key={supplier.id}
                    className="border-border/50 hover:border-primary/50 hover:shadow-md transition-all"
                  >
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <h3 className="text-lg font-semibold text-foreground">{supplier.name}</h3>
                            {supplier.verified && (
                              <Badge className="bg-primary/10 text-primary">موثق</Badge>
                            )}
                          </div>
                          <div className="flex items-center gap-1 text-sm text-muted-foreground">
                            <MapPin className="h-4 w-4" />
                            {supplier.city}
                          </div>
                        </div>
                        <div className="flex items-center gap-1 text-accent-foreground">
                          <Star className="h-4 w-4 fill-current" />
                          <span className="font-medium">{supplier.rating}</span>
                          <span className="text-sm text-muted-foreground">({supplier.reviews})</span>
                        </div>
                      </div>
                      <div className="flex flex-wrap gap-2 mb-4">
                        {supplier.specialties.map((specialty) => (
                          <Badge key={specialty} variant="secondary">
                            {specialty}
                          </Badge>
                        ))}
                      </div>
                      <div className="flex gap-2">
                        <Button variant="outline" className="flex-1">
                          عرض الملف
                        </Button>
                        <Button className="flex-1">
                          <Phone className="h-4 w-4 ml-2" />
                          تواصل
                        </Button>
                      </div>
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

export default MarketplacePage;
