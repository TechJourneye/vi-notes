import { Request, Response } from "express";
import { Note } from "../models/note";

export const getSingleNote = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const user = (req as any).user;

    if (!user?._id) {
      return res.status(401).json({ message: "Not authenticated" });
    }

    const note = await Note.findById(id);

    if (!note) {
      return res.status(404).json({ success: false, message: "Note not found" });
    }

    if (!note.owner || note.owner.toString() !== user._id.toString()) {
      return res.status(403).json({ success: false, message: "Unauthorized" });
    }

    return res.status(200).json({
      success: true,
      note,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, message: "Server error" });
  }
};

export const getUserNotes = async (req: Request, res: Response) => {
  try {
    const user = (req as any).user;

    if (!user?._id) {
      return res.status(401).json({ message: "Not authenticated" });
    }

    const notes = await Note.find({ owner: user._id }).sort({
      createdAt: -1,
    });

    res.status(200).json({
      success: true,
      notes,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false });
  }
};

//create note 
export const createNotes= async (req:Request, res:Response) => {
  const { title, content } = req.body;

  const user = (req as any).user;

  if (!user?._id) {
    return res.status(401).json({ message: "Not authenticated" });
  }

  const data = new Note({ title, content });
  data.owner = user._id;
  
  const newNote = await data.save();

  console.error("Saved Note:", newNote); 

  res.status(201).send(newNote);
};

export const deleteNote = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const user = (req as any).user;

    if (!user?._id) {
      return res.status(401).json({ message: "Not authenticated" });
    }

    const note = await Note.findById(id);

    if (!note) {
      return res.status(404).json({ message: "Note not found" });
    }

    if (!note.owner || note.owner.toString() !== user._id.toString()) {
      return res.status(403).json({ message: "Unauthorized" });
    }

    await Note.findByIdAndDelete(id);

    res.status(200).json({
      success: true,
      message: "Note deleted successfully",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

export const updateNote = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { title, content } = req.body;
    const user = (req as any).user;

    if (!user?._id) {
      return res.status(401).json({ message: "Not authenticated" });
    }

    const note = await Note.findById(id);

    if (!note) {
      return res.status(404).json({ message: "Note not found" });
    }

    if (!note.owner || note.owner.toString() !== user._id.toString()) {
      return res.status(403).json({ message: "Unauthorized" });
    }

    const updatedNote = await Note.findByIdAndUpdate(
      id,
      { title, content },
      { new: true }
    );

    res.status(200).json({
      success: true,
      message: "Note updated successfully",
      note: updatedNote,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};