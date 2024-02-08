import { useEffect, useState } from "react";
import { Note } from "./models/note";

function App() {
  const [notes, setNotes] = useState<Note[]>([]);

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

  return null;
}

export default App;
