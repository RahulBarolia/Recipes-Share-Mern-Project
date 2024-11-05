import React from "react";
import Signup from "./components/Signup";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./components/Login";
import Navbar from "./components/Navbar";
import { AuthProvider } from "./context/AuthContext";
import AddRecipeForm from "./components/AddRecipeForm";
import Recipes from "./components/Recipes";
import MyRecipes from "./components/MyRecipes";
import { ThemeProvider } from "./context/ThemeContext";

const App = () => {
  return (
    <>
      <BrowserRouter>
        <ThemeProvider>
          <AuthProvider>
            <Navbar />
            <Routes>
              <Route path="/signup" element={<Signup />} />

              <Route path="/login" element={<Login />} />

              <Route path="/" element={<Recipes />} />

              <Route path="/myRecipes" element={<MyRecipes />} />

              <Route path="/addrecipes" element={<AddRecipeForm />} />

              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </AuthProvider>
        </ThemeProvider>
      </BrowserRouter>
    </>
  );
};

export default App;
