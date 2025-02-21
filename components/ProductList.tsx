import Container from "./ui/Container";
import ProductCard from "./ui/ProductCard";

const products = [
  { id: 1, name: "t-shirt", price: "$25", image: "/images/tshirt.png" },
  { id: 2, name: "pants", price: "$40", image: "/images/pants.png" },
  { id: 3, name: "hoodie", price: "$50", image: "/images/hoodie.png" },
  { id: 4, name: "sneakers", price: "$60", image: "/images/sneakers.png" },
];

const ProductList = () => {
  return (
    <Container>
      <div className="grid grid-cols-1 gap-3 md:grid-cols-2 xl:grid-cols-4">
        {products.map((product) => (
          <ProductCard
            key={product.id}
            name={product.name}
            price={product.price}
            image={product.image}
          />
        ))}
      </div>
    </Container>
  );
};

export default ProductList;
