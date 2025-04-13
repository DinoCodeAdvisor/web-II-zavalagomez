import React, { useEffect, useReducer } from "react";
import { Link } from "react-router-dom";
import "../styles/components/EpisodeCard.css";
import {
  getLikesDislikesFromLocalStorage,
  setLikesDislikesToLocalStorage
} from "../services/LocalStorageService_Episode";

// Reducer logic
const initialState = { likes: 0, dislikes: 0 };

function reducer(state, action) {
  switch (action.type) {
    case "SET":
      return { likes: action.likes, dislikes: action.dislikes };
    case "LIKE":
      return { ...state, likes: state.likes + 1 };
    case "DISLIKE":
      return { ...state, dislikes: state.dislikes + 1 };
    default:
      return state;
  }
}

export default function EpisodeCard({ episode }) {
  const season = episode.episode.slice(1, 3);
  const [state, dispatch] = useReducer(reducer, initialState);

  // Load data from localStorage on mount
  useEffect(() => {
    const savedData = getLikesDislikesFromLocalStorage();
    if (savedData[episode.id]) {
      dispatch({
        type: "SET",
        likes: savedData[episode.id].likes,
        dislikes: savedData[episode.id].dislikes
      });
    }
  }, [episode.id]);

  const handleLike = () => {
    dispatch({ type: "LIKE" });
    setLikesDislikesToLocalStorage(episode.id, state.likes + 1, state.dislikes);
  };

  const handleDislike = () => {
    dispatch({ type: "DISLIKE" });
    setLikesDislikesToLocalStorage(episode.id, state.likes, state.dislikes + 1);
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
            👍 Like ({state.likes})
          </button>
          <button onClick={handleDislike} className="episode-dislike">
            👎 Dislike ({state.dislikes})
          </button>
        </div>
      </div>
    </div>
  );
}
