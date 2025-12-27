import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useError } from "@/hooks/use-error";
import { ErrorType } from "@/types/error.types";
import { handleApiError, handleValidationError, getUserFriendlyMessage } from "@/utils/error-helpers";
import { AlertCircle, CheckCircle2, XCircle } from "lucide-react";
import { toast } from "sonner";
import { ErrorThrower } from "./components/error-thrower";

/**
 * Error Handling Example View
 * 
 * Bu sayfa, React'ta error handling'in farklı yöntemlerini gösterir:
 * 1. Error Boundary ile render hatalarını yakalama
 * 2. Error Context ile global hata yönetimi
 * 3. Try-catch ile async işlemlerde hata yakalama
 * 4. Form validasyon hataları
 */
function ErrorHandlingExample() {
  const { error, handleError, clearError } = useError();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({ name: "", email: "" });
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});

  /**
   * Örnek 1: API çağrısı simülasyonu (Network Error)
   */
  const simulateApiCall = async () => {
    setLoading(true);
    clearError();
    
    try {
      // Simüle edilmiş API çağrısı
      await new Promise((resolve, reject) => {
        setTimeout(() => {
          // Rastgele hata oluştur
          const randomError = Math.random();
          
          if (randomError < 0.3) {
            reject(new Error("Network request failed"));
          } else if (randomError < 0.6) {
            reject({ status: 404, message: "Kaynak bulunamadı" });
          } else {
            resolve("Başarılı!");
          }
        }, 1000);
      });
      
      toast.success("API çağrısı başarılı!");
    } catch (err) {
      const appError = handleApiError(err);
      handleError(appError, appError.type);
      toast.error(getUserFriendlyMessage(appError));
    } finally {
      setLoading(false);
    }
  };

  /**
   * Örnek 2: Form Validasyonu
   */
  const validateForm = () => {
    const errors: Record<string, string> = {};
    
    if (!formData.name.trim()) {
      errors.name = "İsim alanı zorunludur";
    }
    
    if (!formData.email.trim()) {
      errors.email = "Email alanı zorunludur";
    } else if (!formData.email.includes("@")) {
      errors.email = "Geçerli bir email adresi giriniz";
    }
    
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      const validationError = handleValidationError(errors);
      handleError(validationError, ErrorType.VALIDATION);
      toast.error("Form validasyon hatası!");
      return false;
    }
    
    setFormErrors({});
    clearError();
    toast.success("Form başarıyla gönderildi!");
    return true;
  };

  /**
   * Örnek 3: Manuel hata oluşturma
   */
  const createCustomError = (type: ErrorType) => {
    const errorMessages: Record<ErrorType, string> = {
      [ErrorType.NETWORK]: "Ağ bağlantısı hatası",
      [ErrorType.VALIDATION]: "Validasyon hatası",
      [ErrorType.AUTHENTICATION]: "Kimlik doğrulama hatası",
      [ErrorType.AUTHORIZATION]: "Yetkilendirme hatası",
      [ErrorType.NOT_FOUND]: "Kaynak bulunamadı",
      [ErrorType.SERVER]: "Sunucu hatası",
      [ErrorType.UNKNOWN]: "Bilinmeyen hata",
    };
    
    handleError(
      {
        type,
        message: errorMessages[type],
        timestamp: new Date(),
      },
      type
    );
    
    toast.error(errorMessages[type]);
  };

  return (
    <div className="w-[90%] mx-auto p-5 space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Error Handling Örnekleri</CardTitle>
          <CardDescription>
            React'ta hata yönetiminin farklı yöntemlerini öğrenin
          </CardDescription>
        </CardHeader>
        <CardContent>
          {/* Global Error Display */}
          {error && (
            <Alert variant="destructive" className="mb-6">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Hata Yakalandı!</AlertTitle>
              <AlertDescription className="mt-2 space-y-2">
                <div className="flex items-center gap-2">
                  <Badge variant="destructive">{error.type}</Badge>
                  <span>{getUserFriendlyMessage(error)}</span>
                </div>
                {error.code && (
                  <p className="text-xs">Kod: {error.code}</p>
                )}
                <Button
                  size="sm"
                  variant="outline"
                  onClick={clearError}
                  className="mt-2"
                >
                  Hatayı Temizle
                </Button>
              </AlertDescription>
            </Alert>
          )}

          <Tabs defaultValue="api" className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="api">API Hatası</TabsTrigger>
              <TabsTrigger value="validation">Validasyon</TabsTrigger>
              <TabsTrigger value="custom">Özel Hatalar</TabsTrigger>
              <TabsTrigger value="info">Bilgi</TabsTrigger>
            </TabsList>

            {/* API Error Example */}
            <TabsContent value="api" className="space-y-4 mt-4">
              <Card>
                <CardHeader>
                  <CardTitle>API Çağrısı Simülasyonu</CardTitle>
                  <CardDescription>
                    Async işlemlerde try-catch ile hata yakalama
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-sm text-muted-foreground">
                    Bu butona tıkladığınızda rastgele bir hata oluşturulur.
                    Hata, Error Context'e kaydedilir ve ekranda gösterilir.
                  </p>
                  <Button
                    onClick={simulateApiCall}
                    disabled={loading}
                    variant="default"
                  >
                    {loading ? "Yükleniyor..." : "API Çağrısı Yap"}
                  </Button>
                  
                  <div className="mt-4 p-4 bg-muted rounded-md">
                    <h4 className="font-semibold mb-2">Kod Örneği:</h4>
                    <pre className="text-xs overflow-auto">
{`try {
  const response = await fetch('/api/data');
  if (!response.ok) throw new Error('API Error');
  const data = await response.json();
} catch (err) {
  const appError = handleApiError(err);
  handleError(appError, appError.type);
}`}
                    </pre>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Validation Error Example */}
            <TabsContent value="validation" className="space-y-4 mt-4">
              <Card>
                <CardHeader>
                  <CardTitle>Form Validasyonu</CardTitle>
                  <CardDescription>
                    Form hatalarını yakalama ve gösterme
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Input
                      placeholder="İsim"
                      value={formData.name}
                      onChange={(e) => {
                        setFormData({ ...formData, name: e.target.value });
                        if (formErrors.name) {
                          setFormErrors({ ...formErrors, name: "" });
                        }
                      }}
                      className={formErrors.name ? "border-destructive" : ""}
                    />
                    {formErrors.name && (
                      <p className="text-sm text-destructive flex items-center gap-1">
                        <XCircle className="h-3 w-3" />
                        {formErrors.name}
                      </p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Input
                      placeholder="Email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => {
                        setFormData({ ...formData, email: e.target.value });
                        if (formErrors.email) {
                          setFormErrors({ ...formErrors, email: "" });
                        }
                      }}
                      className={formErrors.email ? "border-destructive" : ""}
                    />
                    {formErrors.email && (
                      <p className="text-sm text-destructive flex items-center gap-1">
                        <XCircle className="h-3 w-3" />
                        {formErrors.email}
                      </p>
                    )}
                  </div>

                  <Button onClick={validateForm} variant="default">
                    Formu Gönder
                  </Button>

                  <div className="mt-4 p-4 bg-muted rounded-md">
                    <h4 className="font-semibold mb-2">Kod Örneği:</h4>
                    <pre className="text-xs overflow-auto">
{`const validateForm = () => {
  const errors = {};
  if (!formData.name) errors.name = "İsim zorunlu";
  if (!formData.email) errors.email = "Email zorunlu";
  
  if (Object.keys(errors).length > 0) {
    const validationError = handleValidationError(errors);
    handleError(validationError, ErrorType.VALIDATION);
    return false;
  }
  return true;
};`}
                    </pre>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Custom Error Example */}
            <TabsContent value="custom" className="space-y-4 mt-4">
              <Card>
                <CardHeader>
                  <CardTitle>Özel Hata Türleri</CardTitle>
                  <CardDescription>
                    Farklı hata türlerini manuel olarak oluşturma
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-2">
                    {Object.values(ErrorType).map((type) => (
                      <Button
                        key={type}
                        onClick={() => createCustomError(type)}
                        variant="outline"
                        className="justify-start"
                      >
                        {type} Hatası Oluştur
                      </Button>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <ErrorThrower />
            </TabsContent>

            {/* Info Tab */}
            <TabsContent value="info" className="space-y-4 mt-4">
              <Card>
                <CardHeader>
                  <CardTitle>Error Handling Yöntemleri</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="p-4 border rounded-lg">
                      <h4 className="font-semibold mb-2 flex items-center gap-2">
                        <CheckCircle2 className="h-4 w-4 text-green-500" />
                        1. Error Boundary
                      </h4>
                      <p className="text-sm text-muted-foreground">
                        Render sırasında oluşan hataları yakalar. Class component
                        olarak yazılmalıdır. Uygulamanın en üst seviyesine yerleştirilir.
                      </p>
                    </div>

                    <div className="p-4 border rounded-lg">
                      <h4 className="font-semibold mb-2 flex items-center gap-2">
                        <CheckCircle2 className="h-4 w-4 text-green-500" />
                        2. Error Context
                      </h4>
                      <p className="text-sm text-muted-foreground">
                        Global hata state yönetimi için kullanılır. Async işlemlerde,
                        form validasyonlarında ve manuel hata oluşturma durumlarında
                        kullanılabilir.
                      </p>
                    </div>

                    <div className="p-4 border rounded-lg">
                      <h4 className="font-semibold mb-2 flex items-center gap-2">
                        <CheckCircle2 className="h-4 w-4 text-green-500" />
                        3. Try-Catch
                      </h4>
                      <p className="text-sm text-muted-foreground">
                        Async fonksiyonlarda ve Promise'lerde hata yakalama için
                        kullanılır. Event handler'larda da kullanılabilir.
                      </p>
                    </div>

                    <div className="p-4 border rounded-lg">
                      <h4 className="font-semibold mb-2 flex items-center gap-2">
                        <AlertCircle className="h-4 w-4 text-yellow-500" />
                        Önemli Notlar
                      </h4>
                      <ul className="text-sm text-muted-foreground space-y-1 list-disc list-inside">
                        <li>Error Boundary sadece render hatalarını yakalar</li>
                        <li>Event handler hataları için try-catch kullanın</li>
                        <li>Async hatalar için try-catch + Error Context kombinasyonu idealdir</li>
                        <li>Kullanıcı dostu hata mesajları gösterin</li>
                        <li>Development'ta detaylı, production'da genel mesajlar gösterin</li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}

export default ErrorHandlingExample;

