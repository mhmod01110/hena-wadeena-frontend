import { useState, useEffect } from "react";
import { Layout } from "@/components/layout/Layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { supabase } from "@/integrations/supabase/client";
import { FileCheck, CheckCircle, XCircle, Clock } from "lucide-react";
import { toast } from "sonner";

export default function ReviewerDashboard() {
  const [documents, setDocuments] = useState<any[]>([]);
  const [stats, setStats] = useState({ pending: 0, verified: 0, total: 0 });
  const [loading, setLoading] = useState(true);
  const [selectedDoc, setSelectedDoc] = useState<any>(null);
  const [notes, setNotes] = useState("");

  useEffect(() => {
    fetchDocuments();
  }, []);

  const fetchDocuments = async () => {
    try {
      const { data } = await supabase
        .from("user_documents")
        .select("*")
        .order("created_at", { ascending: false });

      if (data) {
        setDocuments(data);
        setStats({
          pending: data.filter((d) => !d.verified).length,
          verified: data.filter((d) => d.verified).length,
          total: data.length,
        });
      }
    } catch (error) {
      toast.error("Failed to load documents");
    } finally {
      setLoading(false);
    }
  };

  const updateDocumentStatus = async (docId: string, verified: boolean) => {
    try {
      const { error } = await supabase
        .from("user_documents")
        .update({ verified, verification_notes: notes })
        .eq("id", docId);

      if (error) throw error;
      toast.success(verified ? "تم قبول المستند" : "تم رفض المستند");
      setSelectedDoc(null);
      setNotes("");
      fetchDocuments();
    } catch (error) {
      toast.error("Failed to update document");
    }
  };

  return (
    <Layout>
      <div className="container py-8 px-4">
        <div className="flex items-center gap-3 mb-8">
          <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center">
            <FileCheck className="h-6 w-6 text-primary" />
          </div>
          <div>
            <h1 className="text-3xl font-bold">لوحة تحكم المراجع</h1>
            <p className="text-muted-foreground">مراجعة والموافقة على المستندات</p>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid gap-4 md:grid-cols-3 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">قيد الانتظار</CardTitle>
              <Clock className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.pending}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">تم التحقق</CardTitle>
              <CheckCircle className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.verified}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">إجمالي المستندات</CardTitle>
              <FileCheck className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.total}</div>
            </CardContent>
          </Card>
        </div>

        {/* Documents Table */}
        <Card>
          <CardHeader>
            <CardTitle>المستندات المطلوب مراجعتها</CardTitle>
            <CardDescription>قم بمراجعة والموافقة على مستندات المستخدمين</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>اسم الملف</TableHead>
                  <TableHead>نوع المستند</TableHead>
                  <TableHead>الحالة</TableHead>
                  <TableHead>تاريخ الرفع</TableHead>
                  <TableHead>الإجراءات</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {documents.map((doc) => (
                  <TableRow key={doc.id}>
                    <TableCell className="font-medium">{doc.file_name}</TableCell>
                    <TableCell>{doc.document_type}</TableCell>
                    <TableCell>
                      <Badge variant={doc.verified ? "default" : "secondary"}>
                        {doc.verified ? "موثق" : "قيد المراجعة"}
                      </Badge>
                    </TableCell>
                    <TableCell>{new Date(doc.created_at).toLocaleDateString("ar")}</TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => {
                            setSelectedDoc(doc);
                            setNotes(doc.verification_notes || "");
                          }}
                        >
                          مراجعة
                        </Button>
                        <a href={doc.file_url} target="_blank" rel="noopener noreferrer">
                          <Button size="sm" variant="ghost">
                            عرض
                          </Button>
                        </a>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* Review Modal */}
        {selectedDoc && (
          <Card className="mt-8">
            <CardHeader>
              <CardTitle>مراجعة المستند: {selectedDoc.file_name}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium">ملاحظات التحقق</label>
                  <Textarea
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    placeholder="أضف ملاحظاتك هنا..."
                    className="mt-2"
                  />
                </div>
                <div className="flex gap-2">
                  <Button onClick={() => updateDocumentStatus(selectedDoc.id, true)} className="gap-2">
                    <CheckCircle className="h-4 w-4" />
                    قبول
                  </Button>
                  <Button
                    onClick={() => updateDocumentStatus(selectedDoc.id, false)}
                    variant="destructive"
                    className="gap-2"
                  >
                    <XCircle className="h-4 w-4" />
                    رفض
                  </Button>
                  <Button onClick={() => setSelectedDoc(null)} variant="outline">
                    إلغاء
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </Layout>
  );
}
