import mongoose from "mongoose";
import { Recipe } from "../models/Recipe.model.js";

export const addRecipe = async (req, res) => {
  const { name, description, creator, imageUrl } = req.body;

  try {
    const newRecipe = new Recipe({
      name,
      description,
      imageUrl,
      creator,
    });

    await newRecipe.save();

    return res.status(201).json({
      success: true,
      message: "Recipe created successfully",
      data: { newRecipe },
    });
  } catch (error) {
    console.log("Error", error.message);
    return res.status(400).json({ success: false, message: error.message });
  }
};

export const getRecipes = async (req, res) => {
  try {
    const recipes = await Recipe.find().populate("creator", "name");
    return res.status(200).json({ success: true, recipes });
  } catch (error) {
    console.log("Error", error.message);
    return res.status(400).json({ success: false, message: error.message });
  }
};

export const deleteRecipe = async (req, res) => {
  const { id } = req.params;

  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid recipe ID" });
    }
    const recipe = await Recipe.findById({ _id: id });
    console.log(recipe);
    if (!recipe) {
      return res
        .status(404)
        .json({ success: false, message: "Recipe not found" });
    }

    await Recipe.findByIdAndDelete({ _id: id });

    res
      .status(200)
      .json({ success: true, message: "Recipe deleted successfully!" });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "An error occurred while deleting the recipe",
      error: error.message,
    });
  }
};

export const updateRecipe = async (req, res) => {
  const { id } = req.params;
  const { name, description, imageUrl } = req.body;

  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid recipe ID" });
    }
    const recipe = await Recipe.findById({ _id: id });
    if (!recipe) {
      return res
        .status(404)
        .json({ success: false, message: "Recipe not found" });
    }

    recipe.name = name;
    recipe.description = description;
    recipe.imageUrl = imageUrl;

    const updatedRecipe = await recipe.save();
    res.status(200).json({
      success: true,
      message: "Recipe updated successfully!",
      recipe: updatedRecipe,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "An error occurred while updating the recipe",
      error: error.message,
    });
  }
};
