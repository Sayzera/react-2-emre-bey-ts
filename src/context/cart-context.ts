import { createContext } from "react";

export interface CartProduct {
    id: string;
    name: string;
    price: number;
    quantity: number;
}

interface CartContextType {
    products: CartProduct[];
    addProduct: (product: Omit<CartProduct, "quantity">) => void; // cardProduct'tan quantity çıktı
    removeProduct: (id: string) => void;
    updateQuantity: (id: string, quantity: number) => void;
    clearAllCart: () => void;
    totalPrice: number;
    productCount: number;
    totalAllPrice : number
}

export const CartContext = createContext<CartContextType | undefined>(undefined);