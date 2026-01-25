import { ArrowLeft, MapPin, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import heroImage from "@/assets/hero-desert-oasis.jpg";

export function HeroSection() {
  return (
    <section className="relative min-h-[90vh] flex items-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src={heroImage}
          alt="الوادي الجديد - واحة صحراوية"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-l from-foreground/80 via-foreground/60 to-foreground/40" />
      </div>

      {/* Content */}
      <div className="container relative z-10 px-4 py-20">
        <div className="max-w-2xl">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/20 backdrop-blur-sm border border-primary/30 mb-6">
            <MapPin className="h-4 w-4 text-primary-foreground" />
            <span className="text-sm font-medium text-primary-foreground">البوابة الرقمية الرسمية</span>
          </div>

          {/* Heading */}
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-card mb-6 leading-tight">
            هنا وادينا
            <span className="block text-accent mt-2">اكتشف. تواصل. استثمر.</span>
          </h1>

          {/* Description */}
          <p className="text-lg md:text-xl text-card/90 mb-8 leading-relaxed max-w-xl">
            بوابتك الشاملة للوادي الجديد - من المواصلات والأسعار إلى فرص الاستثمار والسياحة. كل ما تحتاجه في مكان واحد.
          </p>

          {/* Search Bar */}
          <div className="flex flex-col sm:flex-row gap-3 mb-8">
            <div className="relative flex-1">
              <Search className="absolute right-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input
                placeholder="ابحث عن مواصلات، أسعار، فرص استثمارية..."
                className="pr-12 h-14 bg-card/95 border-0 text-base"
              />
            </div>
            <Button size="lg" className="h-14 px-8">
              ابحث
              <ArrowLeft className="h-5 w-5 mr-2" />
            </Button>
          </div>

          {/* Stats */}
          <div className="flex flex-wrap gap-8">
            <div>
              <div className="text-3xl font-bold text-card">+50</div>
              <div className="text-sm text-card/70">خط مواصلات</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-card">+200</div>
              <div className="text-sm text-card/70">منتج محلي</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-card">+30</div>
              <div className="text-sm text-card/70">فرصة استثمارية</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
