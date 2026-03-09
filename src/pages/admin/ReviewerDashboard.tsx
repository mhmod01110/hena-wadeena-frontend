import { useMemo, useState, useEffect } from "react";
import { Layout } from "@/components/layout/Layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { supabase } from "@/integrations/supabase/client";
import { FileCheck, CheckCircle, XCircle, Clock, Plus, Trash2 } from "lucide-react";
import { toast } from "sonner";

type ReviewTemplate = { id: string; name: string; content: string };

export default function ReviewerDashboard() {
  const [documents, setDocuments] = useState<any[]>([]);
  const [stats, setStats] = useState({ pending: 0, verified: 0, total: 0 });
  const [loading, setLoading] = useState(true);
  const [selectedDoc, setSelectedDoc] = useState<any>(null);
  const [notes, setNotes] = useState("");
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const [templates, setTemplates] = useState<ReviewTemplate[]>([
    { id: "tpl-1", name: "قبول كامل", content: "المستند واضح ومطابق لشروط التسجيل." },
    { id: "tpl-2", name: "نقص بيانات", content: "المستند غير مكتمل، يرجى إعادة الرفع بجودة أعلى." },
  ]);
  const [templateName, setTemplateName] = useState("");
  const [templateContent, setTemplateContent] = useState("");

  useEffect(() => {
    fetchDocuments();
  }, []);

  const fetchDocuments = async () => {
    try {
      const { data } = await supabase.from("user_documents").select("*").order("created_at", { ascending: false });
      if (data) {
        setDocuments(data);
        setStats({
          pending: data.filter((d) => !d.verified).length,
          verified: data.filter((d) => d.verified).length,
          total: data.length,
        });
      }
    } catch {
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
    } catch {
      toast.error("Failed to update document");
    }
  };

  const filteredDocs = useMemo(() => {
    return documents.filter((doc) => {
      const statusOk =
        statusFilter === "all" ||
        (statusFilter === "verified" && doc.verified) ||
        (statusFilter === "pending" && !doc.verified);
      const searchOk =
        doc.file_name.toLowerCase().includes(search.toLowerCase()) ||
        doc.document_type.toLowerCase().includes(search.toLowerCase());
      return statusOk && searchOk;
    });
  }, [documents, statusFilter, search]);

  const addTemplate = () => {
    if (!templateName.trim() || !templateContent.trim()) return;
    setTemplates((prev) => [
      { id: `tpl-${Date.now()}`, name: templateName.trim(), content: templateContent.trim() },
      ...prev,
    ]);
    setTemplateName("");
    setTemplateContent("");
  };

  const removeTemplate = (id: string) => setTemplates((prev) => prev.filter((t) => t.id !== id));

  return (
    <Layout>
      <div className="container py-8 px-4 space-y-8">
        <div className="flex items-center gap-3">
          <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center">
            <FileCheck className="h-6 w-6 text-primary" />
          </div>
          <div>
            <h1 className="text-3xl font-bold">لوحة تحكم المراجع</h1>
            <p className="text-muted-foreground">مراجعة المستندات + CRUD تجريبي لقوالب المراجعة</p>
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          <Card><CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2"><CardTitle className="text-sm font-medium">قيد الانتظار</CardTitle><Clock className="h-4 w-4 text-muted-foreground" /></CardHeader><CardContent><div className="text-2xl font-bold">{stats.pending}</div></CardContent></Card>
          <Card><CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2"><CardTitle className="text-sm font-medium">تم التحقق</CardTitle><CheckCircle className="h-4 w-4 text-muted-foreground" /></CardHeader><CardContent><div className="text-2xl font-bold">{stats.verified}</div></CardContent></Card>
          <Card><CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2"><CardTitle className="text-sm font-medium">إجمالي المستندات</CardTitle><FileCheck className="h-4 w-4 text-muted-foreground" /></CardHeader><CardContent><div className="text-2xl font-bold">{stats.total}</div></CardContent></Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>المستندات المطلوب مراجعتها</CardTitle>
            <CardDescription>فلترة وبحث ومراجعة المستندات</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-3 md:grid-cols-3">
              <Input placeholder="بحث بالاسم أو النوع" value={search} onChange={(e) => setSearch(e.target.value)} />
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">الكل</SelectItem>
                  <SelectItem value="pending">قيد المراجعة</SelectItem>
                  <SelectItem value="verified">موثق</SelectItem>
                </SelectContent>
              </Select>
              <div className="text-sm text-muted-foreground flex items-center">{loading ? "جاري التحميل..." : `النتائج: ${filteredDocs.length}`}</div>
            </div>

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
                {filteredDocs.map((doc) => (
                  <TableRow key={doc.id}>
                    <TableCell className="font-medium">{doc.file_name}</TableCell>
                    <TableCell>{doc.document_type}</TableCell>
                    <TableCell><Badge variant={doc.verified ? "default" : "secondary"}>{doc.verified ? "موثق" : "قيد المراجعة"}</Badge></TableCell>
                    <TableCell>{new Date(doc.created_at).toLocaleDateString("ar")}</TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline" onClick={() => { setSelectedDoc(doc); setNotes(doc.verification_notes || ""); }}>مراجعة</Button>
                        <a href={doc.file_url} target="_blank" rel="noopener noreferrer"><Button size="sm" variant="ghost">عرض</Button></a>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {selectedDoc && (
          <Card>
            <CardHeader><CardTitle>مراجعة المستند: {selectedDoc.file_name}</CardTitle></CardHeader>
            <CardContent className="space-y-4">
              <Textarea value={notes} onChange={(e) => setNotes(e.target.value)} placeholder="أضف ملاحظاتك هنا..." />
              <div className="flex flex-wrap gap-2">
                {templates.map((tpl) => (
                  <Button key={tpl.id} variant="outline" size="sm" onClick={() => setNotes(tpl.content)}>{tpl.name}</Button>
                ))}
              </div>
              <div className="flex gap-2">
                <Button onClick={() => updateDocumentStatus(selectedDoc.id, true)} className="gap-2"><CheckCircle className="h-4 w-4" />قبول</Button>
                <Button onClick={() => updateDocumentStatus(selectedDoc.id, false)} variant="destructive" className="gap-2"><XCircle className="h-4 w-4" />رفض</Button>
                <Button onClick={() => setSelectedDoc(null)} variant="outline">إلغاء</Button>
              </div>
            </CardContent>
          </Card>
        )}

        <Card>
          <CardHeader>
            <CardTitle>قوالب ملاحظات المراجعة (CRUD تجريبي)</CardTitle>
            <CardDescription>إضافة وحذف قوالب لتسريع المراجعة</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-3 md:grid-cols-3">
              <Input placeholder="اسم القالب" value={templateName} onChange={(e) => setTemplateName(e.target.value)} />
              <Input placeholder="محتوى القالب" value={templateContent} onChange={(e) => setTemplateContent(e.target.value)} />
              <Button onClick={addTemplate} className="gap-2"><Plus className="h-4 w-4" />إضافة قالب</Button>
            </div>
            <div className="space-y-2">
              {templates.map((tpl) => (
                <div key={tpl.id} className="flex items-center justify-between rounded-md border border-border p-3">
                  <div>
                    <p className="font-medium">{tpl.name}</p>
                    <p className="text-sm text-muted-foreground">{tpl.content}</p>
                  </div>
                  <Button size="sm" variant="destructive" onClick={() => removeTemplate(tpl.id)}><Trash2 className="h-4 w-4" /></Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
}
