import express from "express";
import { login, logout } from "../controllers/auth.controller.js";

const router = express.Router();

router.get("/", (req, res) => {
  res.send("auth api");
});

router.post("/login", login);

router.post("/logout", logout);

export default router;
