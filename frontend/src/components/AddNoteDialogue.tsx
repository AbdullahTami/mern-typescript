import React from "react";
import { Modal } from "react-bootstrap";

interface AddNoteDialogueProps {
  onDismiss: () => void;
}

function AddNoteDialogue({ onDismiss }: AddNoteDialogueProps) {
  return (
    <Modal show onHide={onDismiss}>
      <Modal.Header closeButton>
        <Modal.Title>Add Note</Modal.Title>
      </Modal.Header>
    </Modal>
  );
}

export default AddNoteDialogue;
