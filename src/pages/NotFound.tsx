import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Link, useLocation } from "react-router-dom";
import { Home } from "lucide-react";
import { useEffect } from "react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <Layout>
      <div className="min-h-[60vh] flex items-center justify-center px-4">
        <div className="text-center">
          <h1 className="text-8xl font-bold text-primary mb-4">404</h1>
          <h2 className="text-2xl md:text-3xl font-semibold text-foreground mb-4">
            الصفحة غير موجودة
          </h2>
          <p className="text-muted-foreground mb-8 max-w-md mx-auto">
            عذراً، لم نتمكن من العثور على الصفحة التي تبحث عنها. ربما تم نقلها أو حذفها.
          </p>
          <Link to="/">
            <Button size="lg">
              <Home className="h-5 w-5 ml-2" />
              العودة للرئيسية
            </Button>
          </Link>
        </div>
      </div>
    </Layout>
  );
};

export default NotFound;
