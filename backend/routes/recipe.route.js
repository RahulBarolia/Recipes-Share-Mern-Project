import express from "express";

import {
  addRecipe,
  deleteRecipe,
  getRecipes,
  updateRecipe,
} from "../controllers/recipe.controller.js";
const route = express.Router();

route.post("/", addRecipe);
route.get("/", getRecipes);
route.delete("/:id", deleteRecipe);
route.put("/:id", updateRecipe);

export default route;
