import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { comprehensiveFormSchema, type ComprehensiveFormData } from "./schemas";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useEffect } from "react";
import { Textarea } from "@/components/ui/textarea";

const countries = [
  "Türkiye",
  "ABD",
  "Almanya",
  "Fransa",
  "İngiltere",
  "İtalya",
  "İspanya",
  "Rusya",
  "Çin",
  "Japonya",
  "Hindistan",
  "Brezilya",
  "Kanada",
  "Meksika",
  "Avustralya",
  "Norveç",
  "İsveç",
  "Hollanda",
  "Yunanistan",
  "Portekiz",
];

const countryCities: Record<
  string,
  { id: number; value: string }[] | string[]
> = {
  //Record<Keys, Type>  Keys: obje anahtarlarının tipi (key) Type: o anahtarlara karşılık gelen değer tipi (value)

  Türkiye: [
    { id: 1, value: "İstanbul" },
    { id: 2, value: "Ankara" },
    { id: 3, value: "İzmir" },
    { id: 4, value: "Bursa" },
    { id: 5, value: "Antalya" },
  ],
  ABD: ["New York", "Los Angeles", "Chicago", "Houston", "Miami"],
  Almanya: ["Berlin", "Hamburg", "Münih", "Frankfurt", "Köln"],
  Fransa: ["Paris", "Lyon", "Marsilya", "Nice", "Toulouse"],
  İngiltere: ["Londra", "Manchester", "Birmingham", "Liverpool", "Leeds"],
  İtalya: ["Roma", "Milano", "Venedik", "Napoli", "Torino"],
  İspanya: ["Madrid", "Barselona", "Valensiya", "Sevilla", "Bilbao"],
  Rusya: ["Moskova", "St. Petersburg", "Novosibirsk", "Kazan", "Soçi"],
  Çin: ["Pekin", "Şanghay", "Guangzhou", "Shenzhen", "Chengdu"],
  Japonya: ["Tokyo", "Osaka", "Kyoto", "Nagoya", "Sapporo"],
  Hindistan: ["Delhi", "Mumbai", "Bangalore", "Hyderabad", "Kolkata"],
  Brezilya: [
    "Rio de Janeiro",
    "São Paulo",
    "Brasília",
    "Salvador",
    "Fortaleza",
  ],
  Kanada: ["Toronto", "Vancouver", "Montreal", "Calgary", "Ottawa"],
  Meksika: ["Mexico City", "Guadalajara", "Monterrey", "Cancún", "Puebla"],
  Avustralya: ["Sydney", "Melbourne", "Brisbane", "Perth", "Adelaide"],
  Norveç: ["Oslo", "Bergen", "Trondheim", "Stavanger", "Tromsø"],
  İsveç: ["Stockholm", "Göteborg", "Malmö", "Uppsala", "Västerås"],
  Hollanda: ["Amsterdam", "Rotterdam", "Utrecht", "Eindhoven", "Groningen"],
  Yunanistan: ["Atina", "Selanik", "Patras", "Heraklion", "Larisa"],
  Portekiz: ["Lizbon", "Porto", "Coimbra", "Braga", "Funchal"],
};

function AdvancedFormHook() {
  const form = useForm({
    resolver: zodResolver(comprehensiveFormSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      // age: undefined,
      age: "",
      // phone: undefined,
      phone: "",
      country: "",
      city: "",
      adres: "",
      zipCode: "",
    },
    mode: "onChange",
  });
  const selectedCountry = form.watch("country"); // ülke seçimini takip etmek için form.watch kullanılmalı
  const cities = selectedCountry ? countryCities[selectedCountry] || [] : []; //cites kısmı için seçilen country'deki şehirleri aldık

  useEffect(() => {
    form.setValue("city", "");
  }, [selectedCountry]);

  const onSubmit = (data: ComprehensiveFormData) => {
    // bu kısmı tam anlamamışım
    console.log(data, "data");
  };

  const handleReset = () => {
    form.reset();
  };

  return (
    <div className="w-[90%] mx-auto p-5 space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Kapsamlı React Form Hook</CardTitle>
          <CardDescription>React form hook'un tüm özellikleri</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} >
              <Card>
                <CardHeader>
                  <CardTitle>Kişisel Bilgiler</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4 space-y-2">
                    <FormField
                      control={form.control}
                      name="firstName"
                      render={({ field }) => {
                        //TODO:  field tam olarak nedir ?
                        return (
                          <FormItem>
                            <FormLabel>Ad *</FormLabel>
                            <FormControl>
                              {/* <Input onChange={field.onChange} />
                            <Input onChange={(event) => {
                              field.onChange(event)
                            }} /> */}
                              <Input placeholder="Adınız" {...field} />
                            </FormControl>
                            <FormDescription>İsminizi giriniz</FormDescription>
                            <FormMessage />
                          </FormItem>
                        );
                      }}
                    />
                    <FormField
                      control={form.control}
                      name="lastName"
                      render={({ field }) => {
                        return (
                          <FormItem>
                            <FormLabel>Soyad *</FormLabel>
                            <FormControl>
                              <Input
                                onChange={field.onChange}
                                placeholder="Soyadınız"
                              />
                            </FormControl>
                            <FormDescription>
                              Soy isminizi giriniz
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        );
                      }}
                    />

                    <FormField
                      control={form.control}
                      name="age"
                      render={({ field }) => {
                        return (
                          <FormItem>
                            <FormLabel>Yaş *</FormLabel>
                            <FormControl>
                              <Input
                                type="number"
                                placeholder="Yaşınız "
                                {...field}
                              />
                            </FormControl>
                            <FormDescription>Yaşınızı giriniz</FormDescription>
                            <FormMessage />
                          </FormItem>
                        );
                      }}
                    />

                    <FormField
                      control={form.control}
                      name="phone"
                      render={({ field }) => {
                        return (
                          <FormItem>
                            <FormLabel>Telefon *</FormLabel>
                            <FormControl>
                              <Input
                                type="tel"
                                onChange={field.onChange}
                                placeholder="Telefon numaranız "
                              />
                            </FormControl>
                            <FormDescription>
                              {" "}
                              Telefon numaranızı giriniz
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        );
                      }}
                    />

                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => {
                        return (
                          <FormItem>
                            <FormLabel>E-Posta *</FormLabel>
                            <FormControl>
                              <Input
                                onChange={(e) => field.onChange(e)}
                                placeholder="E-Posta giriniz"
                              />
                            </FormControl>
                            <FormDescription>
                              E-Posta adresinizi giriniz
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        );
                      }}
                    />

                    <FormField
                      control={form.control}
                      name="zipCode"
                      render={({ field }) => {
                        return (
                          <FormItem>
                            <FormLabel>Zip-kodu *</FormLabel>
                            <FormControl>
                              <Input
                                placeholder="Zip Kodunu giriniz"
                                onChange={(e) => field.onChange(e)}
                              />
                            </FormControl>
                            <FormDescription>
                              Zip Kodunuzu giriniz{" "}
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        );
                      }}
                    />

                    <FormField
                      control={form.control}
                      name="country"
                      render={({ field }) => {
                        return (
                          <FormItem>
                            <FormLabel>Ülke *</FormLabel>
                            <FormControl>
                              <Select
                                value={field.value}
                                onValueChange={field.onChange}
                              >
                                <SelectTrigger>
                                  <SelectValue placeholder="Ülke seçiniz" />
                                </SelectTrigger>
                                <SelectContent className="max-h-60 overflow-y-auto">
                                  {countries.map((country) => (
                                    <SelectItem key={country} value={country}>
                                      {country}
                                    </SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        );
                      }}
                    />

                    <FormField
                      control={form.control}
                      name="city"
                      render={({ field }) => {
                        return (
                          <FormItem>
                            <FormLabel>Şehir *</FormLabel>
                            <FormControl>
                              <Select
                                value={field.value}
                                onValueChange={field.onChange}
                              >
                                <SelectTrigger>
                                  <SelectValue placeholder="Şehir seçiniz" />
                                </SelectTrigger>
                                <SelectContent className="max-h-60 overflow-y-auto">
                                  {cities.map((city: any) => (
                                    <SelectItem
                                      key={city.id}
                                      value={city.value}
                                    >
                                      {city.value}
                                    </SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                            </FormControl>
                          </FormItem>
                        );
                      }}
                    />

                    <FormField
                      control={form.control}
                      name="adres"
                      render={({ field }) => {
                        return (
                          <FormItem>
                            <FormLabel>Adres *</FormLabel>
                            <FormControl>
                              <Textarea
                                placeholder="Adresinizi giriniz"
                                {...field} // value ve onChange burada bağlanıyor
                                rows={4} // yüksekliğini ayarlamak için
                              />
                            </FormControl>
                            <FormDescription>
                              Adresiniz en az 10 karakter olmalıdır
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        );
                      }}
                    />
                  </div>

                  <Button type="submit">Formu Gönder</Button>
                  <Button
                    type="reset"
                    onClick={handleReset}
                    className="ml-2 bg-red-700"
                  >
                    Reset
                  </Button>
                </CardContent>
              </Card>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}

export default AdvancedFormHook;
