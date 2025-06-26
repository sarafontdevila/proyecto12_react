/*import { useState, useEffect } from 'react';

const useFetchCharacter = (id) => {
  const [character, setCharacter] = useState(null); 
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!id) { 
      setLoading(false);
      return;
    }

    setLoading(true); 
    setError(null); 

    fetch(`https://thronesapi.com/api/v2/Characters/${id}`)
      .then((res) => {
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        return res.json();
      })
      .then((data) => {
        setCharacter(data);
      })
      .catch((err) => {
        console.error("Fetch error:", err);
        setError(err); 
      })
      .finally(() => {
        setLoading(false); 
      });
  }, [id]); 

  return { character, loading, error }; 
};

export default useFetchCharacter;*/