import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { User, Wallet, Bell, CalendarCheck, Search, Settings } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { notificationsAPI } from "@/services/api";

const quickLinks = [
  { icon: User, label: "الملف الشخصي", href: "/profile", color: "text-blue-500 bg-blue-500/10" },
  { icon: Wallet, label: "المحفظة", href: "/wallet", color: "text-green-500 bg-green-500/10" },
  { icon: CalendarCheck, label: "حجوزاتي", href: "/bookings", color: "text-purple-500 bg-purple-500/10" },
  { icon: Bell, label: "الإشعارات", href: "/notifications", color: "text-red-500 bg-red-500/10" },
  { icon: Search, label: "بحث", href: "/search", color: "text-sky-500 bg-sky-500/10" },
];

export function QuickAccess() {
  const [user, setUser] = useState<any>(null);
  const [unreadCount, setUnreadCount] = useState(0);

  useEffect(() => {
    const stored = localStorage.getItem("user");
    if (stored) {
      setUser(JSON.parse(stored));
      notificationsAPI.getUnreadCount().then((r) => setUnreadCount(r.data.count)).catch(() => { });
    }
  }, []);

  if (!user) return null;

  return (
    <section className="py-12 bg-gradient-to-b from-background to-muted/30">
      <div className="container px-4">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold">مرحباً، {user.full_name} 👋</h2>
          <p className="text-muted-foreground mt-1">الوصول السريع لحسابك</p>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4 max-w-3xl mx-auto">
          {quickLinks.map((link) => {
            const Icon = link.icon;
            const isNotif = link.href === "/notifications";
            return (
              <Link key={link.href} to={link.href}>
                <Card className="hover:shadow-md hover:border-primary/30 transition-all group text-center">
                  <CardContent className="p-4 flex flex-col items-center gap-2 relative">
                    <div className={`h-12 w-12 rounded-xl flex items-center justify-center ${link.color} transition-transform group-hover:scale-110`}>
                      <Icon className="h-6 w-6" />
                    </div>
                    {isNotif && unreadCount > 0 && (
                      <Badge className="absolute top-2 right-2 bg-red-500 text-white text-[10px] h-5 w-5 p-0 flex items-center justify-center">
                        {unreadCount}
                      </Badge>
                    )}
                    <span className="text-sm font-medium text-foreground">{link.label}</span>
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
