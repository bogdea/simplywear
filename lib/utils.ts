import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

type CartItem = {
  productId: string;
  quantity: number;
};

// remove product from cart
export const removeFromCart = async (
  productId: string,
  setCart: (cart: CartItem[]) => void,
  cart: CartItem[],
) => {
  const res = await fetch("/api/cart", {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ productId }),
  });

  if (!res.ok) {
    const errorData = await res.json();
    console.error("error removing item:", errorData);
    return;
  }

  setCart(cart.filter((item) => item.productId !== productId));
};

// remove all products from cart
export const removeAllFromCart = async (
  setCart: (cart: CartItem[]) => void,
) => {
  try {
    const res = await fetch("/api/cart/clear", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
    });

    if (!res.ok) {
      const errorData = await res.json();
      console.error("error clearing cart: " + errorData.error);
      return;
    }

    setCart([]);
  } catch (error: any) {
    console.error("error clearing cart: " + error.message);
  }
};
