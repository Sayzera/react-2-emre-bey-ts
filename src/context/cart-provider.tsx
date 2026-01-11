import { useState, type ReactNode } from "react"
import { CartContext, type CartProduct } from "./cart-context";


function CartProvider({ children }: { children: ReactNode }) {
    const [products, setProducts] = useState<CartProduct[]>([]);

    const addProduct = (product: Omit<CartProduct, "quantity">) => {
        setProducts((prev) => {
            const existingProduct = prev.find((prod) => prod.id === product.id)
            if (existingProduct) {
                return prev.map((prod) =>
                    prod.id === product.id ? { ...prod, quantity: prod.quantity + 1 } : prod)
            }
            return [...prev, { ...product, quantity: 1 }]
        })
    }

    const removeProduct = (id: string) => {
        setProducts((prev) => prev.filter((product) => product.id !== id))
    }

    const updateQuantity = (id: string, quantity: number) => {
        if (quantity <= 0) {
            removeProduct(id)
            return;
        }
        setProducts((prev) => prev.map((product) => (product.id === id) ? { ...product, quantity } : product))
    }

    const clearAllCart = () => {
        setProducts([]);
    };

    const totalPrice = products.reduce(
        (sum, product) => sum + product.price * product.quantity,
        0
    );
    const productCount = products.reduce((sum, product) => sum + product.quantity, 0);

    const totalAllPrice: number = products.reduce((sum: number, product) => {
        return sum + product.price * product.quantity;
    }, 0);

    return (
        <CartContext.Provider value={{
            products,
            addProduct,
            removeProduct,
            updateQuantity,
            clearAllCart,
            totalPrice,
            productCount,
            totalAllPrice
        }}>
            {children}
        </CartContext.Provider>
    )
}

export default CartProvider