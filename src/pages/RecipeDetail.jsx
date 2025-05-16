import React, { useEffect, useState } from "react";
import { FaTimes } from "react-icons/fa";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import "../styles/pages/RecipeDetail.css";

export default function RecipeDetail() {
  const navigate = useNavigate();
  const location = useLocation();
  const previousCategory = location.state?.category;

  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);
  const [deletedIngredients, setDeletedIngredients] = useState([]);

  const goBackToHome = () => {
    navigate("/", { state: { category: previousCategory } });
  };

  useEffect(() => {
    fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`)
      .then((res) => res.json())
      .then((data) => setRecipe(data.meals?.[0]))
      .catch((err) => console.error("Error fetching recipe:", err));
  }, [id]);

  useEffect(() => {
    if (!recipe) return;
    const stored = localStorage.getItem(`deletedIngredients_${recipe.idMeal}`);
    if (stored) {
      setDeletedIngredients(JSON.parse(stored));
    }
  }, [recipe]);

  const handleDeleteIngredient = (ingredient) => {
    const normalized = ingredient.trim();
    const updated = [...deletedIngredients, normalized];
    setDeletedIngredients(updated);
    localStorage.setItem(
      `deletedIngredients_${recipe.idMeal}`,
      JSON.stringify(updated)
    );
  };

  if (!recipe) return <div className="loading">Loading recipe...</div>;

  const ingredients = [];
  for (let i = 1; i <= 20; i++) {
    const ingredient = recipe[`strIngredient${i}`];
    const measure = recipe[`strMeasure${i}`];
    if (ingredient && ingredient.trim() !== "") {
      ingredients.push(`${measure} ${ingredient}`);
    }
  }

  let youtubeId = null;
  if (recipe.strYoutube) {
    try {
      youtubeId = new URL(recipe.strYoutube).searchParams.get("v");
    } catch (error) {
      console.error("Invalid YouTube URL:", recipe.strYoutube);
    }
  }

  return (
    <div className="recipe-detail-page">
      <div className="hero-detail-banner">
        <img src={recipe.strMealThumb} alt={recipe.strMeal} />

        <div style={{ margin: "2rem" }}>
          <button onClick={goBackToHome} className="back-button">
            ← Back to {previousCategory || "Home"}
          </button>
        </div>

        <div className="hero-text-overlay">
          <h1>{recipe.strMeal}</h1>
          <div className="detail-tags">
            <p>ID: {recipe.idMeal}</p>
            <p>
              {recipe.strCategory} | {recipe.strArea}
            </p>
          </div>
        </div>
      </div>

      <div className="detail-content">
        <div className="instructions">
          <h2>Instructions</h2>
          <p>{recipe.strInstructions}</p>

          {youtubeId && (
            <div className="video-wrapper">
              <iframe
                src={`https://www.youtube.com/embed/${youtubeId}`}
                title="YouTube Video"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
          )}
        </div>

        <div className="ingredients">
          <h2>Ingredients</h2>
          <ul>
            {ingredients
              .filter((ing) => ing && !deletedIngredients.includes(ing.trim()))
              .map((ingredient, index) => (
                <li key={index} className="ingredient-item">
                  {ingredient}
                  <button
                    className="delete-button"
                    onClick={() => handleDeleteIngredient(ingredient)}
                    title="Remove ingredient"
                  >
                    <FaTimes />
                  </button>
                </li>
              ))}
          </ul>
          {deletedIngredients.length > 0 && (
            <button
              onClick={() => {
                localStorage.removeItem(`deletedIngredients_${recipe.idMeal}`);
                setDeletedIngredients([]);
              }}
              className="restore-button"
            >
              Restore All Ingredients
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
