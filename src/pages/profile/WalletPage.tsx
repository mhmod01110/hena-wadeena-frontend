import { useState, useEffect } from "react";
import { Layout } from "@/components/layout/Layout";
import { Wallet, ArrowUpCircle, ArrowDownCircle, CreditCard, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { paymentsAPI, type Wallet as WalletType, type Transaction } from "@/services/api";

const WalletPage = () => {
  const [wallet, setWallet] = useState<WalletType | null>(null);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [topupAmount, setTopupAmount] = useState("");
  const [showTopup, setShowTopup] = useState(false);

  useEffect(() => {
    paymentsAPI.getWallet().then((r) => setWallet(r.data)).catch(console.error);
    paymentsAPI.getTransactions().then((r) => setTransactions(r.data)).catch(console.error);
  }, []);

  const handleTopup = async () => {
    const amount = parseFloat(topupAmount);
    if (!amount || amount <= 0) { toast.error("أدخل مبلغ صحيح"); return; }
    try {
      const res = await paymentsAPI.topup({ amount });
      toast.success(res.message);
      setWallet((w) => w ? { ...w, balance: res.data.new_balance } : w);
      setShowTopup(false);
      setTopupAmount("");
      paymentsAPI.getTransactions().then((r) => setTransactions(r.data));
    } catch (e: any) { toast.error(e.message); }
  };

  const txIcon = (direction: string) =>
    direction === "credit" ? <ArrowDownCircle className="h-5 w-5 text-green-500" /> : <ArrowUpCircle className="h-5 w-5 text-red-500" />;

  return (
    <Layout>
      <section className="py-12 md:py-20">
        <div className="container px-4 max-w-2xl space-y-6">
          {/* Balance Card */}
          <Card className="bg-gradient-to-br from-primary/10 to-accent/10 border-primary/20">
            <CardContent className="p-8 text-center">
              <Wallet className="h-12 w-12 mx-auto mb-4 text-primary" />
              <p className="text-sm text-muted-foreground mb-1">الرصيد الحالي</p>
              <p className="text-5xl font-bold text-foreground">{wallet?.balance?.toLocaleString() ?? "..."}</p>
              <p className="text-lg text-muted-foreground mt-1">جنيه مصري</p>
              <div className="flex gap-2 justify-center mt-6">
                <Button onClick={() => setShowTopup(!showTopup)} size="lg">
                  <Plus className="h-4 w-4 ml-2" />
                  شحن المحفظة
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Topup Form */}
          {showTopup && (
            <Card className="border-primary/30">
              <CardContent className="p-6 space-y-4">
                <h3 className="font-semibold text-lg">شحن المحفظة</h3>
                <div className="flex gap-2">
                  {[100, 250, 500, 1000].map((amt) => (
                    <Button key={amt} variant="outline" size="sm" onClick={() => setTopupAmount(String(amt))}>{amt}</Button>
                  ))}
                </div>
                <Input type="number" placeholder="مبلغ آخر..." value={topupAmount} onChange={(e) => setTopupAmount(e.target.value)} />
                <div className="flex gap-2">
                  <Button onClick={handleTopup} className="flex-1"><CreditCard className="h-4 w-4 ml-2" />شحن الآن</Button>
                  <Button variant="outline" onClick={() => setShowTopup(false)}>إلغاء</Button>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Transactions */}
          <Card>
            <CardHeader><CardTitle>سجل المعاملات</CardTitle></CardHeader>
            <CardContent className="space-y-3">
              {transactions.length === 0 && <p className="text-center text-muted-foreground py-8">لا توجد معاملات بعد</p>}
              {transactions.map((tx) => (
                <div key={tx.id} className="flex items-center justify-between p-3 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors">
                  <div className="flex items-center gap-3">
                    {txIcon(tx.direction)}
                    <div>
                      <p className="font-medium text-sm">{tx.description}</p>
                      <p className="text-xs text-muted-foreground">{new Date(tx.created_at).toLocaleDateString("ar-EG")}</p>
                    </div>
                  </div>
                  <div className="text-left">
                    <p className={`font-bold ${tx.direction === "credit" ? "text-green-600" : "text-red-500"}`}>
                      {tx.direction === "credit" ? "+" : "-"}{tx.amount.toLocaleString()} جنيه
                    </p>
                    <Badge variant="outline" className="text-xs">{tx.status === "completed" ? "مكتمل" : "معلق"}</Badge>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </section>
    </Layout>
  );
};

export default WalletPage;
