import React from "react";
import "../styles/components/CharacterCard.css";

export default function CharacterCard({ character }) {
  return (
    <div className="character-card">
      <div className="character-content">
        <div className="character-image-wrapper">
          <img src={character.image} alt={character.name} className="character-image" />
        </div>
        <h2 className="character-name">{character.name}</h2>
        <p className="character-status">
          <span className={`status-dot ${character.status.toLowerCase()}`} />
          {character.status} - {character.species}
        </p>
        <p className="character-type">Type: {character.type || "Unknown"}</p> {/* New line for character type */}
        <p className="character-meta">Origin: {character.origin.name}</p>
        <p className="character-meta">Location: {character.location.name}</p>
      </div>
    </div>
  );
}
