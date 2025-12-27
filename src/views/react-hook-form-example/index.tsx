import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { toast } from "sonner";
import {
  comprehensiveFormSchema,
  type ComprehensiveFormData,
} from "./schemas";
import { Eye, EyeOff, RefreshCw, Save, CheckCircle2 } from "lucide-react";
import { useState } from "react";

/**
 * React Hook Form Kapsamlı Örnek
 * 
 * Bu sayfa React Hook Form'un tüm özelliklerini gösterir:
 * 1. Temel form kullanımı
 * 2. Zod ile validasyon
 * 3. Farklı input türleri
 * 4. Watch ile form değerlerini izleme
 * 5. Reset ve setValue kullanımı
 * 6. Form state yönetimi
 */
function ReactHookFormExample() {
  const [showFormData, setShowFormData] = useState(false);

  // useForm hook'u ile form oluşturma
  const form = useForm({
    resolver: zodResolver(comprehensiveFormSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      age: undefined,
      phone: "",
      country: "",
      city: "",
      address: "",
      zipCode: "",
      newsletter: false,
      notifications: false,
      theme: "light",
      language: "",
      interests: [],
      message: "",
    },
    mode: "onChange", // onChange, onBlur, onSubmit, onTouched, all
  });

  // Watch ile form değerlerini izleme
  const watchedValues = form.watch();
  const watchedFirstName = form.watch("firstName");
  const watchedEmail = form.watch("email");

  // Form submit işlemi
  const onSubmit = (data: ComprehensiveFormData) => {
    console.log("Form Data:", data);
    toast.success("Form başarıyla gönderildi!", {
      description: `${data.firstName} ${data.lastName} - Form kaydedildi`,
    });
  };

  // Form reset işlemi
  const handleReset = () => {
    form.reset();
    toast.info("Form sıfırlandı");
  };

  // setValue ile programatik değer atama
  const fillSampleData = () => {
    form.setValue("firstName", "Ahmet");
    form.setValue("lastName", "Yılmaz");
    form.setValue("email", "ahmet@example.com");
    form.setValue("age", 25);
    form.setValue("phone", "05551234567");
    form.setValue("country", "turkey");
    form.setValue("city", "istanbul");
    form.setValue("address", "Kadıköy, İstanbul");
    form.setValue("zipCode", "34000");
    form.setValue("theme", "dark");
    form.setValue("language", "tr");
    form.setValue("interests", ["teknoloji", "spor"]);
    form.setValue("newsletter", true);
    toast.success("Örnek veriler dolduruldu");
  };

  // Form durumunu kontrol etme
  const isFormValid = form.formState.isValid;
  const isDirty = form.formState.isDirty;
  const errors = form.formState.errors;

  return (
    <div className="w-[90%] mx-auto p-5 space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>React Hook Form Kapsamlı Örnek</CardTitle>
          <CardDescription>
            React Hook Form'un tüm özelliklerini öğrenin
          </CardDescription>
        </CardHeader>
        <CardContent>
          {/* Form Durumu Göstergesi */}
          <div className="mb-6 p-4 bg-muted rounded-lg space-y-2">
            <div className="flex items-center gap-4 flex-wrap">
              <Badge variant={isFormValid ? "default" : "destructive"}>
                {isFormValid ? "Form Geçerli" : "Form Geçersiz"}
              </Badge>
              <Badge variant={isDirty ? "default" : "secondary"}>
                {isDirty ? "Değişiklik Var" : "Değişiklik Yok"}
              </Badge>
              <Badge variant="outline">
                Hata Sayısı: {Object.keys(errors).length}
              </Badge>
            </div>
            {watchedFirstName && (
              <p className="text-sm text-muted-foreground">
                İsim: <strong>{watchedFirstName}</strong>
              </p>
            )}
            {watchedEmail && (
              <p className="text-sm text-muted-foreground">
                Email: <strong>{watchedEmail}</strong>
              </p>
            )}
          </div>

          <Tabs defaultValue="form" className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="form">Form</TabsTrigger>
              <TabsTrigger value="watch">Watch</TabsTrigger>
              <TabsTrigger value="methods">Metodlar</TabsTrigger>
              <TabsTrigger value="info">Bilgi</TabsTrigger>
            </TabsList>

            {/* Form Sekmesi */}
            <TabsContent value="form" className="space-y-4 mt-4">
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  {/* Kişisel Bilgiler */}
                  <Card>
                    <CardHeader>
                      <CardTitle>Kişisel Bilgiler</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <FormField
                          control={form.control}
                          name="firstName"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Ad *</FormLabel>
                              <FormControl>
                                <Input placeholder="Adınız" {...field} />
                              </FormControl>
                              <FormDescription>
                                İsminizi giriniz
                              </FormDescription>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="lastName"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Soyad *</FormLabel>
                              <FormControl>
                                <Input placeholder="Soyadınız" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>

                      <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Email *</FormLabel>
                            <FormControl>
                              <Input
                                type="email"
                                placeholder="ornek@email.com"
                                {...field}
                              />
                            </FormControl>
                            <FormDescription>
                              Geçerli bir email adresi giriniz
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <div className="grid grid-cols-2 gap-4">
                        <FormField
                          control={form.control}
                          name="age"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Yaş</FormLabel>
                              <FormControl>
                                <Input
                                  type="number"
                                  placeholder="25"
                                  {...field}
                                  onChange={(e) =>
                                    field.onChange(
                                      e.target.value
                                        ? parseInt(e.target.value)
                                        : undefined
                                    )
                                  }
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="phone"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Telefon</FormLabel>
                              <FormControl>
                                <Input
                                  placeholder="05551234567"
                                  {...field}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                    </CardContent>
                  </Card>

                  {/* Adres Bilgileri */}
                  <Card>
                    <CardHeader>
                      <CardTitle>Adres Bilgileri</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <FormField
                          control={form.control}
                          name="country"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Ülke *</FormLabel>
                              <Select
                                onValueChange={field.onChange}
                                defaultValue={field.value}
                              >
                                <FormControl>
                                  <SelectTrigger>
                                    <SelectValue placeholder="Ülke seçiniz" />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                  <SelectItem value="turkey">Türkiye</SelectItem>
                                  <SelectItem value="usa">ABD</SelectItem>
                                  <SelectItem value="uk">İngiltere</SelectItem>
                                  <SelectItem value="germany">Almanya</SelectItem>
                                </SelectContent>
                              </Select>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="city"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Şehir *</FormLabel>
                              <FormControl>
                                <Input placeholder="İstanbul" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>

                      <FormField
                        control={form.control}
                        name="address"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Adres *</FormLabel>
                            <FormControl>
                              <Textarea
                                placeholder="Tam adres bilgisi"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="zipCode"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Posta Kodu *</FormLabel>
                            <FormControl>
                              <Input placeholder="34000" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </CardContent>
                  </Card>

                  {/* Tercihler */}
                  <Card>
                    <CardHeader>
                      <CardTitle>Tercihler</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <FormField
                        control={form.control}
                        name="theme"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Tema *</FormLabel>
                            <FormControl>
                              <RadioGroup
                                onValueChange={field.onChange}
                                defaultValue={field.value}
                                className="flex gap-6"
                              >
                                <div className="flex items-center space-x-2">
                                  <RadioGroupItem value="light" id="light" />
                                  <label htmlFor="light">Açık</label>
                                </div>
                                <div className="flex items-center space-x-2">
                                  <RadioGroupItem value="dark" id="dark" />
                                  <label htmlFor="dark">Koyu</label>
                                </div>
                                <div className="flex items-center space-x-2">
                                  <RadioGroupItem value="auto" id="auto" />
                                  <label htmlFor="auto">Otomatik</label>
                                </div>
                              </RadioGroup>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="language"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Dil *</FormLabel>
                            <Select
                              onValueChange={field.onChange}
                              defaultValue={field.value}
                            >
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Dil seçiniz" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value="tr">Türkçe</SelectItem>
                                <SelectItem value="en">English</SelectItem>
                                <SelectItem value="de">Deutsch</SelectItem>
                                <SelectItem value="fr">Français</SelectItem>
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="interests"
                        render={() => (
                          <FormItem>
                            <div className="mb-4">
                              <FormLabel>İlgi Alanları *</FormLabel>
                              <FormDescription>
                                En az bir ilgi alanı seçmelisiniz
                              </FormDescription>
                            </div>
                            {["teknoloji", "spor", "müzik", "sanat", "edebiyat"].map(
                              (item) => (
                                <FormField
                                  key={item}
                                  control={form.control}
                                  name="interests"
                                  render={({ field }) => {
                                    return (
                                      <FormItem
                                        key={item}
                                        className="flex flex-row items-start space-x-3 space-y-0"
                                      >
                                        <FormControl>
                                          <Checkbox
                                            checked={field.value?.includes(item)}
                                            onCheckedChange={(checked) => {
                                              return checked
                                                ? field.onChange([
                                                    ...field.value,
                                                    item,
                                                  ])
                                                : field.onChange(
                                                    field.value?.filter(
                                                      (value) => value !== item
                                                    )
                                                  );
                                            }}
                                          />
                                        </FormControl>
                                        <FormLabel className="font-normal">
                                          {item.charAt(0).toUpperCase() + item.slice(1)}
                                        </FormLabel>
                                      </FormItem>
                                    );
                                  }}
                                />
                              )
                            )}
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <div className="space-y-3">
                        <FormField
                          control={form.control}
                          name="newsletter"
                          render={({ field }) => (
                            <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                              <FormControl>
                                <Checkbox
                                  checked={field.value}
                                  onCheckedChange={field.onChange}
                                />
                              </FormControl>
                              <div className="space-y-1 leading-none">
                                <FormLabel>Bülten aboneliği</FormLabel>
                                <FormDescription>
                                  Yeni haberlerden haberdar olmak için abone olun
                                </FormDescription>
                              </div>
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="notifications"
                          render={({ field }) => (
                            <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                              <FormControl>
                                <Checkbox
                                  checked={field.value}
                                  onCheckedChange={field.onChange}
                                />
                              </FormControl>
                              <div className="space-y-1 leading-none">
                                <FormLabel>Bildirimler</FormLabel>
                                <FormDescription>
                                  Push bildirimleri almak için işaretleyin
                                </FormDescription>
                              </div>
                            </FormItem>
                          )}
                        />
                      </div>

                      <FormField
                        control={form.control}
                        name="message"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Mesaj</FormLabel>
                            <FormControl>
                              <Textarea
                                placeholder="Eklemek istediğiniz bir mesaj var mı?"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </CardContent>
                  </Card>

                  {/* Form Butonları */}
                  <div className="flex gap-2 flex-wrap">
                    <Button type="submit" disabled={!isFormValid}>
                      <Save className="w-4 h-4 mr-2" />
                      Formu Gönder
                    </Button>
                    <Button
                      type="button"
                      variant="outline"
                      onClick={handleReset}
                    >
                      <RefreshCw className="w-4 h-4 mr-2" />
                      Sıfırla
                    </Button>
                    <Button
                      type="button"
                      variant="secondary"
                      onClick={fillSampleData}
                    >
                      Örnek Veri Doldur
                    </Button>
                    <Button
                      type="button"
                      variant="ghost"
                      onClick={() => setShowFormData(!showFormData)}
                    >
                      {showFormData ? (
                        <EyeOff className="w-4 h-4 mr-2" />
                      ) : (
                        <Eye className="w-4 h-4 mr-2" />
                      )}
                      Form Verilerini Göster
                    </Button>
                  </div>
                </form>
              </Form>

              {/* Form Verilerini Gösterme */}
              {showFormData && (
                <Card>
                  <CardHeader>
                    <CardTitle>Form Verileri (JSON)</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <pre className="bg-muted p-4 rounded-md text-xs overflow-auto max-h-64">
                      {JSON.stringify(watchedValues, null, 2)}
                    </pre>
                  </CardContent>
                </Card>
              )}
            </TabsContent>

            {/* Watch Sekmesi */}
            <TabsContent value="watch" className="space-y-4 mt-4">
              <Card>
                <CardHeader>
                  <CardTitle>Watch Özelliği</CardTitle>
                  <CardDescription>
                    Form değerlerini gerçek zamanlı izleme
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="p-4 bg-muted rounded-lg">
                    <h4 className="font-semibold mb-2">Tüm Form Verileri:</h4>
                    <pre className="text-xs overflow-auto max-h-64">
                      {JSON.stringify(watchedValues, null, 2)}
                    </pre>
                  </div>

                  <Separator />

                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-4 border rounded-lg">
                      <h4 className="font-semibold mb-2">İsim:</h4>
                      <p className="text-lg">{watchedFirstName || "Henüz girilmedi"}</p>
                    </div>
                    <div className="p-4 border rounded-lg">
                      <h4 className="font-semibold mb-2">Email:</h4>
                      <p className="text-lg">{watchedEmail || "Henüz girilmedi"}</p>
                    </div>
                  </div>

                  <div className="p-4 bg-blue-50 dark:bg-blue-950 rounded-lg">
                    <h4 className="font-semibold mb-2">Kod Örneği:</h4>
                    <pre className="text-xs overflow-auto">
{`// Tüm formu izle
const watchedValues = form.watch();

// Tek bir alanı izle
const firstName = form.watch("firstName");

// Birden fazla alanı izle
const [firstName, email] = form.watch(["firstName", "email"]);`}
                    </pre>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Metodlar Sekmesi */}
            <TabsContent value="methods" className="space-y-4 mt-4">
              <Card>
                <CardHeader>
                  <CardTitle>Form Metodları</CardTitle>
                  <CardDescription>
                    React Hook Form'un önemli metodları
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <div className="p-4 border rounded-lg">
                      <h4 className="font-semibold mb-2 flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4" />
                        setValue - Programatik Değer Atama
                      </h4>
                      <p className="text-sm text-muted-foreground mb-2">
                        Form alanlarına programatik olarak değer atamak için kullanılır.
                      </p>
                      <pre className="text-xs bg-muted p-3 rounded overflow-auto">
{`form.setValue("firstName", "Ahmet");
form.setValue("email", "ahmet@example.com");
form.setValue("age", 25);`}
                      </pre>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => {
                          form.setValue("firstName", "Örnek İsim");
                          form.setValue("email", "ornek@email.com");
                        }}
                        className="mt-2"
                      >
                        Örnek Değerler Ata
                      </Button>
                    </div>

                    <div className="p-4 border rounded-lg">
                      <h4 className="font-semibold mb-2 flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4" />
                        reset - Formu Sıfırlama
                      </h4>
                      <p className="text-sm text-muted-foreground mb-2">
                        Formu varsayılan değerlere sıfırlar.
                      </p>
                      <pre className="text-xs bg-muted p-3 rounded overflow-auto">
{`// Tüm formu sıfırla
form.reset();

// Belirli değerlerle sıfırla
form.reset({
  firstName: "Yeni İsim",
  email: "yeni@email.com"
});`}
                      </pre>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={handleReset}
                        className="mt-2"
                      >
                        Formu Sıfırla
                      </Button>
                    </div>

                    <div className="p-4 border rounded-lg">
                      <h4 className="font-semibold mb-2 flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4" />
                        getValues - Değerleri Okuma
                      </h4>
                      <p className="text-sm text-muted-foreground mb-2">
                        Form değerlerini okumak için kullanılır.
                      </p>
                      <pre className="text-xs bg-muted p-3 rounded overflow-auto">
{`// Tüm değerleri al
const allValues = form.getValues();

// Tek bir değer al
const firstName = form.getValues("firstName");

// Birden fazla değer al
const { firstName, email } = form.getValues(["firstName", "email"]);`}
                      </pre>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => {
                          const values = form.getValues();
                          toast.info("Form değerleri console'da görüntülendi");
                          console.log("Form Values:", values);
                        }}
                        className="mt-2"
                      >
                        Değerleri Console'a Yazdır
                      </Button>
                    </div>

                    <div className="p-4 border rounded-lg">
                      <h4 className="font-semibold mb-2 flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4" />
                        trigger - Validasyonu Tetikleme
                      </h4>
                      <p className="text-sm text-muted-foreground mb-2">
                        Belirli alanların veya tüm formun validasyonunu manuel olarak tetikler.
                      </p>
                      <pre className="text-xs bg-muted p-3 rounded overflow-auto">
{`// Tek bir alanı validate et
await form.trigger("email");

// Birden fazla alanı validate et
await form.trigger(["email", "firstName"]);

// Tüm formu validate et
await form.trigger();`}
                      </pre>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={async () => {
                          const isValid = await form.trigger();
                          toast.info(isValid ? "Form geçerli!" : "Form geçersiz!");
                        }}
                        className="mt-2"
                      >
                        Validasyonu Tetikle
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Bilgi Sekmesi */}
            <TabsContent value="info" className="space-y-4 mt-4">
              <Card>
                <CardHeader>
                  <CardTitle>React Hook Form Nedir?</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="p-4 border rounded-lg">
                      <h4 className="font-semibold mb-2">🎯 Avantajları</h4>
                      <ul className="text-sm text-muted-foreground space-y-1 list-disc list-inside">
                        <li>Performans: Minimum re-render ile çalışır</li>
                        <li>Küçük boyut: Sadece ~9KB</li>
                        <li>Kolay validasyon: Zod, Yup gibi kütüphanelerle entegre</li>
                        <li>TypeScript desteği: Tam tip güvenliği</li>
                        <li>Esnek: Tüm HTML form elementleriyle çalışır</li>
                      </ul>
                    </div>

                    <div className="p-4 border rounded-lg">
                      <h4 className="font-semibold mb-2">📚 Temel Kullanım</h4>
                      <pre className="text-xs bg-muted p-3 rounded overflow-auto">
{`import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

// Schema tanımla
const schema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

// Form oluştur
const form = useForm({
  resolver: zodResolver(schema),
  defaultValues: {
    email: "",
    password: "",
  },
});

// Submit işlemi
const onSubmit = (data) => {
  console.log(data);
};

// Form kullanımı
<form onSubmit={form.handleSubmit(onSubmit)}>
  <input {...form.register("email")} />
  <input {...form.register("password")} />
  <button type="submit">Gönder</button>
</form>`}
                      </pre>
                    </div>

                    <div className="p-4 border rounded-lg">
                      <h4 className="font-semibold mb-2">🔑 Önemli Hook'lar</h4>
                      <ul className="text-sm text-muted-foreground space-y-2">
                        <li>
                          <strong>useForm:</strong> Ana form hook'u, form state'ini yönetir
                        </li>
                        <li>
                          <strong>watch:</strong> Form değerlerini gerçek zamanlı izler
                        </li>
                        <li>
                          <strong>register:</strong> Input'ları forma kaydeder
                        </li>
                        <li>
                          <strong>handleSubmit:</strong> Form submit işlemini yönetir
                        </li>
                        <li>
                          <strong>formState:</strong> Form durumu bilgilerini içerir
                        </li>
                      </ul>
                    </div>

                    <div className="p-4 border rounded-lg">
                      <h4 className="font-semibold mb-2">⚙️ Form State Özellikleri</h4>
                      <ul className="text-sm text-muted-foreground space-y-1 list-disc list-inside">
                        <li><strong>isValid:</strong> Form geçerli mi?</li>
                        <li><strong>isDirty:</strong> Form değiştirildi mi?</li>
                        <li><strong>isSubmitting:</strong> Form gönderiliyor mu?</li>
                        <li><strong>errors:</strong> Form hataları</li>
                        <li><strong>touchedFields:</strong> Dokunulan alanlar</li>
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

export default ReactHookFormExample;

