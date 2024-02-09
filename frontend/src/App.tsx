import { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { Note as NoteModal } from "./models/note";
import styles from "./styles/NotesPgae.module.css";
import Note from "./components/Note";

function App() {
  const [notes, setNotes] = useState<NoteModal[]>([]);

  useEffect(function () {
    async function getNotes() {
      try {
        const res = await fetch("/api/notes", {
          method: "GET",
        });
        const notes = await res.json();
        setNotes(notes);
      } catch (error) {
        console.error(error);
      }
    }
    getNotes();
  }, []);
  return (
    <Container>
      <Row xs={1} md={2} xl={3} className="g-4">
        {notes.map((note) => (
          <Col key={note._id}>
            <Note className={styles.note} note={note} />
          </Col>
        ))}
      </Row>
    </Container>
  );
}

export default App;
