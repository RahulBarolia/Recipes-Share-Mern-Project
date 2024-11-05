import axios from "axios";

export const addRecipe = async (recipeData) => {
  try {
    const response = await axios.post(
      "http://localhost:5000/api/recipe",
      recipeData
    );
    return response;
  } catch (error) {
    return error;
  }
};

export const getRecipes = async () => {
  try {
    const response = await axios.get("http://localhost:5000/api/recipe");
    return response;
  } catch (error) {
    return error;
  }
};

export const deleteRecipeById = async (recipeId) => {
  try {
    const response = await axios.delete(
      `http://localhost:5000/api/recipe/${recipeId}/`
    );
    return response;
  } catch (error) {
    return error;
  }
};

export const updateRecipeById = async (recipeId, recipeData) => {
  try {
    const response = await axios.put(
      `http://localhost:5000/api/recipe/${recipeId}/`,
      recipeData
    );
    return response;
  } catch (error) {
    return error;
  }
};
