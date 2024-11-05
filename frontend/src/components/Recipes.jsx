import React, { useEffect, useState, useContext } from "react";
import { getRecipes } from "../apis/recipeApis";
import { FaUserCircle } from "react-icons/fa";
const Recipes = () => {
  const [recipes, setRecipes] = useState([]);
  const [isLoading, isSetLoading] = useState(false);

  const fetchRecipes = async () => {
    try {
      isSetLoading(true);
      const response = await getRecipes();
      if (response.data.success) {
        setRecipes(response.data.recipes);
      }
    } catch (error) {
      console.log(error);
    } finally {
      isSetLoading(false);
    }
  };

  useEffect(() => {
    fetchRecipes();
  }, []);

  if (isLoading) {
    return (
      <div className="bg-white  p-2 min-h-[90vh] dark:bg-gray-900">
        <h1 className="dark:text-white">Loading...</h1>
      </div>
    );
  }

  return (
    <div className="bg-white  p-2 min-h-[90vh] dark:bg-gray-900 ">
      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-6 p-2 gap-4">
        {recipes.map((recipe) => (
          <div
            key={recipe._id}
            className="shadow-md bg-white rounded dark:bg-gray-800"
          >
            <div className="p-2 ">
              <img
                src={recipe.imageUrl}
                alt="{recipe.name}"
                className="h-44 w-full  object-contain mix-blend-multiply dark:opacity-100 dark:mix-blend-normal"
              />
            </div>

            <div className="p-2 flex items-center space-x-2">
              <FaUserCircle className="dark:text-white" />
              <h1 className="text-blue-500 font-semibold">
                {recipe.creator.name}
              </h1>
            </div>

            <div className="p-2">
              <h1 className="text-zinc-800 font-semibold truncate dark:text-white">
                {recipe.name}
              </h1>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Recipes;
