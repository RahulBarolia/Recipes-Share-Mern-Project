import axios from "axios";

export const addRecipe = async (recipeData) => {
  try {
    const response = await axios.post("/api/recipe", recipeData);
    return response;
  } catch (error) {
    return error;
  }
};

export const getRecipes = async () => {
  try {
    const response = await axios.get("/api/recipe");
    return response;
  } catch (error) {
    return error;
  }
};

export const deleteRecipeById = async (recipeId) => {
  try {
    const response = await axios.delete(`/api/recipe/${recipeId}/`);
    return response;
  } catch (error) {
    return error;
  }
};

export const updateRecipeById = async (recipeId, recipeData) => {
  try {
    const response = await axios.put(`/api/recipe/${recipeId}/`, recipeData);
    return response;
  } catch (error) {
    return error;
  }
};
