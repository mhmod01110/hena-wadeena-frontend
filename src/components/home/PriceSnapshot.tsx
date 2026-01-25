import { Link } from "react-router-dom";
import { ArrowLeft, TrendingUp, TrendingDown, Minus } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const priceData = [
  { name: "قمح", price: 1250, change: 2.5, unit: "طن" },
  { name: "تمر سيوي", price: 45, change: -1.2, unit: "كجم" },
  { name: "زيتون", price: 28, change: 0, unit: "كجم" },
  { name: "برسيم", price: 800, change: 3.1, unit: "طن" },
  { name: "أرز", price: 22, change: -0.5, unit: "كجم" },
  { name: "فول سوداني", price: 55, change: 1.8, unit: "كجم" },
];

export function PriceSnapshot() {
  return (
    <section className="py-20 bg-muted/30">
      <div className="container px-4">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-8">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-2">
              أسعار اليوم
            </h2>
            <p className="text-lg text-muted-foreground">
              آخر أسعار المنتجات الزراعية في الخارجة
            </p>
          </div>
          <Link to="/marketplace">
            <Button variant="outline" className="gap-2">
              البورصة الكاملة
              <ArrowLeft className="h-4 w-4" />
            </Button>
          </Link>
        </div>

        <Card className="border-border/50">
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-right py-4 px-6 text-sm font-medium text-muted-foreground">المنتج</th>
                    <th className="text-right py-4 px-6 text-sm font-medium text-muted-foreground">السعر</th>
                    <th className="text-right py-4 px-6 text-sm font-medium text-muted-foreground">التغير</th>
                  </tr>
                </thead>
                <tbody>
                  {priceData.map((item, index) => (
                    <tr key={item.name} className={index !== priceData.length - 1 ? "border-b border-border/50" : ""}>
                      <td className="py-4 px-6">
                        <span className="font-medium text-foreground">{item.name}</span>
                      </td>
                      <td className="py-4 px-6">
                        <span className="font-semibold text-foreground">{item.price}</span>
                        <span className="text-sm text-muted-foreground mr-1">جنيه/{item.unit}</span>
                      </td>
                      <td className="py-4 px-6">
                        <div className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-sm font-medium ${
                          item.change > 0
                            ? "bg-primary/10 text-primary"
                            : item.change < 0
                            ? "bg-destructive/10 text-destructive"
                            : "bg-muted text-muted-foreground"
                        }`}>
                          {item.change > 0 ? (
                            <TrendingUp className="h-3.5 w-3.5" />
                          ) : item.change < 0 ? (
                            <TrendingDown className="h-3.5 w-3.5" />
                          ) : (
                            <Minus className="h-3.5 w-3.5" />
                          )}
                          {Math.abs(item.change)}%
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
