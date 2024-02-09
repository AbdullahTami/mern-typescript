import { useEffect, useState } from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import styles from "./styles/NotesPage.module.css";
import { Note as NoteModal } from "./models/note";
import Note from "./components/Note";
import * as NotesApi from "./api/note_api";
import AddNoteDialogue from "./components/AddNoteDialogue";

function App() {
  const [notes, setNotes] = useState<NoteModal[]>([]);
  const [showAddNoteDialogue, setShowAddNoteDialogue] = useState(false);

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
      <Button onClick={() => setShowAddNoteDialogue(true)}>Add new note</Button>
      <Row xs={1} md={2} xl={3} className="g-4">
        {notes.map((note) => (
          <Col key={note._id}>
            <Note className={styles.note} note={note} />
          </Col>
        ))}
      </Row>
      {showAddNoteDialogue && (
        <AddNoteDialogue onDismiss={() => setShowAddNoteDialogue(false)} />
      )}
    </Container>
  );
}

export default App;
