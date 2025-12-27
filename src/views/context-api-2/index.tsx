import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ThemeExample from "./components/theme-example";
import { ThemeProvider } from "@/context/theme-provider";
import UserExample from "./components/user-example";
import { UserProvider } from "@/context/user-provider";
import ErrorHandlingExample from "../error-handling-example";
import ReactHookFormExample from "../react-hook-form-example";

function ContextApiExampleView() {
  // TODO: ForwardRef araştıralım 
  return (
    <UserProvider>
 <ThemeProvider>
      <div className="w-[80%] mx-auto p-5 border-dashed border mt-2 rounded-md shadow-md min-h-[calc(100vh-200px)]">
        <Tabs defaultValue="theme" className="w-full ">
          <TabsList className="grid w-full grid-cols-1 md:grid-cols-6">
            <TabsTrigger value="theme">Tema</TabsTrigger>
            <TabsTrigger value="user">Kullanıcı</TabsTrigger>
            <TabsTrigger value="counter">Sayaç</TabsTrigger>
            <TabsTrigger value="cart">Sepet</TabsTrigger>
            <TabsTrigger value="error">Error Handling</TabsTrigger>
            <TabsTrigger value="form">React Hook Form</TabsTrigger>
          </TabsList>

          <TabsContent value="theme" className="mt-6">
            <ThemeExample />
          </TabsContent>

          <TabsContent value="user" className="mt-6">
            <UserExample />
          </TabsContent>

          <TabsContent value="counter" className="mt-6">
            counter
          </TabsContent>

          <TabsContent value="cart" className="mt-6">
            cart
          </TabsContent>

          <TabsContent value="error" className="mt-6">
            <ErrorHandlingExample />
          </TabsContent>

          <TabsContent value="form" className="mt-6">
            <ReactHookFormExample />
          </TabsContent>
        </Tabs>
      </div>
    </ThemeProvider>
    </UserProvider>
   
  );
}

export default ContextApiExampleView;
