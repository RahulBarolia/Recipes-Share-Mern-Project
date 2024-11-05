import React, { useState, useContext } from "react";
import { addRecipe } from "../apis/recipeApis";
import AuthContext from "../context/AuthContext";
import { toast } from "react-toastify";

const AddRecipeForm = () => {
  const { user } = useContext(AuthContext);
  const [recipeData, setRecipeData] = useState({
    name: "",
    description: "",
    imageUrl: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setRecipeData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const submitRecipe = async () => {
    recipeData.creator = user.data._id;
    const response = await addRecipe(recipeData);

    if (response.data.success) {
      toast("Recipe created successfully");

      setRecipeData({
        name: "",
        description: "",
        ingredients: [
          {
            name: "",
            quantity: "",
            units: "",
          },
        ],
        instructions: [
          {
            step: 1,
            description: "",
            timing: "",
          },
        ],
        imageUrl: "",
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    submitRecipe();
  };

  return (
    <div className="min-h-[90vh] p-2 dark:bg-gray-900">
      <form
        onSubmit={handleSubmit}
        action=""
        className="max-w-lg mx-auto p-4 shadow-md rounded space-y-4 mb-2  dark:bg-gray-800 dark:shadow-2xl dark:text-white "
      >
        <h1 className="font-bold text-2xl text-blue-800 text-center ">
          Add New Recipe
        </h1>

        <div>
          <input
            type="text"
            name="name"
            placeholder="Recipe Name"
            className="w-full px-2 py-2 border border-gray-500 mt-1 focus:outline-none  rounded focus:border-blue-500 dark:bg-gray-800"
            value={recipeData.name}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <textarea
            type="text"
            name="description"
            placeholder="Recipe Description"
            className="w-full px-2 py-2 border border-gray-500 mt-1 focus:outline-none  rounded focus:border-blue-500 dark:bg-gray-800"
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
            className="w-full px-2 py-2 border border-gray-500 mt-1 focus:outline-none  rounded focus:border-blue-500 dark:bg-gray-800"
            value={recipeData.imageUrl}
            onChange={handleChange}
          />
        </div>

        <button className="text-white w-full mt-1 px-2 py-2 rounded bg-blue-500 hover:bg-gradient-to-r from-blue-500 to-blue-600 transition duration-1000">
          Add Recipe
        </button>
      </form>
    </div>
  );
};

export default AddRecipeForm;
