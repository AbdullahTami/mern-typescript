import { Button, Navbar } from "react-bootstrap";
import * as NoteApi from "../api/note_api";
import { User } from "../models/user";

interface NavBarLoggedInViewProps {
  user: User;
  onLogoutSuccessful: () => void;
}

export default function NavBarLoggedInView({
  user,
  onLogoutSuccessful,
}: NavBarLoggedInViewProps) {
  async function logout() {
    try {
      await NoteApi.logout();
      onLogoutSuccessful();
    } catch (error) {
      alert(error);
      console.error(error);
    }
  }

  return (
    <>
      <Navbar.Text className="me-2">Sign in as: {user.username}</Navbar.Text>
      <Button onClick={logout}>Log out</Button>
    </>
  );
}
