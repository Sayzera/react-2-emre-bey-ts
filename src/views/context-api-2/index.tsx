import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ThemeExample from "./components/theme-example";
import { ThemeProvider } from "@/context/theme-provider";
import UserExample from "./components/user-example";
import { UserProvider } from "@/context/user-provider";
import CartExample from "./components/cart-example";
import CartProvider from "@/context/cart-provider";

function ContextApiExampleView() {
  // TODO: ForwardRef araştıralım 
  return (
    <CartProvider>
      <UserProvider>
        <ThemeProvider>
          <div className="w-[80%] mx-auto p-5 border-dashed border mt-2 rounded-md shadow-md min-h-[calc(100vh-200px)]">
            <Tabs defaultValue="theme" className="w-full ">
              <TabsList className="grid w-full grid-cols-1 md:grid-cols-4">
                <TabsTrigger value="theme">Tema</TabsTrigger>
                <TabsTrigger value="user">Kullanıcı</TabsTrigger>
                <TabsTrigger value="counter">Sayaç</TabsTrigger>
                <TabsTrigger value="cart">Sepet</TabsTrigger>
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
                <CartExample />
              </TabsContent>
            </Tabs>
          </div>
        </ThemeProvider>
      </UserProvider>
    </CartProvider>

  );
}

export default ContextApiExampleView;
