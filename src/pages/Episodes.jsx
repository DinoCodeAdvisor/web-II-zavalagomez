import React, { useEffect, useState } from "react";
import EpisodeCard from "../components/EpisodeCard";
import "../styles/pages/EpisodesPage.css";

export default function Episodes(){
  const [episodesBySeason, setEpisodesBySeason] = useState({});

  useEffect(() => {
    const fetchAllEpisodes = async () => {
      let allEpisodes = [];
      let nextUrl = "https://rickandmortyapi.com/api/episode";

      while (nextUrl) {
        const res = await fetch(nextUrl);
        const data = await res.json();
        allEpisodes = [...allEpisodes, ...data.results];
        nextUrl = data.info.next;
      }

      // Group episodes by season
      const grouped = allEpisodes.reduce((acc, episode) => {
        const seasonCode = episode.episode.slice(1, 3); // '01', '02', etc.
        const seasonKey = `Season ${parseInt(seasonCode)}`;
        if (!acc[seasonKey]) acc[seasonKey] = [];
        acc[seasonKey].push(episode);
        return acc;
      }, {});

      setEpisodesBySeason(grouped);
    };

    fetchAllEpisodes();
  }, []);

  return (
    <div className="episodes-page">
      <h1 className="page-title">Rick and Morty Episodes</h1>
      {Object.entries(episodesBySeason).map(([season, episodes]) => (
        <div key={season} className="season-section">
          <h2 className="season-title">{season}</h2>
          <div className="episode-grid">
            {episodes.map(ep => (
              <EpisodeCard key={ep.id} episode={ep} />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

