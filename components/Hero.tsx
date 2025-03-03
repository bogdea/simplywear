import { Button } from "./ui/button";
import Container from "./ui/Container";

const Hero = () => {
  return (
    <Container>
      <div className="flex flex-col items-center justify-center gap-6 py-24 text-center">
        <h1 className="text-4xl font-medium tracking-tight md:text-6xl">
          simply modern{" "}
        </h1>
        <div className="flex gap-3">
          <Button variant="outline">explore</Button>
          <Button>discover</Button>
        </div>
      </div>
    </Container>
  );
};

export default Hero;
