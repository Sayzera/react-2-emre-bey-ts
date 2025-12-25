import { useContext } from "react";
import { CartContext } from "@/context/cart-context";

export function useCart() {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error("useCart hook'u CartProvider içinde kullanılmalıdır!");
  }

  return context;
}

