import { Link } from "react-router-dom";
import { ArrowLeft, MapPin, Star, Clock } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const featuredAttractions = [
  {
    id: 1,
    title: "واحة الخارجة",
    description: "أكبر واحات الوادي الجديد، تضم آثاراً فرعونية ورومانية فريدة",
    image: "https://images.unsplash.com/photo-1539768942893-daf53e448371?w=800",
    rating: 4.8,
    duration: "يوم كامل",
    type: "أثري",
  },
  {
    id: 2,
    title: "الصحراء البيضاء",
    description: "تشكيلات صخرية بيضاء ساحرة تحت سماء مليئة بالنجوم",
    image: "https://images.unsplash.com/photo-1509316785289-025f5b846b35?w=800",
    rating: 4.9,
    duration: "٢-٣ أيام",
    type: "طبيعي",
  },
  {
    id: 3,
    title: "عين السبيل",
    description: "عين مياه ساخنة طبيعية للاسترخاء والعلاج",
    image: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800",
    rating: 4.6,
    duration: "نصف يوم",
    type: "استشفائي",
  },
];

export function FeaturedSection() {
  return (
    <section className="py-20">
      <div className="container px-4">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-12">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-2">
              وجهات مميزة
            </h2>
            <p className="text-lg text-muted-foreground">
              اكتشف أجمل المعالم السياحية في الوادي الجديد
            </p>
          </div>
          <Link to="/tourism">
            <Button variant="outline" className="gap-2">
              عرض الكل
              <ArrowLeft className="h-4 w-4" />
            </Button>
          </Link>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredAttractions.map((attraction) => (
            <Link key={attraction.id} to={`/tourism/attractions/${attraction.id}`}>
              <Card className="group h-full overflow-hidden border-border/50 hover:border-primary/50 hover:shadow-lg transition-all duration-300">
                <div className="aspect-[4/3] overflow-hidden relative">
                  <img
                    src={attraction.image}
                    alt={attraction.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <Badge className="absolute top-4 right-4 bg-card/90 text-foreground backdrop-blur-sm">
                    {attraction.type}
                  </Badge>
                </div>
                <CardContent className="p-5">
                  <h3 className="text-lg font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
                    {attraction.title}
                  </h3>
                  <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                    {attraction.description}
                  </p>
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-1 text-accent-foreground">
                      <Star className="h-4 w-4 fill-current" />
                      <span className="font-medium">{attraction.rating}</span>
                    </div>
                    <div className="flex items-center gap-1 text-muted-foreground">
                      <Clock className="h-4 w-4" />
                      <span>{attraction.duration}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
