import { useEffect, useState } from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import styles from "./styles/NotesPage.module.css";
import styleUtils from "./styles/utils.module.css";
import { FaPlus } from "react-icons/fa";
import { Note as NoteModal } from "./models/note";
import Note from "./components/Note";
import * as NotesApi from "./api/note_api";
import AddNoteDialogue from "./components/AddEditNoteDialogue";

function App() {
  const [notes, setNotes] = useState<NoteModal[]>([]);
  const [showAddNoteDialogue, setShowAddNoteDialogue] = useState(false);

  const [noteToEdit, setNoteToEdit] = useState<NoteModal | null>(null);

  async function deleteNote(note: NoteModal) {
    try {
      await NotesApi.deleteNote(note._id);
      setNotes(
        notes.filter((existingNote: NoteModal) => existingNote._id !== note._id)
      );
    } catch (error) {
      console.log(error);
      alert(error);
    }
  }

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
      <Button
        className={`${styleUtils.blockCenter} mb-4 
        ${styleUtils.flexCenter}`}
        onClick={() => setShowAddNoteDialogue(true)}
      >
        <FaPlus />
        Add new note
      </Button>
      <Row xs={1} md={2} xl={3} className="g-4">
        {notes.map((note) => (
          <Col key={note._id}>
            <Note
              onNoteClicked={setNoteToEdit}
              onDeleteNoteClicked={deleteNote}
              className={styles.note}
              note={note}
            />
          </Col>
        ))}
      </Row>
      {showAddNoteDialogue && (
        <AddNoteDialogue
          onNoteSaved={(newNote) => {
            setNotes([...notes, newNote]);
            setShowAddNoteDialogue(false);
          }}
          onDismiss={() => setShowAddNoteDialogue(false)}
        />
      )}
      {noteToEdit && (
        <AddNoteDialogue
          noteToEdit={noteToEdit}
          onDismiss={() => setNoteToEdit(null)}
          onNoteSaved={(updatedNote) => {
            setNotes(
              notes.map((existingNote) =>
                existingNote._id === updatedNote._id
                  ? updatedNote
                  : existingNote
              )
            );
            setNoteToEdit(null);
          }}
        />
      )}
    </Container>
  );
}

export default App;
