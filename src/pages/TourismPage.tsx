import { Layout } from "@/components/layout/Layout";
import { useNavigate } from "react-router-dom";
import { Search, MapPin, Star, Clock, Calendar, Users, Home, ArrowLeft, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const attractions = [
  {
    id: 1,
    title: "واحة الخارجة",
    description: "أكبر واحات الوادي الجديد، تضم آثاراً فرعونية ورومانية فريدة من معبد هيبس ومقابر البجوات",
    image: "https://images.unsplash.com/photo-1539768942893-daf53e448371?w=800",
    rating: 4.8,
    duration: "يوم كامل",
    type: "أثري",
    featured: true,
  },
  {
    id: 2,
    title: "الصحراء البيضاء",
    description: "تشكيلات صخرية بيضاء ساحرة من الطباشير تحت سماء مليئة بالنجوم",
    image: "https://images.unsplash.com/photo-1509316785289-025f5b846b35?w=800",
    rating: 4.9,
    duration: "٢-٣ أيام",
    type: "طبيعي",
    featured: true,
  },
  {
    id: 3,
    title: "عين السبيل",
    description: "عين مياه ساخنة طبيعية للاسترخاء والعلاج الطبيعي",
    image: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800",
    rating: 4.6,
    duration: "نصف يوم",
    type: "استشفائي",
    featured: false,
  },
  {
    id: 4,
    title: "معبد الغويطة",
    description: "معبد بطلمي يعود للقرن السادس قبل الميلاد",
    image: "https://images.unsplash.com/photo-1568322445389-f64ac2515020?w=800",
    rating: 4.5,
    duration: "٣ ساعات",
    type: "أثري",
    featured: false,
  },
];

const guides = [
  {
    id: 1,
    name: "أحمد السيد",
    languages: ["العربية", "الإنجليزية"],
    specialties: ["سفاري صحراوي", "مواقع أثرية"],
    rating: 4.9,
    reviews: 87,
    pricePerDay: 800,
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200",
  },
  {
    id: 2,
    name: "محمد فتحي",
    languages: ["العربية", "الإنجليزية", "الفرنسية"],
    specialties: ["تخييم", "مراقبة النجوم"],
    rating: 4.8,
    reviews: 64,
    pricePerDay: 700,
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200",
  },
  {
    id: 3,
    name: "علي حسن",
    languages: ["العربية", "الألمانية"],
    specialties: ["سياحة علاجية", "واحات"],
    rating: 4.7,
    reviews: 45,
    pricePerDay: 650,
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200",
  },
];

const accommodations = [
  {
    id: 1,
    title: "شقة مفروشة - الخارجة",
    type: "شقة",
    price: 1500,
    priceUnit: "شهرياً",
    rooms: 2,
    location: "حي الزهور، الخارجة",
    amenities: ["مكيفة", "إنترنت", "مطبخ مجهز"],
    forStudents: true,
  },
  {
    id: 2,
    title: "استوديو للطلاب - الداخلة",
    type: "استوديو",
    price: 800,
    priceUnit: "شهرياً",
    rooms: 1,
    location: "قرب الجامعة، الداخلة",
    amenities: ["مكيف", "إنترنت"],
    forStudents: true,
  },
  {
    id: 3,
    title: "غرفة مشتركة - الخارجة",
    type: "غرفة مشتركة",
    price: 500,
    priceUnit: "شهرياً",
    rooms: 1,
    location: "وسط البلد، الخارجة",
    amenities: ["مكيف مشترك", "مطبخ مشترك"],
    forStudents: true,
  },
];

const TourismPage = () => {
  const navigate = useNavigate();
  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative py-16 md:py-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-accent/5 to-background" />
        <div className="container relative px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
              السياحة والمجتمع
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground mb-8">
              اكتشف المعالم السياحية، احجز مرشداً، أو ابحث عن سكن للطلاب
            </p>
            {/* Search */}
            <div className="relative max-w-xl mx-auto">
              <Search className="absolute right-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input placeholder="ابحث عن معالم، مرشدين، أو سكن..." className="pr-12 h-14 text-base" />
            </div>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="py-12">
        <div className="container px-4">
          <Tabs defaultValue="attractions" className="w-full">
            <TabsList className="grid w-full max-w-lg mx-auto grid-cols-3 mb-8">
              <TabsTrigger value="attractions">المعالم</TabsTrigger>
              <TabsTrigger value="guides">المرشدين</TabsTrigger>
              <TabsTrigger value="housing">السكن</TabsTrigger>
            </TabsList>

            {/* Attractions Tab */}
            <TabsContent value="attractions" className="space-y-6">
              {/* Featured */}
              <div className="mb-8">
                <h3 className="text-xl font-semibold text-foreground mb-4">وجهات مميزة</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {attractions
                    .filter((a) => a.featured)
                    .map((attraction) => (
                      <Card
                        key={attraction.id}
                        className="group overflow-hidden border-border/50 hover:border-primary/50 hover:shadow-lg transition-all"
                      >
                        <div className="aspect-video overflow-hidden relative">
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
                          <h3 className="text-xl font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
                            {attraction.title}
                          </h3>
                          <p className="text-muted-foreground mb-4 line-clamp-2">{attraction.description}</p>
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-4 text-sm">
                              <div className="flex items-center gap-1 text-accent-foreground">
                                <Star className="h-4 w-4 fill-current" />
                                <span className="font-medium">{attraction.rating}</span>
                              </div>
                              <div className="flex items-center gap-1 text-muted-foreground">
                                <Clock className="h-4 w-4" />
                                {attraction.duration}
                              </div>
                            </div>
                            <Button variant="outline" size="sm">
                              المزيد
                              <ArrowLeft className="h-4 w-4 mr-1" />
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                </div>
              </div>

              {/* All Attractions */}
              <div>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-semibold text-foreground">كل المعالم</h3>
                  <Button variant="outline" onClick={() => navigate("/tourism/attractions")}>
                    عرض المزيد
                  </Button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  {attractions.map((attraction) => (
                    <Card
                      key={attraction.id}
                      className="group overflow-hidden border-border/50 hover:border-primary/50 hover:shadow-md transition-all"
                    >
                      <div className="aspect-[4/3] overflow-hidden">
                        <img
                          src={attraction.image}
                          alt={attraction.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                      </div>
                      <CardContent className="p-4">
                        <h4 className="font-semibold text-foreground mb-1 group-hover:text-primary transition-colors">
                          {attraction.title}
                        </h4>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Badge variant="outline" className="text-xs">
                            {attraction.type}
                          </Badge>
                          <span className="flex items-center gap-1">
                            <Star className="h-3 w-3 text-accent-foreground fill-current" />
                            {attraction.rating}
                          </span>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            </TabsContent>

            {/* Guides Tab */}
            <TabsContent value="guides" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {guides.map((guide) => (
                  <Card
                    key={guide.id}
                    className="border-border/50 hover:border-primary/50 hover:shadow-lg transition-all"
                  >
                    <CardContent className="p-6">
                      <div className="flex items-center gap-4 mb-4">
                        <img
                          src={guide.image}
                          alt={guide.name}
                          className="h-16 w-16 rounded-full object-cover"
                        />
                        <div>
                          <h3 className="text-lg font-semibold text-foreground">{guide.name}</h3>
                          <div className="flex items-center gap-1 text-accent-foreground">
                            <Star className="h-4 w-4 fill-current" />
                            <span className="font-medium">{guide.rating}</span>
                            <span className="text-sm text-muted-foreground">({guide.reviews} تقييم)</span>
                          </div>
                        </div>
                      </div>
                      <div className="space-y-3 mb-4">
                        <div>
                          <span className="text-sm text-muted-foreground">اللغات:</span>
                          <div className="flex flex-wrap gap-1 mt-1">
                            {guide.languages.map((lang) => (
                              <Badge key={lang} variant="secondary" className="text-xs">
                                {lang}
                              </Badge>
                            ))}
                          </div>
                        </div>
                        <div>
                          <span className="text-sm text-muted-foreground">التخصصات:</span>
                          <div className="flex flex-wrap gap-1 mt-1">
                            {guide.specialties.map((spec) => (
                              <Badge key={spec} variant="outline" className="text-xs">
                                {spec}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center justify-between pt-4 border-t border-border">
                        <div>
                          <span className="text-2xl font-bold text-primary">{guide.pricePerDay}</span>
                          <span className="text-sm text-muted-foreground mr-1">جنيه/يوم</span>
                        </div>
                        <Button onClick={() => navigate(`/tourism/guide-booking/${guide.id}`)}>
                          <Calendar className="h-4 w-4 ml-2" />
                          احجز
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            {/* Housing Tab */}
            <TabsContent value="housing" className="space-y-6">
              <div className="bg-accent/20 rounded-xl p-4 mb-6">
                <div className="flex items-center gap-3">
                  <Home className="h-6 w-6 text-accent-foreground" />
                  <div>
                    <h3 className="font-semibold text-foreground">سكن الطلاب والوافدين</h3>
                    <p className="text-sm text-muted-foreground">
                      ابحث عن شقق وغرف مناسبة للطلاب والعاملين في الوادي الجديد
                    </p>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {accommodations.map((acc) => (
                  <Card
                    key={acc.id}
                    className="border-border/50 hover:border-primary/50 hover:shadow-lg transition-all"
                  >
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between mb-3">
                        <Badge variant="secondary">{acc.type}</Badge>
                        {acc.forStudents && (
                          <Badge className="bg-accent text-accent-foreground">مناسب للطلاب</Badge>
                        )}
                      </div>
                      <h3 className="text-lg font-semibold text-foreground mb-2">{acc.title}</h3>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground mb-3">
                        <MapPin className="h-4 w-4" />
                        {acc.location}
                      </div>
                      <div className="flex flex-wrap gap-2 mb-4">
                        {acc.amenities.map((amenity) => (
                          <Badge key={amenity} variant="outline" className="text-xs">
                            {amenity}
                          </Badge>
                        ))}
                      </div>
                      <div className="flex items-center justify-between pt-4 border-t border-border">
                        <div>
                          <span className="text-2xl font-bold text-primary">{acc.price}</span>
                          <span className="text-sm text-muted-foreground mr-1">جنيه/{acc.priceUnit}</span>
                        </div>
                        <Button variant="outline" onClick={() => navigate(`/tourism/accommodation/${acc.id}`)}>
                          <Phone className="h-4 w-4 ml-2" />
                          تفاصيل
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

export default TourismPage;
