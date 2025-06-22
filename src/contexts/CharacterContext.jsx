import React, { createContext, useState, useEffect, useContext } from 'react';
const CharacterContext = createContext();
export const CharacterProvider = ({ children }) => {
  const [characters, setCharacters] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAllCharacters = async () => {
      try {const page = Math.floor(Math.random() * 45) + 1;
        const response = await fetch(`https://thronesapi.com/api/v2/Characters`

        );
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
export const useCharacters = () => {
  const context = useContext(CharacterContext);
  if (!context) {
    throw new Error('useCharacters must be used within a CharacterProvider');
  }
  return context;
};
