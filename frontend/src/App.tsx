import { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import styles from "./styles/NotesPage.module.css";
import { Note as NoteModal } from "./models/note";
import Note from "./components/Note";
import * as NotesApi from "./api/note_api";

function App() {
  const [notes, setNotes] = useState<NoteModal[]>([]);

  useEffect(function () {
    async function getNotes() {
      try {
        const notes = await NotesApi.fetchNotes();
        setNotes(notes);
      } catch (error) {
        console.error(error);
        alert(error);
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
