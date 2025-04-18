import React from "react";
import "../../styles/components/sections/HeroSection.css";

const HeroImage = new URL("../../assets/HeroImage.jpg", import.meta.url);

export default function HeroSection({ onSearchChange }) {
  const handleInputChange = (e) => {
    onSearchChange(e.target.value);
  };

  return (
    <section className="hero-section">
      <div className="hero-container">
        <img className="hero-background" src={HeroImage} alt="Background" />
        <div className="hero-content">
          <p className="hero-subtitle">
            Book unique places to stay and things to do.
            <br />
            Unforgettable trips start with Airbnb.
          </p>
          <div className="hero-search">
            <input
              type="text"
              className="hero-input"
              placeholder="Search"
              onChange={handleInputChange}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
