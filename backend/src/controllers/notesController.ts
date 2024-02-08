import { RequestHandler } from "express";
import Note from "../models/noteModel";
import createHttpError from "http-errors";
import mongoose from "mongoose";

export const getAllNotes: RequestHandler = async (req, res, next) => {
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

interface NoteBody {
  title?: string;
  text?: string;
}

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
