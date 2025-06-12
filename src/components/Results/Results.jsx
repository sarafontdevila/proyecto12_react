import React from 'react';
import { useLocation } from 'react-router-dom';
import './Results.css'; 
import CharacterCard from '../CharacterCard/CharacterCard';

const Results = () => {
  const location = useLocation();
  const { results } = location.state || { results: [] }; 
  const houseName = results[0]?.family || "Unknown";


  if (results.length === 0) {
    return (
      <div className="results-container">
        <h2>No characters found</h2>
      </div>
    );
  }

  return (
    <div className="results-container">
      <h2>{houseName} Results</h2>
      <div className="character-grid"> {}
        {results.map((character) => (
          <CharacterCard key={character.id} character={character} />
        ))}
      </div>
    </div>
  );
};

export default Results;