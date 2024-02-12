import { Button } from "react-bootstrap";

interface NavBarLoggedOutViewProps {
  onSignUpClicked: () => void;
  onLoginClicked: () => void;
}

export default function NavBarLoggedOutView({
  onSignUpClicked,
  onLoginClicked,
}: NavBarLoggedOutViewProps) {
  return (
    <>
      <Button onClick={onSignUpClicked}>Sign up</Button>
      <Button onClick={onLoginClicked}>Log in</Button>
    </>
  );
}
