import { useState, useEffect } from "react";
import { Layout } from "@/components/layout/Layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { supabase } from "@/integrations/supabase/client";
import { Users, Shield, FileCheck, Activity } from "lucide-react";
import { toast } from "sonner";

export default function AdminDashboard() {
  const [stats, setStats] = useState({ totalUsers: 0, activeUsers: 0, pendingDocs: 0, totalRoles: 0 });
  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const [profilesRes, docsRes, rolesRes] = await Promise.all([
        supabase.from("profiles").select("*"),
        supabase.from("user_documents").select("*").eq("verified", false),
        supabase.from("user_roles").select("*"),
      ]);

      if (profilesRes.data) {
        setUsers(profilesRes.data);
        setStats({
          totalUsers: profilesRes.data.length,
          activeUsers: profilesRes.data.filter((u) => u.status === "active").length,
          pendingDocs: docsRes.data?.length || 0,
          totalRoles: rolesRes.data?.length || 0,
        });
      }
    } catch (error) {
      toast.error("Failed to load dashboard data");
    } finally {
      setLoading(false);
    }
  };

  const updateUserStatus = async (userId: string, status: "active" | "inactive" | "suspended" | "pending_verification") => {
    try {
      const { error } = await supabase
        .from("profiles")
        .update({ status })
        .eq("user_id", userId);

      if (error) throw error;
      toast.success("User status updated");
      fetchDashboardData();
    } catch (error) {
      toast.error("Failed to update user status");
    }
  };

  return (
    <Layout>
      <div className="container py-8 px-4">
        <div className="flex items-center gap-3 mb-8">
          <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center">
            <Shield className="h-6 w-6 text-primary" />
          </div>
          <div>
            <h1 className="text-3xl font-bold">لوحة تحكم الإدارة</h1>
            <p className="text-muted-foreground">إدارة شاملة للمنصة</p>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid gap-4 md:grid-cols-4 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">إجمالي المستخدمين</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalUsers}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">المستخدمون النشطون</CardTitle>
              <Activity className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.activeUsers}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">مستندات معلقة</CardTitle>
              <FileCheck className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.pendingDocs}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">إجمالي الأدوار</CardTitle>
              <Shield className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalRoles}</div>
            </CardContent>
          </Card>
        </div>

        {/* Users Table */}
        <Card>
          <CardHeader>
            <CardTitle>إدارة المستخدمين</CardTitle>
            <CardDescription>عرض وإدارة جميع المستخدمين في النظام</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>الاسم</TableHead>
                  <TableHead>المدينة</TableHead>
                  <TableHead>الحالة</TableHead>
                  <TableHead>تاريخ التسجيل</TableHead>
                  <TableHead>الإجراءات</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {users.map((user) => (
                  <TableRow key={user.id}>
                    <TableCell className="font-medium">{user.full_name}</TableCell>
                    <TableCell>{user.city || "-"}</TableCell>
                    <TableCell>
                      <Badge
                        variant={
                          user.status === "active"
                            ? "default"
                            : user.status === "pending_verification"
                            ? "secondary"
                            : "destructive"
                        }
                      >
                        {user.status}
                      </Badge>
                    </TableCell>
                    <TableCell>{new Date(user.created_at).toLocaleDateString("ar")}</TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        {user.status !== "active" && (
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => updateUserStatus(user.user_id, "active")}
                          >
                            تفعيل
                          </Button>
                        )}
                        {user.status === "active" && (
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => updateUserStatus(user.user_id, "suspended")}
                          >
                            إيقاف
                          </Button>
                        )}
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
}
