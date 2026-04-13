import express from "express";
import mongoose from "mongoose";
import { Note } from "./models/note.js";
import cors from "cors";
import cookieParser from 'cookie-parser'
import { userVerification } from "./middleware/authMiddleware.js";

import userNotes from './router/notes'
import authUser from './router/user'

const app = express();

app.use(express.json());
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
}));
app.use(cookieParser());


async function main() {
  await mongoose.connect("mongodb://127.0.0.1:27017/test");
}

main()
  .then(() => {
    console.log("connection with db successful");
  })
  .catch((err) => {
    console.log(err);
  });


app.use("/",authUser);
app.use("/",userNotes);

 
app.listen(8080, () => {
  console.log("server have started");
});
