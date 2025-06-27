import express from "express";
import { adminRoute, verifyToken } from "../middlewares/auth.middleware.js";
import {
  getAllProjects,
  getProjectById,
  createProject,
  deleteProject,
  updateProject,
} from "../controllers/projects.controller.js";

const router = express.Router();

router.get("/", getAllProjects);
router.get("/:id", getProjectById);
router.post("/", verifyToken, adminRoute, createProject);
router.delete("/:id", verifyToken, adminRoute, deleteProject);
router.patch("/:id", verifyToken, adminRoute, updateProject);

export default router;
