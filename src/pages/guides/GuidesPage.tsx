import { useState, useEffect } from "react";
import { Layout } from "@/components/layout/Layout";
import { useNavigate } from "react-router-dom";
import { Search, MapPin, Star, Filter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { guidesAPI, type GuideProfile } from "@/services/api";

const GuidesPage = () => {
  const navigate = useNavigate();
  const [guides, setGuides] = useState<GuideProfile[]>([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    guidesAPI.getGuides().then((r) => setGuides(r.data)).catch(console.error);
  }, []);

  const filtered = guides.filter(
    (g) => g.name.includes(search) || g.specialties.some((s) => s.includes(search)) || g.bio_ar.includes(search)
  );

  return (
    <Layout>
      <section className="relative py-16 md:py-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-accent/5 to-background" />
        <div className="container relative px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 text-foreground">المرشدين السياحيين 🧭</h1>
            <p className="text-lg text-muted-foreground mb-8">اختر مرشدك واحجز رحلة مميزة في الوادي الجديد</p>
            <div className="relative max-w-xl mx-auto">
              <Search className="absolute right-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input placeholder="ابحث بالاسم أو التخصص..." value={search} onChange={(e) => setSearch(e.target.value)} className="pr-12 h-12 text-lg" />
            </div>
          </div>
        </div>
      </section>

      <section className="py-12">
        <div className="container px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((guide) => (
              <Card key={guide.id} className="hover:shadow-lg transition-all cursor-pointer group" onClick={() => navigate(`/guides/${guide.id}`)}>
                <CardContent className="p-0">
                  <div className="relative">
                    <img src={guide.image} alt={guide.name} className="w-full h-48 object-cover rounded-t-lg" />
                    {guide.license_verified && (
                      <Badge className="absolute top-3 left-3 bg-green-500 text-white">✓ مرخّص</Badge>
                    )}
                  </div>
                  <div className="p-5 space-y-3">
                    <h3 className="text-xl font-bold group-hover:text-primary transition-colors">{guide.name}</h3>
                    <p className="text-sm text-muted-foreground line-clamp-2">{guide.bio_ar}</p>
                    <div className="flex flex-wrap gap-1">
                      {guide.specialties.map((s) => (
                        <Badge key={s} variant="outline" className="text-xs">{s}</Badge>
                      ))}
                    </div>
                    <div className="flex items-center justify-between pt-3 border-t">
                      <div className="flex items-center gap-1">
                        <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                        <span className="font-bold">{guide.rating_avg}</span>
                        <span className="text-sm text-muted-foreground">({guide.rating_count})</span>
                      </div>
                      <div>
                        <span className="text-lg font-bold text-primary">{guide.base_price}</span>
                        <span className="text-sm text-muted-foreground mr-1">جنيه/يوم</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default GuidesPage;
