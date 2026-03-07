import { useState, useEffect } from "react";
import { Layout } from "@/components/layout/Layout";
import { Calendar, Clock, Users, MapPin } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { guidesAPI, type Booking } from "@/services/api";

const statusColors: Record<string, string> = {
  pending: "bg-yellow-500/10 text-yellow-600",
  confirmed: "bg-green-500/10 text-green-600",
  completed: "bg-blue-500/10 text-blue-600",
  cancelled: "bg-red-500/10 text-red-600",
};

const statusLabels: Record<string, string> = {
  pending: "في الانتظار", confirmed: "مؤكد", completed: "مكتمل",
  cancelled: "ملغى", in_progress: "جاري",
};

const BookingsPage = () => {
  const [bookings, setBookings] = useState<Booking[]>([]);

  useEffect(() => {
    guidesAPI.getMyBookings().then((r) => setBookings(r.data)).catch(console.error);
  }, []);

  return (
    <Layout>
      <section className="py-12 md:py-20">
        <div className="container px-4 max-w-3xl">
          <h1 className="text-3xl font-bold mb-8">حجوزاتي</h1>
          {bookings.length === 0 && (
            <Card><CardContent className="p-12 text-center text-muted-foreground">لا توجد حجوزات حتى الآن. ابدأ باستكشاف المرشدين السياحيين!</CardContent></Card>
          )}
          <div className="space-y-4">
            {bookings.map((b) => (
              <Card key={b.id} className="hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="text-lg font-semibold">{b.package_title}</h3>
                      <p className="text-sm text-muted-foreground">مع {b.guide_name}</p>
                    </div>
                    <Badge className={statusColors[b.status] || ""}>{statusLabels[b.status] || b.status}</Badge>
                  </div>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-sm">
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Calendar className="h-4 w-4" />
                      {b.booking_date}
                    </div>
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Clock className="h-4 w-4" />
                      {b.start_time}
                    </div>
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Users className="h-4 w-4" />
                      {b.people_count} أشخاص
                    </div>
                    <div className="font-bold text-primary text-left">
                      {b.total_price.toLocaleString()} جنيه
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

export default BookingsPage;
