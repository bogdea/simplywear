import Cart from "./ui/Cart";
import Container from "./ui/Container";

const Navbar = () => {
  return (
    <nav className="shadow-md">
      <Container>
        <div className="flex items-center justify-between">
          <h1 className="text-xl font-semibold">simplywear</h1>

          <Cart />
        </div>
      </Container>
    </nav>
  );
};

export default Navbar;
