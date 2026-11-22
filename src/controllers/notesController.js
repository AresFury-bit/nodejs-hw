import { Note } from "../models/note.js";
import createHttpError from "http-errors";



export const getAllNotes = async (req, res) => {
  const { tag, search, page=1, perPage=10 } = req.query;

  const skip = (page - 1) * perPage;

  const notesQuery = Note.find();

  if (search) {
    notesQuery.where({
      $or: [
        { title: { $regex: search, $options: 'i' } },
        { content: { $regex: search, $options: 'i' } },
      ],
    });
  }
  if (tag) {
    notesQuery.where("tag").equals(tag);
  }
  const [totalNotes, notes] = await Promise.all([
    notesQuery.clone().countDocuments(),
    notesQuery.skip(skip).limit(perPage)
  ]);
  const totalPages  = Math.ceil(totalNotes / perPage);
  res.status(200).json({
    page: page,
    perPage: perPage,
    totalNotes: totalNotes,
    totalPages:totalPages,
    notes: notes,
  });

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

