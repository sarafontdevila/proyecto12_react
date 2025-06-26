import React, { useState, useEffect } from 'react';
import { CharacterContext } from './CharacterContext.js';

export const CharacterProvider = ({ children }) => {
  const [characters, setCharacters] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAllCharacters = async () => {
      try {
        const response = await fetch('https://thronesapi.com/api/v2/Characters');
        const data = await response.json();

        if (Array.isArray(data) && data.length > 0) {
          setCharacters(data);
        } else {
          setError('No characters found or invalid data format.');
        }
      } catch (err) {
        setError('Failed to fetch characters.');
        console.error('Error fetching characters in provider:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchAllCharacters();
  }, []);

  return (
    <CharacterContext.Provider value={{ characters, loading, error }}>
      {children}
    </CharacterContext.Provider>
  );
};