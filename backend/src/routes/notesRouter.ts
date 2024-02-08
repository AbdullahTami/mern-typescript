import * as notesController from "../controllers/notesController";
import express from "express";

const router = express.Router();
// router.route("/", notesController.getAllNotes);
router
  .route("/")
  .get(notesController.getAllNotes)
  .post(notesController.createNote);

router
  .route("/:noteId")
  .get(notesController.getNote)
  .patch(notesController.updateNote)
  .delete(notesController.deleteNote);

export default router;
