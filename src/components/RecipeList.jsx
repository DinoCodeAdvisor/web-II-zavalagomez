import React from "react";
import "../styles/components/RecipeList.css";

export default function RecipeList({ recipes }) {
  return (
    <div className="recipes">
      {recipes.map((recipe) => (
        <div className="recipe-card" key={recipe.idMeal}>
          <img src={recipe.strMealThumb} alt={recipe.strMeal} />
          <p>{recipe.strMeal}</p>
        </div>
      ))}
    </div>
  );
}
