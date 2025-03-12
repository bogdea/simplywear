"use client";

import { useEffect, useState } from "react";
import { useCartStore } from "@/store/cart";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { removeFromCart, removeAllFromCart } from "@/lib/utils";
import { useRouter } from "next/navigation";
import Container from "@/components/ui/Container";

const Checkout = () => {
  const { cart, setCart } = useCartStore();
  const [loading, setLoading] = useState(true);
  const [paying, setPaying] = useState(false);
  const [success, setSuccess] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const fetchCart = async () => {
      setLoading(true);
      const res = await fetch("/api/cart");
      if (!res.ok) return;
      const data = await res.json();
      setCart(data);
      setLoading(false);
    };

    fetchCart();
  }, []);

  const totalPrice = cart.reduce(
    (acc, item) => acc + item.quantity * (item.product?.price || 0),
    0,
  );

  const handleRemoveFromCart = (productId: string) => {
    // @ts-ignore
    removeFromCart(productId, setCart, cart);
  };

  const handleFakePayment = async () => {
    setPaying(true);

    // @ts-ignore
    await removeAllFromCart(setCart);

    setTimeout(() => {
      setPaying(false);
      setSuccess(true);
    }, 0);
  };

  if (success) {
    return (
      <div className="mx-auto max-w-xl p-6 text-center">
        <h1 className="mb-4 text-xl font-semibold text-green-600">
          payment successful
        </h1>
        <p className="text-muted">thank you for your order</p>
        <Button onClick={() => router.push("/")} className="mt-4">
          back to home
        </Button>
      </div>
    );
  }

  return (
    <Container>
      <div className="mx-auto max-w-[500px]">
        <h1 className="mb-7 text-xl font-semibold">checkout</h1>

        {loading ? (
          <p>loading cart...</p>
        ) : cart.length === 0 ? (
          <p>your cart is empty</p>
        ) : (
          <div className="space-y-4">
            {cart.map((item) => (
              <div key={item.id} className="flex items-center justify-between">
                <div className="flex space-x-4">
                  {item.product?.image ? (
                    <img
                      src={item.product.image}
                      alt={item.product.name}
                      className="w-16"
                    />
                  ) : (
                    <div className="h-16 w-16 bg-gray-200" />
                  )}
                  <div>
                    <p>{item.product?.name}</p>
                    <p className="text-sm text-muted">
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
              </div>
            ))}

            <Separator />

            <div className="flex justify-between text-lg font-semibold">
              <p>total</p>
              <p>${totalPrice}</p>
            </div>

            <Button
              onClick={handleFakePayment}
              disabled={paying}
              className="w-full text-lg"
            >
              {paying ? "processing..." : "pay now"}
            </Button>
          </div>
        )}
      </div>
    </Container>
  );
};

export default Checkout;
