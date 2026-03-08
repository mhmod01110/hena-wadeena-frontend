import { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import { User, Wallet, Bell, CalendarCheck, Search } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { notificationsAPI } from "@/services/api";

const quickLinks = [
  { icon: User, label: "الملف الشخصي", href: "/profile", gradient: "from-blue-500 to-blue-600", bg: "bg-blue-500/10" },
  { icon: Wallet, label: "المحفظة", href: "/wallet", gradient: "from-green-500 to-emerald-600", bg: "bg-green-500/10" },
  { icon: CalendarCheck, label: "حجوزاتي", href: "/bookings", gradient: "from-purple-500 to-violet-600", bg: "bg-purple-500/10" },
  { icon: Bell, label: "الإشعارات", href: "/notifications", gradient: "from-red-500 to-rose-600", bg: "bg-red-500/10" },
  { icon: Search, label: "بحث", href: "/search", gradient: "from-sky-500 to-cyan-600", bg: "bg-sky-500/10" },
];

export function QuickAccess() {
  const [user, setUser] = useState<any>(null);
  const [unreadCount, setUnreadCount] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const stored = localStorage.getItem("user");
    if (stored) {
      setUser(JSON.parse(stored));
      notificationsAPI.getUnreadCount().then((r) => setUnreadCount(r.data.count)).catch(() => { });
    }
  }, []);

  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) e.target.classList.add("visible"); }),
      { threshold: 0.15 }
    );
    if (sectionRef.current) io.observe(sectionRef.current);
    return () => io.disconnect();
  }, []);

  if (!user) return null;

  return (
    <section className="py-14 bg-gradient-to-b from-background to-muted/30">
      <div ref={sectionRef} className="reveal container px-4">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold">مرحباً، {user.full_name} 👋</h2>
          <p className="text-muted-foreground mt-2 text-lg">الوصول السريع لحسابك</p>
        </div>
        <div className="stagger grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-5 max-w-3xl mx-auto">
          {quickLinks.map((link) => {
            const Icon = link.icon;
            const isNotif = link.href === "/notifications";
            return (
              <Link key={link.href} to={link.href}>
                <Card className="hover-lift hover:border-primary/30 text-center rounded-2xl group">
                  <CardContent className="p-5 flex flex-col items-center gap-3 relative">
                    <div className={`h-16 w-16 rounded-2xl flex items-center justify-center bg-gradient-to-br ${link.gradient} shadow-lg group-hover:scale-110 group-hover:shadow-xl transition-all duration-300`}>
                      <Icon className="h-8 w-8 text-white" strokeWidth={1.8} />
                    </div>
                    {isNotif && unreadCount > 0 && (
                      <Badge className="absolute top-2 right-2 bg-red-500 text-white text-[10px] h-5 w-5 p-0 flex items-center justify-center animate-pulse">
                        {unreadCount}
                      </Badge>
                    )}
                    <span className="text-sm font-semibold text-foreground">{link.label}</span>
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
