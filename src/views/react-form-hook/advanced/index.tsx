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

function AdvancedFormHook() {
  const form = useForm({
    resolver: zodResolver(comprehensiveFormSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      age: undefined,
      phone: undefined,
      country: "",
      city: "",
      adres: "",
      zipCode: "",
    },
    mode: "onChange",
  });

  const onSubmit = (data: ComprehensiveFormData) => {
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
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Kişisel Bilgiler</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="firstName"
                      render={({ field }) => {
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
                  </div>

                  <Button type="submit">Formu Gönder</Button>
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
