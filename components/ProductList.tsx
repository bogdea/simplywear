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
    const fetchProducts = async () => {
      try {
        const res = await fetch("/api/products");
        const data = await res.json();

        setProducts(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error("error fetching products:", error);
        setProducts([]);
      }
    };

    fetchProducts();
  }, []);

  return (
    <Container>
      <div className="grid grid-cols-1 gap-3 md:grid-cols-2 xl:grid-cols-4">
        {products.length > 0 ? (
          products.map((product) => (
            <ProductCard
              key={product.id}
              id={product.id}
              name={product.name}
              price={`$${product.price}`}
              image={product.image}
            />
          ))
        ) : (
          <p>no products available</p>
        )}
      </div>
    </Container>
  );
};

export default ProductList;
