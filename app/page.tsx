'use client';

import { useState } from 'react';
import 'typeface-playfair-display';
import listItem from './listItem';

const key = 9973533
export default function Home() {
  const [recipes, setRecipes] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  const fetchRecipes = async () => {
    try {
      const response = await fetch(
        `https://www.themealdb.com/api/json/v2/9973533/search.php?s=${searchTerm}`
      );

      if (!response.ok) {
        throw new Error('Failed to fetch recipes');
      }

      const data = await response.json();
      setRecipes(data.meals || []);
    } catch (error) {
      console.log(error);
    }
  };

  const clearResults = () => {
    setRecipes([]);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    fetchRecipes();
  };

  return (
    <div className="container mx-auto px-4 py-8 bg-gray-200 min-h-screen">
      <div className="flex flex-col items-center">
        <img src="./nutri.png" alt="NutriLogo"/>
        <h1 className="text-4xl font-bold mb-6 font-playfair-display text-blue-500 text-center">
          NutriDetective
        </h1>
        <form onSubmit={handleSearch} className="mb-8">
          <div className="flex">
            <input
              type="text"
              placeholder="Search recipes..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="border border-gray-300 px-4 py-2 mr-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-l-lg"
            />
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-r-lg transition-colors duration-300"
            >
              Search
            </button>
          </div>
        </form>
      </div>
      <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {recipes.map((recipe) => (
          <li
            key={recipe.idMeal}
            className="border border-gray-300 rounded-lg shadow-md p-6"
          >
            <img src={recipe.strMealThumb} alt={recipe.strMeal} className="mb-6 rounded-lg" />
            <h2 className="text-xl font-bold mb-2">{recipe.strMeal}</h2>
            <p className="text-gray-700">{recipe.strInstructions}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
