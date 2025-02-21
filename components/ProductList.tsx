"use client";

import Container from "./ui/Container";
import ProductCard from "./ui/ProductCard";
import { useEffect, useState } from "react";

type Product = {
  id: string;
  name: string;
  price: number;
  image: string;
};

const ProductList = () => {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    fetch("/api/products")
      .then((res) => res.json())
      .then((data) => setProducts(data));
  }, []);

  return (
    <Container>
      <div className="grid grid-cols-4 gap-6">
        {products.map((product) => (
          <ProductCard
            key={product.id}
            name={product.name}
            price={`$${product.price}`}
            image={product.image}
          />
        ))}
      </div>
    </Container>
  );
};

export default ProductList;
