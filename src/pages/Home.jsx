import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../styles/pages/HomePage.css";
import HeroSection from "../components/sections/HeroSection";
import PropertyCard from "../components/PropertyCard";

export default function Home() {
  const [searchQuery, setSearchQuery] = useState("");
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    fetch("https://raw.githubusercontent.com/devchallenges-io/curriculum/refs/heads/main/4-frontend-libaries/challenges/group_1/data/property-listing-data.json")
      .then((response) => response.json())
      .then((data) => {
        setProperties(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setLoading(false);
      });

    // Handle window resize event to update windowWidth
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const filteredProperties = searchQuery.trim() === "" 
    ? properties 
    : properties.filter((property) =>
        property.description && property.description.toLowerCase().includes(searchQuery.toLowerCase())
    );

  // For mobile, show one property at a time
  const isMobile = windowWidth <= 640;

  return (
    <div className="homepage-body">
      <HeroSection onSearchChange={setSearchQuery} />

      {loading && <p>Loading properties...</p>}

      {filteredProperties.length <= 0 ? (
        <p>No property description contains "{searchQuery}"</p>
      ) : ''}
      
      <div className="property-list">
        {filteredProperties.length > 0 ? (
          isMobile ? (
            // For mobile, show only the first property
            <PropertyCard key={filteredProperties[0].id} property={filteredProperties[0]} />
          ) : (
            // For larger screens, show all properties
            filteredProperties.map((property) => (
              <PropertyCard key={property.id} property={property} />
            ))
          )
        ) : ''}
      </div>
    </div>
  );
}
