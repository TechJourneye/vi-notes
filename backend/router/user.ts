import { Router } from "express";
import { Signup,Login } from "../controller/user";

const router = Router();

router.post("/signup", Signup);
router.post("/login",Login);


export default router;