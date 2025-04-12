import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../styles/components/EpisodeCard.css";
import {
  getLikesDislikesFromLocalStorage,
  setLikesDislikesToLocalStorage
} from "../services/LocalStorageService_Episode";

export default function EpisodeCard({ episode }) {
  const season = episode.episode.slice(1, 3);

  // Load likes and dislikes from local storage
  const [likes, setLikes] = useState(0);
  const [dislikes, setDislikes] = useState(0);

  useEffect(() => {
    const savedData = getLikesDislikesFromLocalStorage();
    if (savedData[episode.id]) {
      setLikes(savedData[episode.id].likes);
      setDislikes(savedData[episode.id].dislikes);
    }
  }, [episode.id]);

  const handleLike = () => {
    const newLikes = likes + 1;
    setLikes(newLikes);
    setLikesDislikesToLocalStorage(episode.id, newLikes, dislikes);
  };

  const handleDislike = () => {
    const newDislikes = dislikes + 1;
    setDislikes(newDislikes);
    setLikesDislikesToLocalStorage(episode.id, likes, newDislikes);
  };

  return (
    <div className="episode-card">
      <div className="episode-content">
        <div className="episode-header">
          <span className="episode-badge">Season {season}</span>
          <span className="episode-code">{episode.episode}</span>
        </div>
        <h2 className="episode-title">{episode.name}</h2>
        <p className="episode-airdate">Air date: {episode.air_date}</p>
        <div className="episode-footer">
          <Link to={`/episode/${episode.id}`} className="episode-link">
            View Details
          </Link>
        </div>
        <div className="episode-buttons">
          <button onClick={handleLike} className="episode-like">
            👍 Like ({likes})
          </button>
          <button onClick={handleDislike} className="episode-dislike">
            👎 Dislike ({dislikes})
          </button>
        </div>
      </div>
    </div>
  );
}
