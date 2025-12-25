import { useCart } from "@/hooks/use-cart";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

const sampleProducts = [
  { id: "1", name: "Laptop", price: 15000 },
  { id: "2", name: "Mouse", price: 250 },
  { id: "3", name: "Klavye", price: 500 },
  { id: "4", name: "Monitör", price: 5000 },
];

export function CartExample() {
  const { items, addItem, removeItem, updateQuantity, clearCart, total, itemCount } = useCart();

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Alışveriş Sepeti Örneği</CardTitle>
          <CardDescription>
            Context API ile sepet yönetimi ve global state
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h3 className="font-semibold">Ürünler</h3>
              <div className="space-y-2">
                {sampleProducts.map((product) => (
                  <div
                    key={product.id}
                    className="flex items-center justify-between p-3 border rounded-lg"
                  >
                    <div>
                      <p className="font-medium">{product.name}</p>
                      <p className="text-sm text-muted-foreground">
                        {product.price.toLocaleString("tr-TR")} ₺
                      </p>
                    </div>
                    <Button
                      onClick={() => addItem(product)}
                      size="sm"
                      variant="outline"
                    >
                      Sepete Ekle
                    </Button>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-semibold">Sepet ({itemCount} ürün)</h3>
                {items.length > 0 && (
                  <Button onClick={clearCart} size="sm" variant="ghost">
                    Sepeti Temizle
                  </Button>
                )}
              </div>

              {items.length === 0 ? (
                <div className="text-center py-8 text-muted-foreground">
                  Sepetiniz boş
                </div>
              ) : (
                <div className="space-y-3">
                  {items.map((item) => (
                    <div
                      key={item.id}
                      className="p-3 border rounded-lg space-y-2"
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">{item.name}</p>
                          <p className="text-sm text-muted-foreground">
                            {item.price.toLocaleString("tr-TR")} ₺
                          </p>
                        </div>
                        <Button
                          onClick={() => removeItem(item.id)}
                          size="sm"
                          variant="ghost"
                        >
                          ✕
                        </Button>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button
                          onClick={() =>
                            updateQuantity(item.id, item.quantity - 1)
                          }
                          size="sm"
                          variant="outline"
                        >
                          -
                        </Button>
                        <Badge variant="secondary" className="min-w-[40px] justify-center">
                          {item.quantity}
                        </Badge>
                        <Button
                          onClick={() =>
                            updateQuantity(item.id, item.quantity + 1)
                          }
                          size="sm"
                          variant="outline"
                        >
                          +
                        </Button>
                        <span className="ml-auto font-semibold">
                          {(item.price * item.quantity).toLocaleString("tr-TR")} ₺
                        </span>
                      </div>
                    </div>
                  ))}
                  <Separator />
                  <div className="flex justify-between items-center font-bold text-lg">
                    <span>Toplam:</span>
                    <span>{total.toLocaleString("tr-TR")} ₺</span>
                  </div>
                </div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Avantajları</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2 text-sm">
            <p>
              ✅ <strong>Props Drilling Yok:</strong> Her seviyede prop geçirmeye
              gerek yok
            </p>
            <p>
              ✅ <strong>Global State:</strong> Sepet bilgisi her yerden
              erişilebilir
            </p>
            <p>
              ✅ <strong>Merkezi Yönetim:</strong> Tüm sepet işlemleri tek bir
              yerde
            </p>
            <p>
              ✅ <strong>Performans:</strong> Sadece ilgili bileşenler
              güncellenir
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

