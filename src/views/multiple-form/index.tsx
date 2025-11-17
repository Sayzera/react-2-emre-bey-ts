import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CheckCircle2, ChevronLeft, ChevronRight } from "lucide-react";

const stepTitles = ["Kişisel Bilgiler", "Ödeme Bilgileri ve özet"];

const PersonelInfoStep = () => {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="firstName">Ad *</Label>
          <Input id="firstName" />
          {/* {errors.personalInfo?.firstName && (
          <p className="text-sm text-destructive">
            {errors.personalInfo.firstName}
          </p>
        )} */}
        </div>
        <div className="space-y-2">
          <Label htmlFor="lastName">Soyad *</Label>
          <Input id="lastName" />
          {/* {errors.personalInfo?.lastName && (
          <p className="text-sm text-destructive">
            {errors.personalInfo.lastName}
          </p>
        )} */}
        </div>
      </div>
      <div className="space-y-2">
        <Label htmlFor="email">E-posta *</Label>
        <Input id="email" type="email" />
        {/* {errors.personalInfo?.email && (
        <p className="text-sm text-destructive">
          {errors.personalInfo.email}
        </p>
      )} */}
      </div>
      <div className="space-y-2">
        <Label htmlFor="phone">Telefon *</Label>
        <Input id="phone" type="tel" placeholder="05XX XXX XX XX" />
        {/* {errors.personalInfo?.phone && (
        <p className="text-sm text-destructive">
          {errors.personalInfo.phone}
        </p>
      )} */}
      </div>
    </div>
  );
};

const PaymentAndSummaryStep = () => {
  return (
    <div className="space-y-6">
      {/* Ödeme Bilgileri */}
      <div>
        <h3 className="font-semibold mb-4 text-lg">Ödeme Bilgileri</h3>
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="cardNumber">Kart Numarası *</Label>
            <Input
              id="cardNumber"
              placeholder="1234 5678 9012 3456"
              maxLength={16}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="cardHolder">Kart Sahibi Adı *</Label>
            <Input id="cardHolder" placeholder="AD SOYAD" />
            {/* {errors.paymentInfo?.cardHolder && (
            <p className="text-sm text-destructive">
              {errors.paymentInfo.cardHolder}
            </p>
          )} */}
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="expiryDate">Son Kullanma Tarihi *</Label>
              <Input id="expiryDate" placeholder="MM/YY" maxLength={5} />
              {/* {errors.paymentInfo?.expiryDate && (
              <p className="text-sm text-destructive">
                {errors.paymentInfo.expiryDate}
              </p>
            )} */}
            </div>
            <div className="space-y-2">
              <Label htmlFor="cvv">CVV *</Label>
              <Input id="cvv" placeholder="123" maxLength={3} />
              {/* {errors.paymentInfo?.cvv && (
              <p className="text-sm text-destructive">
                {errors.paymentInfo.cvv}
              </p>
            )} */}
            </div>
          </div>
        </div>
      </div>

      {/* Özet */}
      <div>
        <h3 className="font-semibold mb-4 text-lg">Bilgilerinizin Özeti</h3>
        <div>
          <h4 className="font-medium mb-2 text-sm">Kişisel Bilgiler</h4>
          <div className="bg-muted p-4 rounded-lg space-y-2">
            <p>
              <span className="font-medium">Ad Soyad:</span>{" "}
            </p>
            <p>
              <span className="font-medium">E-posta:</span>{" "}
            </p>
            <p>
              <span className="font-medium">Telefon:</span>{" "}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

const renderStepContent = (stepCount = 1) => {
  switch (stepCount) {
    case 1:
      return <PersonelInfoStep />;
    case 2:
      return <PaymentAndSummaryStep />;

    default:
      return null;
  }
};

function MultipleForm() {
  // const [] = useReducer(reducer, initialState)
  const isTrue = 1;
  return (
    <div className="min-h-screen bg-background py-12 px-4">
      <div className=" max-w-3xl mx-auto">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold mb-2">Çok Adımlı Form</h1>
          <p className="text-muted-foreground">
            Reducer ile yönetilen form adımları
          </p>
        </div>

        {/* Komponente dönüşecek */}
        <div className="flex items-center justify-between mb-8">
          {stepTitles.map((stepTitle) => (
            <div className="flex items-center flex-1">
              <div className="flex flex-col items-center flex-1">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold transition-all cursor-pointer ${
                    isTrue
                      ? "bg-primary text-primary-foreground scale-110"
                      : isTrue
                      ? "bg-green-500 text-white"
                      : "bg-muted text-muted-foreground"
                  } ${isTrue ? "hover:scale-105" : "cursor-not-allowed"}`}
                >
                  {isTrue ? <CheckCircle2 className="w-6 h-6" /> : 1}
                </div>
                <span
                  className={`mt-2 text-xs text-center ${
                    isTrue
                      ? "font-semibold text-primary"
                      : "text-muted-foreground"
                  }`}
                >
                  {stepTitle}
                </span>
              </div>
              {1 < 2 && (
                <div
                  className={`h-1 flex-1 mx-2 transition-colors ${
                    !isTrue ? "bg-green-500" : "bg-muted"
                  }`}
                />
              )}
            </div>
          ))}
        </div>

        <Card>
          <CardHeader>
            <CardTitle>1</CardTitle>
            <CardDescription>Adım1 / TOTAL STEPS</CardDescription>
          </CardHeader>
          <CardContent>{renderStepContent(2)}</CardContent>
          <CardFooter className="flex justify-between">
            <Button variant="outline" onClick={() => {}} disabled={false}>
              <ChevronLeft className="w-4 h-4 mr-2" />
              Önceki
            </Button>
            <Button onClick={() => {}}>
              Sonraki
              <ChevronRight className="w-4 h-4 ml-2" />
            </Button>
            <Button onClick={() => {}}>Formu Gönder</Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}

export default MultipleForm;
