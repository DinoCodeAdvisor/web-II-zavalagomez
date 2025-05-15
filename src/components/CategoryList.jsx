import React from "react";
import "../styles/components/CategoryList.css";

export default function CategoryList({ categories, selectedCategory, onSelect }) {
  return (
    <div className="categories-container-component">
      <h2>Categories</h2>
      <ul className="category-list">
        {categories.map((cat) => (
          <li
            key={cat.idCategory}
            className={`category-item ${selectedCategory === cat.strCategory ? "active" : ""}`}
            onClick={() => onSelect(cat.strCategory)}
          >
            <img src={cat.strCategoryThumb} alt={cat.strCategory} className="category-img" />
            <span className="category-name">{cat.strCategory}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
