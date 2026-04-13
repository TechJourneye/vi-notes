import express from "express";
import { getUserNotes, getSingleNote, createNotes, deleteNote, updateNote } from "../controller/notes";
import { userVerification } from "../middleware/authMiddleware";

const router = express.Router();

router.get("/mynotes", userVerification, getUserNotes);
router.get("/note/:id", userVerification, getSingleNote);
router.delete("/note/:id", userVerification, deleteNote);
router.put("/note/:id", userVerification, updateNote);
router.post("/note",userVerification,createNotes);

export default router;