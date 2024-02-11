import { RequestHandler } from "express";
import Note from "../models/noteModel";
import createHttpError from "http-errors";
import mongoose from "mongoose";

interface NoteBody {
  title?: string;
  text?: string;
}

export const getAllNotes: RequestHandler = async (req, res, next) => {
  console.log(req);
  try {
    const notes = await Note.find();
    res.status(200).json(notes);
  } catch (error) {
    next(error);
  }
};

export const getNote: RequestHandler = async (req, res, next) => {
  try {
    if (!mongoose.isValidObjectId(req.params.noteId))
      throw createHttpError(400, "Invalid note id");

    const note = await Note.findById(req.params.noteId);
    if (!note) throw createHttpError(404, "Note not found");

    res.status(200).json(note);
  } catch (error) {
    next(error);
  }
};

export const createNote: RequestHandler<
  unknown,
  unknown,
  NoteBody,
  unknown
> = async (req, res, next) => {
  const { title, text } = req.body;
  try {
    if (!title) throw createHttpError(400, "Note must have a title");
    const note = await Note.create({ title, text });
    res.status(201).json(note);
  } catch (error) {
    next(error);
  }
};

interface NoteParams {
  noteId: string;
}

export const updateNote: RequestHandler<
  NoteParams,
  unknown,
  NoteBody,
  unknown
> = async (req, res, next) => {
  try {
    if (!mongoose.isValidObjectId(req.params.noteId))
      throw createHttpError(400, "Invalid note id");

    if (!req.body.title) throw createHttpError(400, "Note must have a title");

    const updatedNote = await Note.findByIdAndUpdate(
      req.params.noteId,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!updatedNote) throw createHttpError(404, "Note not found");

    res.status(200).json(updatedNote);
  } catch (error) {
    next(error);
  }
};

export const deleteNote: RequestHandler = async (req, res, next) => {
  try {
    if (!mongoose.isValidObjectId(req.params.noteId))
      throw createHttpError(400, "Invalid note id");

    const note = await Note.findById(req.params.noteId);
    if (!note) throw createHttpError(404, "Note not found");

    await note.deleteOne();

    res.sendStatus(204);
  } catch (error) {
    next(error);
  }
};
