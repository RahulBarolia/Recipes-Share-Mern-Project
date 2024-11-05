import React, { useState, useContext, useEffect } from "react";
import { updateRecipeById } from "../apis/recipeApis";
import AuthContext from "../context/AuthContext";
import { toast } from "react-toastify";
import ThemeContext from "../context/ThemeContext";
import { IoMdClose } from "react-icons/io";

const UpdateModelForm = ({ onClose, recipe, onUpdate }) => {
  const [recipeData, setRecipeData] = useState({
    name: "",
    description: "",
    imageUrl: "",
  });

  useEffect(() => {
    if (recipe) {
      setRecipeData(recipe);
    }
  }, [recipe]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setRecipeData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const submitRecipe = async () => {
    const recipeId = recipe._id;
    const response = await updateRecipeById(recipeId, recipeData);

    if (response.data.success) {
      toast("Recipe updated successfully");
      await onUpdate();
      onClose();
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    submitRecipe();
  };

  return (
    <div className="absolute w-full top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white min-h-[90vh] bg-opacity-50 z-50 p-2 ">
      <form
        onSubmit={handleSubmit}
        className="relative max-w-lg mx-auto bg-white dark:bg-gray-800 p-4 shadow-md rounded space-y-4 dark:text-white"
      >
        <button
          type="button"
          className="absolute right-0 top-0 text-gray-600 dark:text-gray-300 p-2"
          onClick={onClose}
        >
          <IoMdClose size={25} />
        </button>

        <h1 className="font-bold text-2xl text-blue-800 text-center">
          Update Recipe
        </h1>

        <div>
          <input
            type="text"
            placeholder="Recipe Name"
            name="name"
            className="w-full px-2 py-2 border border-gray-500 mt-1 focus:outline-none rounded focus:border-blue-500 dark:bg-gray-800"
            value={recipeData.name}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <textarea
            name="description"
            placeholder="Recipe Description"
            className="w-full px-2 py-2 border border-gray-500 mt-1 focus:outline-none rounded focus:border-blue-500 dark:bg-gray-800"
            value={recipeData.description}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <input
            type="text"
            placeholder="Image Url"
            name="imageUrl"
            className="w-full px-2 py-2 border border-gray-500 mt-1 focus:outline-none rounded focus:border-blue-500 dark:bg-gray-800"
            value={recipeData.imageUrl}
            onChange={handleChange}
          />
        </div>

        <button
          type="submit"
          className="text-white w-full mt-1 px-2 py-2 rounded bg-blue-500 hover:bg-gradient-to-r from-blue-500 to-blue-600 transition duration-1000"
        >
          Update Recipe
        </button>
      </form>
    </div>
  );
};

export default UpdateModelForm;
