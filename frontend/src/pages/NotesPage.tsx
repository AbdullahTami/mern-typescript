import { Container } from "react-bootstrap";
import NotesPageLoggedInView from "../components/NotesPageLoggedInView";
import NotesPageLoggedOutView from "../components/NotesPageLoggedOutView";
import styles from "../styles/NotesPage.module.css";
import { User } from "../models/user";

interface NotesPageProps {
  loggedInUser: User | null;
}
export default function NotesPage({ loggedInUser }: NotesPageProps) {
  return (
    <Container className={styles.notesPage}>
      <>
        {loggedInUser ? <NotesPageLoggedInView /> : <NotesPageLoggedOutView />}
      </>
    </Container>
  );
}
