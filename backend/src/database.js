import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

export const connectDB = async () => {
  try {
    const dbConnection = await mongoose.connect(process.env.MONGODB_URI);
    console.log("Connecting to database...");

    if (dbConnection) {
      console.log(
        `Connected to database! Host: ${dbConnection.connection.host}`
      );
    }
  } catch (error) {
    console.error("Error connecting to database:", error);
  }
};
