import { useState, useEffect } from "react";
import { Layout } from "@/components/layout/Layout";
import { useNavigate } from "react-router-dom";
import { User, Mail, Phone, MapPin, Edit2, Camera, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { authAPI, type AuthUser } from "@/services/api";

const ProfilePage = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<AuthUser | null>(null);
  const [editing, setEditing] = useState(false);
  const [formData, setFormData] = useState({ full_name: "", phone: "", email: "" });

  useEffect(() => {
    const stored = localStorage.getItem("user");
    if (stored) {
      const u = JSON.parse(stored);
      setUser(u);
      setFormData({ full_name: u.full_name, phone: u.phone, email: u.email });
    } else {
      authAPI.getMe().then((u) => { setUser(u); setFormData({ full_name: u.full_name, phone: u.phone, email: u.email }); }).catch(() => navigate("/login"));
    }
  }, []);

  const roleLabels: Record<string, string> = {
    admin: "مدير", tourist: "سائح", investor: "مستثمر", farmer: "مزارع",
    guide: "مرشد سياحي", student: "طالب", driver: "سائق", citizen: "مواطن",
  };

  const handleSave = () => {
    if (user) {
      const updated = { ...user, ...formData };
      localStorage.setItem("user", JSON.stringify(updated));
      setUser(updated);
      setEditing(false);
      toast.success("تم تحديث الملف الشخصي بنجاح");
    }
  };

  if (!user) return <Layout><div className="container py-20 text-center">جاري التحميل...</div></Layout>;

  return (
    <Layout>
      <section className="py-12 md:py-20">
        <div className="container px-4 max-w-2xl">
          <Card className="border-border/50 overflow-hidden">
            {/* Profile Header */}
            <div className="bg-gradient-to-br from-primary/20 via-accent/10 to-background p-8 text-center relative">
              <div className="mx-auto h-24 w-24 rounded-full bg-primary/20 flex items-center justify-center mb-4 relative">
                {user.avatar_url ? (
                  <img src={user.avatar_url} alt="" className="h-24 w-24 rounded-full object-cover" />
                ) : (
                  <User className="h-12 w-12 text-primary" />
                )}
                <button className="absolute -bottom-1 -left-1 h-8 w-8 bg-primary rounded-full flex items-center justify-center text-white">
                  <Camera className="h-4 w-4" />
                </button>
              </div>
              <h2 className="text-2xl font-bold text-foreground">{user.full_name}</h2>
              <div className="flex items-center justify-center gap-2 mt-2">
                <Badge variant="secondary" className="text-sm">
                  <Shield className="h-3 w-3 ml-1" />
                  {roleLabels[user.role] || user.role}
                </Badge>
                <Badge variant={user.status === "active" ? "default" : "destructive"} className="text-sm">
                  {user.status === "active" ? "نشط" : "معلّق"}
                </Badge>
              </div>
            </div>

            <CardContent className="p-6 space-y-6">
              {editing ? (
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">الاسم الكامل</Label>
                    <Input id="name" value={formData.full_name} onChange={(e) => setFormData({ ...formData, full_name: e.target.value })} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">البريد الإلكتروني</Label>
                    <Input id="email" type="email" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">رقم الهاتف</Label>
                    <Input id="phone" value={formData.phone} onChange={(e) => setFormData({ ...formData, phone: e.target.value })} />
                  </div>
                  <div className="flex gap-2">
                    <Button onClick={handleSave}>حفظ التغييرات</Button>
                    <Button variant="outline" onClick={() => setEditing(false)}>إلغاء</Button>
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/30">
                    <Mail className="h-5 w-5 text-muted-foreground" />
                    <div><p className="text-sm text-muted-foreground">البريد الإلكتروني</p><p className="font-medium">{user.email}</p></div>
                  </div>
                  <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/30">
                    <Phone className="h-5 w-5 text-muted-foreground" />
                    <div><p className="text-sm text-muted-foreground">رقم الهاتف</p><p className="font-medium">{user.phone}</p></div>
                  </div>
                  <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/30">
                    <MapPin className="h-5 w-5 text-muted-foreground" />
                    <div><p className="text-sm text-muted-foreground">اللغة</p><p className="font-medium">{user.language === "ar" ? "العربية" : "English"}</p></div>
                  </div>
                  <Button onClick={() => setEditing(true)} className="w-full" variant="outline">
                    <Edit2 className="h-4 w-4 ml-2" />
                    تعديل الملف الشخصي
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </section>
    </Layout>
  );
};

export default ProfilePage;
