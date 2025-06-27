import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

import authRoutes from "./routes/auth.route.js";
import projectRoutes from "./routes/projects.route.js";

import { connectDB } from "./database.js";

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json()); // allows us to parse incoming requests: req.body
app.use(cookieParser()); // allows us to parse incoming cookies
app.use(cors({ credentials: true }));

app.use("/api/auth", authRoutes);
app.use("/api/projects", projectRoutes);

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log("Server started at http://localhost:" + PORT);
  });
});

export default app;
