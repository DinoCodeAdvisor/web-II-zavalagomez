import React, { useEffect, useState } from "react";
import CharacterCard from "../components/CharacterCard";
import "../styles/pages/CharactersPage.css";

export default function Character() {
  const [characters, setCharacters] = useState([]);
  const [page, setPage] = useState(1);
  const [info, setInfo] = useState({});
  const [filters, setFilters] = useState({
    name: "",
    status: "",
    species: "",
    gender: "",
  });

  const fetchCharacters = async () => {
    const params = new URLSearchParams({ page, ...filters });
    const res = await fetch(
      `https://rickandmortyapi.com/api/character/?${params}`
    );
    const data = await res.json();
    setCharacters(data.results || []);
    setInfo(data.info || {});
  };

  useEffect(() => {
    fetchCharacters();
  }, [page, filters]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
    setPage(1);
  };

  return (
    <div className="character-page">
      <div className="character-page-header">
        <h1>Characters</h1>
        <div className="filters">
          <input
            name="name"
            placeholder="Search by name"
            onChange={handleInputChange}
          />
          <select name="status" onChange={handleInputChange}>
            <option value="">Status</option>
            <option value="alive">Alive</option>
            <option value="dead">Dead</option>
            <option value="unknown">Unknown</option>
          </select>
          <input
            name="species"
            placeholder="Species"
            onChange={handleInputChange}
          />
          <select name="gender" onChange={handleInputChange}>
            <option value="">Gender</option>
            <option value="female">Female</option>
            <option value="male">Male</option>
            <option value="genderless">Genderless</option>
            <option value="unknown">Unknown</option>
          </select>
          <input
            name="type"
            placeholder="Type"
            onChange={handleInputChange}
          />
        </div>
      </div>

      <div className="character-grid">
        {characters.map((character) => (
          <CharacterCard key={character.id} character={character} />
        ))}
      </div>

      <div className="pagination">
        {page > 2 && <span className="pagination-dots">...</span>}

        {[...Array(info.pages || 0).keys()]
          .slice(Math.max(0, page - 3), Math.min(page + 2, info.pages))
          .map((p) => (
            <button
              key={p + 1}
              className={`pagination-button ${page === p + 1 ? "active" : ""}`}
              onClick={() => setPage(p + 1)}
            >
              {p + 1}
            </button>
          ))}

        {page < info.pages - 1 && <span className="pagination-dots">...</span>}
      </div>
    </div>
  );
}
