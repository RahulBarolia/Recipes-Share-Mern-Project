import React, { useEffect, useState, useContext } from "react";
import { deleteRecipeById, getRecipes } from "../apis/recipeApis";
import { FaRegEdit, FaUserCircle } from "react-icons/fa";
import AuthContext from "../context/AuthContext";
import { CiSquareRemove } from "react-icons/ci";
import { toast } from "react-toastify";
import UpdateModelForm from "./UpdateModelForm";
import { Link } from "react-router-dom";

const MyRecipes = () => {
  const [recipes, setRecipes] = useState([]);
  const { user } = useContext(AuthContext);
  const [showModel, setShowModel] = useState(false);
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const fetchRecipes = async () => {
    try {
      setIsLoading(true);
      const response = await getRecipes();
      if (response.data.success) {
        const userRecipes = response.data.recipes.filter(
          (recipe) => recipe.creator._id === user.data._id
        );
        setRecipes(userRecipes);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  async function deleteRecipe(recipeId) {
    const response = await deleteRecipeById(recipeId);
    if (response.data.success) {
      toast(response.data.message);
      await fetchRecipes();
    }
  }

  useEffect(() => {
    if (user?.data?._id) {
      fetchRecipes();
    }
  }, [user]);

  if (isLoading) {
    return (
      <div className="bg-white  p-2 min-h-[90vh] dark:bg-gray-900">
        <h1 className="dark:text-white">Loading...</h1>
      </div>
    );
  }

  return (
    <div className="bg-white p-2 min-h-[90vh]  dark:bg-gray-900 relative">
      {recipes.length === 0 ? (
        <div className="p-4 w-full h-full flex flex-col justify-center items-center space-y-6 shadow-md dark:bg-gray-800 rounded">
          <div>
            <h1 className="dark:text-white text-2xl text-center ">
              You haven't added any recipes yet. Start adding some delicious
              recipes!
            </h1>
          </div>

          <div>
            <Link
              to="/addrecipes"
              className="p-2 rounded  text-xl font-semibold hover:text-blue-500 dark:hover:text-blue-300 dark:text-white transition-colors duration-500 dark:bg-gray-700"
            >
              Add Recipe
            </Link>
          </div>
        </div>
      ) : (
        <div>
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-6 p-2 gap-2">
            {recipes.map((recipe) => (
              <div
                key={recipe._id}
                className="shadow-md bg-white rounded dark:bg-gray-800"
              >
                <div className="p-2">
                  <img
                    src={recipe.imageUrl}
                    alt="{recipe.name}"
                    className="h-44 w-full object-contain mix-blend-multiply dark:mix-blend-normal"
                  />
                </div>

                <div className=" flex items-centr justify-center p-2 space-x-2">
                  <span
                    className="cursor-pointer bg-white rounded dark:bg-gray-800"
                    onClick={() => {
                      deleteRecipe(recipe._id);
                    }}
                  >
                    <CiSquareRemove
                      size={30}
                      className="dark:text-white hover:text-blue-500 dark:hover:text-blue-500 transition-colors duration-500 "
                    />
                  </span>

                  <span
                    className="cursor-pointer  rounded"
                    onClick={() => {
                      setSelectedRecipe(recipe);
                      setShowModel(true);
                    }}
                  >
                    <FaRegEdit
                      size={28}
                      className="dark:text-white  hover:text-blue-500 dark:hover:text-blue-500 transition-colors duration-500 "
                    />
                  </span>
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

          {showModel && (
            <UpdateModelForm
              onClose={() => setShowModel(false)}
              recipe={selectedRecipe}
              onUpdate={fetchRecipes}
            />
          )}
        </div>
      )}
    </div>
  );
};

export default MyRecipes;
