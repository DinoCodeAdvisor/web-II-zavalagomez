import React, { useState, useEffect } from "react";
import { FaSearch } from "react-icons/fa";
import CategoryList from "../components/CategoryList";
import RecipeList from "../components/RecipeList";
import "../styles/pages/Home.css";
import { useLocation } from "react-router-dom";

export default function Home() {

  const location = useLocation();

  const [categories, setCategories] = useState([]);
  const [recipes, setRecipes] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(location.state?.category || "Dessert");
  const [sortOrderAsc, setSortOrderAsc] = useState(true);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    fetch("https://www.themealdb.com/api/json/v1/1/categories.php")
      .then((res) => res.json())
      .then((data) => setCategories(data.categories))
      .catch((err) => console.error("Failed to fetch categories:", err));
  }, []);

  useEffect(() => {
    if (selectedCategory) {
      fetch(
        `https://www.themealdb.com/api/json/v1/1/filter.php?c=${selectedCategory}`
      )
        .then((res) => res.json())
        .then((data) => setRecipes(data.meals || []))
        .catch((err) => console.error("Failed to fetch recipes:", err));
    }
  }, [selectedCategory]);

  const filteredRecipes = recipes.filter((recipe) =>
    recipe.strMeal.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const sortedRecipes = [...filteredRecipes].sort((a, b) => {
    if (a.strMeal < b.strMeal) return sortOrderAsc ? -1 : 1;
    if (a.strMeal > b.strMeal) return sortOrderAsc ? 1 : -1;
    return 0;
  });

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
    setIsSidebarOpen(false); // close sidebar on mobile after selection
  };

  return (
    <div className="page-container">
      <div className="hero-section">
        <div className="hero-image"></div>
        <div className="hero-text">
          <h1>Chefs</h1>
          <h1>Academy</h1>
          <h1>Secrets</h1>
          <p className="hero-subtext">
            New recipe for you to try out, let's cook!
          </p>
        </div>
      </div>

      <div className="interface-container">
        <div
          className={`categories-container ${isSidebarOpen ? "active" : ""}`}
        >
          <CategoryList
            categories={categories}
            selectedCategory={selectedCategory}
            onSelect={handleCategorySelect}
          />
        </div>

        <div className="meals-container">
          <div className="search-sort-container">
            <button className="sidebar-toggle" onClick={toggleSidebar}>
              ☰ Categories
            </button>

            <div className="search-sort-container-row">
              <div className="search-bar-container">
                <FaSearch className="search-icon" />
                <input
                  type="text"
                  placeholder="Search recipes and more..."
                  className="search-input"
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>

              <button
                onClick={() => setSortOrderAsc((prev) => !prev)}
                className="sort-button"
              >
                Sort by name: {sortOrderAsc ? "A → Z" : "Z → A"}
              </button>
            </div>
          </div>

          {sortedRecipes.length > 0 ? (
            <RecipeList recipes={sortedRecipes} selectedCategory={selectedCategory} />
          ) : (
            <p className="no-results-message">
              No recipes found for "{searchQuery}" in {selectedCategory}.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
