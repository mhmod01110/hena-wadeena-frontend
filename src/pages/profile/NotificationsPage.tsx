import { useState, useEffect } from "react";
import { Layout } from "@/components/layout/Layout";
import { Bell, Check, CheckCheck } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { notificationsAPI, type Notification } from "@/services/api";

const typeIcons: Record<string, string> = {
  booking_confirmed: "✅", payment_received: "💰", new_review: "⭐",
  kyc_approved: "🛡️", system: "🔔", carpool_match: "🚗",
};

const NotificationsPage = () => {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [unreadCount, setUnreadCount] = useState(0);

  useEffect(() => {
    notificationsAPI.getAll().then((r) => setNotifications(r.data)).catch(console.error);
    notificationsAPI.getUnreadCount().then((r) => setUnreadCount(r.data.count)).catch(console.error);
  }, []);

  const markAsRead = async (id: string) => {
    await notificationsAPI.markRead(id);
    setNotifications((prev) => prev.map((n) => n.id === id ? { ...n, read_at: new Date().toISOString() } : n));
    setUnreadCount((c) => Math.max(0, c - 1));
  };

  const markAllRead = async () => {
    const unread = notifications.filter((n) => !n.read_at);
    for (const n of unread) await notificationsAPI.markRead(n.id);
    setNotifications((prev) => prev.map((n) => ({ ...n, read_at: n.read_at || new Date().toISOString() })));
    setUnreadCount(0);
  };

  return (
    <Layout>
      <section className="py-12 md:py-20">
        <div className="container px-4 max-w-2xl">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-3">
              <h1 className="text-3xl font-bold">الإشعارات</h1>
              {unreadCount > 0 && (
                <Badge className="bg-red-500 text-white">{unreadCount}</Badge>
              )}
            </div>
            {unreadCount > 0 && (
              <Button variant="ghost" size="sm" onClick={markAllRead}>
                <CheckCheck className="h-4 w-4 ml-1" />
                قراءة الكل
              </Button>
            )}
          </div>

          <div className="space-y-3">
            {notifications.length === 0 && (
              <Card><CardContent className="p-12 text-center text-muted-foreground">لا توجد إشعارات</CardContent></Card>
            )}
            {notifications.map((n) => (
              <Card
                key={n.id}
                className={`transition-all cursor-pointer hover:shadow-md ${!n.read_at ? "border-primary/30 bg-primary/5" : "border-border/50"}`}
                onClick={() => !n.read_at && markAsRead(n.id)}
              >
                <CardContent className="p-4 flex items-start gap-4">
                  <span className="text-2xl mt-1">{typeIcons[n.type] || "🔔"}</span>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <h3 className={`font-semibold text-sm ${!n.read_at ? "text-foreground" : "text-muted-foreground"}`}>
                        {n.title_ar}
                      </h3>
                      {!n.read_at && <div className="h-2 w-2 rounded-full bg-primary mt-2 flex-shrink-0" />}
                    </div>
                    <p className="text-sm text-muted-foreground mt-1">{n.body_ar}</p>
                    <p className="text-xs text-muted-foreground mt-2">
                      {new Date(n.created_at).toLocaleDateString("ar-EG", { year: "numeric", month: "long", day: "numeric", hour: "2-digit", minute: "2-digit" })}
                    </p>
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

export default NotificationsPage;
