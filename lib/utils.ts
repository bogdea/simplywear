import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
// remove product from cart
export const removeFromCart = async (
  productId: string,
  setCart: (cart: any) => void,
  cart: any,
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

  setCart(
    Array.isArray(cart)
      ? cart.filter((item) => item.productId !== productId)
      : [],
  );
};

// remove all products from cart
export const removeAllFromCart = async (setCart: (cart: any) => void) => {
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
