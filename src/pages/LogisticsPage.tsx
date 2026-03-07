import { useState, useEffect } from "react";
import { Layout } from "@/components/layout/Layout";
import { useNavigate } from "react-router-dom";
import { Search, MapPin, Clock, ArrowLeft, Bus, Car, Filter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { logisticsAPI, type TransportRoute, type Station, type Carpool } from "@/services/api";

const LogisticsPage = () => {
  const navigate = useNavigate();
  const [searchFrom, setSearchFrom] = useState("");
  const [searchTo, setSearchTo] = useState("");
  const [routes, setRoutes] = useState<TransportRoute[]>([]);
  const [stations, setStations] = useState<Station[]>([]);
  const [carpoolTrips, setCarpoolTrips] = useState<Carpool[]>([]);

  useEffect(() => {
    logisticsAPI.getRoutes().then((r) => setRoutes(r.data)).catch(console.error);
    logisticsAPI.getStations().then((r) => setStations(r.data)).catch(console.error);
    logisticsAPI.getCarpools().then((r) => setCarpoolTrips(r.data)).catch(console.error);
  }, []);


  return (
    <Layout>
      {/* Hero Section */}
      <section className="gradient-hero py-16 md:py-24">
        <div className="container px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-primary-foreground mb-4">
              اللوجستيات والتنقل
            </h1>
            <p className="text-lg md:text-xl text-primary-foreground/90 mb-8">
              ابحث عن خطوط المواصلات، المحطات، أو شارك رحلتك مع الآخرين
            </p>

            {/* Search Form */}
            <div className="bg-card rounded-2xl p-4 md:p-6 shadow-lg">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="relative">
                  <MapPin className="absolute right-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                  <Input
                    placeholder="من أين؟"
                    value={searchFrom}
                    onChange={(e) => setSearchFrom(e.target.value)}
                    className="pr-12 h-12"
                  />
                </div>
                <div className="relative">
                  <MapPin className="absolute right-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                  <Input
                    placeholder="إلى أين؟"
                    value={searchTo}
                    onChange={(e) => setSearchTo(e.target.value)}
                    className="pr-12 h-12"
                  />
                </div>
                <Button size="lg" className="h-12">
                  <Search className="h-5 w-5 ml-2" />
                  بحث
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Content Tabs */}
      <section className="py-12">
        <div className="container px-4">
          <Tabs defaultValue="routes" className="w-full">
            <TabsList className="grid w-full max-w-md mx-auto grid-cols-3 mb-8">
              <TabsTrigger value="routes">خطوط المواصلات</TabsTrigger>
              <TabsTrigger value="stations">المحطات</TabsTrigger>
              <TabsTrigger value="carpool">مشاركة الرحلات</TabsTrigger>
            </TabsList>

            {/* Routes Tab */}
            <TabsContent value="routes" className="space-y-4">
              {routes.map((route) => (
                <Card key={route.id} className="border-border/50 hover:border-primary/50 hover:shadow-md transition-all">
                  <CardContent className="p-4 md:p-6">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-3">
                          <Badge variant="secondary" className="gap-1">
                            <Bus className="h-3.5 w-3.5" />
                            {route.type}
                          </Badge>
                          <span className="text-sm text-muted-foreground">{route.operator}</span>
                        </div>
                        <div className="flex items-center gap-2 text-lg font-semibold text-foreground">
                          <span>{route.from}</span>
                          <ArrowLeft className="h-5 w-5 text-primary" />
                          <span>{route.to}</span>
                        </div>
                        <div className="flex items-center gap-4 mt-2 text-sm text-muted-foreground">
                          <div className="flex items-center gap-1">
                            <Clock className="h-4 w-4" />
                            {route.duration}
                          </div>
                          <div>المواعيد: {route.departures.join(" - ")}</div>
                        </div>
                      </div>
                      <div className="flex items-center justify-between md:flex-col md:items-end gap-2">
                        <div className="text-2xl font-bold text-primary">
                          {route.price} <span className="text-sm font-normal">جنيه</span>
                        </div>
                        <Button onClick={() => navigate(`/logistics/route/${route.id}`)}>احجز الآن</Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </TabsContent>

            {/* Stations Tab */}
            <TabsContent value="stations" className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {stations.map((station) => (
                  <Card key={station.id} className="border-border/50 hover:border-primary/50 hover:shadow-md transition-all">
                    <CardContent className="p-5">
                      <div className="flex items-start justify-between">
                        <div>
                          <h3 className="text-lg font-semibold text-foreground mb-1">{station.name}</h3>
                          <div className="flex items-center gap-1 text-muted-foreground">
                            <MapPin className="h-4 w-4" />
                            {station.city}
                          </div>
                        </div>
                        <Badge variant="outline">{station.routes} خطوط</Badge>
                      </div>
                      <Button variant="outline" className="w-full mt-4" onClick={() => navigate(`/logistics/station/${station.id}`)}>
                        عرض التفاصيل
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            {/* Carpool Tab */}
            <TabsContent value="carpool" className="space-y-4">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-semibold text-foreground">الرحلات المتاحة</h3>
                <Button onClick={() => navigate("/logistics/create-trip")}>
                  <Car className="h-4 w-4 ml-2" />
                  أضف رحلتك
                </Button>
              </div>
              {carpoolTrips.map((trip) => (
                <Card key={trip.id} className="border-border/50 hover:border-primary/50 hover:shadow-md transition-all">
                  <CardContent className="p-4 md:p-6">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 text-lg font-semibold text-foreground mb-2">
                          <span>{trip.from}</span>
                          <ArrowLeft className="h-5 w-5 text-primary" />
                          <span>{trip.to}</span>
                        </div>
                        <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                          <div>{trip.date}</div>
                          <div className="flex items-center gap-1">
                            <Clock className="h-4 w-4" />
                            {trip.time}
                          </div>
                          <div className="flex items-center gap-1">
                            <span className="text-primary font-medium">★ {trip.rating}</span>
                            <span>• {trip.driver}</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center justify-between md:flex-col md:items-end gap-2">
                        <div>
                          <div className="text-2xl font-bold text-primary">
                            {trip.price} <span className="text-sm font-normal">جنيه</span>
                          </div>
                          <div className="text-sm text-muted-foreground">{trip.seats} مقاعد متاحة</div>
                        </div>
                        <Button onClick={() => navigate(`/logistics/book/${trip.id}`)}>احجز مقعد</Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </TabsContent>
          </Tabs>
        </div>
      </section>
    </Layout>
  );
};

export default LogisticsPage;
