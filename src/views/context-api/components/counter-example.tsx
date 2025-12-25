import { useCounter } from "@/hooks/use-counter";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { useState } from "react";

export function CounterExample() {
  const { count, increment, decrement, reset, setCount } = useCounter();
  const [customValue, setCustomValue] = useState("");

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Sayaç Örneği</CardTitle>
          <CardDescription>
            Context API ile global sayaç yönetimi
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="text-center">
            <div className="text-6xl font-bold mb-4">{count}</div>
            <Badge variant="outline" className="text-lg">
              Mevcut Değer
            </Badge>
          </div>

          <div className="flex gap-2 justify-center flex-wrap">
            <Button onClick={increment} size="lg">
              +1 Artır
            </Button>
            <Button onClick={decrement} size="lg" variant="outline">
              -1 Azalt
            </Button>
            <Button onClick={reset} size="lg" variant="destructive">
              Sıfırla
            </Button>
          </div>

          <div className="flex gap-2 items-center">
            <Input
              type="number"
              placeholder="Özel değer"
              value={customValue}
              onChange={(e) => setCustomValue(e.target.value)}
              className="max-w-[200px]"
            />
            <Button
              onClick={() => {
                const num = parseInt(customValue);
                if (!isNaN(num)) {
                  setCount(num);
                  setCustomValue("");
                }
              }}
              variant="secondary"
            >
              Değer Ata
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Kod Örneği</CardTitle>
        </CardHeader>
        <CardContent>
          <pre className="bg-muted p-4 rounded-lg overflow-x-auto text-xs">
            <code>{`// Context Oluşturma
const CounterContext = createContext();

// Provider ile State Yönetimi
function CounterProvider({ children }) {
  const [count, setCount] = useState(0);
  
  const increment = () => setCount(prev => prev + 1);
  const decrement = () => setCount(prev => prev - 1);
  
  return (
    <CounterContext.Provider value={{ count, increment, decrement }}>
      {children}
    </CounterContext.Provider>
  );
}

// Hook ile Kullanım
function MyComponent() {
  const { count, increment } = useCounter();
  return <button onClick={increment}>{count}</button>;
}`}</code>
          </pre>
        </CardContent>
      </Card>
    </div>
  );
}

