import { ConflictError, UnauthorizedError } from "../errors/http_errors";
import { Note } from "../models/note";
import { User } from "../models/user";

async function fetchData(input: RequestInfo, init?: RequestInit) {
  const res = await fetch(input, init);

  if (res.ok) return res;

  const errorBody = await res.json();
  const errorMessage = errorBody.error;
  console.log(errorMessage);

  if (res.status === 401) {
    throw new UnauthorizedError(errorMessage);
  }
  if (res.status === 409) {
    throw new ConflictError(errorMessage);
  }

  throw Error(
    "Request failed with status: " + res.status + " message: " + errorMessage
  );
}

export async function getLoggedInUser(): Promise<User> {
  const res = await fetchData("api/users", { method: "GET" });
  return res.json();
}

export interface SignUpCredentials {
  username: string;
  email: string;
  password: string;
}

export async function signUp(credentials: SignUpCredentials): Promise<User> {
  const res = await fetchData("api/users/signup", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(credentials),
  });
  return res.json();
}

export interface LoginCredentials {
  username: string;
  password: string;
}

export async function login(credentials: LoginCredentials): Promise<User> {
  const res = await fetchData("api/users/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(credentials),
  });
  return res.json();
}

export async function logout() {
  await fetchData("api/users/logout", { method: "GET" });
}

export async function fetchNotes(): Promise<Note[]> {
  const res = await fetchData("/api/notes", {
    method: "GET",
  });
  return res.json();
}

export interface NoteInput {
  title: string;
  text?: string;
}

export async function createNote(note: NoteInput): Promise<Note> {
  const res = await fetchData("/api/notes", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(note),
  });
  return res.json();
}

export async function deleteNote(noteId: string): Promise<void> {
  await fetchData(`/api/notes/${noteId}`, {
    method: "DELETE",
  });
}

export async function updateNote(
  noteId: string,
  note: NoteInput
): Promise<Note> {
  const res = await fetchData(`/api/notes/${noteId}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(note),
  });
  return res.json();
}
