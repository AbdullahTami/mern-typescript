import styles from "../styles/Note.module.css";
import styleUtils from "../styles/utils.module.css";
import { Note as NoteModel } from "../models/note";
import { Card } from "react-bootstrap";
import { formatDate } from "../utils/formatDate";
import { CiCircleRemove } from "react-icons/ci";
interface NoteProps {
  note: NoteModel;
  onDeleteNoteClicked: (note: NoteModel) => void;
  onNoteClicked: (note: NoteModel) => void;
  className: string;
}

function Note({
  note,
  onNoteClicked,
  className,
  onDeleteNoteClicked,
}: NoteProps) {
  const { title, text, createdAt, updatedAt } = note;
  let createdUpdatedText: string;
  if (updatedAt > createdAt!) {
    createdUpdatedText = "Updated: " + formatDate(updatedAt);
  } else {
    createdUpdatedText = "Created: " + formatDate(createdAt);
  }

  return (
    <Card
      className={`${styles.noteCard} ${className}`}
      onClick={() => onNoteClicked(note)}
    >
      <Card.Body className={styles.cardBody}>
        <Card.Title className={styleUtils.flexCenter}>
          {title}{" "}
          <CiCircleRemove
            className="text-muted ms-auto"
            onClick={(e) => {
              onDeleteNoteClicked(note);
              e.stopPropagation();
            }}
          />
        </Card.Title>
        <Card.Text className={styles.noteText}>{text}</Card.Text>
      </Card.Body>
      <Card.Footer className="text-muted">{createdUpdatedText}</Card.Footer>
    </Card>
  );
}

export default Note;
