import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

/**
 * Error Thrower Component
 * 
 * Bu component, Error Boundary'i test etmek için
 * kasıtlı olarak hata oluşturur.
 */
export function ErrorThrower() {
  const [shouldThrow, setShouldThrow] = useState(false);

  if (shouldThrow) {
    // Bu hata Error Boundary tarafından yakalanacak
    throw new Error("Bu bir test hatasıdır! Error Boundary çalışıyor.");
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Error Boundary Testi</CardTitle>
        <CardDescription>
          Bu butona tıklayarak Error Boundary'in çalışıp çalışmadığını test edebilirsiniz
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Button
          onClick={() => setShouldThrow(true)}
          variant="destructive"
        >
          Hata Oluştur (Error Boundary Test)
        </Button>
      </CardContent>
    </Card>
  );
}

