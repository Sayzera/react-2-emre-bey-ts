import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { fileUploadSchema, type FileUploadFormData } from "./schema";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

function ReactHookFormExampleFileUpload() {
  const form = useForm({
    resolver: zodResolver(fileUploadSchema),
    defaultValues: {
      profileImage: null,
      resume: undefined,
      documents: undefined,
      name: "",
      email: "",
      description: "",
    },
    mode: "onChange",
  });

  const onSubmit = (data: FileUploadFormData) => {
    console.log(data);
  };

  return (
    <div className="w-[90%] mx-auto mt-5">
      <Card>
        <CardHeader>
          <CardTitle>Form Upload</CardTitle>
          <CardDescription>Card Description</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="profileImage"
                // eslint-disable-next-line @typescript-eslint/no-unused-vars
                render={({ field: { value, ...field } }) => (
                  <FormItem>
                    <FormLabel>Profil Resmi</FormLabel>
                    <FormControl>
                      <Input
                        type="file"
                        {...field}
                        onChange={(e) => field.onChange(e.target.files)}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="resume"
                // eslint-disable-next-line @typescript-eslint/no-unused-vars
                render={({ field: { value, ...field } }) =>  {
             
                    return (
                        <FormItem>
                        <FormLabel>Öz Geçmiş</FormLabel>
                        <FormControl>
                          <Input
                            type="file"
                            {...field}
                            onChange={(e) => field.onChange(e.target.files)}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )
                }}
              />

              <FormField
                control={form.control}
                name="documents"
                // eslint-disable-next-line @typescript-eslint/no-unused-vars
                render={({ field: { value, ...field } }) => (
                  <FormItem>
                    <FormLabel>Dökümanlar</FormLabel>
                    <FormControl>
                      <Input
                        type="file"
                        multiple
                        {...field}
                        onChange={(e) => field.onChange(e.target.files)}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>İsim</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>E-Posta</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Açıklama</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="flex justify-end space-x-2">
              <Button type="button">Reset</Button>
              <Button type="submit">Gönder</Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}

export default ReactHookFormExampleFileUpload;
