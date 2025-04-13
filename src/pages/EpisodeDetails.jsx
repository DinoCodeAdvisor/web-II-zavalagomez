import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import CharacterCard from "../components/CharacterCard";
import "../styles/pages/EpisodeDetailsPage.css";

export default function EpisodeDetails() {
  const { episodeId } = useParams();
  const [episodeName, setEpisodeName] = useState("");
  const [episodeCode, setEpisodeCode] = useState("");
  const [airDate, setAirDate] = useState("");
  const [allCharacters, setAllCharacters] = useState([]);
  const [likedCharacters, setLikedCharacters] = useState([]);

  useEffect(() => {
    async function fetchEpisodeData() {
      try {
        const response = await fetch(
          `https://rickandmortyapi.com/api/episode/${episodeId}`
        );
        const data = await response.json();

        setEpisodeName(data.name);
        setEpisodeCode(data.episode);
        setAirDate(data.air_date);

        const characterURLs = data.characters.slice(0, 4);
        const fetchedCharacters = await Promise.all(
          characterURLs.map((url) => fetch(url).then((res) => res.json()))
        );
        setAllCharacters(fetchedCharacters);

        updateLikedCharacters();
      } catch (error) {
        console.error("Failed to load episode or character data:", error);
      }
    }

    fetchEpisodeData();
  }, [episodeId]);

  function getLikes(characterId) {
    const data = JSON.parse(localStorage.getItem("likedCharacters") || "{}");
    return data[episodeId]?.[characterId] || 0;
  }

  function updateLikedCharacters() {
    const storedLikes = JSON.parse(
      localStorage.getItem("likedCharacters") || "{}"
    );
    const episodeLikes = storedLikes[episodeId] || {};

    const topLiked = Object.entries(episodeLikes)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 3)
      .map(([id]) => id);

    Promise.all(
      topLiked.map((id) =>
        fetch(`https://rickandmortyapi.com/api/character/${id}`).then((res) =>
          res.json()
        )
      )
    ).then((characters) => {
      setLikedCharacters(characters);
    });
  }

  function likeCharacter(characterId) {
    const key = "likedCharacters";
    const data = JSON.parse(localStorage.getItem(key) || "{}");

    if (!data[episodeId]) data[episodeId] = {};
    if (!data[episodeId][characterId]) data[episodeId][characterId] = 0;

    data[episodeId][characterId] += 1;
    localStorage.setItem(key, JSON.stringify(data));

    updateLikedCharacters();
  }

  return (
    <div className="details-page">
      <div className="details-page-header">
        <h1>{episodeName || "Loading episode..."}</h1>
        {episodeCode && airDate && (
          <h2 className="details-page-subtitle">
            {episodeCode} • Aired on {airDate}
          </h2>
        )}
      </div>

      <section className="liked-characters">
        <h3>Most Liked Characters</h3>
        <div className="character-list">
          {likedCharacters.length === 0 ? (
            <p>No liked characters yet for this episode.</p>
          ) : (
            likedCharacters.map((char) => (
              <div key={char.id}>
                <CharacterCard character={char} />
                <p className="character-likes">❤️ {getLikes(char.id)} Likes</p>
              </div>
            ))
          )}
        </div>
      </section>

      <section className="character-like-section">
        <h3>Characters in this Episode</h3>
        <div className="character-list">
          {allCharacters.map((char) => (
            <div key={char.id}>
              <CharacterCard character={char} />
              <p className="character-likes">❤️ {getLikes(char.id)} Likes</p>
              <div className="like-btn-wrapper">
                <button
                  onClick={() => likeCharacter(char.id)}
                  className="like-btn"
                >
                  Like
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
