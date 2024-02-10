import { useEffect, useState } from "react";
import { Button, Col, Container, Row, Spinner } from "react-bootstrap";
import styles from "./styles/NotesPage.module.css";
import styleUtils from "./styles/utils.module.css";
import { FaPlus } from "react-icons/fa";
import { Note as NoteModal } from "./models/note";
import Note from "./components/Note";
import * as NotesApi from "./api/note_api";
import AddNoteDialogue from "./components/AddEditNoteDialogue";

function App() {
  const [notes, setNotes] = useState<NoteModal[]>([]);
  const [notesLoading, setNotesLoading] = useState(false);
  const [showNotesLoadingError, setShowNotesLoadingError] = useState(false);

  const [showAddNoteDialogue, setShowAddNoteDialogue] = useState(false);

  const [noteToEdit, setNoteToEdit] = useState<NoteModal | null>(null);

  async function deleteNote(note: NoteModal) {
    try {
      setShowNotesLoadingError(false);
      setNotesLoading(true);
      await NotesApi.deleteNote(note._id);
      setNotes(
        notes.filter((existingNote: NoteModal) => existingNote._id !== note._id)
      );
    } catch (error) {
      console.log(error);
      setShowNotesLoadingError(true);
    } finally {
      setNotesLoading(false);
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
    <Container className={styles.notesPage}>
      <Button
        className={`${styleUtils.blockCenter} mb-4 
        ${styleUtils.flexCenter}`}
        onClick={() => setShowAddNoteDialogue(true)}
      >
        <FaPlus />
        Add new note
      </Button>
      {notesLoading && <Spinner animation="border" variant="primary" />}
      {showNotesLoadingError && (
        <p>Something went wrong! Please refresh the page.</p>
      )}
      {!notesLoading && !showNotesLoadingError && (
        <>
          {!notes.length ? (
            <p>You don't have any note</p>
          ) : (
            <Row xs={1} md={2} xl={3} className={`g-4 ${styles.noteGrid}`}>
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
          )}
        </>
      )}
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
