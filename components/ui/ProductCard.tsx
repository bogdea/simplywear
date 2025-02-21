import { Card, CardContent, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

type ProductCardProps = {
  name: string;
  price: string;
  image: string;
};

const ProductCard = ({ name, price, image }: ProductCardProps) => {
  return (
    <Card className="w-full">
      <CardDescription className="text-sm text-gray-500">
        {price}
      </CardDescription>

      <CardContent>
        <img src={image} alt={name} className="m-auto w-40" />
      </CardContent>

      <div className="mt-3">
        <Button variant="outline" className="w-full">
          add to cart
        </Button>
      </div>
    </Card>
  );
};

export default ProductCard;
