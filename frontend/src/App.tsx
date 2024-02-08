import { useEffect, useState } from "react";
import { Note as NoteModal } from "./models/note";
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
        console.log(notes);
        setNotes(notes);
      } catch (error) {
        console.error(error);
      }
    }
    getNotes();
  }, []);
  return (
    <div>
      {notes.map((note) => (
        <Note note={note} key={note._id} />
      ))}
    </div>
  );
}

export default App;
