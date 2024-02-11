import { Container, Navbar } from "react-bootstrap";
import { User } from "../models/user";

interface NavBarProps {
  loggedInUser: User | null;
  onSignUpClicked: () => void;
  onLoginClicked: () => void;
  onLogoutClicked: () => void;
}

export default function NavBar({
  loggedInUser,
  onSignUpClicked,
  onLoginClicked,
  onLogoutClicked,
}: NavBarProps) {
  return (
    <Navbar bg="primary" variant="dark" expand="lg" sticky="top">
      <Container>
        <Navbar.Brand>Cool Notes App</Navbar.Brand>
      </Container>
    </Navbar>
  );
}
