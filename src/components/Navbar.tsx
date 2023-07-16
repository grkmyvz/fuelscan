import { Container, Nav, Navbar } from 'react-bootstrap';

export default function NavbarComponent() {
  return (
    <Navbar bg="dark" data-bs-theme="dark">
      <Container>
        <Navbar.Brand href="/">FuelScan</Navbar.Brand>
        <Nav className="float-end">
          <span className="text-success">♥ Build for Blockchain</span>
        </Nav>
      </Container>
    </Navbar>
  );
}
