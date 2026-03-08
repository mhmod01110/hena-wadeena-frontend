import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, MapPin, Star, Clock } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { tourismAPI, type Attraction } from "@/services/api";

export function FeaturedSection() {
  const [featuredAttractions, setFeaturedAttractions] = useState<Attraction[]>([]);
  const headerRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    tourismAPI.getFeatured().then((r) => setFeaturedAttractions(r.data)).catch(console.error);
  }, []);

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
    <section className="py-24">
      <div className="container px-4">
        {/* Section Header */}
        <div ref={headerRef} className="reveal flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-14">
          <div>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 border border-accent/20 mb-5">
              <MapPin className="h-4 w-4 text-accent" />
              <span className="text-sm font-semibold text-accent">وجهات مميزة</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-2">
              وجهات مميزة
            </h2>
            <p className="text-lg text-muted-foreground">
              اكتشف أجمل المعالم السياحية في الوادي الجديد
            </p>
          </div>
          <Link to="/tourism">
            <Button variant="outline" className="gap-2 hover:scale-[1.03] transition-transform">
              عرض الكل
              <ArrowLeft className="h-4 w-4" />
            </Button>
          </Link>
        </div>

        {/* Cards Grid */}
        <div ref={gridRef} className="stagger grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
          {featuredAttractions.map((attraction) => (
            <Link key={attraction.id} to={`/tourism/attraction/${attraction.id}`}>
              <Card className="group h-full overflow-hidden border-border/50 hover:border-primary/40 hover-lift rounded-2xl hover:shadow-xl">
                <div className="aspect-[4/3] overflow-hidden relative">
                  <img
                    src={attraction.image}
                    alt={attraction.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                  />
                  <Badge className="absolute top-4 right-4 glass text-foreground font-medium">
                    {attraction.type}
                  </Badge>
                  {/* Gradient overlay on hover */}
                  <div className="absolute inset-0 bg-gradient-to-t from-foreground/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
                <CardContent className="p-6">
                  <h3 className="text-lg font-bold text-foreground mb-2 group-hover:text-primary transition-colors duration-250">
                    {attraction.title}
                  </h3>
                  <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                    {attraction.description}
                  </p>
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-1.5 text-accent">
                      <Star className="h-5 w-5 fill-current" />
                      <span className="font-bold text-base">{attraction.rating}</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-muted-foreground">
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
