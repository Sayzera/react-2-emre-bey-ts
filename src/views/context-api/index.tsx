import { ThemeProvider } from "@/context/theme-provider";
import { UserProvider } from "@/context/user-provider";
import { CounterProvider } from "@/context/counter-provider";
import { CartProvider } from "@/context/cart-provider";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ThemeExample } from "./components/theme-example";
import { UserExample } from "./components/user-example";
import { CounterExample } from "./components/counter-example";
import { CartExample } from "./components/cart-example";

function ContextApiExampleView() {
  return (
    <ThemeProvider>
      <UserProvider>
        <CounterProvider>
          <CartProvider>
            <div className="min-h-screen bg-background p-6">
              <div className="max-w-7xl mx-auto space-y-8">
                {/* Header */}
                <div className="text-center space-y-4">
                  <h1 className="text-4xl font-bold">
                    React Context API Öğreticisi
                  </h1>
                  <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                    Context API, React'te prop drilling sorununu çözmek ve
                    global state yönetimi sağlamak için kullanılan güçlü bir
                    özelliktir.
                  </p>
                </div>

                {/* Introduction Card */}
                <Card>
                  <CardHeader>
                    <CardTitle>Context API Nedir?</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="space-y-3">
                        <h3 className="font-semibold">
                          Problem: Props Drilling
                        </h3>
                        <p className="text-sm text-muted-foreground">
                          React'te veriyi derin bileşenlere aktarmak için her
                          seviyede prop geçirmek gerekir. Bu durum kod
                          karmaşıklığını artırır ve bakımı zorlaştırır.
                        </p>
                        <div className="bg-muted p-3 rounded text-xs font-mono">
                          App → Component1 → Component2 → Component3 →
                          Component4
                        </div>
                      </div>
                      <div className="space-y-3">
                        <h3 className="font-semibold">Çözüm: Context API</h3>
                        <p className="text-sm text-muted-foreground">
                          Context API ile veriyi Provider ile sararak, herhangi
                          bir bileşenden direkt erişim sağlanır. Props drilling
                          sorunu ortadan kalkar.
                        </p>
                        <div className="bg-muted p-3 rounded text-xs font-mono">
                          Provider → Herhangi bir Component
                        </div>
                      </div>
                    </div>

                    <div className="border-t pt-4 space-y-2">
                      <h3 className="font-semibold">Temel Kavramlar:</h3>
                      <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                        <li>
                          <strong>createContext:</strong> Yeni bir context
                          oluşturur
                        </li>
                        <li>
                          <strong>Provider:</strong> Context değerlerini sağlar
                          ve bileşenleri sarar
                        </li>
                        <li>
                          <strong>useContext:</strong> Context değerlerine
                          erişmek için hook
                        </li>
                        <li>
                          <strong>Custom Hook:</strong> useContext'i
                          sarmalayarak daha temiz kod
                        </li>
                      </ul>
                    </div>
                  </CardContent>
                </Card>

                {/* Examples Tabs */}
                <Card>
                  <CardHeader>
                    <CardTitle>Pratik Örnekler</CardTitle>
                    <CardDescription>
                      Aşağıdaki örneklerle Context API'nin farklı kullanım
                      senaryolarını inceleyin
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Tabs defaultValue="theme" className="w-full">
                      <TabsList className="grid w-full grid-cols-4">
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
                        <CounterExample />
                      </TabsContent>

                      <TabsContent value="cart" className="mt-6">
                        <CartExample />
                      </TabsContent>
                    </Tabs>
                  </CardContent>
                </Card>

                {/* Best Practices */}
                <Card>
                  <CardHeader>
                    <CardTitle>En İyi Uygulamalar</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="space-y-3">
                        <h3 className="font-semibold text-green-600">
                          ✅ Yapılması Gerekenler
                        </h3>
                        <ul className="space-y-2 text-sm text-muted-foreground">
                          <li>
                            • Custom hook oluşturarak useContext'i sarmalayın
                          </li>
                          <li>• Provider'da hata kontrolü yapın</li>
                          <li>• İlgili state'leri mantıklı gruplara ayırın</li>
                          <li>• TypeScript ile tip güvenliği sağlayın</li>
                          <li>• Sadece gerektiğinde Context kullanın</li>
                        </ul>
                      </div>
                      <div className="space-y-3">
                        <h3 className="font-semibold text-red-600">
                          ❌ Yapılmaması Gerekenler
                        </h3>
                        <ul className="space-y-2 text-sm text-muted-foreground">
                          <li>• Her şeyi tek bir Context'te tutmayın</li>
                          <li>
                            • Sık değişen değerler için Context kullanmayın
                          </li>
                          <li>
                            • Küçük prop geçişleri için Context kullanmayın
                          </li>
                          <li>
                            • Provider'ı gereksiz yere yeniden render etmeyin
                          </li>
                          <li>• useMemo/useCallback kullanmayı unutmayın</li>
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Code Structure */}
                <Card>
                  <CardHeader>
                    <CardTitle>Kod Yapısı</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <h3 className="font-semibold mb-2">
                          1. Context Oluşturma
                        </h3>
                        <pre className="bg-muted p-4 rounded-lg overflow-x-auto text-xs">
                          <code>{`import { createContext } from 'react';

export const MyContext = createContext<MyContextType | undefined>(undefined);`}</code>
                        </pre>
                      </div>
                      <div>
                        <h3 className="font-semibold mb-2">
                          2. Provider Bileşeni
                        </h3>
                        <pre className="bg-muted p-4 rounded-lg overflow-x-auto text-xs">
                          <code>{`export function MyProvider({ children }) {
  const [state, setState] = useState(initialValue);
  
  return (
    <MyContext.Provider value={{ state, setState }}>
      {children}
    </MyContext.Provider>
  );
}`}</code>
                        </pre>
                      </div>
                      <div>
                        <h3 className="font-semibold mb-2">3. Custom Hook</h3>
                        <pre className="bg-muted p-4 rounded-lg overflow-x-auto text-xs">
                          <code>{`export function useMyContext() {
  const context = useContext(MyContext);
  if (!context) {
    throw new Error('useMyContext must be used within MyProvider');
  }
  return context;
}`}</code>
                        </pre>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </CartProvider>
        </CounterProvider>
      </UserProvider>
    </ThemeProvider>
  );
}

export default ContextApiExampleView;
