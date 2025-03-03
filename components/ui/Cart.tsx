"use client";

import { useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useCartStore } from "@/store/cart";

const Cart = () => {
  const { cart, setCart } = useCartStore();

  useEffect(() => {
    const fetchCart = async () => {
      const res = await fetch("/api/cart");
      if (!res.ok) return;
      const data = await res.json();
      setCart(data);
    };

    fetchCart();
  }, []);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <div className="flex items-center gap-1">
          <img
            src="/icons/cart.svg"
            alt="cart"
            className="h-4 w-5 cursor-pointer"
          />

          <span className="text-xs">{cart.length}</span>
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-60 space-y-2">
        {cart.length === 0 ? (
          <p className="p-2 text-center">empty</p>
        ) : (
          cart.map((item) => (
            <Card key={item.id}>
              <CardContent className="flex items-center gap-2">
                <img
                  src={item.product.image}
                  alt={item.product.name}
                  className="w-10"
                />
                <div>
                  <p className="text-sm">{item.product.name}</p>
                  <p className="text-xs text-gray-500">
                    {item.quantity} × ${item.product.price}
                  </p>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default Cart;
