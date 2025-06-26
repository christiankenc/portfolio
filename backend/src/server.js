import express from "express";
import cors from "cors";

import authRoutes from "./routes/auth.route.js";

import { connectDB } from "./database.js";

const app = express();

app.use(express.json());
app.use(cors());

app.use("/api/auth", authRoutes);

connectDB().then(() => {
  app.listen(5000, () => {
    console.log("Server started at http://localhost:5000");
  });
});

export default app;
