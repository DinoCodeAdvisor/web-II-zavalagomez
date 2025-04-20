import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../styles/pages/HomePage.css";
import HeroSection from "../components/sections/HeroSection";
import PropertyCard from "../components/PropertyCard";

export default function Home() {
  const [searchQuery, setSearchQuery] = useState("");
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);

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
  }, []);

  const filteredProperties = searchQuery.trim() === "" 
    ? properties 
    : properties.filter((property) =>
        property.description && property.description.toLowerCase().includes(searchQuery.toLowerCase())
    );

  return (
    <div className="homepage-body">
      <HeroSection onSearchChange={setSearchQuery} />

      {loading && <p>Loading properties...</p>}

      {filteredProperties.length <= 0 ? (
        <p>No property description contains "{searchQuery}"</p>
      ) : null}
      
      <div className="property-list">
        {filteredProperties.map((property) => (
          <PropertyCard key={property.id} property={property} />
        ))}
      </div>
    </div>
  );
}
