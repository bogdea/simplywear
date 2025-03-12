"use client";

import { Card, CardContent, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useCartStore } from "@/store/cart";

type ProductCardProps = {
  id: string;
  name: string;
  price: string;
  image: string;
};

const ProductCard = ({ id, name, price, image }: ProductCardProps) => {
  const [loading, setLoading] = useState(false);
  const addToCartStore = useCartStore((state) => state.addToCart);

  const addToCart = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/cart", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ productId: id, quantity: 1 }),
      });

      const text = await res.text();

      if (!res.ok) throw new Error(text || "failed to add to cart");

      const data = text ? JSON.parse(text) : null;

      if (data) addToCartStore(data);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="w-full">
      <CardDescription className="text-sm text-gray-500">
        {price}
      </CardDescription>

      <CardContent>
        <img src={image} alt={name} className="m-auto w-40" />
      </CardContent>

      <div className="mt-3">
        <Button
          variant="outline"
          className="w-full"
          onClick={addToCart}
          disabled={loading}
        >
          {loading ? "adding..." : "add to cart"}
        </Button>
      </div>
    </Card>
  );
};

export default ProductCard;
