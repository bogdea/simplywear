"use client";

import { useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useCartStore } from "@/store/cart";
import { Button } from "./button";
import Link from "next/link";
import { removeFromCart } from "@/lib/utils";

const Cart = () => {
  const { cart, setCart } = useCartStore();
  const safeCart = Array.isArray(cart) ? cart : [];

  useEffect(() => {
    const fetchCart = async () => {
      const res = await fetch("/api/cart");
      if (!res.ok) return;
      const data = await res.json();
      setCart(data);
    };

    fetchCart();
  }, []);

  const handleRemoveFromCart = (productId: string) => {
    // @ts-expect-error: temporarily ignoring type mismatch for setCart
    removeFromCart(productId, setCart, cart);
  };

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
        {safeCart.length === 0 ? (
          <p className="p-2 text-center">no products added</p>
        ) : (
          safeCart.map((item) => (
            <Card key={item.id}>
              <CardContent className="flex items-center justify-between">
                <div className="flex space-x-2">
                  {item.product && item.product.image ? (
                    <img
                      src={item.product.image}
                      alt={item.product.name}
                      className="w-10"
                    />
                  ) : (
                    <div className="h-10 w-10 bg-gray-200" />
                  )}
                  <div>
                    <p className="text-sm">{item.product?.name}</p>
                    <p className="text-xs text-gray-500">
                      {item.quantity} × ${item.product?.price}
                    </p>
                  </div>
                </div>

                <span
                  onClick={() => handleRemoveFromCart(item.productId)}
                  className="cursor-pointer"
                >
                  <img
                    src="/icons/delete.svg"
                    alt="delete"
                    className="h-4 w-5"
                  />
                </span>
              </CardContent>
            </Card>
          ))
        )}
        <Button className="mt-4 w-full">
          <Link href={"/checkout"} className="w-full">
            finish and pay
          </Link>
        </Button>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default Cart;
