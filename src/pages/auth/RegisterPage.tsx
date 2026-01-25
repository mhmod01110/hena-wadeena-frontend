import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { 
  Mail, Lock, User, Phone, MapPin, Loader2, 
  Briefcase, Car, GraduationCap, Users, Plane, Building2, Shield
} from "lucide-react";
import { DocumentUpload } from "@/components/auth/DocumentUpload";

type UserRole = "investor" | "merchant" | "tourist" | "student" | "resident" | "driver";

interface RoleOption {
  value: UserRole;
  label: string;
  icon: React.ElementType;
  description: string;
  requiredDocuments: { type: string; label: string }[];
}

const roleOptions: RoleOption[] = [
  {
    value: "investor",
    label: "مستثمر",
    icon: Building2,
    description: "للباحثين عن فرص استثمارية",
    requiredDocuments: [
      { type: "national_id", label: "بطاقة الهوية" },
      { type: "commercial_register", label: "السجل التجاري" },
      { type: "bank_certificate", label: "شهادة بنكية" },
    ],
  },
  {
    value: "merchant",
    label: "تاجر/مورد",
    icon: Briefcase,
    description: "للتجار والموردين المحليين",
    requiredDocuments: [
      { type: "national_id", label: "بطاقة الهوية" },
      { type: "commercial_register", label: "السجل التجاري" },
      { type: "tax_card", label: "البطاقة الضريبية" },
      { type: "business_license", label: "رخصة مزاولة النشاط" },
    ],
  },
  {
    value: "driver",
    label: "سائق",
    icon: Car,
    description: "لسائقي النقل والتوصيل",
    requiredDocuments: [
      { type: "national_id", label: "بطاقة الهوية" },
      { type: "driving_license", label: "رخصة القيادة" },
      { type: "vehicle_license", label: "رخصة السيارة" },
      { type: "vehicle_insurance", label: "تأمين السيارة" },
    ],
  },
  {
    value: "student",
    label: "طالب",
    icon: GraduationCap,
    description: "للطلاب والوافدين للدراسة",
    requiredDocuments: [
      { type: "national_id", label: "بطاقة الهوية" },
      { type: "university_card", label: "البطاقة الجامعية" },
    ],
  },
  {
    value: "resident",
    label: "مقيم",
    icon: Users,
    description: "لسكان الوادي الجديد",
    requiredDocuments: [
      { type: "national_id", label: "بطاقة الهوية" },
    ],
  },
  {
    value: "tourist",
    label: "سائح",
    icon: Plane,
    description: "للزوار والسياح",
    requiredDocuments: [
      { type: "national_id", label: "بطاقة الهوية أو جواز السفر" },
    ],
  },
];

const RegisterPage = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [step, setStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedRole, setSelectedRole] = useState<UserRole | null>(null);
  const [uploadedDocuments, setUploadedDocuments] = useState<Record<string, File>>({});
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    fullName: "",
    phone: "",
    city: "",
  });

  const selectedRoleOption = roleOptions.find(r => r.value === selectedRole);

  const handleRoleSelect = (role: UserRole) => {
    setSelectedRole(role);
    setUploadedDocuments({});
  };

  const handleNextStep = () => {
    if (step === 1 && !selectedRole) {
      toast({
        title: "اختر نوع الحساب",
        description: "يرجى اختيار نوع الحساب المناسب لك",
        variant: "destructive",
      });
      return;
    }

    if (step === 2) {
      if (!formData.fullName || !formData.email || !formData.password) {
        toast({
          title: "بيانات ناقصة",
          description: "يرجى ملء جميع الحقول المطلوبة",
          variant: "destructive",
        });
        return;
      }
      if (formData.password !== formData.confirmPassword) {
        toast({
          title: "كلمة المرور غير متطابقة",
          description: "يرجى التأكد من تطابق كلمة المرور",
          variant: "destructive",
        });
        return;
      }
      if (formData.password.length < 6) {
        toast({
          title: "كلمة المرور قصيرة",
          description: "يجب أن تكون كلمة المرور 6 أحرف على الأقل",
          variant: "destructive",
        });
        return;
      }
    }

    setStep(step + 1);
  };

  const handleDocumentUpload = (docType: string, file: File) => {
    setUploadedDocuments(prev => ({ ...prev, [docType]: file }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!selectedRoleOption) return;

    // Check if all required documents are uploaded
    const missingDocs = selectedRoleOption.requiredDocuments.filter(
      doc => !uploadedDocuments[doc.type]
    );

    if (missingDocs.length > 0) {
      toast({
        title: "مستندات ناقصة",
        description: `يرجى رفع: ${missingDocs.map(d => d.label).join("، ")}`,
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);

    try {
      // 1. Sign up the user
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email: formData.email,
        password: formData.password,
        options: {
          emailRedirectTo: window.location.origin,
        },
      });

      if (authError) throw authError;
      if (!authData.user) throw new Error("فشل إنشاء الحساب");

      const userId = authData.user.id;

      // 2. Create profile
      const { error: profileError } = await supabase
        .from("profiles")
        .insert({
          user_id: userId,
          full_name: formData.fullName,
          phone: formData.phone || null,
          city: formData.city || null,
          status: "pending_verification",
        });

      if (profileError) throw profileError;

      // 3. Create user role
      const { error: roleError } = await supabase
        .from("user_roles")
        .insert({
          user_id: userId,
          role: selectedRole,
        });

      if (roleError) throw roleError;

      // 4. Upload documents
      for (const [docType, file] of Object.entries(uploadedDocuments)) {
        const fileExt = file.name.split('.').pop();
        const filePath = `${userId}/${docType}-${Date.now()}.${fileExt}`;

        const { error: uploadError } = await supabase.storage
          .from("user-documents")
          .upload(filePath, file);

        if (uploadError) throw uploadError;

        const { data: urlData } = supabase.storage
          .from("user-documents")
          .getPublicUrl(filePath);

        const { error: docError } = await supabase
          .from("user_documents")
          .insert({
            user_id: userId,
            document_type: docType as any,
            file_url: urlData.publicUrl,
            file_name: file.name,
            verified: false,
          });

        if (docError) throw docError;
      }

      toast({
        title: "تم إنشاء الحساب بنجاح",
        description: "مرحباً بك في هنا وادينا! حسابك قيد المراجعة.",
      });
      navigate("/");
    } catch (error: any) {
      console.error("Registration error:", error);
      toast({
        title: "حدث خطأ",
        description: error.message || "يرجى المحاولة مرة أخرى",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Layout>
      <section className="py-8 md:py-16">
        <div className="container px-4">
          <div className="max-w-2xl mx-auto">
            {/* Progress Steps */}
            <div className="flex items-center justify-center mb-8">
              {[1, 2, 3].map((s) => (
                <div key={s} className="flex items-center">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center font-medium ${
                      step >= s
                        ? "bg-primary text-primary-foreground"
                        : "bg-muted text-muted-foreground"
                    }`}
                  >
                    {s}
                  </div>
                  {s < 3 && (
                    <div
                      className={`w-16 h-1 mx-2 ${
                        step > s ? "bg-primary" : "bg-muted"
                      }`}
                    />
                  )}
                </div>
              ))}
            </div>

            <Card className="border-border/50">
              <CardHeader className="text-center">
                <CardTitle className="text-2xl">
                  {step === 1 && "اختر نوع الحساب"}
                  {step === 2 && "البيانات الأساسية"}
                  {step === 3 && "المستندات المطلوبة"}
                </CardTitle>
                <CardDescription>
                  {step === 1 && "حدد الدور الذي يناسب احتياجاتك"}
                  {step === 2 && "أدخل معلوماتك الشخصية"}
                  {step === 3 && `رفع المستندات المطلوبة لـ${selectedRoleOption?.label}`}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit}>
                  {/* Step 1: Role Selection */}
                  {step === 1 && (
                    <div className="space-y-4">
                      <RadioGroup
                        value={selectedRole || ""}
                        onValueChange={(value) => handleRoleSelect(value as UserRole)}
                        className="grid grid-cols-1 md:grid-cols-2 gap-4"
                      >
                        {roleOptions.map((role) => (
                          <Label
                            key={role.value}
                            htmlFor={role.value}
                            className={`flex items-start gap-4 p-4 rounded-lg border-2 cursor-pointer transition-all ${
                              selectedRole === role.value
                                ? "border-primary bg-primary/5"
                                : "border-border hover:border-primary/50"
                            }`}
                          >
                            <RadioGroupItem
                              value={role.value}
                              id={role.value}
                              className="mt-1"
                            />
                            <div className="flex-1">
                              <div className="flex items-center gap-2 mb-1">
                                <role.icon className="h-5 w-5 text-primary" />
                                <span className="font-medium">{role.label}</span>
                              </div>
                              <p className="text-sm text-muted-foreground">
                                {role.description}
                              </p>
                            </div>
                          </Label>
                        ))}
                      </RadioGroup>
                    </div>
                  )}

                  {/* Step 2: Basic Info */}
                  {step === 2 && (
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="fullName">الاسم الكامل *</Label>
                        <div className="relative">
                          <User className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                          <Input
                            id="fullName"
                            placeholder="أدخل اسمك الكامل"
                            className="pr-10"
                            value={formData.fullName}
                            onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                            required
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="email">البريد الإلكتروني *</Label>
                        <div className="relative">
                          <Mail className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                          <Input
                            id="email"
                            type="email"
                            placeholder="example@email.com"
                            className="pr-10"
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            required
                            dir="ltr"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="phone">رقم الهاتف</Label>
                          <div className="relative">
                            <Phone className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                            <Input
                              id="phone"
                              type="tel"
                              placeholder="01xxxxxxxxx"
                              className="pr-10"
                              value={formData.phone}
                              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                              dir="ltr"
                            />
                          </div>
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="city">المدينة</Label>
                          <div className="relative">
                            <MapPin className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                            <Input
                              id="city"
                              placeholder="الخارجة، الداخلة..."
                              className="pr-10"
                              value={formData.city}
                              onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                            />
                          </div>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="password">كلمة المرور *</Label>
                        <div className="relative">
                          <Lock className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                          <Input
                            id="password"
                            type="password"
                            placeholder="••••••••"
                            className="pr-10"
                            value={formData.password}
                            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                            required
                            dir="ltr"
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="confirmPassword">تأكيد كلمة المرور *</Label>
                        <div className="relative">
                          <Lock className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                          <Input
                            id="confirmPassword"
                            type="password"
                            placeholder="••••••••"
                            className="pr-10"
                            value={formData.confirmPassword}
                            onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                            required
                            dir="ltr"
                          />
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Step 3: Document Upload */}
                  {step === 3 && selectedRoleOption && (
                    <div className="space-y-4">
                      <div className="bg-accent/20 rounded-lg p-4 mb-6">
                        <div className="flex items-center gap-2 text-accent-foreground">
                          <Shield className="h-5 w-5" />
                          <span className="font-medium">المستندات المطلوبة</span>
                        </div>
                        <p className="text-sm text-muted-foreground mt-1">
                          سيتم مراجعة مستنداتك للتحقق من حسابك
                        </p>
                      </div>

                      {selectedRoleOption.requiredDocuments.map((doc) => (
                        <DocumentUpload
                          key={doc.type}
                          docType={doc.type}
                          label={doc.label}
                          uploadedFile={uploadedDocuments[doc.type]}
                          onUpload={(file) => handleDocumentUpload(doc.type, file)}
                        />
                      ))}
                    </div>
                  )}

                  {/* Navigation Buttons */}
                  <div className="flex gap-4 mt-8">
                    {step > 1 && (
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => setStep(step - 1)}
                        className="flex-1"
                      >
                        السابق
                      </Button>
                    )}
                    {step < 3 ? (
                      <Button
                        type="button"
                        onClick={handleNextStep}
                        className="flex-1"
                      >
                        التالي
                      </Button>
                    ) : (
                      <Button
                        type="submit"
                        className="flex-1"
                        disabled={isLoading}
                      >
                        {isLoading ? (
                          <>
                            <Loader2 className="h-4 w-4 ml-2 animate-spin" />
                            جاري إنشاء الحساب...
                          </>
                        ) : (
                          "إنشاء الحساب"
                        )}
                      </Button>
                    )}
                  </div>
                </form>

                <div className="mt-6 text-center text-sm">
                  <span className="text-muted-foreground">لديك حساب بالفعل؟ </span>
                  <Link to="/login" className="text-primary hover:underline font-medium">
                    تسجيل الدخول
                  </Link>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default RegisterPage;
