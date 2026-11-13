import { Note } from "../models/note.js";
import createHttpError from "http-errors";



export const getAllNotes = async (req,res) => {
  const note = await Note.find();
  res.status(200).json(note);
};

export const getNoteById = async (req, res) => {
  const { noteId } = req.params;
  res.status(200).json({ message: `Retrieved note with ID: ${noteId}` });
  if (!noteId) {
    res.status(404).json({ message: `Note not found` });
  }
};

export const createNote = async (req, res) => {
  const { noteId } = req.params;
  res.status(200).json(noteId);
};

export const deleteNote = async (req, res) => {
  const { noteId } = req.params;

  if (!noteId) {
    createHttpError(404, "Note not found");
  }
  res.status(200).json(noteId);
};

export const updateNote = async (req, res) => {
  const { noteId } = req.params;

  if (!noteId) {
    createHttpError(404, "Note not found");
  }
  res.status(200).json(noteId);
};

