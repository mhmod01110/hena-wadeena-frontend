import { Link } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { HeroSection } from "@/components/home/HeroSection";
import { QuickAccess } from "@/components/home/QuickAccess";
import { MissionCards } from "@/components/home/MissionCards";
import { FeaturedSection } from "@/components/home/FeaturedSection";
import { PriceSnapshot } from "@/components/home/PriceSnapshot";
import { Button } from "@/components/ui/button";
import { Shield, Users, FileCheck } from "lucide-react";

const Index = () => {
  return (
    <Layout>
      <HeroSection />
      <QuickAccess />
      
      {/* Admin Dashboards Access */}
      <div className="container py-12 px-4">
        <h2 className="text-2xl font-bold mb-6 text-center">لوحات التحكم الإدارية</h2>
        <div className="grid gap-4 md:grid-cols-3 max-w-4xl mx-auto">
          <Link to="/admin">
            <Button variant="outline" className="w-full h-24 flex-col gap-2">
              <Shield className="h-8 w-8 text-primary" />
              <span className="font-semibold">لوحة الإدارة</span>
              <span className="text-xs text-muted-foreground">صلاحيات كاملة</span>
            </Button>
          </Link>
          <Link to="/moderator">
            <Button variant="outline" className="w-full h-24 flex-col gap-2">
              <Users className="h-8 w-8 text-primary" />
              <span className="font-semibold">لوحة المنسق</span>
              <span className="text-xs text-muted-foreground">تنسيق بين الأدوار</span>
            </Button>
          </Link>
          <Link to="/reviewer">
            <Button variant="outline" className="w-full h-24 flex-col gap-2">
              <FileCheck className="h-8 w-8 text-primary" />
              <span className="font-semibold">لوحة المراجع</span>
              <span className="text-xs text-muted-foreground">مراجعة المستندات</span>
            </Button>
          </Link>
        </div>
      </div>

      <MissionCards />
      <FeaturedSection />
      <PriceSnapshot />
    </Layout>
  );
};

export default Index;

