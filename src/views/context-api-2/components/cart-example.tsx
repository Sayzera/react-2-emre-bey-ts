import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useCart } from '@/hooks/use-cart';
import { useState } from 'react';
type Props = {}

const sampleProducts = [
    { id: "1", name: "Television", price: 25000 },
    { id: "2", name: "Telephone", price: 37500 },
    { id: "3", name: "HDD", price: 500 },
    { id: "4", name: "Cable", price: 250 },
    { id: "5", name: "Usb Drive", price: 1250 }
];


function CartExample({ }: Props) {
    const { products,
        addProduct,
        removeProduct,
        updateQuantity,
        clearAllCart,
        totalPrice,
        productCount,
        totalAllPrice } = useCart();

    const [inputValue, setInputValue] = useState(1)


    return (
        <div className="flex h-screen p-8 gap-8 bg-gray-100">
            <div className="w-1/2 bg-white p-6 rounded shadow">
                <h2 className="text-xl font-bold mb-4 text-center">Ürünler</h2>

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
                            onClick={() => addProduct(product)}
                            size="sm"
                            variant="outline"
                        >
                            Sepete Ekle
                        </Button>
                    </div>
                ))}

            </div>

            <div className="w-1/2 bg-white p-6 rounded shadow">
                <h2 className="text-xl font-bold mb-4 text-center">Sepet</h2>


                <hr className="my-4 border-3" />
                <div className="flex items-center justify-between">
                    <h3 className="font-semibold">Sepet ({productCount} ürün)</h3>
                    <h4>total Price :  {totalPrice.toLocaleString("tr-TR")} </h4>
                    {products.length > 0 && (
                        <Button onClick={clearAllCart} size="sm" variant="ghost">
                            Sepeti Temizle
                        </Button>
                    )}
                </div>

                {products.map((product) => (
                    <div
                        key={product.id}
                        className="p-3 border rounded-lg space-y-2"
                    >
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="font-medium">{product.name}</p>
                                <p className="text-sm text-muted-foreground">
                                    {product.price.toLocaleString("tr-TR")} ₺
                                </p>
                            </div>
                            <Button
                                onClick={() => removeProduct(product.id)}
                                size="sm"
                                variant="ghost"
                            >
                                ✕
                            </Button>
                        </div>
                        <div className="flex items-center gap-2">
                            <Button
                                onClick={() =>
                                    updateQuantity(product.id, product.quantity - 1)
                                }
                                size="sm"
                                variant="outline"
                            >
                                -
                            </Button>
                            <input
                                type="number"
                                value={inputValue}
                                onChange={(e) => setInputValue(Number(e.target.value))}
                                onKeyDown={(e) => {
                                    if (e.key === "Enter") {
                                        updateQuantity(product.id, Number(inputValue));
                                    }
                                }}
                                className="w-16 border rounded text-center"
                            />
                            <Button
                                onClick={() => {
                                    updateQuantity(product.id, Number(inputValue))
                                }}

                            >Sayı ile ekle</Button>

                            <Badge variant="secondary" className="min-w-[40px] justify-center">
                                {product.quantity}
                            </Badge>
                            <Button
                                onClick={() =>
                                    updateQuantity(product.id, product.quantity + 1)
                                }
                                size="sm"
                                variant="outline"
                            >
                                +
                            </Button>
                            <span className="ml-auto font-semibold">
                                {(product.price * product.quantity).toLocaleString("tr-TR")} ₺
                            </span>
                        </div>
                    </div>
                ))}
            </div>

        </div>

    );
}

export default CartExample