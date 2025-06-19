import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { connectDB } from "./database.js";
import authRoutes from "./routes/auth.route.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.use("/api/auth", authRoutes);

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log("Server started at http://localhost:" + PORT);
  });
});
