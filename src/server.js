import express from "express";
import dotenv from "dotenv";
// import { connectDB } from "./config/db.js";
import { connectDB } from "../backend/config/db.js";

import userRoute from "../backend/routes/user.route.js";
import recipeRoute from "../backend/routes/recipe.route.js";
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
  const frontendPath = path.join(process.cwd(), "frontend", "dist");
  app.use(express.static(frontendPath));

  app.get("*", (req, res) => {
    res.sendFile(path.join(frontendPath, "index.html"));
  });
}

app.listen(5000, () => {
  console.log("server is running on port 5000");
  connectDB();
});
