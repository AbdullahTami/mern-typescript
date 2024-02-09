import { Note } from "../models/note";

async function fetchData(input: RequestInfo, init?: RequestInit) {
  const res = await fetch(input, init);

  if (res.ok) return res;

  const errorBody = await res.json();
  const errorMessage = errorBody.error;
  throw Error(errorMessage);
}

export async function fetchNotes(): Promise<Note[]> {
  const res = await fetchData("/api/notes", {
    method: "GET",
  });
  return res.json();
}
