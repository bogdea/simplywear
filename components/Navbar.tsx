import Cart from "./ui/Cart";
import User from "./ui/User";
import Container from "./ui/Container";

const Navbar = () => {
  return (
    <nav className="shadow-md">
      <Container>
        <div className="flex items-center justify-between">
          <h1 className="text-xl font-semibold">simplywear</h1>

          <div className="flex gap-2">
            <User />
            <Cart />
          </div>
        </div>
      </Container>
    </nav>
  );
};

export default Navbar;
