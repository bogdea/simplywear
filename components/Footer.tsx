import Container from "./ui/Container";

const Footer = () => {
  return (
    <footer className="py-6 text-center text-sm text-muted">
      <Container>
        <p>&copy; {new Date().getFullYear()} simplywear</p>
      </Container>
    </footer>
  );
};

export default Footer;
