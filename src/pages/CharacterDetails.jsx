import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import "../styles/pages/CharacterDetailsPage.css";

export default function CharacterDetailsPage() {
  const { characterId } = useParams();
  const [character, setCharacter] = useState(null);
  const [episodes, setEpisodes] = useState({ first: null, last: null });

  useEffect(() => {
    const fetchCharacter = async () => {
      const res = await fetch(
        `https://rickandmortyapi.com/api/character/${characterId}`
      );
      const data = await res.json();
      if (data.error) {
        setCharacter(null);
      } else {
        setCharacter(data);
        if (data.episode.length > 0) {
          const firstId = data.episode[0].split("/").pop();
          const lastId = data.episode[data.episode.length - 1].split("/").pop();

          const [firstEp, lastEp] = await Promise.all([
            fetch(`https://rickandmortyapi.com/api/episode/${firstId}`).then(
              (res) => res.json()
            ),
            fetch(`https://rickandmortyapi.com/api/episode/${lastId}`).then(
              (res) => res.json()
            ),
          ]);
          setEpisodes({ first: firstEp, last: lastEp });
        }
      }
    };

    fetchCharacter();
  }, [characterId]);

  if (!character) {
    return (
      <section className="not-found">
        <div className="container">
          <div className="content">
            <h1 className="title">Character Not Found</h1>
            <p className="subtitle">We couldn't find this character.</p>
            <p className="description">
              It seems like the character you're looking for doesn't exist.
              Don't worry, explore more characters on the home page.
            </p>
            <Link to="/characters" className="button">
              Back to Characters
            </Link>
          </div>
        </div>
      </section>
    );
  }

  return (
    <div className="character-details">
      <div className="character-info">
        <h2>
          {character.name}
          <span
            className={`status-badge status-${character.status.toLowerCase()}`}
          >
            {character.status}
          </span>
        </h2>

        <p>
          <strong>Species:</strong> {character.species}
        </p>
        {character.type && (
          <p>
            <strong>Type:</strong> {character.type}
          </p>
        )}
        <p>
          <strong>Gender:</strong> {character.gender}
        </p>
        <p>
          <strong>Origin:</strong> {character.origin.name}
        </p>
        <p>
          <strong>Current Location:</strong> {character.location.name}
        </p>

        <div className="episode-links">
          {episodes.first && (
            <p>
              <strong>First Episode:</strong>{" "}
              <Link to={`/episode/${episodes.first.id}`}>
                {episodes.first.name}
              </Link>
            </p>
          )}
          {episodes.last && (
            <p>
              <strong>Last Episode:</strong>{" "}
              <Link to={`/episode/${episodes.last.id}`}>
                {episodes.last.name}
              </Link>
            </p>
          )}
        </div>

        <Link to="/characters" className="cta-button">
          ← Volver a personajes
        </Link>
      </div>

      <div className="character-image">
        <img src={character.image} alt={character.name} />
      </div>
    </div>
  );
}
