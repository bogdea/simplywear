import { create } from "zustand";

type CartItem = {
  id: string;
  productId: string;
  quantity: number;
  product: { name: string; price: number; image: string };
};

type CartStore = {
  cart: CartItem[];
  addToCart: (item: CartItem) => void;
  setCart: (items: CartItem[]) => void;
};

export const useCartStore = create<CartStore>((set) => ({
  cart: [],
  addToCart: (item) =>
    set((state) => {
      const existing = state.cart.find((i) => i.productId === item.productId);
      if (existing) {
        return {
          cart: state.cart.map((i) =>
            i.productId === item.productId
              ? { ...i, quantity: i.quantity + item.quantity }
              : i,
          ),
        };
      }
      return { cart: [...state.cart, item] };
    }),
  setCart: (items) => set({ cart: items }),
}));
