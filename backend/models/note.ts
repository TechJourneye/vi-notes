import mongoose, {Schema} from "mongoose";
import {User} from './user';

const NoteSchema=new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    content:{
        type:String,
        required:true,
    },
    owner:{
        type:Schema.Types.ObjectId,
        ref:"User",
    },
    createdAt:{
      type:Date,
      default:Date.now
    }
})

export const Note=mongoose.model("Note",NoteSchema);