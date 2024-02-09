import { Button, Form, Modal } from "react-bootstrap";
import { Note } from "../models/note";
import { useForm } from "react-hook-form";
import { NoteInput } from "../api/note_api";
import * as NoteApi from "../api/note_api";

interface AddEditNoteDialogueProps {
  noteToEdit?: Note;
  onDismiss: () => void;
  onNoteSaved: (note: Note) => void;
}

function AddEditNoteDialogue({
  noteToEdit,
  onDismiss,
  onNoteSaved,
}: AddEditNoteDialogueProps) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<NoteInput>({
    defaultValues: noteToEdit ? noteToEdit : {},
  });

  async function onSubmit(input: NoteInput) {
    try {
      let noteRes: Note;

      if (noteToEdit) {
        noteRes = await NoteApi.updateNote(noteToEdit._id, input);
      } else {
        noteRes = await NoteApi.createNote(input);
      }

      onNoteSaved(noteRes);
    } catch (error) {
      console.log(error);
      alert(error);
    }
  }

  return (
    <Modal show onHide={onDismiss}>
      <Modal.Header closeButton>
        <Modal.Title>{noteToEdit ? "Edit note" : "Add note"}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form id="addEditNoteForm" onSubmit={handleSubmit(onSubmit)}>
          <Form.Group className="mb-3">
            <Form.Label>Title</Form.Label>
            <Form.Control
              type="text"
              placeholder="title"
              isInvalid={!!errors.title}
              {...register("title", { required: "A note must have a title" })}
            />
            <Form.Control.Feedback type="invalid">
              {errors.title?.message}
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Text</Form.Label>
            <Form.Control
              rows={5}
              as="textarea"
              placeholder="text"
              {...register("text")}
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button form="addEditNoteForm" type="submit" disabled={isSubmitting}>
          Save
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default AddEditNoteDialogue;
