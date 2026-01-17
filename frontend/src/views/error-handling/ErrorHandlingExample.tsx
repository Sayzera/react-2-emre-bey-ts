import { ErrorThrower } from "@/components/error-thrower";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ErrorType } from "@/context/error-context";
import { useError } from "@/hooks/use-error";
import { XCircle } from "lucide-react";
import { useState } from "react";

function ErrorHandlingExample() {
  const { handleError } = useError();
  const [formData, setFormData] = useState({ name: "", email: "" });
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});

  const validateForm = () => {



    handleError(
      {
        type: ErrorType.VALIDATION,
        message: "validasyon hatası",
        details: {
          x: "x",
          y: "y",
        },
        timestamp: new Date(),
      },
      ErrorType.VALIDATION
    );
  };





  return (
    <div className="w-[80%] mx-auto mt-5">
      <Tabs defaultValue="api" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="api">API Hatası</TabsTrigger>
          <TabsTrigger value="validation">Validasyon</TabsTrigger>
          <TabsTrigger value="custom">Özel Hatalar</TabsTrigger>
          <TabsTrigger value="info">Bilgi</TabsTrigger>
        </TabsList>

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
      </Tabs>
    </div>
  );
}

export default ErrorHandlingExample;
