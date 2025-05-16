import React from "react";
import "../styles/components/RecipeList.css";
import { Link } from "react-router-dom";

export default function RecipeList({ recipes, selectedCategory }) {
  return (
    <div className="recipes">
      {recipes.map((recipe) => (
        <Link to={`/recipe/${recipe.idMeal}`} state={{ category: selectedCategory }} className="recipe-card" key={recipe.idMeal}>
          <div>
            <img src={recipe.strMealThumb} alt={recipe.strMeal} />
            <p>{recipe.strMeal}</p>
          </div>
        </Link>
      ))}
    </div>
  );
}
