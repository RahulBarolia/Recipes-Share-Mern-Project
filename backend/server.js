import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";
import userRoute from "./routes/user.route.js";
import recipeRoute from "./routes/recipe.route.js";
import cors from "cors";
import path from "path";

dotenv.config();

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({ origin: "http://localhost:5173", credentials: true }));

const __dirname = path.resolve();

app.use("/api/user", userRoute);
app.use("/api/recipe", recipeRoute);

if (process.env.NODE_ENV.trim() === "production") {
  app.use(express.static(path.join(__dirname, "/frontend/dist")));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"));
  });
}

app.listen(5000, () => {
  console.log("server is running on port 5000");
  connectDB();
});
