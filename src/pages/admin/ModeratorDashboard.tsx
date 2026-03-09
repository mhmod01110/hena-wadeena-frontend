import { useState, useEffect } from "react";
import { Layout } from "@/components/layout/Layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { supabase } from "@/integrations/supabase/client";
import { Users, MessageSquare, Calendar, TrendingUp } from "lucide-react";
import { toast } from "sonner";

export default function ModeratorDashboard() {
  const [roleStats, setRoleStats] = useState<Record<string, number>>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchModeratorData();
  }, []);

  const fetchModeratorData = async () => {
    try {
      const { data: roles } = await supabase.from("user_roles").select("role");

      if (roles) {
        const stats = roles.reduce((acc: Record<string, number>, r) => {
          acc[r.role] = (acc[r.role] || 0) + 1;
          return acc;
        }, {});
        setRoleStats(stats);
      }
    } catch (error) {
      toast.error("Failed to load moderator data");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout>
      <div className="container py-8 px-4">
        <div className="flex items-center gap-3 mb-8">
          <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center">
            <Users className="h-6 w-6 text-primary" />
          </div>
          <div>
            <h1 className="text-3xl font-bold">لوحة تحكم المنسق</h1>
            <p className="text-muted-foreground">التنسيق بين الأدوار المختلفة</p>
          </div>
        </div>

        {/* Role Distribution */}
        <div className="grid gap-4 md:grid-cols-4 mb-8">
          {Object.entries(roleStats).map(([role, count]) => (
            <Card key={role}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">{role}</CardTitle>
                <TrendingUp className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{count}</div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Coordination Tabs */}
        <Tabs defaultValue="tourists" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="tourists">السياح</TabsTrigger>
            <TabsTrigger value="merchants">التجار</TabsTrigger>
            <TabsTrigger value="investors">المستثمرون</TabsTrigger>
          </TabsList>
          <TabsContent value="tourists">
            <Card>
              <CardHeader>
                <CardTitle>تنسيق السياح</CardTitle>
                <CardDescription>إدارة وتنسيق أنشطة السياح</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center gap-4 p-4 rounded-lg border border-border">
                    <Calendar className="h-8 w-8 text-primary" />
                    <div>
                      <h3 className="font-semibold">الجولات المجدولة</h3>
                      <p className="text-sm text-muted-foreground">عرض وإدارة الجولات السياحية القادمة</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 p-4 rounded-lg border border-border">
                    <MessageSquare className="h-8 w-8 text-primary" />
                    <div>
                      <h3 className="font-semibold">التواصل مع المرشدين</h3>
                      <p className="text-sm text-muted-foreground">تنسيق التواصل بين السياح والمرشدين</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="merchants">
            <Card>
              <CardHeader>
                <CardTitle>تنسيق التجار</CardTitle>
                <CardDescription>إدارة وتنسيق أنشطة التجار</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center gap-4 p-4 rounded-lg border border-border">
                    <TrendingUp className="h-8 w-8 text-primary" />
                    <div>
                      <h3 className="font-semibold">تتبع المبيعات</h3>
                      <p className="text-sm text-muted-foreground">مراقبة أداء البائعين</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="investors">
            <Card>
              <CardHeader>
                <CardTitle>تنسيق المستثمرين</CardTitle>
                <CardDescription>إدارة وتنسيق الفرص الاستثمارية</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center gap-4 p-4 rounded-lg border border-border">
                    <Users className="h-8 w-8 text-primary" />
                    <div>
                      <h3 className="font-semibold">مطابقة المستثمرين</h3>
                      <p className="text-sm text-muted-foreground">ربط المستثمرين بالفرص المناسبة</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
}
